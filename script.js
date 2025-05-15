/** Add Event Listeners and Interactive JS here **/
const tipAmount = document.getElementById("tip-amount").lastElementChild;
const totalPerPerson = document.getElementById("total-person").lastElementChild;
const bill = document.getElementById("bill");
const numberOfPeople = document.getElementById("people");
const customTip = document.getElementById("custom-tip");
const resetButton = document.getElementById("reset");
const tipButtons = Array.from(
  document.getElementById("tip-select").children
).slice(0, 5);

let tip;

function calculate() {
  const activeBtn = document.querySelector(".active");
  if (
    !bill.value ||
    !numberOfPeople.value ||
    Number(numberOfPeople.value) <= 0 ||
    (activeBtn === null && !customTip.value)
  ) {
    return;
  }
  const tipPerPerson =
    Math.floor(
      ((Number.parseFloat(bill.value) * (Number(tip) / 100)) /
        Number(numberOfPeople.value)) *
        100
    ) / 100;
  const total =
    Math.round(
      ((Number.parseFloat(bill.value) +
        Number.parseFloat(bill.value) * (Number(tip) / 100)) /
        Number(numberOfPeople.value)) *
        100
    ) / 100;
  tipAmount.textContent = `$${tipPerPerson}`;
  totalPerPerson.textContent = `$${total}`;
}

function removeActiveStatus() {
  const activeBtn = document.querySelector(".active");
  if (activeBtn) {
    activeBtn.classList.remove("active");
  }
}

function updateResetBtn() {
  const activeBtn = document.querySelector(".active");
  if (!bill.value && !numberOfPeople.value && activeBtn === null) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    removeActiveStatus();
    customTip.value = "";
    button.classList.add("active");
    updateResetBtn();
    tip = Number(button.textContent.replace("%", ""));
    calculate();
  });
});

bill.addEventListener("input", () => {
  updateResetBtn();
  calculate();
});

numberOfPeople.addEventListener("input", () => {
  updateResetBtn();
  const number = Number(numberOfPeople.value);
  const errorMsg = document.getElementById("people").nextElementSibling;
  if (number === 0 && numberOfPeople.value !== "") {
    errorMsg.classList.remove("hidden");
  } else if (number > 0) {
    errorMsg.classList.add("hidden");
    calculate();
  }
});

customTip.addEventListener("input", () => {
  removeActiveStatus();
  updateResetBtn();
  if (customTip) {
    tip = customTip.value;
    calculate();
  }
});

resetButton.addEventListener("click", () => {
  bill.value = "";
  customTip.value = "";
  numberOfPeople.value = "";
  tipAmount.textContent = "$0.00";
  totalPerPerson.textContent = "$0.00";
  resetButton.disabled = true;
  removeActiveStatus();
});
