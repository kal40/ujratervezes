function calcAmount() {
  let price = 1000;
  let amountInput = document.querySelector("input[name='amount-input']");
  let amount = amountInput.value * price;
  console.log(amount);
  let showAmount = document.querySelector("span.show-amount");
  let amountNUmber = amountInput.value;
  if (amountNUmber > 10) {
    alert("Maximum 10");
  } else if (amountNUmber < 1) {
    alert("Minimum 1");
  } else {
    let amount = amountInput.value * price;
    showAmount.innerHTML = amount;
  }
}
let helpText = document.createElement("small");
helpText.className = "form-text text-muted";
helpText.innerHTML = "Adja meg a feltéteket!";

let parentElement = document.querySelector("div.form-group:nth-child(1)");
parentElement.appendChild(helpText);
parentElement.removeChild(helpText);

let orderForm = document.querySelector("#order-form");
orderForm.addEventListener("submit", function (ev) {
  ev.preventDefault();
  let values = {};
  let inputs = this.querySelectorAll("input");

  for (input of inputs) {
    values[input.name] = input.value;
  }
  console.log(values);
});

let hideAlert = function () {
  this.parentElement.style.display = "none";
};

let alertCloseButtons = document.querySelectorAll("button[data-bs-dismiss]");
for (alertCloseButton of alertCloseButtons) {
  alertCloseButton.addEventListener("click", hideAlert);
}
let toppings = ["szalonna", "extra hagyma", "uborka", "blablabla"];
let selectToppings = document.querySelector("#topInput");
let newOption = {};
for (tops of toppings) {
  newOption = document.createElement("option");
  newOption.innerHTML = tops;
  selectToppings.appendChild(newOption);
}
