import { z } from "zod";

export const formRegisterSchema = z.object({
  username: z.string().min(1, { message: "O username é obrigatório" }),
  email: z.string().email({ message: "O email é inválido" }),
  password: z
    .string()
    .min(6, {
      message: "A senha é obrigatória e deve ter pelo menos 6 caracteres",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "A confirmação da senha é obrigatória" }),
});

export type IFormRegisterInputs = z.infer<typeof formRegisterSchema>;
