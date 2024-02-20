const btn = document.querySelector("#btn");
const clear = document.querySelector("#clear");
const container = document.querySelector("#container");
const rainbowBrush = document.querySelector("#rainbowBrush");

let losowanieKoloru = () => {
  let R = Math.round(Math.random() * 255);
  let G = Math.round(Math.random() * 255);
  let B = Math.round(Math.random() * 255);
  return `rgb(${R},${G},${B})`;
};

let czyRainbow = 0;

rainbowBrush.addEventListener("click", () => {
  czyRainbow = czyRainbow === 0 ? 1 : 0;
  czyRainbow === 0
    ? (rainbowBrush.innerText = "Rainbow brush OFF")
    : (rainbowBrush.innerText = "Rainbow brush ON");
});

btn.addEventListener("click", function () {
  try {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    const containerStyle = window.getComputedStyle(container);
    const containerWidth = parseInt(containerStyle.getPropertyValue("width"));
    let userGrid = parseInt(prompt("Grid size 1-100"));
    if (Number.isInteger(userGrid) && userGrid >= 1 && userGrid <= 100) {
      for (let i = 0; i < userGrid ** 2; i++) {
        let grid = document.createElement("div");
        grid.classList.add("hover");
        grid.setAttribute("draggable", false);
        let size = containerWidth / userGrid;
        grid.style.cssText = `width:${size}px; height:${size}px`;
        container.appendChild(grid);
      }
    } else {
      throw new Error("Invalid grid size");
    }
  } catch (e) {
    alert(e);
  }
});

let isMouseDown = false;

container.addEventListener("mousedown", function (event) {
  isMouseDown = true;
  if (isMouseDown && event.target.classList.contains("hover")) {
    if (czyRainbow === 0) {
      event.target.style.backgroundColor = "black";
    } else {
      event.target.style.backgroundColor = losowanieKoloru();
    }
  }
  event.preventDefault();
});

container.addEventListener("mouseup", function () {
  isMouseDown = false;
});

container.addEventListener("mousemove", function (event) {
  if (isMouseDown && event.target.classList.contains("hover")) {
    if (czyRainbow === 0) {
      event.target.style.backgroundColor = "black";
    } else {
      event.target.style.backgroundColor = losowanieKoloru();
    }
  }
  event.preventDefault();
});

container.addEventListener("mouseleave", function () {
  isMouseDown = false;
});

clear.addEventListener("click", function () {
  try {
    let divs = document.querySelectorAll(".hover");
    divs.forEach((div) => {
      div.style.backgroundColor = "white";
    });
  } catch (e) {
    alert(e);
  }
});
