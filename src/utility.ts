import { Cell } from "./cell";
import p5 from "p5";

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
  p5: p5,
  openSet: Cell[],
  closedSet: Cell[],
  T: Cell
): void {
  p5.noStroke();
  let color;
  let os = openSet.some((cell) => cell._x === T._x && T._y === cell._y);
  if (T._gc) {
    color = "red";
  } else if (os) {
    color = "gray";
  } else if (T._obstacle) {
    color = "yellow";
  }
  T._gc || T._obstacle || os ? p5.fill(color) : p5.noFill();
  p5.circle(T._x + T._w / 2, T._y + T._b / 2, T._w);
}

export function drawPath(vectorArray: p5.Vector[], p5: p5): void {
  p5.stroke("blue");
  p5.strokeWeight(10);
  p5.noFill();
  p5.push();
  p5.beginShape();
  vectorArray.forEach((vector) => p5.vertex(vector.x, vector.y));
  p5.endShape();
}
