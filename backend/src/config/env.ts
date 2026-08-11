// src/config/env.ts — Environment variable validation with Zod
// All env vars are validated at startup. The app will NOT start with invalid config.

import { z } from "zod";

const envSchema = z.object({
  // Server
  PORT: z
    .string()
    .default("4000")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive()),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),

  // JWT
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // CORS
  CORS_ORIGIN: z.string().url().default("http://localhost:5173"),

  // Bcrypt
  BCRYPT_SALT_ROUNDS: z
    .string()
    .default("12")
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(8).max(16)),
});

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      result.error.flatten().fieldErrors
    );
    process.exit(1);
  }

  return result.data;
}

export const env = validateEnv();
export type Env = z.infer<typeof envSchema>;
