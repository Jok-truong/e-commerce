import { z, ZodType } from "zod";
import { TokenFormData } from "./forms";

export const tokenValidationSchema: ZodType<TokenFormData> = z.object({
  template: z.string(),
  token: z.string(),
  user_id: z.string(),
  status: z.enum(["draft", "publish", "archive"]).optional(),
});
