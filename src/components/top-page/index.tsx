import { useState } from "react";

import { Prefectures } from "./prefectures";
import { Graph } from "./graph";

import { PrefectureModel } from "@/model/prefecture.model";

type Props = {
  prefectures: PrefectureModel[];
};

export const TopPage = ({ prefectures }: Props) => {
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<
    PrefectureModel["prefCode"][]
  >([]);

  const handleSelectPrefecture = (target: PrefectureModel["prefCode"]) => {
    setSelectedPrefCodes((prev) => {
      if (prev.includes(target)) {
        return prev.filter((prefCode) => prefCode !== target);
      } else {
        return [...prev, target];
      }
    });
  };

  return (
    <main>
      <Prefectures
        prefectures={prefectures}
        selectedPrefCodes={selectedPrefCodes}
        onClickCheckbox={handleSelectPrefecture}
      />
      <Graph prefectures={prefectures} selectedPrefCodes={selectedPrefCodes} />
    </main>
  );
};
