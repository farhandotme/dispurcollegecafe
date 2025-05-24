import { mongodbAdapter } from "better-auth/adapters/mongodb";
import {db} from "../lib/db";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
export const auth = betterAuth({
  emailAndPassword : {
    enabled : true,
    minPasswordLength : 8,
    maxPasswordLength : 20,
    autoSignIn : true,
    sendResetPassword : async ({user, token, url})=>{
        // gonna setup later
        console.log("User is", user);
        console.log("Token is", token);
        console.log("Url is", url);
    }
  },
  database: mongodbAdapter(db),
  
  plugins : [nextCookies()]
});