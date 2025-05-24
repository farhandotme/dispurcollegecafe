"use server"
import { auth } from "@/auth/auth";
import SignpUserSchema from "@/validators/SignupUser";
import { APIError } from "better-auth/api";
const signup = async (data : unknown) =>{
const parsed =  SignpUserSchema.safeParse(data);
if(!parsed.success){
    return {
        error : parsed.error.flatten().fieldErrors,
        status : 400,
    }
}
try{
  const {email, password, username } = parsed.data;
const signupuser = await auth.api.signUpEmail({
    body : {
        email : email,
        password : password,
        name : username,
        callbackURL : "/"
    }
})  
if(signupuser){
    return {
        success_message : "Signup Successful",
    }
}
else {
    return {
        error : "Something went wrong during signup"
    }
}
}
catch(error){
    if(error instanceof APIError){
        switch(error.status){
            case "UNPROCESSABLE_ENTITY" : 
            return {errorMessage : "User already exists, Please login"}
            case "BAD_REQUEST" : 
            return {errorMessage : "Invalid email"}
            default : 
            return {errorMessage : "Something went wrong"}
        }
    }
}
}

export default signup