// logout route handler

import { NextResponse } from "next/server";

export async function POST(request){
    const response = NextResponse.json({
        message: "user logged out successfully"
    }, { status: 200 });
    
    // Clear the authToken cookie
    response.cookies.set("authToken","",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0 
    });
    return response;
}