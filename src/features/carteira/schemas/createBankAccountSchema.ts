import { z } from "zod";

export const createBankAccountSchema = z.object({
  fullName: z.string().min(1, { message: "O nome completo é obrigatório" }),
  bankId: z.string().min(1, { message: "O banco é obrigatório" }),
  agencyNumber: z.string().min(1, { message: "A agência é obrigatória" }),

  accountNumber: z.string().min(1, { message: "A conta é obrigatória" }),

  pixKey: z.string().min(1, { message: "A chave pix é obrigatória" }),
  pixKeyType: z
    .string()
    .min(1, { message: "O tipo da chave pix é obrigatório" }),
  cpf: z.string().min(1, { message: "O CPF é obrigatório" }),
});

export type IFormCreateBankAccountSchema = z.infer<
  typeof createBankAccountSchema
>;
