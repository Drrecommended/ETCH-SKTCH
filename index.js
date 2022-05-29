const openModalBtn = document.getElementById("modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const overlay = document.getElementById("overlay");
const randomColor = document.getElementById("checkbox");
const container = document.querySelector(".container");
const resetBtn = document.querySelector(".reset-btn");
const penColor = document.querySelector(".input-color");
const gridInput = document.getElementById("grid-input");


//Initial state
let isDrawing = false;
let COLOR_CHOICE = "black";
let GRID_SIZE = 16;

//open the settings modal
const openModal = (modal) => {
  if (modal == null) return;
  modal.classList.add("active-modal");
  overlay.classList.add("active-overlay");
};

//close the settings modal
const closeModal = (modal) => {
  if (modal == null) return;
  modal.classList.remove("active-modal");
  overlay.classList.remove("active-overlay");
};

//function to create custom grid
const createGrid = (gridSize) => {
  //Access the container and set css custom property to the givin rows and cols from the input
  container.style.setProperty("--grid-rows", gridSize);
  container.style.setProperty("--grid-cols", gridSize);
  container.onmousedown = enableDraw;
  for (let c = 0; c < gridSize * gridSize; c++) {
    const cell = document.createElement("div");
    container.appendChild(cell).className = "grid-item";
    const cells = document.querySelectorAll(".grid-item");
    cells[c].onmouseenter = togglePen;
  }
  container.onmouseup = stopDrawing;
};

//Set the grid size and clear the old one
const setGridSize = (e) => {
  GRID_SIZE = e.target.value;
  container.textContent = "";
  createGrid(GRID_SIZE);
};

//Enable draw mode
const enableDraw = (e) => {
  isDrawing = true;
  if (e.target != container.firstElementChild) {
    togglePen(e);
  }
};

//Function to toggle the pen
const togglePen = (e) => {
  if (isDrawing === false) {
    e.target.style.cursor = "default";
    return;
  }
  e.target.style.cursor = "crosshair";
  e.target.classList.add("active");
  if (e.target.classList.contains("active") && randomColor.checked == true) {
    e.target.style.backgroundColor = randColor();
  } else if (e.target.classList.contains("active")) {
    e.target.style.backgroundColor = COLOR_CHOICE;
  }
};

//function to stop drawing
const stopDrawing = (e) => {
  isDrawing = false;
};


//Clear the grid
const clearGrid = () => {
  const cells = document.querySelectorAll(".grid-item");
  for (let cell of cells) {
    if (cell.classList.contains("active")) {
      cell.classList.remove("active");
      cell.style.backgroundColor = "white";
    }
  }
  gridInput.value = GRID_SIZE;
};


//Set the color
const setColor = (e) => {
  COLOR_CHOICE = e.target.value;
};

//I did not write this function but it is a short hand way of getting a random HEX color
const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};


//Event listeners
openModalBtn.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  openModal(modal);
});

closeModalBtn.addEventListener("click", () => {
  const modal = closeModalBtn.closest(".modal");
  closeModal(modal);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(".modal.active-modal");
  closeModal(modal);
});

resetBtn.addEventListener("click", clearGrid);
penColor.addEventListener("change", setColor);
gridInput.addEventListener("change", setGridSize);


//on load create the grid
window.onload = createGrid(GRID_SIZE);
