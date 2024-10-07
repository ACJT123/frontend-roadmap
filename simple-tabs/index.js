function openTab(event, tab) {
  // hide all tabs content
  let content = document.querySelectorAll(".content");
  content.forEach((c) => {
    c.style.display = "none";
  });

  // remove active class from all tabs
  let tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => {
    t.classList.remove("active");
  });

  // show the clicked tab content
  document.getElementById(tab).style.display = "block";

  // set active class to the clicked tab
  event.currentTarget.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {});
