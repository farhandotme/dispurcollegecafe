"use client";
import { signOut } from "@/auth/auth-client";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface SignoutButtonProps {
  className?: string;
}
const SignoutButton = ({ className }: SignoutButtonProps) => {
  const router = useRouter();
  const handleSignout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Sign out successful", { autoClose: 1000 });
          setTimeout(() => router.push("/"), 1500);
        },
      },
    });
  };

  return (
    <Button className={className} onClick={handleSignout}>
      Sign Out
    </Button>
  );
};

export default SignoutButton;
