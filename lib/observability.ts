type LogLevel = "info" | "warn" | "error";

interface LogPayload {
  event: string;
  route?: string;
  details?: Record<string, unknown>;
}

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return { value: String(error) };
}

export function logServerEvent(level: LogLevel, payload: LogPayload) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    ...payload,
  };

  const line = JSON.stringify(entry);
  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.info(line);
}

export function logApiError(route: string, error: unknown, details?: Record<string, unknown>) {
  logServerEvent("error", {
    event: "api_error",
    route,
    details: {
      ...details,
      error: serializeError(error),
    },
  });
}
