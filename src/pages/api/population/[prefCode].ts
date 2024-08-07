import type { NextApiRequest, NextApiResponse } from "next";

import { apiEndpoint } from "@/utilities/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req;
  const { prefCode } = query;

  if (typeof prefCode !== "string" || isNaN(parseInt(prefCode)))
    throw new Error("prefCode is invalid");

  if (!process.env.RESAS_API_KEY)
    throw new Error("RESAS API KEY is not defined");

  const response = await fetch(
    `${apiEndpoint}/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
    {
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY,
      },
    },
  );
  const json = await response.json();

  return res.status(200).json({ data: json, prefCode: parseInt(prefCode) });
}
