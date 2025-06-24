import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔒 middleware is running");
  const authToken = request.cookies.get("authToken")?.value;
  const path = request.nextUrl.pathname;
  console.log("authToken:", authToken);
  console.log("Request path:", path);

  // ✅ Allow unauthenticated access to specific public routes
  const publicApiRoutes = ["/api/sendotp", "/api/rstpassword", "/api/auth/login", "/api/auth/logout", "/api/users"];
  if (publicApiRoutes.includes(path)) {
    return NextResponse.next(); // allow
  }

  const loggedInUserNotAccessPaths = path.startsWith("/login") || path.startsWith("/signup");

  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
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
};
