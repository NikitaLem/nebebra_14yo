import React, { memo, useCallback, useEffect, useState } from "react";

import { PlaygroundModel } from "../../model/PlaygroundModel";
import { CellModel } from "../../model/CellModel";

import Cell from "../Cell";
import s from "./styles.module.scss";

interface IProps {
  pg: PlaygroundModel;
  onGameOver: () => void;
  onGameWin: () => void;
}

const Playground: React.FC<IProps> = ({ pg, onGameOver, onGameWin }) => {
  const [cells, setCells] = useState<CellModel[][]>(() => pg.cells);

  useEffect(() => {
    setCells(() => pg.cells);
  }, [pg]);

  const handleClick = useCallback(
    (x: number, y: number) => {
      if (pg.checkBomb(x, y)) {
        onGameOver();
      }

      pg.openCell(x, y);
      setCells(() => pg.cells);

      if (pg.checkWin()) {
        onGameWin();
      }
    },
    [pg]
  );

  const handleRightClick = useCallback(
    (x: number, y: number) => {
      if (!pg.cells[y][x].isOpen) {
        pg.setFlag(x, y);
        setCells(() => pg.cells);
      }
    },
    [pg]
  );

  return (
    <div className={s.playground}>
      {cells.map((c, i) => (
        <div key={i} className={s.row}>
          {c.map((c) => (
            <Cell
              key={c.id}
              data={c}
              onClick={handleClick}
              onContextMenu={handleRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(Playground);
