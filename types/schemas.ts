import { z, ZodType } from "zod";
import { BrandFormData, TokenFormData } from "./forms";
import { descriptionFormat, nameFormat, slugFormat } from "@/lib/regex";

export const tokenValidationSchema: ZodType<TokenFormData> = z.object({
  template: z.string(),
  token: z.string(),
  user_id: z.string(),
  status: z.enum(["draft", "publish", "archive"]).optional(),
});

export const brandValidationSchema: ZodType<BrandFormData> = z.object({
  name: z.string().regex(nameFormat, {
    message: "format: no special (&/,), min 4 and max 60 characters",
  }),
  slug: z.string().regex(slugFormat, {
    message:
      "format: no blank space (_), no special character (&,',/|...), min 4 and max 20 characters",
  }),
  description: z.string().regex(descriptionFormat, {
    message: "format:min 4 and max 500 characters",
  }),
  image: z.string().url("Image url is invalid"),
  // image: z.object({ url: z.string() }).array(),
  status: z.enum(["draft", "publish", "archive"]),
  user_id: z.string().optional().nullable(),
});
