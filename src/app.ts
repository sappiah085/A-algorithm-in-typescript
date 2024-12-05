import P5 from "p5";
import "p5/lib/addons/p5.dom";
import { Matrix } from "./matrix";
import { draw, Loop } from "./utility";
import { AStar } from "./A_Star";
// import "p5/lib/addons/p5.sound";
let w = 1000,
  h = 1000,
  r = 70,
  c = 70;

const sketch = (p5: P5) => {
  const matrix = new Matrix(r, c);
  const mat = matrix.createMatrix(w / c, h / r).findNeighbors();
  let start = mat[0][c-1];
  let end = mat[65][35];
  start._obstacle = false;
  end._obstacle = false;
  end._gc = true;
  const search = new AStar(start, end);
  let run = true;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.background('black');
  };

  p5.draw = () => {
    if (!run) return;
    run = search.Search();
    Loop({
      arrayToLoop: mat,
      callback: (T) => draw(p5, search._openSet, search._closedSet, T),
    });
  };
};

new P5(sketch);
