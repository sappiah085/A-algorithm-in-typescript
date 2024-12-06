import { dBTP } from "./utility";
export class Cell {
  _x: number;
  _y: number;
  _g: number;
  _w: number;
  _b: number;
  _obstacle: boolean;
  _neighbors: this[];
  _parent: this;
  _f: number;
  _h: number;
  _gc: boolean;
  constructor(x: number, y: number, w: number, b: number) {
    this._x = x;
    this._y = y;
    this._w = w;
    this._b = b;
    this._g = 0;
    this._obstacle = false;
    this._neighbors = [];
    this._h = 0;
    this._f = 0;
    this._gc = false;
  }
  calcF(goal: this): number {
    this._h = dBTP(goal._x, goal._y, this._x, this._y);
    this._f = this._g + this._h;
    return this._f;
  }
  calcH(goal: this): number {
    this._h = dBTP(goal._x, goal._y, this._x, this._y);
    return this._h;
  }
}
