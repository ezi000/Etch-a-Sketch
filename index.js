const btn = document.querySelector("#btn");
const clear = document.querySelector("#clear");
const container = document.querySelector("#container");

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
      container.classList.add("border");
    } else {
      throw new Error("Invalid grid size");
    }
  } catch (e) {
    alert(e);
  }
});

let isMouseDown = false;

container.addEventListener("mousedown", function (event) {
  if (event.target.classList.contains("hover")) {
    isMouseDown = true;
    event.target.classList.add("color");
    event.preventDefault();
  }
});
//halooo

container.addEventListener("mouseup", function () {
  isMouseDown = false;
});

container.addEventListener("mousemove", function (event) {
  if (isMouseDown && event.target.classList.contains("hover")) {
    event.target.classList.add("color");
  }
  event.preventDefault();
});

container.addEventListener("mouseleave", function () {
  isMouseDown = false;
});

clear.addEventListener("click", function () {
  try {
    let divs = document.querySelectorAll(".color");
    divs.forEach((div) => {
      div.classList.remove("color");
    });
  } catch (e) {
    alert(e);
  }
});
