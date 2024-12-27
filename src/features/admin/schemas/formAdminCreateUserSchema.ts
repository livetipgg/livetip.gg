import { z } from "zod";

export const formAdminCreateUserSchema = z.object({
  username: z.string().min(3, {
    message: "O username é obrigatório e deve ter no mínimo 3 caracteres ",
  }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().min(6, {
    message: "A senha é obrigatória e deve ter no mínimo 6 caracteres",
  }),
});

export type IFormAdminCreateUserInputs = z.infer<
  typeof formAdminCreateUserSchema
>;
