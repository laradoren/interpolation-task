const START_POINT = 50;
const END_POINT = 550;
const ALL_CANVAS_SIZE = START_POINT + END_POINT;
const CANVAS_WORKSPACE_SIZE = END_POINT - START_POINT;

const PREDEFINED_INTERPOLATION = {
  "ease": "0.25, 0.1, 0.25, 1",
  "ease-in": "0.42, 0, 1, 1",
  "ease-out": "0, 0, 0.58, 1",
  "ease-in-out": "0.42, 0, 0.58, 1",
  "sine-in-out": "0.45, 0.05, 0.55, 0.95",
  "custom": "0.3, 0.3, 0.7, 0.7"
};

const ITERACTION_TYPE = {
    button: "button",
    drag: "drag",
    input: "input"
};
