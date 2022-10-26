const prizeMoney = [];
const briefcase = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,
];

const prizeDisplay = [...document.querySelectorAll(".value")];
const briefcaseDisplay = document.querySelectorAll(".briefcase");

shuffle(prizeDisplay);

prizeDisplay.forEach((prize) => {
  prizeMoney.push(Number(prize.textContent.slice(1)));
});

// console.log(prizeMoney);

const vault = briefcase.map((briefcase, i) => {
  return {
    briefcaseNum: briefcase,
    briefcaseElem: briefcaseDisplay[i],
    value: prizeMoney[i],
    valueElem: prizeDisplay[i],
  };
});
// console.log(vault);

let notOpenedCount = prizeDisplay.length;
let prizeTotal = 0;
let bankerOfferAmount;
let selectedValues = [];

// to add click to all briefcases
vault.forEach((briefcase) => {
  briefcase.briefcaseElem.addEventListener("click", (e) => {
    briefcase.briefcaseElem.style.visibility = "hidden";
    briefcase.valueElem.style.backgroundColor = "grey";
    console.log(briefcase);
  });
});

// to shiffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
