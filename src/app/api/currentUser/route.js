import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/userModel";

export async function GET(request){
    const authToken = request.cookies.get("authToken")?.value;
    console.log("authToken: ", authToken)
    const data = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("data: ", data)
    const user = await User.findById(data.id).select("-password");

    return NextResponse.json({
        authToken: authToken,
        user
    })
}