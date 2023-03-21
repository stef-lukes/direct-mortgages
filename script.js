// Get DOM elements
const propertyValue = document.getElementById("propertyValue");
const interestRate = document.getElementById("interestRate");
const loanTerm = document.getElementById("loanTerm");
const availableDeposit = document.getElementById("availableDeposit");
const mortgagePaymentOutput = document.getElementById("result");
const totalInterestOutput = document.getElementById("totalInterestPayable");
const capitalRepayment = document.getElementById("capitalRepayment");
const interestOnly = document.getElementById("interestOnly");

// Set default property value
propertyValue.value = 200000;

// Set default available deposit value based on default property value
availableDeposit.value = 10;
const initialDepositAmount =
  propertyValue.value * (availableDeposit.value / 100);
document.getElementById(
  "depositAmountOutput"
).textContent = `£${initialDepositAmount.toFixed(0)}`;

// Function to calculate the mortgage payment and total interest payable
function calculateMortgagePayment() {
  const principle = propertyValue.value * (1 - availableDeposit.value / 100);
  const monthlyRate = interestRate.value / 100 / 12;
  const totalPayments = loanTerm.value * 12;

  let payment;
  let totalInterest;

  if (capitalRepayment.checked) {
    const numerator =
      principle * monthlyRate * (1 + monthlyRate) ** totalPayments;
    const denominator = (1 + monthlyRate) ** totalPayments - 1;
    payment = numerator / denominator;

    totalInterest = payment * totalPayments - principle;
  } else if (interestOnly.checked) {
    payment = principle * monthlyRate;

    totalInterest = principle * (interestRate.value / 100) * loanTerm.value;
  }

  mortgagePaymentOutput.textContent = ` £${payment.toFixed(0)}`;
  totalInterestOutput.textContent = ` £${totalInterest.toFixed(0)}`;
}

// Add event listener for the mortgage type radio buttons
document
  .querySelectorAll("input[type='radio']")
  .forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      // Update the mortgage payment output value and total interest payable based on the new mortgage type
      calculateMortgagePayment();
    });
  });

// Add event listener for the property value input
propertyValue.addEventListener("input", function () {
  // Update the deposit amount output value based on the new property value and available deposit percentage
  const depositAmount = propertyValue.value * (availableDeposit.value / 100);
  document.getElementById(
    "depositAmountOutput"
  ).textContent = `£${depositAmount.toFixed(0)}`;

  // Update the mortgage payment output value and total interest payable based on the new property value
  calculateMortgagePayment();
});

// Add event listener for any of the slider inputs
document.querySelectorAll("input[type='range']").forEach(function (slider) {
  slider.addEventListener("input", function () {
    // Update the deposit amount output value
    const depositAmount = propertyValue.value * (availableDeposit.value / 100);
    document.getElementById(
      "depositAmountOutput"
    ).textContent = `£${depositAmount.toFixed(0)}`;

    // Update the mortgage payment output value and total interest payable
    calculateMortgagePayment();
  });
});

// Add event listeners for the interest rate and loan term sliders
interestRate.addEventListener("input", function () {
  document.getElementById(
    "interestRateOutput"
  ).textContent = `${interestRate.value}%`;
  calculateMortgagePayment();
});

loanTerm.addEventListener("input", function () {
  document.getElementById(
    "loanTermOutput"
  ).textContent = `${loanTerm.value} years`;
  calculateMortgagePayment();
});
