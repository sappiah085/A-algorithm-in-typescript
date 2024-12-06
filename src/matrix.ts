import { Cell } from "./cell";

export class Matrix {
  _matrix: Cell[][];
  _r: number;
  _c: number;
  _n_obstacles: number;
  constructor(r: number, c: number, n_obstacles) {
    this._r = r;
    this._c = c;
    this._n_obstacles = n_obstacles;
    this._matrix = new Array(this._r);
    for (let i = 0; i < r; i++) {
      this._matrix[i] = new Array(c);
    }
  }

  createMatrix(w: number, h: number): this {
    for (let r = 0; r < this._matrix.length; r++) {
      for (let c = 0; c < this._matrix[r].length; c++) {
        let cell = new Cell(c * w, r * h, w, h);
        if (Math.random() < this._n_obstacles) {
          cell._obstacle = true;
        }
        this._matrix[r][c] = cell;
      }
    }
    return this;
  }

  findNeighbors(): Cell[][] {
    this._matrix.forEach((_, r) => {
      this._matrix[r].forEach((_, c) => {
        let cl = this._matrix[r].length;
        let rl = this._matrix.length;
        //left
        c - 1 >= 0 &&
          this._matrix[r][c]._neighbors.push(this._matrix[r][c - 1]);
        //right
        c + 1 < this._matrix[r].length &&
          this._matrix[r][c]._neighbors.push(this._matrix[r][c + 1]);
        //top
        r - 1 >= 0 &&
          this._matrix[r][c]._neighbors.push(this._matrix[r - 1][c]);
        //bottom
        r + 1 < rl &&
          this._matrix[r][c]._neighbors.push(this._matrix[r + 1][c]);
        //bottom-left
        c - 1 >= 0 &&
          r + 1 < rl &&
          this._matrix[r][c]._neighbors.push(this._matrix[r + 1][c - 1]);
        // bottom right
        c + 1 < cl &&
          r + 1 < rl &&
          this._matrix[r][c]._neighbors.push(this._matrix[r + 1][c + 1]);
        // top left
        c - 1 >= 0 &&
          r - 1 >= 0 &&
          this._matrix[r][c]._neighbors.push(this._matrix[r - 1][c - 1]);
        // top right
        c + 1 < cl &&
          r - 1 >= 0 &&
          this._matrix[r][c]._neighbors.push(this._matrix[r - 1][c + 1]);
      });
    });
    return this._matrix;
  }
}
