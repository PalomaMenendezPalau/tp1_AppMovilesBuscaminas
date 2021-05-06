document.addEventListener("DOMContentLoaded", () => {
  //variables para tablero
  const grid = document.querySelector(".grid");
  var width = 10;
  var mines = 10;
  var flags = 0;
  var boxes = [];

  //variables de estado de juego.
  var isGameOver = false;

  //creo mi tablero de juego.
  function createGameBoard() {
    // creo los cuadrados que vana a ser minas y los que van a ser nada
    const mineArray = Array(mines).fill("mines");
    const safeBoxArray = Array(width * width - mines).fill("safeBox");

    // mezclo estos 2 arrays para tener como va a quedar las bombas en mi tablero y lo mezclo
    const gameBoardArray = safeBoxArray.concat(mineArray);
    const finalShuffledGBArray = gameBoardArray.sort(() => Math.random() - 0.5);

    // creo Divs dentro de mi div con class grid eL tablero con tamaño previamente definido en width
    for (let i = 0; i < width * width; i++) {
      const box = document.createElement("div");
      box.setAttribute("id", i);
      box.classList.add(finalShuffledGBArray[i]);
      grid.appendChild(box);
      boxes.push(box);

      // click Izquiedo
      box.addEventListener("click", function (e) {
        click(box);
      });
      // click derecho
      document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        addFlag(box);
      });
    }

    // Agregar numeros a los cuadrados cercanos a las minas.
    //Teniendo en cuenta que los cuadrados que estan en los bordes no sumen doble.
    for (let i = 0; i < boxes.length; i++) {
      var total = 0;
      const leftEdge = i % width === 0;
      const rightEdge = i % width === width - 1;
      //esta fue la parte mas dificil es la unica forma que encontre de validar esto :(
      if (boxes[i].classList.contains("safeBox")) {
        if (i > 0 && !leftEdge && boxes[i - 1].classList.contains("mines"))
          total++;
        if (
          i > 9 &&
          !rightEdge &&
          boxes[i + 1 - width].classList.contains("mines")
        )
          total++;
        if (i > 10 && boxes[i - width].classList.contains("mines")) total++;
        if (
          i > 11 &&
          !leftEdge &&
          boxes[i - 1 - width].classList.contains("mines")
        )
          total++;
        if (i < 98 && !rightEdge && boxes[i + 1].classList.contains("mines"))
          total++;
        if (
          i < 90 &&
          !leftEdge &&
          boxes[i - 1 + width].classList.contains("mines")
        )
          total++;
        if (
          i < 88 &&
          !rightEdge &&
          boxes[i + 1 + width].classList.contains("mines")
        )
          total++;
        if (i < 89 && boxes[i + width].classList.contains("mines")) total++;
        boxes[i].setAttribute("data", total);
      }
    }
  }

  createGameBoard();

  function addFlag(box) {
    if (isGameOver) return;
    if (!box.classList.contains("checked") && flags < mines) {
      if (!box.classList.contains("flag")) {
        box.classList.add("flag");
        box.innerHTML = "🚩";
        flags++;
        checkForWin();
      } else {
        box.classList.remove("flag");
        box.innerHTML = "";
        flags = flags - 1;
        //flagsLeft.innerHTML = mines - flags;
      }
    }
  }

  // funcion de click cuando da a una bomba.
  function click(box) {
    var currentId = box.id;
    //valido de no hacer click con juego terminado o box ya previamente revisada
    if (isGameOver) return;
    if (box.classList.contains("checked") || box.classList.contains("flag"))
      return;
    if (box.classList.contains("mines")) {
      gameOver(box);
    } else {
      var total = box.getAttribute("data");
      if (total != 0) {
        box.classList.add("checked");
        box.innerHTML = total;
        return;
      }
      checkBox(box, currentId);
    }
    box.classList.add("checked");
  }

  function gameOver(box) {
    console.log("BOOM! Perdiste!");
    isGameOver = true;

    //muestro todas las bombas si toco alguna.
    boxes.forEach((box) => {
      if (box.classList.contains("mines")) {
        box.innerHTML = "💣";
      }
    });
  }

  function checkForWin() {
    let match = 0;
    for (var i = 0; i < boxes.length; i++) {
      if (
        boxes[i].classList.contains("flag") &&
        boxes[i].classList.contains("bomb")
      ) {
        match++;
      }
      if (match == mines) {
        console.log("you win");
      }
    }
  }
  // funcion para mostrarme todas las cajitas si toco alguna que no este con numero
  function checkBox(box, currentId) {
    const leftEdge = currentId % width === 0;
    const rightEdge = currentId % width === width - 1;
    // aca marco las exepciones de los cuadrados de las esquinas.

    setTimeout(() => {
      if (currentId > 0 && !leftEdge) {
        const newId = boxes[parseInt(currentId) - 1].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId > 9 && !rightEdge) {
        const newId = boxes[parseInt(currentId) + 1 - width].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId > 10) {
        const newId = boxes[parseInt(currentId - width)].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId > 11 && !leftEdge) {
        const newId = boxes[parseInt(currentId) - 1 - width].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId < 98 && !rightEdge) {
        const newId = boxes[parseInt(currentId) + 1].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId < 90 && !leftEdge) {
        const newId = boxes[parseInt(currentId) - 1 + width].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId < 88 && !rightEdge) {
        const newId = boxes[parseInt(currentId) + 1 + width].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
      if (currentId < 89) {
        const newId = boxes[parseInt(currentId) + width].id;
        const newBox = document.getElementById(newId);
        click(newBox);
      }
    }, 10);
  }
});
