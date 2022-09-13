import {
  createCombinationsArray,
  getNeighborsCoords,
  getRandomInRange,
} from "../helpers";
import { CellModel } from "./CellModel";

export class PlaygroundModel {
  private _cells: CellModel[][] = [];
  private bombsCoords: [number, number][] = [];
  private _isGameOver: boolean;

  sizeX: number;
  sizeY: number;
  bombsCount: number;
  totalCells: number;

  constructor(sizeX: number, sizeY: number, bombsCount: number = 1) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.bombsCount = bombsCount;
    this._isGameOver = false;
    this.totalCells = sizeX * sizeY;
    this.init();
  }

  get isGameOver() {
    return this._isGameOver;
  }

  get cells(): CellModel[][] {
    return this._cells;
  }

  checkBomb(x: number, y: number) {
    return this.cells[y][x].isBomb;
  }

  checkWin() {
    return (
      this.totalCells - this.bombsCount ===
      this.cells.flat().reduce((acc, cur) => {
        if (cur.isOpen) {
          return ++acc;
        }

        return acc;
      }, 0)
    );
  }

  setFlag(x: number, y: number) {
    this._cells = this._cells.map((r) =>
      r.map((c) => {
        if (c.x === x && c.y === y) {
          const cell = new CellModel(c.x, c.y, c.isBomb);
          cell.bombsAround = c.bombsAround;
          cell.isOpen = c.isOpen;
          cell.isFlag = !c.isFlag;
          return cell;
        } else {
          return c;
        }
      })
    );
  }

  openCell(x: number, y: number) {
    let neibCoords: number[][] = [];
    const bombsCount = this.countBombsAround(x, y);

    this._cells = this._cells.map((r) =>
      r.map((c) => {
        if (c.x === x && c.y === y && !c.isFlag) {
          neibCoords = getNeighborsCoords(c.x, c.y, this.sizeX, this.sizeY);
          const cell = new CellModel(c.x, c.y, c.isBomb);
          cell.bombsAround = bombsCount;
          cell.isOpen = true;
          return cell;
        } else {
          return c;
        }
      })
    );

    neibCoords.forEach(([x0, y0]) => {
      const cell0 = this.cells[y0][x0];
      const cell = this.cells[y][x];

      if (!cell0.isOpen && !cell.isBomb && !cell.bombsAround) {
        this.openCell(x0, y0);
      }
    });
  }

  private countBombsAround(x: number, y: number) {
    const neibCoords = getNeighborsCoords(x, y, this.sizeX, this.sizeY);
    return neibCoords.reduce((t, [x0, y0]) => {
      return this.cells[y0][x0].isBomb ? t + 1 : t;
    }, 0);
  }

  private plantBombs() {
    const freeSpaceArray = createCombinationsArray(this.sizeX, this.sizeY);
    const bombsCoords: [number, number][] = [];

    for (let i = 0; i < this.bombsCount; i++) {
      bombsCoords.push(
        freeSpaceArray.splice(
          getRandomInRange(0, freeSpaceArray.length - 1),
          1
        )[0]
      );
    }

    this.bombsCoords = bombsCoords;
  }

  private shouldPlantBomb(x: number, y: number) {
    return this.bombsCoords.some(([n, m]) => n === x && m === y);
  }

  private init() {
    this.plantBombs();
    const cells: CellModel[][] = [];
    let totalPlantedBombs = 0;

    for (let i = 0; i < this.sizeX; i++) {
      const row: CellModel[] = [];

      for (let j = 0; j < this.sizeY; j++) {
        let isBomb = false;

        if (totalPlantedBombs < this.bombsCount) {
          if (this.shouldPlantBomb(i, j)) {
            isBomb = true;
            totalPlantedBombs++;
          }
        }

        row.push(new CellModel(j, i, isBomb));
      }

      cells.push(row);
    }

    this._cells = cells;
  }
}
