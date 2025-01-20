import { z } from "zod";

export const formRegisterSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "O username é obrigatório e deve ter pelo menos 3 caracteres",
    })
    // não aceita maiúsculas
    .regex(/^[a-zA-Z0-9]+$/, {
      message:
        "O username só pode conter letras, números. Não pode conter espaços, símbolos ou acentos.",
    })
    .transform((value) => value.toLowerCase()),
  email: z.string().email({ message: "O email é inválido" }),
  password: z.string().min(6, {
    message: "A senha é obrigatória e deve ter pelo menos 6 caracteres",
  }),
  confirmPassword: z
    .string()
    .min(6, { message: "A confirmação da senha é obrigatória" }),
});

export type IFormRegisterInputs = z.infer<typeof formRegisterSchema>;
