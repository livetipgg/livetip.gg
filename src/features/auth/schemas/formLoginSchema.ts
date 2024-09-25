import { z } from "zod";

export const formLoginSchema = z.object({
  email: z.string().min(1, { message: "O email é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

export const formLoginOneTimePasswordSchema = z.object({
  pin: z.string().min(6, { message: "O PIN precisa ter 6 dígitos" }),
});

export type IFormLoginInputs = z.infer<typeof formLoginSchema>;
export type IFormLoginOneTimePasswordInputs = z.infer<
  typeof formLoginOneTimePasswordSchema
>;
