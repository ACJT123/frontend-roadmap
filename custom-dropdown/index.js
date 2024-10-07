document.addEventListener("DOMContentLoaded", () => {
  const optionList = document.getElementById("optionList");

  // hide optionList by default
  optionList.style.display = "none";
});

function displayOption() {
  // display optionList
  const optionList = document.getElementById("optionList");

  const arrow = document.getElementById("arrow");


  if (optionList.style.display === "none") {
    optionList.style.display = "block";
    arrow.style.rotate = "180deg";
  } else {
    optionList.style.display = "none";
    arrow.style.rotate = "0deg";
  }
}

function selectOpt(event, selectedOption) {
  // remove selected class from all options
  let options = document.querySelectorAll(".option");
  options.forEach((o) => {
    o.classList.remove("selected");
  });

  event.currentTarget.classList.add("selected");

  const selectText = document.getElementById("selectText");
  selectText.innerText = selectedOption;
}
