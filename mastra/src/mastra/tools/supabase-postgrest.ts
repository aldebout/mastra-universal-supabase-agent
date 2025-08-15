/**
 * Supabase PostgREST tools for Mastra
 * 
 * This module exports individual self-contained tools for interacting with PostgREST APIs.
 * Each tool accepts configuration parameters directly, eliminating the need for factory functions.
 */

export { postgrestRequestTool } from "./postgrest-request";
export { sqlToRestTool } from "./sql-to-rest";
export { postgrestOpenApiTool } from "./postgrest-openapi";