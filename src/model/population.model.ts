import { z } from "zod";

import { PrefectureModel } from "./prefecture.model";

export const populationType = [
  {
    id: "total",
    label: "総人口",
  },
  {
    id: "young",
    label: "年少人口",
  },
  {
    id: "productive",
    label: "生産年齢人口",
  },
  {
    id: "elderly",
    label: "老年人口",
  },
] as const;

export type PopulationType = (typeof populationType)[number]["id"];

export const populationResponseSchema = z.object({
  data: z.object({
    message: z.nullable(z.string()),
    result: z.object({
      boundaryYear: z.number(),
      data: z.array(
        z.object({
          label: z.string(),
          data: z.array(
            z.object({
              year: z.number(),
              value: z.number(),
            })
          ),
        })
      ),
    }),
  }),
  prefCode: z.number(),
});

type PopulationModel = {
  prefCode: PrefectureModel["prefCode"];
  boundaryYear: number;
  data: {
    [key in PopulationType]: {
      year: number;
      value: number;
    }[];
  };
};

export const createPopulationList = (
  parsedResponses: z.infer<typeof populationResponseSchema>[]
): PopulationModel[] =>
  parsedResponses.map((parsedResponse) => {
    const { boundaryYear, data } = parsedResponse.data.result;

    return {
      prefCode: parsedResponse.prefCode,
      boundaryYear,
      data: Object.fromEntries(
        populationType.map(({ id, label }) => [
          id,
          data
            .find((d) => d.label === label)!
            .data.map(({ year, value }) => ({ year, value: value / 10000 })),
        ])
      ) as PopulationModel["data"],
    };
  });
