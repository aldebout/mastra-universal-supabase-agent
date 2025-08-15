import { RuntimeContext } from "@mastra/core/runtime-context";
import { createTool } from "@mastra/core/tools";
import { processSql, renderHttp } from "@supabase/sql-to-rest";
import { z } from "zod";
import { AppRuntimeContext } from "../middleware/auth";

export const sqlToRestTool = createTool({
  id: "sql-to-rest",
  description:
    "Converts SQL query to a PostgREST API request (method, path). Useful for complex queries that would be difficult to convert to PostgREST syntax manually.",
  inputSchema: z.object({
    sql: z.string().describe("SQL query to convert to PostgREST syntax"),
  }),
  outputSchema: z.object({
    method: z.string().describe("HTTP method for the request"),
    path: z.string().describe("API path for the request"),
  }),
  execute: async ({
    context: { sql },
  }: {
    context: { sql: string };
    runtimeContext: RuntimeContext<AppRuntimeContext>;
  }) => {
    try {
      const statement = await processSql(sql);
      const request = await renderHttp(statement);

      return {
        method: request.method,
        path: request.fullPath,
      };
    } catch (error) {
      throw new Error(
        `Failed to convert SQL to PostgREST syntax: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  },
});
