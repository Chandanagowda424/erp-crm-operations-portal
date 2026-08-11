// src/middleware/errorHandler.ts — Global error handling middleware
// Catches all unhandled errors and sends a consistent JSON response.

import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode ?? 500;
  const message =
    statusCode === 500 && env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  console.error(`[ERROR] ${statusCode} — ${err.message}`, {
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
