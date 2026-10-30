import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { validate } from "../middlewares/validate.js";
import { authBody } from "../schemas/auth.js";

export const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", validate(authBody), async (_req, res) => {
  const { email, password } = res.locals.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Cet email est déjà utilisé" });
  }

  // On "hache" le mot de passe pour ne pas le stocker en clair
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword });
  res.status(201).json({ message: "Utilisateur créé", userId: user._id });
});

// POST /api/auth/login
authRouter.post("/login", validate(authBody), async (_req, res) => {
  const { email, password } = res.locals.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }

  // On génère le token (valide 24h)
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Configuration serveur invalide." });
  }
  const token = jwt.sign({ userId: user._id, email: user.email }, secret, { expiresIn: "24h" });

  res.status(200).json({ token, email: user.email });
});