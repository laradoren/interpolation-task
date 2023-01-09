const definedPoints = (iteractionType, values) => {
  let points = [];
  switch (iteractionType) {
    case ITERACTION_TYPE.button:
      points = values.split(",");
      break;
    case ITERACTION_TYPE.input:
      break;
    case ITERACTION_TYPE.drag:
      break;
    default:
      break;
  }

  let start = { x: START_POINT, y: END_POINT };
  let cp1 = {
    x: START_POINT + 500 * points[0],
    y: END_POINT - 500 * points[1],
  };
  let cp2 = {
    x: START_POINT + 500 * points[2],
    y: END_POINT - 500 * points[3],
  };
  let end = { x: END_POINT, y: START_POINT };
  return { start, cp1, cp2, end };
};

const renderButtons = () => {
  const actionBar = document.getElementById("actionBar");
  Object.keys(PREDEFINED_INTERPOLATION).map((item) => {
    const button = document.createElement("button");
    button.innerText = item;
    button.id = item;
    let { start, cp1, cp2, end } = definedPoints(
      ITERACTION_TYPE.button,
      PREDEFINED_INTERPOLATION[item]
    );
    button.onclick = () => changeBezieCurve(start, cp1, cp2, end);
    actionBar.appendChild(button);
  });
};

const changeBezieCurve = (start, cp1, cp2, end) => {
  clearCanvas();
  setCurrentCurve(start, cp1, cp2, end);
  drawBezie(start, cp1, cp2, end);
  drawControlPoint(start, cp1, 0);
  drawControlPoint(end, cp2, 1);
  drawControlPoints();
  drawStartEndPoints(start, end);
};

const main = () => {
  renderButtons();
  let input = document.getElementById("input");
//   input.onchange = (e) => {
//     console.log(e.target.value);
//     let { start, cp1, cp2, end } = definedPoints(
//         ITERACTION_TYPE.button,
//         e.target.value
//       );
//     setCurrentCurve(currentCurveParameters.start, )
//   }
  drawCanvasGrid();
};

main();
