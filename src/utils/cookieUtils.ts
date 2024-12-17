'use client'

import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { processAccessToken } from "@/utils/backend"

const ACCESS_TOKEN_KEY = "accessToken";

function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
}

export async function getAccessToken(): Promise<string> {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  if (!token) {
    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("No access token available.");
  }
  const accessToken = await processAccessToken(token)
  return accessToken;
}

export function setAccessToken(token: string, expiresInDays: number = 30): void {
  Cookies.set(ACCESS_TOKEN_KEY, token, {
    expires: expiresInDays, // Expiration in days
    secure: false,
    sameSite: "Strict", // Prevent CSRF by restricting cross-origin requests
  });
}

export function removeAccessToken(): void {
  Cookies.remove(ACCESS_TOKEN_KEY);
}
