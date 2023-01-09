// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const drawCanvasGrid = () => {
    for(let i = 5; i >= 0; i--) {
        //draw horizontal grid lines
        ctx.beginPath();
        ctx.moveTo(0, 50 + i*100);
        ctx.lineTo(ALL_CANVAS_SIZE, 50+i*100);
        ctx.strokeStyle = "#90A8C3";
        ctx.lineWidth = 0.5;
        ctx.stroke();
        //draw vertical grid lines
        ctx.beginPath();
        ctx.moveTo(50 + i*100, 0);
        ctx.lineTo(50 + i*100, ALL_CANVAS_SIZE);
        ctx.strokeStyle = "#90A8C3";
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
}

const drawBezie = (start, cp1, cp2, end) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.strokeStyle = "#ADA7C9";
    ctx.lineWidth = 3;
    ctx.stroke();
}

const drawControlPoint = (start, point, index) => {
    let controlPoint = shapes[index];
    controlPoint.x = point.x;
    controlPoint.y = point.y;
    ctx.fillStyle = "#64A6BD";
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(point.x, point.y); 
    ctx.strokeStyle = "#64A6BD";
    ctx.lineWidth = 1;
    ctx.stroke();
}

const drawStartEndPoints = (start, end) => {
    ctx.fillStyle = "#ADA7C9";
    ctx.beginPath();
    ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI); // Start point
    ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI); // End point
    ctx.fillStyle = "#ADA7C9";
    ctx.fill();
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, ALL_CANVAS_SIZE, ALL_CANVAS_SIZE);
    drawCanvasGrid();
}

const redrawCurve = () => {
    let {start, controlPoint1, controlPoint2, end } = currentCurveParameters;
    clearCanvas();
    drawBezie(start, controlPoint1, controlPoint2, end);
    drawControlPoint(start, controlPoint1, 0);
    drawControlPoint(end, controlPoint2, 1);
    drawStartEndPoints(start, end);
}
