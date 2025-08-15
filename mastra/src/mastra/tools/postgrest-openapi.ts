import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { AppRuntimeContext } from "../middleware/auth";
import { RuntimeContext } from "@mastra/core/runtime-context";

function ensureTrailingSlash(url: string): string {
  return url.endsWith("/") ? url : `${url}/`;
}

export const postgrestOpenApiTool = createTool({
  id: "postgrest-openapi-spec",
  description:
    "Retrieves the OpenAPI specification for the PostgREST API to understand database schema and available endpoints",
  inputSchema: z.object({}),
  outputSchema: z.unknown().describe("OpenAPI specification JSON"),
  execute: async ({
    runtimeContext,
  }: {
    runtimeContext: RuntimeContext<AppRuntimeContext>;
  }) => {
    const apiKey = runtimeContext.get("user-token");
    const response = await fetch(
      ensureTrailingSlash(`${process.env.SUPABASE_URL}/rest/v1`),
      {
        headers: {
          "content-type": "application/json",
          "accept-profile": "public",
          apikey: apiKey,
          authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  },
});
