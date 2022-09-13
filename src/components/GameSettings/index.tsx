import React, { memo } from "react";
import { useForm } from "../../hooks";

import s from "./styles.module.scss";

export interface IGameSettings {
  sizeX: number;
  sizeY: number;
  bombsCount: number;
}

interface IProps {
  onSubmit: (values: IGameSettings) => void;
}

const GameSettings: React.FC<IProps> = ({ onSubmit }) => {
  const [values, handleChange] = useForm<IGameSettings>(
    {
      sizeX: 12,
      sizeY: 12,
      bombsCount: 20,
    },
    (v) => Number(v)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={s.gameSettings} onSubmit={handleSubmit}>
      <input
        type="number"
        name="sizeX"
        value={values.sizeX}
        onChange={handleChange}
      />
      <input
        type="number"
        name="sizeY"
        value={values.sizeY}
        onChange={handleChange}
      />
      <input
        type="number"
        name="bombsCount"
        value={values.bombsCount}
        onChange={handleChange}
      />
      <button type="submit">Применить</button>
    </form>
  );
};

export default memo(GameSettings);
