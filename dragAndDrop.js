const BB = canvas.getBoundingClientRect();
const offsetX = BB.left;
const offsetY = BB.top;

let currentCurveParameters = {};
let shapes = [];
let dragok = false;
let startX;
let startY;

const setCurrentCurve = (start, cp1, cp2, end) => {
  currentCurveParameters.start = start;
  currentCurveParameters.controlPoint1 = cp1;
  currentCurveParameters.controlPoint2 = cp2;
  currentCurveParameters.end = end;
  shapes = [cp1, cp2];
};

function changeCurveAfterDragging(changedShapes) {
  let { start, end } = currentCurveParameters;
  setCurrentCurve(start, changedShapes[0], changedShapes[1], end);
  setInputValue([changedShapes[0], changedShapes[1]]);
  redrawCurve(start, changedShapes[0], changedShapes[1], end);
}

canvas.onmousedown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const mx = parseInt(e.clientX - offsetX);
  const my = parseInt(e.clientY - offsetY);

  dragok = false;
  for (let i = 0; i < shapes.length; i++) {
    var s = shapes[i];
    const dx = s.x - mx;
    const dy = s.y - my;
    if (
      !dragok &&
      dx * dx + dy * dy < CONTROL_POINT_RADIUS * CONTROL_POINT_RADIUS
    ) {
      dragok = true;
      s.isDragging = true;
    }
  }
  startX = mx;
  startY = my;
};

canvas.onmouseup = (e) => {
  e.preventDefault();
  e.stopPropagation();

  dragok = false;
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].isDragging = false;
  }
};

canvas.onmousemove = (e) => {
  if (dragok) {
    e.preventDefault();
    e.stopPropagation();

    const mx = parseInt(e.clientX - offsetX);
    const my = parseInt(e.clientY - offsetY);

    const dx = mx - startX;
    const dy = my - startY;

    shapes.map((shape) => {
      if (shape.isDragging) {
        shape.x += dx;
        shape.y += dy;
      }
    });

    changeCurveAfterDragging(shapes);
    setActiveButton("custom");

    startX = mx;
    startY = my;
  }
};
