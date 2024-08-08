import styles from "./index.module.css";

import { PopulationType, populationType } from "@/model/population.model";

type Props = {
  selectedPopulationType: PopulationType;
  onClickChange: (populationType: PopulationType) => void;
};

export const TypeSelect = ({ selectedPopulationType, onClickChange: handleClickChange }: Props) => (
  <div className={styles.wrapper}>
    <label htmlFor="population-type">種別</label>
    <select
      className={styles.select}
      id="population-type"
      value={selectedPopulationType}
      onChange={(event) => handleClickChange(event.target.value as PopulationType)}
    >
      {populationType.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  </div>
);
