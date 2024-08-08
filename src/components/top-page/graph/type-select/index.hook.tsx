import { useState } from "react";

import { TypeSelect } from ".";

import { PopulationType } from "@/model/population.model";

export const useTypeSelect = () => {
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>("total");

  const render = () => (
    <TypeSelect
      selectedPopulationType={selectedPopulationType}
      onClickChange={setSelectedPopulationType}
    />
  );

  return { selectedPopulationType, render };
};
