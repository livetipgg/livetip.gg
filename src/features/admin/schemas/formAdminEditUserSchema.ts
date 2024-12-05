import { z } from "zod";

export const formAdminEditUserSchema = z.object({
  username: z.string(),
  email: z.string(),
  photoUrl: z.any(),
  xUsername: z.string(),
  instagramUsername: z.string().optional(),
  facebookUsername: z.string().optional(),
  nostrUsername: z.string().optional(),
  telegramUsername: z.string().optional(),
  whatsappUsername: z.string().optional(),
});

export type IFormAdminEditUserInputs = z.infer<typeof formAdminEditUserSchema>;
