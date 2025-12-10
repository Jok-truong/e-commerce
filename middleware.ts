import { clerkClient, clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await (
    await clerkClient()
  ).authenticateRequest(req);

  const response = NextResponse.next();

  //protect user api
  if (req.nextUrl.pathname.startsWith("/api/user")) {
    //if signedIn is false
    if (!isAuthenticated) {
      return Response.json(
        {
          message: "You are not authentificated",
        },
        {
          status: 401,
        }
      );
    }
  }

  // protect api admin routes
  if (req.nextUrl.pathname.startsWith("/api/admin")) {
    //if role exist and role is not admin

    if ((await auth()).sessionClaims?.metadata.role !== "admin") {
      return Response.json(
        {
          message: "Forbidden!",
        },
        {
          status: 403,
        }
      );
    }
  }

  // else you can continue
  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
