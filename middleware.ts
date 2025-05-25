import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "", // forward cookies
    },
  });

  const pathname = request.nextUrl.pathname;

  const isAuth = !!session;
  const isProtectedRoute = ["/dashboard", "/account", "/settings", "/products"].some((path) =>
    pathname.startsWith(path)
  );
  const isPublicOnlyRoute = ["/login", "/signup"].includes(pathname);

  // 🔒 Not logged in but trying to access a protected route
  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Logged in but trying to access login/signup → redirect to dashboard
  if (isAuth && isPublicOnlyRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes (or limit as needed)
export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // Apply to all routes except static files/api
};
