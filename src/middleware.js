import { NextResponse } from "next/server";
import { authTokenKey, authRoleKey } from "@/lib/config";

// const allowedOrigins = ['https://acme.com', 'https://my-app.org']

// const corsOptions = {
//   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// }

const roleAccessMap = {
  admin: ["/", "/dashboard", "/add-employee", "/profile/[id]"],
  employee: [
    "/",
    "/dashboard",
    "/profile/[id]",
    "/advance-salary",
    "/holiday-list",
    "/my-attendance",
    "/my-leave-request",
    "/notices",
    "/work-record",
  ],
  developer: ["/"],
  hr: ["/"],
  visitor: ["/"],
};

const doesRoleHaveAccessToURL = (role, url) => {
  const accessibleRoutes = roleAccessMap[role] || [];
  return accessibleRoutes.some((route) => {
    // Create a regex from the route by replacing dynamic segments
    const regexPattern = route.replace(/\[.*?\]/g, "[^/]+").replace("/", "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(url);
  });
};

export async function middleware(request) {
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-hello-from-middleware1", "hello");

  // const response = NextResponse.next({
  //   request: {
  //     // New request headers
  //     headers: requestHeaders,
  //   },
  // });

  // response.headers.set("x-hello-from-middleware2", "hello");

  // return response;

  const token = await request.cookies.get(authTokenKey);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = await request.cookies.get(authRoleKey);
  // console.log("role", role);

  const haveAccess = doesRoleHaveAccessToURL(
    role?.value,
    request.nextUrl.pathname
  );
  if (role?.value !== "admin" && !haveAccess) {
    // Redirect to login page if user has no access to that particular page
    return NextResponse.rewrite(new URL("/access-denied", request.url));
  }

  return;

  // switch (role?.value) {
  //   case "employee":
  //     if (
  //       request.nextUrl.pathname.startsWith("/add-employee") ||
  //       request.nextUrl.pathname.startsWith("/assign-allowance") ||
  //       request.nextUrl.pathname.startsWith("/assign-deductions") ||
  //       request.nextUrl.pathname.startsWith("/assign-device-to-group") ||
  //       request.nextUrl.pathname.startsWith("/assign-employee-to-group") ||
  //       request.nextUrl.pathname.startsWith("/assign-shift") ||
  //       request.nextUrl.pathname.startsWith("/attendance-report") ||
  //       request.nextUrl.pathname.startsWith("/basic-info") ||
  //       request.nextUrl.pathname.startsWith("/branch") ||
  //       request.nextUrl.pathname.startsWith("/clear-raw-data") ||
  //       request.nextUrl.pathname.startsWith("/create-allowance")
  //     ) {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     }
  //     break;
  //   default:
  //     return;
  // }

  // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - auth
     */

    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth).*)",
  ],
};
