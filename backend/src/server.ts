// src/server.ts — Application entry point
// Starts the HTTP server with graceful shutdown support.

import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";

async function startServer(): Promise<void> {
  // Verify database connectivity before starting
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }

  const server = app.listen(env.PORT, () => {
    console.log(
      `🚀 Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`
    );
  });

  // ── Graceful Shutdown ──────────────────────────────────────
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully…`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log("🛑 Server closed");
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error("⚠️  Forced shutdown after timeout");
      process.exit(1);
    }, 10_000);
  };

  process.on("SIGTERM", () => void shutdown("SIGTERM"));
  process.on("SIGINT", () => void shutdown("SIGINT"));

  // Handle uncaught errors
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
  });

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
  });
}

void startServer();
