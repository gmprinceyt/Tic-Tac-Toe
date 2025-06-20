let btnNodes = document.querySelectorAll(".buttons button");
let result = document.querySelector("#result");
let playerturn = document.querySelector("#turn");

// Animation
let modal = document.querySelector(".modal");
let modalMsg = document.querySelector("#modal-message");
let closeBtn = document.querySelector(".close-btn");

//Sounds
const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");

let turn = true; // true = ✅, false = ❌

let pattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

btnNodes.forEach((btn) => {
  btn.addEventListener("click", () => {
    clickSound.play();
    if (turn) {
      btn.innerHTML = "✅";
      btn.style.color = "green";
      playerturn.innerText = `Player Turn: ❌`;
    } else {
      btn.innerHTML = "❌";
      btn.style.color = "red";
      playerturn.innerText = `Player Turn: ✅`;
    }
    turn = !turn;
    btn.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  let winnerFound = false;

  pattern.forEach((combo) => {
    let [a, b, c] = combo;
    let val1 = btnNodes[a].innerHTML;
    let val2 = btnNodes[b].innerHTML;
    let val3 = btnNodes[c].innerHTML;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      winnerFound = true;
      showModal(`Winner is ${val1}`);
      animateWin([a, b, c]);
      disabledAllBtn();
    }
  });

  if (!winnerFound) {
    const isDraw = [...btnNodes].every((btn) => btn.innerHTML !== "");
    if (isDraw) {
      showModal("Match Draw 🎉");
    }
  }
}

function animateWin(indexes) {
  indexes.forEach((i) => {
    btnNodes[i].classList.add("win-animate");
  });
}

function disabledAllBtn() {
  btnNodes.forEach((btn) => (btn.disabled = true));
}

function enableAllBtn() {
  btnNodes.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove("win-animate");
  });
}

function showModal(message) {
  modalMsg.innerText = message;
  modal.classList.add("show");
  if (message.includes("Winner")) {
    winSound.play();
  } else if (message.includes("Draw")) {
    drawSound.play();
  }
}

function hideModal() {
  modal.classList.remove("show");
}

function newGame() {
  btnNodes.forEach((btn) => {
    btn.innerHTML = "";
    btn.style.color = "black";
  });
  result.innerText = "";
  playerturn.innerText = "Player Turn: ✅";
  turn = true;
  winSound.pause();
  winSound.currentTime = 0;
  drawSound.pause();
  drawSound.currentTim = 0;
  enableAllBtn();
  hideModal();
}

let reset = document.querySelector("#reset");

reset.addEventListener("click", newGame);

closeBtn.addEventListener("click", hideModal);
