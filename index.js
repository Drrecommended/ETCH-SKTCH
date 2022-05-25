const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset-btn");
const penColor = document.querySelector(".input-color");
const gridInput = document.querySelector("#grid-input")


let isDrawing = false;
let enableDeleteBtn = false;
let COLOR_CHOICE = "black"
let GRID_SIZE = 100



//function to create custom grid
const createGrid = (rows, cols) => {
  //Access the container and set css custom property to the givin rows and cols from the input
  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  container.onmousedown = enableDraw;
  for (let c = 0; c < rows * cols; c++) {
    const cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    const cells = document.querySelectorAll(".grid-item");
    cells[c].onmouseenter = togglePen;
  }
  container.onmouseup = stopDrawing;
};

const setGridSize = (e) => {
  GRID_SIZE = e.target.value

}

const enableDraw = (e) => {
  isDrawing = true;
  if (e.target !== container.firstElementChild) {
    togglePen(e);
  }
};

const togglePen = (e) => {
  if (isDrawing === false) {
    e.target.style.cursor = "default";
    return;
  }
  // if (e.target.classList.contains("active")) return;
  e.target.style.cursor = "crosshair";
  e.target.classList.add('active')
  if(e.target.classList.contains('active')) {
    
    e.target.style.backgroundColor = COLOR_CHOICE
  }
};

const stopDrawing = (e) => {
  isDrawing = false;
};

const clearGrid = () => {
  const cells = document.querySelectorAll(".grid-item");
  for (let cell of cells) {
    if (cell.classList.contains("active")) {
      cell.classList.remove('active')
      cell.style.backgroundColor = 'white'
    }
  }
  gridInput.value = GRID_SIZE
}

const setColor = (e) => {
  COLOR_CHOICE = e.target.value
}

createGrid(GRID_SIZE, GRID_SIZE);

resetBtn.addEventListener("click", clearGrid);
penColor.addEventListener("change", setColor)
gridInput.addEventListener("change", setGridSize)
