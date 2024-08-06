import { z, ZodTypeAny } from "zod";

export const fetcher = async <T extends ZodTypeAny>({
  url,
  method,
  schema,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  schema: T;
}): Promise<z.infer<T>> => {
  if (!process.env.NEXT_PUBLIC_RESAS_API_KEY)
    throw new Error("RESAS API KEY is not defined");

  const response = await fetch(
    `https://opendata.resas-portal.go.jp/api${url}`,
    {
      method,
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
      },
      mode: "cors",
    },
  );

  const json = await response.json();

  return schema.parse(json);
};
