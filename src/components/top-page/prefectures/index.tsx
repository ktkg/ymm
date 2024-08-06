import styles from "./index.module.css";

import { PrefectureModel } from "@/model/prefecture.model";

type Props = {
  prefectures: PrefectureModel[];
  selectedPrefCodes: PrefectureModel["prefCode"][];
  onClickCheckbox: (prefecture: PrefectureModel["prefCode"]) => void;
};

export const Prefectures = ({
  prefectures,
  selectedPrefCodes,
  onClickCheckbox: handleClickCheckbox,
}: Props) => (
  <div>
    <h2>都道府県</h2>
    <ul>
      {prefectures.map(({ prefCode, prefName }) => (
        <li className={styles.item} key={prefCode}>
          <input
            type="checkbox"
            checked={selectedPrefCodes.includes(prefCode)}
            onChange={() => handleClickCheckbox(prefCode)}
          />
          <label>{prefName}</label>
        </li>
      ))}
    </ul>
  </div>
);
