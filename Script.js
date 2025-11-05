const Base_URL = "https://api.frankfurter.app/latest?";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("select.from");
const toCurr = document.querySelector("select.to");

const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (const currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.appendChild(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  const currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = newSrc;
};

  updateFlag(fromCurr);
    updateFlag(toCurr);

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (!amtVal || amtVal <= 0) {
    amtVal = "1";
    amount.value = "1";
  }

const url = `${Base_URL}amount=${amtVal}&from=${fromCurr.value.toUpperCase()}&to=${toCurr.value.toUpperCase()}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];
    let totalExchangedAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${totalExchangedAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Error fetching data!";
    console.error(error);
  }
});
