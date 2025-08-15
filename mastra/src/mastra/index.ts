import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { supabaseExplorerAgent } from "./agents/supabase-explorer-agent";
import { authenticateJWT } from "./middleware/auth";

export const mastra = new Mastra({
  agents: {
    supabaseExplorer: supabaseExplorerAgent,
  },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  server: {
    middleware: [authenticateJWT],
  },
});

export { authenticateJWT };
