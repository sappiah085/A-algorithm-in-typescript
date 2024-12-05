import { Cell } from "./cell";
import { dBTP } from "./utility";

export class AStar {
  _openSet: Cell[];
  _closedSet: Cell[];
  _goal: Cell;
  _start: Cell;
  constructor(start: Cell, goal: Cell) {
    this._goal = goal;
    this._start = start;
    this._openSet = [];
    this._closedSet = [];
    this._openSet.push(this._start);
  }
  Search(): boolean {
    let f = Infinity,
      q = 0;
    let continueNeighbor = true;
    if (
      this._openSet.length === 0 ||
      this._start._neighbors.every((n) => n._obstacle)
    ) {
      console.log("not found");
      return false;
    }
    this._openSet.forEach((cell, i) => {
      if (cell.calcH(this._goal) < f && !cell._obstacle) {
        f = cell.calcH(this._goal);
        q = i;
      } else {
        this._openSet.splice(i, 1);
        continueNeighbor = false;
      }
    });
    if (continueNeighbor) {
      let removeItem = this._openSet.splice(q, 1)[0];
      this._closedSet.push(removeItem);
      removeItem._neighbors.forEach((neighbor) => {
        if (
          this._closedSet.some(
            (n) => n._x === neighbor._x && n._y === neighbor._y
          )
        )
          return;

        let newG =
          neighbor._g +
          dBTP(neighbor._x, neighbor._y, removeItem._x, removeItem._y);
        if (
          !this._openSet.some(
            (n) => n._x === neighbor._x && n._y === neighbor._y
          ) ||
          newG < neighbor._g
        ) {
          neighbor._parent = removeItem;
          neighbor._g = newG;
          neighbor.calcF(this._goal);
          if (
            !this._openSet.some(
              (n) => n._x === neighbor._x && n._y === neighbor._y
            )
          ) {
            this._openSet.push(neighbor);
          }
        }
      });
      if (removeItem._x === this._goal._x && removeItem._y === this._goal._y) {
        console.log("Found");
        this.tracePath(removeItem);
        return false;
      }
    }
    return true;
  }

  tracePath(p: Cell): void {
    p._found = true;
    let loop = p._parent;
    while (loop) {
      loop._found = true;
      loop = loop._parent;
    }
  }
}
