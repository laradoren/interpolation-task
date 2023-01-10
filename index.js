const input = document.getElementById("input");
const actionBar = document.getElementById("actionBar");
let activeButton = document.getElementById("custom");
const copyButton = document.getElementById("copyButton");

copyButton.onclick = () => {
  input.select();
  navigator.clipboard.writeText(input.value);
};

input.onchange = (e) => {
  let { isValid: isInputValid, points } = validateInput(e.target.value);
  if (isInputValid) {
    let { start, cp1, cp2, end } = definedPoints(points);
    changeBezieCurve(start, cp1, cp2, end, "custom");
  }
  e.target.value = points;
};

const validateInput = (userInput) => {
  let isValid = true;
  let inputedPoints = userInput.split(",");
  if (inputedPoints.length < 4) return { isValid: false, points: "" };

  let points = inputedPoints.map((point) => {
    let trimedPoint = point.trim();
    if (!trimedPoint) isValid = false;

    let parsedPoint = parseFloat(trimedPoint);
    if (!parsedPoint && parsedPoint !== 0.0) isValid = false;

    if (parsedPoint > 1.1) parsedPoint = "1.1";
    if (parsedPoint < -0.1) parsedPoint = "-0.1";

    let pointToString = parsedPoint.toString();
    if (!pointToString.includes(".")) pointToString += ".0";

    return isValid ? pointToString : "0.0";
  });

  return { isValid, points: points.join(", ") };
};

const setInputValue = (points) => {
  let pointsString = points.map((point) => {
    let x = (point.x - START_POINT) / CANVAS_WORKSPACE_SIZE;
    let y = (END_POINT - point.y) / CANVAS_WORKSPACE_SIZE;
    return x + ", " + y;
  });
  input.value = pointsString.join(", ");
};

const setActiveButton = (buttonId) => {
  if (activeButton) {
    activeButton.classList.remove("active");
  }
  activeButton = document.getElementById(buttonId);
  activeButton.classList.add("active");
};

const definedPoints = (values) => {
  let points = values.split(",");

  let start = { x: START_POINT, y: END_POINT };
  let cp1 = {
    x: START_POINT + CANVAS_WORKSPACE_SIZE * points[0],
    y: END_POINT - CANVAS_WORKSPACE_SIZE * points[1],
  };
  let cp2 = {
    x: START_POINT + CANVAS_WORKSPACE_SIZE * points[2],
    y: END_POINT - CANVAS_WORKSPACE_SIZE * points[3],
  };
  let end = { x: END_POINT, y: START_POINT };
  return { start, cp1, cp2, end };
};

const renderButtons = () => {
  Object.keys(PREDEFINED_INTERPOLATION).map((item) => {
    const button = document.createElement("button");
    button.innerText = item;
    button.id = item;
    let { start, cp1, cp2, end } = definedPoints(
      PREDEFINED_INTERPOLATION[item]
    );
    button.onclick = () => changeBezieCurve(start, cp1, cp2, end, item);
    actionBar.appendChild(button);
  });
};

const changeBezieCurve = (start, cp1, cp2, end, buttonId = null) => {
  buttonId && setActiveButton(buttonId);
  setInputValue([cp1, cp2]);
  setCurrentCurve(start, cp1, cp2, end);
  redrawCurve(start, cp1, cp2, end);
};

const setCustomCurve = () => {
  let currentCurve = PREDEFINED_INTERPOLATION.custom;
  let { start, cp1, cp2, end } = definedPoints(currentCurve);
  changeBezieCurve(start, cp1, cp2, end, "custom");
};

const main = () => {
  renderButtons();
  drawCanvasGrid();
  setCustomCurve();
};

window.onload = main();
