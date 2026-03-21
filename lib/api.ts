import { NextResponse } from "next/server";

export async function parseJson<T>(request: Request): Promise<T> {
  return (await request.json()) as T;
}

export function success(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}

export function failure(error: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, error, ...extra }, { status });
}
