// Get the input elements
var propertyValue = document.getElementById("propertyValue");
var availableDeposit = document.getElementById("availableDeposit");
var interestRate = document.getElementById("interestRate");
var loanTerm = document.getElementById("loanTerm");

// Get the output elements
var availableDepositOutput = document.getElementById("availableDepositOutput");
var interestRateOutput = document.getElementById("interestRateOutput");
var loanTermOutput = document.getElementById("loanTermOutput");
var resultElement = document.getElementById("result");

// Set the default property value and calculate the initial available deposit
propertyValue.value = 200000;
calculateAvailableDeposit();

// Add event listeners to update the outputs as the sliders are adjusted
propertyValue.addEventListener("input", function () {
  calculateAvailableDeposit();
  calculateMortgagePayment();
});

availableDeposit.addEventListener("input", function () {
  calculateMortgagePayment();
  updateAvailableDepositOutput();
});

interestRate.addEventListener("input", function () {
  updateInterestRateOutput();
  calculateMortgagePayment();
});

loanTerm.addEventListener("input", function () {
  updateLoanTermOutput();
  calculateMortgagePayment();
});

// Function to calculate the available deposit
function calculateAvailableDeposit() {
  // Calculate available deposit as percentage of property value
  const percentage = Math.min(availableDeposit.value, 80);
  const deposit = (propertyValue.value * percentage) / 100;

  // Convert available deposit to dollar value for display
  availableDepositOutput.value = `£${deposit.toLocaleString()}`;
}

// Event listener for property value input
propertyValue.addEventListener("input", calculateAvailableDeposit);

// Event listener for available deposit input
availableDeposit.addEventListener("input", () => {
  updateAvailableDepositOutput();
});

// Function to update available deposit output
function updateAvailableDepositOutput() {
  const percentage = Math.min(availableDeposit.value, 80);
  availableDepositOutput.value = `£${(
    (propertyValue.value * percentage) /
    100
  ).toLocaleString()}`;
}

// Function to update the interest rate output
function updateInterestRateOutput() {
  interestRateOutput.innerHTML = interestRate.value + "%";
}

// Function to update the loan term output
function updateLoanTermOutput() {
  loanTermOutput.innerHTML = loanTerm.value + " years";
}

// Function to calculate the mortgage payment
function calculateMortgagePayment() {
  var principal = propertyValue.value - availableDeposit.value;
  var monthlyInterestRate = interestRate.value / 1200;
  var numberOfPayments = loanTerm.value * 12;
  var mortgagePayment =
    (principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  resultElement.innerHTML =
    "Your monthly mortgage payment is: £" + mortgagePayment.toFixed(2);
}
