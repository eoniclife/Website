import { failure, success } from "@/lib/api";

export async function POST(_: Request, context: { params: Promise<{ type: string }> }) {
  const params = await context.params;
  const validTypes = ["d3", "d7", "d30", "d80"];
  if (!validTypes.includes(params.type)) {
    return failure("INVALID_TYPE", 400);
  }

  return success({ success: true, message: "STUB — V2" });
}
