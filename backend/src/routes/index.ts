// src/routes/index.ts — Central API router
// All module routes will be mounted here under /api/v1.

import { Router } from "express";

const apiRouter = Router();

// ── Module Routes (mount as they are implemented) ────────────
// apiRouter.use("/auth", authRouter);
// apiRouter.use("/customers", customerRouter);
// apiRouter.use("/products", productRouter);
// apiRouter.use("/stock-movements", stockMovementRouter);
// apiRouter.use("/challans", challanRouter);

// Placeholder: API root
apiRouter.get("/", (_req, res) => {
  res.json({
    message: "ERP-CRM Operations Portal API v1",
    modules: [
      "auth",
      "customers",
      "products",
      "stock-movements",
      "challans",
    ],
  });
});

export { apiRouter };
