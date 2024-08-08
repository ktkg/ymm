import useSWR from "swr";
import { z } from "zod";

import { populationResponseSchema } from "@/model/population.model";
import { PrefectureModel } from "@/model/prefecture.model";

export const usePopulation = (prefCodes: PrefectureModel["prefCode"][]) => {
  const swrResponse = useSWR<z.infer<typeof populationResponseSchema>[], Error, string[]>(
    prefCodes.map((prefCode) => `/api/population/${prefCode}`),
    async (urls) => {
      const responses = await Promise.all(urls.map((url) => fetch(url).then((res) => res.json())));

      return responses.map((response) => populationResponseSchema.parse(response));
    }
  );

  return swrResponse;
};
