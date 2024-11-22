import { z } from "zod";

export const formUpdateProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O username deve ter pelo menos 3 caracteres",
    })
    .optional(),
});

export type IFormUpdateProfileInputs = z.infer<typeof formUpdateProfileSchema>;
