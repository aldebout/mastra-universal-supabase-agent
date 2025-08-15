import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { AppRuntimeContext } from "../middleware/auth";
import { RuntimeContext } from "@mastra/core/runtime-context";

function ensureNoTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function getHeaders(
  apiKey: string | undefined,
  schema: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET"
) {
  const schemaHeader = method === "GET" ? "accept-profile" : "content-profile";

  const headers: HeadersInit = {
    "content-type": "application/json",
    prefer: "return=representation",
    [schemaHeader]: schema,
  };

  if (apiKey) {
    headers.apikey = apiKey;
    headers.authorization = `Bearer ${apiKey}`;
  }

  return headers;
}

export const postgrestRequestTool = createTool({
  id: "postgrest-request",
  description:
    "Performs an HTTP request against the PostgREST API for database operations",
  inputSchema: z.object({
    method: z
      .enum(["GET", "POST", "PUT", "PATCH", "DELETE"])
      .describe("HTTP method to use"),
    path: z.string().describe("API path to query (e.g., '/todos?id=eq.1')"),
    body: z
      // .union([
      //   z.record(z.string(), z.any()),
      //   z.array(z.record(z.string(), z.any())),
      // ])
      .any()
      .optional()
      .describe("Request body for POST, PUT, and PATCH requests"),
  }),
  outputSchema: z.unknown().describe("JSON response from the PostgREST API"),
  execute: async ({
    context: { method, path, body },
    runtimeContext,
  }: {
    context: {
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      path: string;
      body?: any;
    };
    runtimeContext: RuntimeContext<AppRuntimeContext>;
  }) => {
    const apiKey = runtimeContext.get("user-token");
    const baseUrl = ensureNoTrailingSlash(`${process.env.SUPABASE_URL}/rest/v1`);
    const url = new URL(`${baseUrl}${path}`);
    const headers = getHeaders(apiKey, "public", method);

    if (method !== "GET") {
      headers["content-type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(
        `PostgREST request failed: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  },
});
