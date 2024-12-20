// middleware.ts
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { NextRequest } from "next/server";

interface MyToken {
  role?: string;
}

// Middleware to validate admin access
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value; // Get the token from cookies

  if (!token) {
    // If no token is found, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: MyToken = jwtDecode(token); // Decode the JWT token

    // Check if the user role is "admin"
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if not admin
    }

    // Allow access if the token is valid and the user is an admin
    return NextResponse.next();
  } catch (error) {
    // If token decoding fails, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to all /admin routes
};
