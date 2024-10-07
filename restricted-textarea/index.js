// Debounce function to limit how often a function is called
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Validate function to check message length and update the UI accordingly
function validateMessage(event) {
  const message = event.target.value;
  const textarea = event.target;
  const maxLength = Number(textarea.getAttribute("maxlength"));
  const currentLength = message.length;
  const charCountElement = document.getElementById("charCount");

  // Update the character count display
  charCountElement.textContent = `${currentLength} / ${maxLength}`;

  // Update styles based on whether the maxLength is reached
  if (currentLength === maxLength) {
    setStyles(textarea, charCountElement, "red");
  } else {
    resetStyles(textarea, charCountElement);
  }
}

// Helper function to set error styles
function setStyles(textarea, charCountElement, color) {
  textarea.style.borderColor = color;
  textarea.style.color = color;
  charCountElement.style.color = color;
}

// Helper function to reset styles
function resetStyles(textarea, charCountElement) {
  textarea.style.borderColor = "";
  textarea.style.color = "";
  charCountElement.style.color = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("message");

  // Apply debounced validation to the textarea input event
  textarea.oninput = debounce(validateMessage, 300);
});
