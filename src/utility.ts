import P5 from "p5";
import { Cell } from "./cell";

interface Parameters<T> {
  arrayToLoop: T[][];
  callback(T: T): void;
}
export function Loop<T>({ arrayToLoop, callback }: Parameters<T>): void {
  arrayToLoop.forEach((_, r) => {
    arrayToLoop[r].forEach((_, c) => {
      callback(arrayToLoop[r][c]);
    });
  });
}

export function dBTP(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function draw(
  p5: P5,
  openSet: Cell[],
  closedSet: Cell[],
  T: Cell
): void {
  p5.noStroke();
  let color = "white";
  if (T._found) {
    // Blue for the path
    color = "blue";
  } else if (openSet.some((cell) => cell._x === T._x && cell._y === T._y)) {
    color = "green"; // Green for openSet
  } else if (closedSet.some((cell) => cell._x === T._x && cell._y === T._y)) {
    // color = "red"; // Red for closedSet
  } else if (T._obstacle) {
    color = "red";
  } else if (T._gc) {
    color = "purple";
  }
  p5.fill(color);
  p5.circle(T._x + 3, T._y + 3, T._w / 1.5);
}
