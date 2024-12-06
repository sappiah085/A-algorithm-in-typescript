import P5 from "p5";
import "p5/lib/addons/p5.dom";
import { Matrix } from "./matrix";
import { draw, Loop } from "./utility";
import { AStar } from "./A_Star";
// import "p5/lib/addons/p5.sound";
let w = 1000,
  h = 1000,
  r = 80,
  c = 80;

const sketch = (p5: P5) => {
  const matrix = new Matrix(r, c, 0.51);
  const mat = matrix.createMatrix(w / c, h / r).findNeighbors();
  let start = mat[6][31];
  let end = mat[75][51];
  start._obstacle = false;
  end._obstacle = false;
  end._gc = true;
  start._gc = true;
  let search = new AStar(start, end);
  let run = true;

  p5.setup = () => {
    p5.createCanvas(w, h);
    p5.background("black");
  };

  p5.draw = () => {
    if (!run) return;
    run = search.Search(p5);
    Loop({
      arrayToLoop: mat,
      callback: (T) => draw(p5, search._openSet, search._closedSet, T),
    });
  };

  p5.mousePressed = (e: MouseEvent) => {
    p5.clear();
    run = false;
    let x = Math.floor(p5.map(e.x, 0, w, 0, c - 1));
    let y = Math.floor(p5.map(e.y, 0, h, 0, r - 1));
    let yes = prompt("Is it start");

    if (yes.trim().toLowerCase() == "y") {
      start._gc = false;
      start = mat[y][x];
      start._obstacle = false;
    } else {
      end._gc = false;
      end = mat[y][x];
      end._obstacle = false;
    }
    search = new AStar(start, end);
    start._gc = true;
    end._gc = true;
    run = true;
  };
};

new P5(sketch);
