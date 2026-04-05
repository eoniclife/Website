import { NextResponse } from "next/server";

const ADMIN_COOKIE_NAME = "admin_token";
const ADMIN_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const formData = await request.formData();
  const submittedToken = formData.get("token");
  const expectedToken = process.env.ADMIN_TOKEN;
  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  if (typeof submittedToken !== "string" || !expectedToken || submittedToken !== expectedToken) {
    return NextResponse.redirect(new URL("/admin/login?error=1", origin), { status: 303 });
  }

  const response = NextResponse.redirect(new URL("/admin/pipeline", origin), { status: 303 });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: submittedToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}
