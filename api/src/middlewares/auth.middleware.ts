import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // On récupère le token dans le header "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Accès refusé. Token manquant." });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Configuration serveur invalide." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    // On peut attacher l'utilisateur à la requête si besoin (req.user = decoded)
    next(); // Le token est valide, on passe à la suite
  } catch (error) {
    return res.status(401).json({ error: "Token invalide ou expiré." });
  }
};