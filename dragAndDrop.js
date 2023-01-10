const BB = canvas.getBoundingClientRect();
const offsetX = BB.left;
const offsetY = BB.top;

let currentCurveParameters = {};
let controlPoints = [];
let isDraggingStart = false;
let startX;
let startY;

const setCurrentCurve = (start, cp1, cp2, end) => {
  currentCurveParameters.start = start;
  currentCurveParameters.controlPoint1 = cp1;
  currentCurveParameters.controlPoint2 = cp2;
  currentCurveParameters.end = end;
  controlPoints = [cp1, cp2];
};

function changeCurveAfterDragging(changedPoints) {
  let { start, end } = currentCurveParameters;
  let [controlPoint1, controlPoint2] = changedPoints;
  setCurrentCurve(start, controlPoint1, controlPoint2, end);
  setInputValue([controlPoint1, controlPoint2]);
  redrawCurve(start, controlPoint1, controlPoint2, end);
}

canvas.onmousedown = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const mx = parseInt(e.clientX - offsetX);
  const my = parseInt(e.clientY - offsetY);

  isDraggingStart = false;
  controlPoints.forEach((controlPoint) => {
    const dx = controlPoint.x - mx;
    const dy = controlPoint.y - my;
    if (
      !isDraggingStart &&
      dx * dx + dy * dy < CONTROL_POINT_RADIUS * CONTROL_POINT_RADIUS
    ) {
      isDraggingStart = true;
      controlPoint.isDragging = true;
    }
  });
  startX = mx;
  startY = my;
};

canvas.onmouseup = (e) => {
  e.preventDefault();
  e.stopPropagation();

  isDraggingStart = false;
  controlPoints.forEach(controlPoint => {
    controlPoint.isDragging = false;
  });
};

canvas.onmousemove = (e) => {
  if (isDraggingStart) {
    e.preventDefault();
    e.stopPropagation();

    const mx = parseInt(e.clientX - offsetX);
    const my = parseInt(e.clientY - offsetY);

    const dx = mx - startX;
    const dy = my - startY;

    controlPoints.map((controlPoint) => {
      if (controlPoint.isDragging) {
        controlPoint.x += dx;
        controlPoint.y += dy;
      }
    });

    changeCurveAfterDragging(controlPoints);
    setActiveButton("custom");

    startX = mx;
    startY = my;
  }
};
