function onSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Convert temperature value from string to number
  data.temperature = Number(data.temperature);

  const result = convert(data);

  const resultElement = document.getElementById("result");
  resultElement.innerText = `
    ${data.temperature} ${data.from} is equal to ${result.toFixed(2)} ${data.to}
  `;
}

function convert(data) {
  const { from, to, temperature } = data;
  let result = 0;

  switch (from) {
    case "celsius":
      if (to === "fahrenheit") {
        result = (temperature * 9) / 5 + 32;
      } else if (to === "kelvin") {
        result = temperature + 273.15;
      } else {
        result = temperature;
      }
      break;
    case "fahrenheit":
      if (to === "celsius") {
        result = ((temperature - 32) * 5) / 9;
      } else if (to === "kelvin") {
        result = ((temperature - 32) * 5) / 9 + 273.15;
      } else {
        result = temperature;
      }
      break;
    case "kelvin":
      if (to === "celsius") {
        result = temperature - 273.15;
      } else if (to === "fahrenheit") {
        result = ((temperature - 273.15) * 9) / 5 + 32;
      } else {
        result = temperature;
      }
      break;
  }

  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("temperatureForm");
  const submitButton = document.getElementById("convertBtn");

  form.addEventListener("input", () => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Ensure all fields (temperature, from, and to) are filled before enabling submit
    const isFilled = data.temperature && data.from && data.to;
    submitButton.disabled = !isFilled;
  });
});
