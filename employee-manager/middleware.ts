import { NextRequest, NextResponse } from "next/server";
import { deleteCookie, getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

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

  try {
    // Decode the JWT token to check its expiration
    const decodedToken: { exp?: number } = jwtDecode(token);
    const expirationTime = decodedToken?.exp;

    if (expirationTime) {
      const currentTime = Math.floor(Date.now() / 1000); // Get the current time in seconds
      if (currentTime > expirationTime) {
        // If the token has expired, redirect to the login page

        await deleteCookie("UserName", { cookies });
        await deleteCookie("JwtToken", { cookies });
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set(
          "error",
          "Your session has expired. Please log in again to continue"
        );
        return NextResponse.redirect(loginUrl);
      }
    }
  } catch (error) {
    console.error("Error decoding token:", error);

    // If there's an error decoding the token, redirect to the login page
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("error", "Invalid token. Please log in again.");
    return NextResponse.redirect(loginUrl);
  }

  return res; // Allow access if token is valid and not expired
}

// Match the routes you want to protect
export const config = {
  matcher: ["/", "/employees/:path*", "/popup/:path"], // Adjust based on your app
};
