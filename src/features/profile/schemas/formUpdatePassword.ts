import { z } from "zod";

export const formUpdatePassword = z.object({
  currentPassword: z
    .string()
    .min(6, "Senha atual deve ter no mínimo 6 caracteres"),
  newPassword: z.string().min(6, "Nova senha deve ter no mínimo 6 caracteres"),
  confirmNewPassword: z
    .string()
    .min(6, "Confirmação de senha deve ter no mínimo 6 caracteres"),
});

export type IFormUpdatePasswordInputs = z.infer<typeof formUpdatePassword>;
