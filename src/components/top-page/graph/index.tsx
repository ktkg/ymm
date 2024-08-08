import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import palette from "google-palette";
import { useMediaQuery, useWindowSize } from "usehooks-ts";

import styles from "./index.module.css";
import { usePopulation } from "./index.hook";
import { useTypeSelect } from "./type-select/index.hook";

import { createPopulationList } from "@/model/population.model";
import { PrefectureModel } from "@/model/prefecture.model";

type Props = {
  prefectures: PrefectureModel[];
  selectedPrefCodes: PrefectureModel["prefCode"][];
};

export const Graph = ({ prefectures, selectedPrefCodes }: Props) => {
  const { data, error } = usePopulation(selectedPrefCodes);
  const { selectedPopulationType, render: renderTypeSelect } = useTypeSelect();
  const { height } = useWindowSize();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (error) throw error;

  const populationList = !data ? [] : createPopulationList(data);

  const colors = palette("mpn65", populationList.length).map((color: string) => `#${color}`);

  return (
    <div className={styles.wrapper}>
      {renderTypeSelect()}

      <ResponsiveContainer width="90%" height={isMobile ? height * 0.5 : height - 100}>
        <LineChart width={730} height={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            height={50}
            dataKey="year"
            allowDuplicatedCategory={false}
            label={{ value: "（年）", position: "insideBottomRight" }}
          />
          <YAxis
            label={{
              value: "（万人）",
              position: "insideTopLeft",
              dy: 20,
              dx: -10,
            }}
          />
          <Tooltip formatter={(value) => value.toLocaleString("ja-jp")} />
          <Legend />
          {populationList.map(({ prefCode, data, boundaryYear }, index) => {
            const prefName = prefectures.find(
              (prefecture) => prefecture.prefCode === prefCode
            )?.prefName;

            return (
              <>
                <Line
                  key={`${prefCode}-before`}
                  data={data[selectedPopulationType].filter((d) => d.year <= boundaryYear)}
                  type="monotone"
                  dataKey="value"
                  name={prefName}
                  stroke={colors[index]}
                  isAnimationActive={false}
                />
                <Line
                  key={`${prefCode}-after`}
                  data={data[selectedPopulationType].filter((d) => d.year >= boundaryYear)}
                  type="monotone"
                  dataKey="value"
                  name={prefName}
                  dot={false}
                  stroke={colors[index]}
                  strokeDasharray="4 4"
                  legendType="none"
                  isAnimationActive={false}
                />
              </>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
