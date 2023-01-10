const runButton = document.getElementById("runButton");
let isAnimationRun = false;

runButton.onclick = () => {
  if (isAnimationRun) {
    return;
  } else {
    isAnimationRun = true;
  }
  let { start, end, controlPoint1, controlPoint2 } = currentCurveParameters;
  let p0 = start;
  let p1 = controlPoint1;
  let p2 = controlPoint2;
  let p3 = end;
  let ball = { x: 0, y: 0, speed: 0.01, t: 0 };
  let points = new Array();
  let animationInProsess = setInterval(drawScreen, 33);

  function drawScreen() {
    clearCanvas();

    var t = ball.t;

    var cx = 3 * (p1.x - p0.x);
    var bx = 3 * (p2.x - p1.x) - cx;
    var ax = p3.x - p0.x - cx - bx;

    var cy = 3 * (p1.y - p0.y);
    var by = 3 * (p2.y - p1.y) - cy;
    var ay = p3.y - p0.y - cy - by;

    var xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x;
    var yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y;

    ball.t += ball.speed;

    if (ball.t > 1) {
      ball.t = 1;
    }

    points.push({ x: xt, y: yt });

    points.forEach(point => {
        ctx.fillRect(point.x, point.y, 1, 1);
        if (point.x === end.x && point.y === end.y) {
          isAnimationRun = false;
        }
    });

    ctx.closePath();

    ctx.fillStyle = "#605A73";
    ctx.beginPath();
    ctx.arc(xt, yt, 5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    if(!isAnimationRun) {
        clearInterval(animationInProsess);
        clearCanvas();
        changeBezieCurve(start, controlPoint1, controlPoint2, end);
    }
  }
};
