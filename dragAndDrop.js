// get canvas related references
const BB = canvas.getBoundingClientRect();
const offsetX = BB.left;
const offsetY = BB.top;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

let currentCurveParameters = {};
let shapes = [];

const setCurrentCurve = (start, cp1, cp2, end) => {
  currentCurveParameters.start = start;
  currentCurveParameters.controlPoint1 = cp1;
  currentCurveParameters.controlPoint2 = cp2;
  currentCurveParameters.end = end;
  shapes.push({...currentCurveParameters.controlPoint1, isDragging: false, r: 10});
  shapes.push({...currentCurveParameters.controlPoint2, isDragging: false, r: 10});
};
// drag related variables
let dragok = false;
let startX;
let startY;

// an array of objects that define different shapes

// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// draw a single rect
function circle(c) {
  ctx.fillStyle = "#64A6BD";
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function drawControlPoints() {
  setCurrentCurve(currentCurveParameters.start, shapes[0], shapes[1], currentCurveParameters.end);
  redrawCurve();
  // need to fix this probably
  circle(shapes[shapes.length-1]);
  circle(shapes[shapes.length-2]);
}

// handle mousedown events
function myDown(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // get the current mouse position
  const mx = parseInt(e.clientX - offsetX);
  const my = parseInt(e.clientY - offsetY);

  // test each shape to see if mouse is inside
  dragok = false;
  for (let i = 0; i < shapes.length; i++) {
    var s = shapes[i];
    const dx = s.x - mx;
    const dy = s.y - my;

    // test if the mouse is inside this circle
    if (!dragok && dx * dx + dy * dy < s.r * s.r) {
      dragok = true;
      s.isDragging = true;
    }
  }
  // save the current mouse position
  startX = mx;
  startY = my;
}

// handle mouseup events
function myUp(e) {
  // tell the browser we're handling this mouse event
  e.preventDefault();
  e.stopPropagation();

  // clear all the dragging flags
  dragok = false;
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].isDragging = false;
  }
}

// handle mouse moves
function myMove(e) {
  // if we're dragging anything...
  if (dragok) {
    console.log("here");
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    const mx = parseInt(e.clientX - offsetX);
    const my = parseInt(e.clientY - offsetY);

    // calculate the distance the mouse has moved
    // since the last mousemove
    const dx = mx - startX;
    const dy = my - startY;

    // move each rect that isDragging
    // by the distance the mouse has moved
    // since the last mousemove
    for (let i = 0; i < shapes.length; i++) {

      const s = shapes[i];
      if (s.isDragging) {
        s.x += dx;
        s.y += dy;
      }
    }

    // redraw the scene with the new rect positions
    drawControlPoints();

    // reset the starting mouse position for the next mousemove
    startX = mx;
    startY = my;
    console.log(offsetX);
    console.log(BB);
  }
}
