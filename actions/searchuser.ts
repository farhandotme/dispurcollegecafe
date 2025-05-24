"use server"
import { db } from "@/lib/db";
import ForgotpasswordSchema from "@/validators/ForgotPassword";
const searchUser = async (data : unknown) =>{
  const parsed = ForgotpasswordSchema.safeParse(data);
  if(!parsed.success){
  return {
    error : parsed.error.flatten().fieldErrors,
    status : 400,
  }
  }
  else{
      const {email} = parsed.data
      const existingUser = await db.collection("user").findOne({
        email
  })
  if(!existingUser){
    return {
        errorMessage : "User not found, please signup",
    }
  }
  else{
    return {
        success_message : "User found"
    }
  }
}
}
export default searchUser
