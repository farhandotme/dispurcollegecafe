import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {db} from "../lib/db";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import sendEmail from "@/actions/sendEmail";
export const auth = betterAuth({
  emailAndPassword : {
    enabled : true,
    minPasswordLength : 8,
    maxPasswordLength : 20,
    autoSignIn : true,
    sendResetPassword : async ({user, token, url})=>{
        // gonna setup later
       await sendEmail({
        to : user.email as string,
        subject : "Reset your password",
         text: `${url}`,
       })
        console.log("User is", user);
        console.log("Token is", token);
        console.log("Url is", url);
    },
    resetPasswordTokenExpiresIn : 600 // within  10 min it will expire
  },
  database: mongodbAdapter(db),
  
  plugins : [nextCookies()],
  trustedOrigins : ["http://192.168.78.38:3000"]
});