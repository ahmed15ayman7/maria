"use server"
import User from "@/lib/models/user.models";
import { connectDB } from "@/mongoose";

export async function FetchPendingUsers() {
    await connectDB();
    
    const users = await User.find({ isApproved: false });
    return users;
}
export async function UserApproved(id:string) {
    await connectDB();
    const user = await User.findByIdAndUpdate(id, { isApproved: true }, { new: true });
  
    if (!user) {
       console.log({ message: "User not found." }, { status: 404 });
    }
  
     console.log({ message: "User approved successfully." }, { status: 200 });
  }
  export async function UserDeleted(id:string) {
    await connectDB();

  
    const user = await User.findByIdAndDelete(id);
  
    if (!user) {
      console.log({ message: "User not found." }, { status: 404 });
    }
    console.log({ message: "User deleted successfully." }, { status: 200 });
  }