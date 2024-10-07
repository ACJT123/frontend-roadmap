function displayContent(event) {
  // get current's content within the accordion
  const content = event.currentTarget.nextElementSibling;

  content.classList.toggle("active");

  const title = event.currentTarget;
  title.classList.toggle("active");
}
