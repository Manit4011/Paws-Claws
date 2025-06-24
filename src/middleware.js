import { NextResponse } from "next/server";

export function middleware(request){
    console.log("middleware is running");
    const authToken = request.cookies.get("authToken")?.value;
    console.log("authToken:", authToken);

    if (request.nextUrl.pathname === "/api/auth/login" || request.nextUrl.pathname === "/api/users" || request.nextUrl.pathname === "/api/auth/logout"){
        return
    }

    const loggedInUserNotAccessPaths = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");

    if (loggedInUserNotAccessPaths){
        if(authToken){
            return NextResponse.redirect(new URL("/",request.url))
        }
    }
    else{
        if (!authToken){
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }
}

export const config = {
    matcher: [
        "/login",
        "/signup",
        "/api/:path*",
        "/adopt",
        "/saveforlater",
        "/"
    ]
}