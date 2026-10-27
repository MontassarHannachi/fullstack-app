import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { appareilRouter } from "./routes/appareil.route.js";
import { authRouter } from "./routes/auth.route.js"; // 👈 AJOUT
import { authMiddleware } from "./middlewares/auth.middleware.js"; // 👈 AJOUT

export const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Routes publiques (Auth)
app.use("/api/auth", authRouter); // 👈 AJOUT

// Routes protégées par le Middleware (Appareils)
app.use("/api/appareils", authMiddleware, appareilRouter); // 👈 AJOUT DE authMiddleware

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});