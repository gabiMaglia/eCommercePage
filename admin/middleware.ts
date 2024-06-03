import { authMiddleware, withClerkMiddleware } from "@clerk/nextjs";

// export default withClerkMiddleware()

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};