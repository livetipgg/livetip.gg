import { z } from "zod";

export const formAdminVirtualWithdrawSchema = z.object({
  userId: z.number(),
  amount: z.any(),
});

export type IFormAdminVirtualWithdrawInputs = z.infer<
  typeof formAdminVirtualWithdrawSchema
>;
