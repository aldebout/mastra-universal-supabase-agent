import { RuntimeContext } from "@mastra/core/di";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "http://127.0.0.1:54321";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-anon-key";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define RuntimeContext type
export type AppRuntimeContext = {
  "user-id": string;
  "user-token": string;
};

export const authenticateJWT = {
  handler: async (c: any, next: any) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        return new Response("Invalid or expired token", { status: 401 });
      }

      // Get the RuntimeContext instance
      const runtimeContext = c.get(
        "runtimeContext"
      ) as RuntimeContext<AppRuntimeContext>;

      runtimeContext.set("user-id", user.id);
      runtimeContext.set("user-token", token);

      await next();
    } catch (error) {
      console.error("Authentication error:", error);
      return new Response("Internal server error during authentication", {
        status: 500,
      });
    }
  },
  path: "/api/*",
};
