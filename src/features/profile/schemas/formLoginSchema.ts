import { z } from "zod";

export const formUpdateProfileSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O username deve ter pelo menos 3 caracteres",
    })
    .optional(),
  first_name: z.string().optional(),
  password: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email({ message: "O email é inválido" }).optional(),
  youtubeUsername: z.string().optional(),
  twitchUsername: z.string().optional(),
  xUsername: z.string().optional(),
  instagramUsername: z.string().optional(),
  facebookUsername: z.string().optional(),
  nostrUsername: z.string().optional(),
  telegramUsername: z.string().optional(),
  whatsappUsername: z.string().optional(),
});

export type IFormUpdateProfileInputs = z.infer<typeof formUpdateProfileSchema>;
