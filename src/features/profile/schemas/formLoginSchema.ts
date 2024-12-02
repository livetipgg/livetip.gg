import { z } from "zod";

export const formUpdateProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O username deve ter pelo menos 3 caracteres",
    })
    .optional(),
  xUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
  facebookUsername: z.string().optional(),
  nostrUsername: z.string().optional(),
  telegramUsername: z.string().optional(),
  whatsappUsername: z.string().optional(),
});

export type IFormUpdateProfileInputs = z.infer<typeof formUpdateProfileSchema>;
