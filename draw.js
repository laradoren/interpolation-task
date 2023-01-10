// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const drawCanvasGrid = () => {
  for (let i = 5; i >= 0; i--) {
    //draw horizontal grid lines
    ctx.beginPath();
    ctx.moveTo(0, 50 + i * 100);
    ctx.lineTo(ALL_CANVAS_SIZE, 50 + i * 100);
    ctx.strokeStyle = "#90A8C3";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    //draw vertical grid lines
    ctx.beginPath();
    ctx.moveTo(50 + i * 100, 0);
    ctx.lineTo(50 + i * 100, ALL_CANVAS_SIZE);
    ctx.strokeStyle = "#90A8C3";
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
};

const drawBezie = (start, cp1, cp2, end) => {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
  ctx.stroke();
  ctx.strokeStyle = "#605A73";
  ctx.lineWidth = 3;
  ctx.stroke();
};

function circle(c) {
  ctx.fillStyle = "#64A6BD";
  ctx.beginPath();
  ctx.arc(c.x, c.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
}

const drawControlPointLine = (start, point) => {
  ctx.fillStyle = "#64A6BD";
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(point.x, point.y);
  ctx.strokeStyle = "#64A6BD";
  ctx.lineWidth = 1;
  ctx.stroke();
  circle(point);
};

const drawStartEndPoints = (start, end) => {
  ctx.fillStyle = "#605A73";
  ctx.beginPath();
  ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
  ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#605A73";
  ctx.fill();
};

const drawControlPoints = (start, cp1, cp2, end) => {
  drawControlPointLine(start, cp1);
  drawControlPointLine(end, cp2);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, ALL_CANVAS_SIZE, ALL_CANVAS_SIZE);
  drawCanvasGrid();
};

const redrawCurve = (start, cp1, cp2, end) => {
  clearCanvas();
  drawBezie(start, cp1, cp2, end);
  drawControlPoints(start, cp1, cp2, end);
  drawStartEndPoints(start, end);
};
