import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/tools", "/api/ai", "/api/stripe"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default async function middleware(request: NextRequest) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  // Clerk needs both the publishable and the secret key; with only one of
  // them clerkMiddleware would throw at request time.
  const clerkConfigured =
    !!clerkKey && clerkKey.startsWith("pk_") && !!process.env.CLERK_SECRET_KEY;
  if (!clerkConfigured) {
    // Fail closed in production: without a valid Clerk key pair nobody can be
    // authenticated, so protected routes must not be reachable.
    if (process.env.NODE_ENV === "production") {
      const { pathname } = request.nextUrl;
      if (isProtectedPath(pathname)) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json(
            { error: "Authentication is not configured" },
            { status: 401 }
          );
        }
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
    // Development without Clerk keys: pass through so local dev still works.
    return NextResponse.next();
  }
  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");
  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/tools(.*)",
    "/api/ai(.*)",
    "/api/stripe(.*)",
  ]);
  const handler = clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  });
  return handler(request, {} as any);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
