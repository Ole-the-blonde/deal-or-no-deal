const bankOffer = document.getElementById("bank-offer");
const offerMsg = document.querySelector("#offer-msg");
const priceOffer = document.getElementById("bank-price-offer");
const offerBtns = document.querySelectorAll(".offer.buttons");
const restartBtn = document.querySelector("#restart");
const briefcaseContainer = document.querySelector(".briefcases");
const prizeDisplay = [...document.querySelectorAll(".value")];
const finished = document.getElementById("finished");

const briefcase = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,
];

let briefcaseDisplay;
let prizeMoney;
let totalMoney;
let moneyLost;
let currentOffer;
let chosenBriefcase;
let outOfVault;
let vault;

start();

restartBtn.addEventListener("click", () => {
  start();
});

noDeal.addEventListener("click", function () {
  if (vault.length === 1) {
    if (chosenBriefcase.value > currentOffer) {
      offerMsg.textContent = "Congratulations! You have won: $";
      currentOffer.textContent = chosenBriefcase.value;
    } else {
      offerMsg.textContent =
        "You lost, The banker beat you! you should have taken the $";
    }
    finishButtons();
  } else {
    bankOffer.close();
  }
});

Deal.addEventListener("click", function () {
  if (chosenBriefcase.value > currentOffer) {
    offerMsg.textContent =
      "You lost, The banker beat you! your case was worth $" +
      chosenBriefcase.value +
      " and you accepted $";
  } else {
    offerMsg.textContent = "Congratulations! You have won: $";
  }
  finishButtons();
});

// to shiffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function finishButtons() {
  offerBtns.forEach((button) => {
    button.classList.add("hidden");
  });
  restartBtn.classList.remove("hidden");
}

function startButtons() {
  offerBtns.forEach((button) => {
    button.classList.remove("hidden");
  });
  restartBtn.classList.add("hidden");
}

function start() {
  bankOffer.close();
  startButtons();
  offerMsg.textContent = "The bank offers you: $";

  totalMoney = 0;
  moneyLost = 0;
  currentOffer = null;
  chosenBriefcase = null;
  outOfVault = [];
  prizeMoney = [];

  briefcaseContainer.innerHTML = null;

  briefcaseDisplay = briefcase.map((bc) => {
    const bcEl = document.createElement("div");
    bcEl.className = "briefcase";
    bcEl.textContent = bc;
    briefcaseContainer.append(bcEl);
    return bcEl;
  });

  shuffle(prizeDisplay);
  prizeDisplay.forEach((prize) => {
    prizeMoney.push(Number(prize.textContent.slice(1)));
    totalMoney += Number(prize.textContent.slice(1));
  });

  vault = briefcase.map((briefcase, i) => {
    return {
      briefcaseNum: briefcase,
      briefcaseElem: briefcaseDisplay[i],
      value: prizeMoney[i],
      valueElem: prizeDisplay[i],
    };
  });
  // console.log(vault);

  vault.forEach((briefcase) => {
    briefcase.valueElem.classList.remove("out-of-vault");

    briefcase.briefcaseElem.addEventListener(
      "click",
      (e) => {
        if (chosenBriefcase === null) {
          chosenBriefcase = vault.splice(vault.indexOf(briefcase), 1)[0];
          briefcase.briefcaseElem.classList.add("chosen");
        } else {
          outOfVault.push(vault.splice(vault.indexOf(briefcase), 1)[0]);
          briefcase.briefcaseElem.style.visibility = "hidden";
          briefcase.valueElem.classList.add("out-of-vault");
          moneyLost += briefcase.value;
        }

        if (
          outOfVault.length === 7 ||
          outOfVault.length === 14 ||
          outOfVault.length === 19 ||
          outOfVault.length === 24
        ) {
          // Calculate the offer of the bank
          currentOffer = Math.round(
            (totalMoney - moneyLost) / (vault.length + 1)
          );
          priceOffer.textContent = currentOffer;

          if (outOfVault.length === 24) {
            offerMsg.textContent = "Do you want to keep your case or accept: $";
          }
          //Display the modal
          bankOffer.showModal();
        }
      },
      { once: true }
    );
  });
}
