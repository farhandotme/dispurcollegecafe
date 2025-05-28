"use client"
import { useSession } from "@/auth/auth-client";
const SettingsPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user.name
    return (
        <>
            <div className="bg-black text-white font-geist bg-gradient-to-tr">
                {
                    !isPending && user ? <h1 className="text-center text-2xl md:text-4xl border-b border-white/10">Hi, {user}</h1> :
                        <h1 className="text-center text-2xl md:text-4xl">Loading please wait...</h1>
                }
                <div className="">
                    <span>Wanna signout</span>
                </div>
            </div>

        </>

    )
}

export default SettingsPage;