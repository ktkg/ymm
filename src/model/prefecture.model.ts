import { z } from "zod";

export const prefectureSchema = z.object({
  prefCode: z.number(),
  prefName: z.string(),
});

export const prefecturesResponseSchema = z.object({
  message: z.nullable(z.string()),
  result: z.array(prefectureSchema),
});

export type PrefectureModel = z.infer<typeof prefectureSchema>;
