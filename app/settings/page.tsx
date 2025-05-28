"use client";
import updatePassword from "@/actions/updatepassword";
import { useSession } from "@/auth/auth-client";
import SignoutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import updatePasswordSchema, { updatePasswordSchemaProp } from "@/validators/updatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const SettingsPage = () => {
  const { data: session, isPending } = useSession();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<updatePasswordSchemaProp>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const user = session?.user.name as string;
  const userId = session?.user.id as string;

  const handlupdatepassword = async (data: updatePasswordSchemaProp) => {
   try {
     await updatePassword(userId, data);
    toast.success("Password updated successfully!");
  } catch (err : unknown) {
    toast.error("Something went wrong. Please try again.");
  }
  };
  return (
    <div className="bg-cafe-dark min-h-dvh text-cafe-light font-cookie-regular py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl border-b border-white/10 pb-4">
            {!isPending && (user && `Hi, ${user}`)}
          </h1>
          <p className="text-cafe-cream/60 mt-2 text-4xl">Manage your account below.</p>
        </div>

        {/* Update Password */}
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-cafe-cream/20 shadow-lg p-6">
          <h2 className="text-3xl text-cafe-cream mb-4 text-center">Update Password</h2>
          <form onSubmit={handleSubmit(handlupdatepassword)} className="space-y-4">
            <input
              type="password"
              placeholder="Your password goes here..."
              {...register("updatepassword", {minLength : 8, maxLength : 20})}
              className="w-full px-4 py-2 font-geist bg-white/20 placeholder:text-cafe-cream text-cafe-light border border-cafe-cream/30 rounded-md focus:outline-none focus:ring-2 focus:ring-cafe-cream/40"
            />
            {errors.updatepassword && (
              <p className="text-red-600 text-sm font-geist">Password must contain min 8 and max 20 characters</p>
            )}
            <Button
              type="submit"
              className="w-full text-2xl font-bold text-black bg-cafe-cream hover:bg-cafe-cream transition">
             {isSubmitting ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </div>
        {/* Log Out */}
    <div className="border border-white/20 p-5 rounded-lg flex flex-col gap-y-5">
             <div className="text-4xl text-center">Click here to sign out </div>
             <SignoutButton className="w-full text-black font-bold hover:bg-cafe-tan text-2xl bg-cafe-tan"/>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl bg-red-900/20 backdrop-blur-sm border border-red-500/30 shadow-md p-6 font-neue-regular">
          <h2 className="text-2xl text-red-400 mb-3">Danger Zone</h2>
          <p className="text-red-300/80 mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>
          <Button className="bg-red-600 hover:bg-red-700 w-full text-xl">
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
