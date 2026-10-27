import express from "express";
import cors from "cors";
import morgan from "morgan";

export const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json()); // without this, req.body is undefined on POST / PUT

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
