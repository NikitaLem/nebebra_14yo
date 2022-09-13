import React, { memo } from "react";

import { CellModel } from "../../model/CellModel";

import s from "./styles.module.scss";

interface IProps {
  data: CellModel;
  onClick: (x: number, y: number) => void;
  onContextMenu: (x: number, y: number) => void;
}

const Cell: React.FC<IProps> = ({ data, onClick, onContextMenu }) => {
  const { isBomb, isOpen, isFlag, bombsAround } = data;
  const content = isBomb ? "*" : bombsAround || "";

  const obj = React.useMemo(() => 1, []);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    onContextMenu(data.x, data.y);
  };

  return (
    <div
      className={`${s.cell} ${isOpen && s.cell_open} ${
        isBomb && isOpen && s.cell_death
      }`}
      onClick={() => onClick(data.x, data.y)}
      onContextMenu={handleContextMenu}
    >
      {isOpen && content}
      {isFlag && "F"}
    </div>
  );
};

export default memo(Cell);
