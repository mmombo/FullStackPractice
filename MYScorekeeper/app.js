const p1button = document.querySelector("#p1button");
const p2button = document.querySelector("#p2button");

const p1score = document.querySelector("#p1score");
const p2score = document.querySelector("#p2score");
const resetbutton = document.querySelector("#resetButton");
const scoreSelect = document.querySelector("select");

let p1counter = 0;
let p2counter = 0;
let winningScore = 3;
let isGameOver = false;

p1button.addEventListener("click", () => {
  if (!isGameOver) {
    p1counter++;

    if (p1counter === winningScore) {
      isGameOver = true;
      p1button.disabled = true;
      p2button.disabled = true;
      p1score.classList.add("green");
      p2score.classList.add("red");
    }
    p1score.textContent = p1counter;
  }
});

p2button.addEventListener("click", () => {
  if (!isGameOver) {
    p2counter++;

    if (p2counter === winningScore) {
      isGameOver = true;
      p2button.disabled = true;
      p1button.disabled = true;
      p1score.classList.add("red");
      p2score.classList.add("green");
    }

    p2score.textContent = p2counter;
  }
});

resetbutton.addEventListener("click", reset);

function reset() {
  p1score.textContent = 0;
  p2score.textContent = 0;
  p1counter = 0;
  p2counter = 0;
  isGameOver = false;
  p1button.disabled = false;
  p2button.disabled = false;
  p1score.classList.remove("red");
  p1score.classList.remove("green");
  p2score.classList.remove("red");
  p2score.classList.remove("green");
}

scoreSelect.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});
