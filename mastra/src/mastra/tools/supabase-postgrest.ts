/**
 * Supabase PostgREST tools for Mastra
 * 
 * This module exports individual self-contained tools for interacting with PostgREST APIs.
 * Each tool accepts configuration parameters directly, eliminating the need for factory functions.
 * Inspired from https://github.com/supabase-community/supabase-mcp/blob/main/packages/mcp-server-postgrest/src/server.ts
 */

export { postgrestRequestTool } from "./postgrest-request";
export { sqlToRestTool } from "./sql-to-rest";
export { postgrestOpenApiTool } from "./postgrest-openapi";