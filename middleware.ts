import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_token";

function isValidAdminToken(request: NextRequest, expectedToken: string) {
  const authorization = request.headers.get("authorization");
  const bearerToken = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : null;
  const cookieToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value ?? null;

  return bearerToken === expectedToken || cookieToken === expectedToken;
}

function isHtmlNavigation(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  return request.method === "GET" && accept.includes("text/html");
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  const expectedToken = process.env.ADMIN_TOKEN;
  if (!expectedToken) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  if (isValidAdminToken(request, expectedToken)) {
    return NextResponse.next();
  }

  if (isHtmlNavigation(request)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
