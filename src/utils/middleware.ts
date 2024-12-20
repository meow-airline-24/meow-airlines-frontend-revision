import { NextResponse, NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface MyToken {
  role?: string;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect the /admin route
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded: MyToken = jwtDecode(token);

      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      console.error("JWT decode error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
