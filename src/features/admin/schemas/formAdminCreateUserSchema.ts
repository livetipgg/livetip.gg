import { z } from "zod";

export const formAdminCreateUserSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O username é obrigatório e deve ter no mínimo 3 caracteres ",
    }),
  email: z.string().optional(),
  password: z.string().min(6, {
    message: "A senha é obrigatória e deve ter no mínimo 6 caracteres",
  }),
});

export type IFormAdminCreateUserInputs = z.infer<
  typeof formAdminCreateUserSchema
>;
