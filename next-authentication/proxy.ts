import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const hasCookie = cookieStore.has("sessionId");

  if (isProtectedRoute && !hasCookie) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && hasCookie) {
    return NextResponse.redirect(new URL("/dashboard/user", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
