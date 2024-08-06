import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { TopPage } from "@/components/top-page";
import { apiEndpoint } from "@/utilities/constants";
import {
  PrefectureModel,
  prefecturesResponseSchema,
} from "@/model/prefecture.model";

type Repo = {
  prefectures: PrefectureModel[];
};

export default function Page({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>都道府県別の総人口推移</title>
        <meta charSet="utf-8" />
        <meta name="description" content="都道府県別の総人口推移" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopPage prefectures={repo.prefectures} />
    </>
  );
}

export const getServerSideProps = (async () => {
  if (!process.env.RESAS_API_KEY)
    throw new Error("RESAS API KEY is not defined");

  const res = await fetch(`${apiEndpoint}/v1/prefectures`, {
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY,
    },
  });
  const json = await res.json();

  return {
    props: {
      repo: {
        prefectures: prefecturesResponseSchema.parse(json).result,
      },
    },
  };
}) satisfies GetServerSideProps<{ repo: Repo }>;
