import { z } from "zod";

export const appareilBody = z.object({
  name: z.string().trim().min(1),
  status: z.enum(["On", "Off"]),
});

export const appareilPatch = appareilBody.partial();

export const idParam = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id"),
});

export const switchAllBody = appareilBody.pick({ status: true });

export const listQuery = z.object({
  status: z.enum(["On", "Off"]).optional(),
});
