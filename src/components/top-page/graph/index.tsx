import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChangeEvent, useState } from "react";
import palette from "google-palette";

import { usePopulation } from "./index.hook";

import {
  createPopulationList,
  populationType,
  PopulationType,
} from "@/model/population.model";
import { PrefectureModel } from "@/model/prefecture.model";

type Props = {
  prefectures: PrefectureModel[];
  selectedPrefCodes: PrefectureModel["prefCode"][];
};

export const Graph = ({ prefectures, selectedPrefCodes }: Props) => {
  const { data, error } = usePopulation(selectedPrefCodes);

  const [selectedPopulationType, setSelectedPopulationType] =
    useState<PopulationType>("total");

  const handleChangePopulationType = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedPopulationType(event.target.value as PopulationType);
  };

  if (error) throw error;

  const populationList = !data ? [] : createPopulationList(data);

  const colors = palette("mpn65", populationList.length).map(
    (color: string) => `#${color}`,
  );

  return (
    <div>
      <label htmlFor="population-type">種別</label>
      <select
        id="population-type"
        value={selectedPopulationType}
        onChange={handleChangePopulationType}
      >
        {populationType.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <LineChart width={730} height={500}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="year"
          allowDuplicatedCategory={false}
          label={{ value: "年", position: "insideBottomRight", dy: 10 }}
        />
        <YAxis
          label={{ value: "人", position: "insideLeft", angle: -90, dx: -10 }}
        />
        <Tooltip />
        <Legend />
        {populationList.map(({ prefCode, data }, index) => (
          <Line
            key={prefCode}
            data={data[selectedPopulationType]}
            type="monotone"
            dataKey="value"
            name={
              prefectures.find((prefecture) => prefecture.prefCode === prefCode)
                ?.prefName
            }
            stroke={colors[index]}
          />
        ))}
      </LineChart>
    </div>
  );
};
