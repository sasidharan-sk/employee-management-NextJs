import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = await getCookie("JwtToken", { res, req });
  console.log("middleware token :", token);
  if (!token) {
    // Redirect to the login page if no token is found
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set(
      "error",
      "Access denied. Please log in to access this page."
    );
    return NextResponse.redirect(loginUrl);
  }

  return res; // Allow access if token exists
}

// Match the routes you want to protect
export const config = {
  matcher: ["/", "/employees/:path*", "/popup/:path"], // Adjust based on your app
};
