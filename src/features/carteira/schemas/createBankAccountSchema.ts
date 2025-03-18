import { z } from "zod";
import { cpf } from "cpf-cnpj-validator";

export const createBankAccountSchema = z
  .object({
    fullName: z.string().min(1, { message: "O nome completo é obrigatório" }),
    bankId: z.string().min(1, { message: "O banco é obrigatório" }),
    agencyNumber: z.string().min(1, { message: "A agência é obrigatória" }),

    accountNumber: z.string().min(1, { message: "A conta é obrigatória" }),

    pixKey: z.string(),

    pixKeyType: z
      .string()
      .min(1, { message: "O tipo da chave pix é obrigatório" }),

    cpf: z
      .string()
      .min(11, "CPF deve ter 11 dígitos")
      .max(14, "CPF deve ter no máximo 14 caracteres")
      .refine((value) => cpf.isValid(value), {
        message: "CPF inválido",
      }),
  })
  .superRefine((data, error) => {
    if (!data.pixKey) {
      return data;
    }

    if (data.pixKeyType === "CPF") {
      if (!cpf.isValid(data.pixKey)) {
        error.addIssue({
          path: ["pixKey"],
          message: "CPF inválido",
          code: "unrecognized_keys",
          keys: ["pixKey"],
        });
      }
    }

    return data;
  });

export type IFormCreateBankAccountSchema = z.infer<
  typeof createBankAccountSchema
>;
