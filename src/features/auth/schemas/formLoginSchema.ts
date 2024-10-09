import { z } from "zod";

export const formLoginSchema = z.object({
  username: z.string().min(1, { message: "O username é obrigatório" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

export type IFormLoginInputs = z.infer<typeof formLoginSchema>;
