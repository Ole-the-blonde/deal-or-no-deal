const prizeMoney = [];
const briefcase = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26,
];

let totalMoney = 0;
let moneyLost = 0;

const bankOffer = document.getElementById("bank-offer");
const priceOffer = document.getElementById("bank-price-offer");
const prizeDisplay = [...document.querySelectorAll(".value")];
const briefcaseDisplay = document.querySelectorAll(".briefcase");
const finished = document.getElementById("finished");
shuffle(prizeDisplay);
prizeDisplay.forEach((prize) => {
  prizeMoney.push(Number(prize.textContent.slice(1)));
  totalMoney += Number(prize.textContent.slice(1));
});

let chosenBriefcase = null;
const outOfVault = [];
const vault = briefcase.map((briefcase, i) => {
  return {
    briefcaseNum: briefcase,
    briefcaseElem: briefcaseDisplay[i],
    value: prizeMoney[i],
    valueElem: prizeDisplay[i],
  };
});
// console.log(vault);

vault.forEach((briefcase) => {
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

      console.log(vault);
      if (vault.length === 0) {
        console.log("you won ", chosenBriefcase.value);
      }

      if (
        outOfVault.length === 7 ||
        outOfVault.length === 14 ||
        outOfVault.length === 19 ||
        outOfVault.length === 24
      ) {
        // Calculate the offer of the bank
        let currentOffer = Math.round(
          (totalMoney - moneyLost) / (vault.length + 1)
        );
        priceOffer.textContent = currentOffer;

        //Display the modal
        bankOffer.showModal();
        // } else if (outOfVault === 24) {
        //   winnings.textContent = winningBox;
        //   lastDeal.style.display = "block";
        // }
        //   });
      }
    },
    { once: true }
  );
});
noDeal.addEventListener("click", function () {
  bankOffer.close();
});
Deal.addEventListener("click", function () {
  bankOffer.close();
  winnings.textContent = bankOffer.textContent;
  finish();
});

// to shiffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function finish() {
  finished.classList.remove("hidden");
}
