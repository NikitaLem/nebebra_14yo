export class CellModel {
  id: number = Math.random();
  x: number;
  y: number;
  isBomb: boolean;
  isOpen: boolean = false;
  isFlag: boolean = false;
  bombsAround: number = 0;

  constructor(x: number, y: number, isBomb = false) {
    this.x = x;
    this.y = y;
    this.isBomb = isBomb;
  }
}
