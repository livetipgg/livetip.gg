import { z } from "zod";

export const createBankAccountSchema = z.object({
  fullName: z.string().min(1, { message: "O nome completo é obrigatório" }),
  bankId: z.string().min(1, { message: "O banco é obrigatório" }),
  agencyNumber: z.string().min(1, { message: "A agência é obrigatória" }),
  agencyDigit: z
    .string()
    .min(1, { message: "O dígito da agência é obrigatório" }),
  accountNumber: z.string().min(1, { message: "A conta é obrigatória" }),
  accountDigit: z
    .string()
    .min(1, { message: "O dígito da conta é obrigatório" }),
  pixKey: z.string().min(1, { message: "A chave pix é obrigatória" }),
  pixKeyType: z
    .string()
    .min(1, { message: "O tipo da chave pix é obrigatório" }),
  cpf: z.string().min(1, { message: "O CPF é obrigatório" }),
});

export type IFormCreateBankAccountSchema = z.infer<
  typeof createBankAccountSchema
>;
