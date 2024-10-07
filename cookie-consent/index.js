document.addEventListener("DOMContentLoaded", () => {
  // check if the user has already accepted the cookie consent
  if (!localStorage.getItem("cookie-consent")) {
    // show the cookie consent
    document.getElementById("cookieConsent").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  } else {
    document.getElementById("cookieConsent").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
});

function acceptCookie() {
  // remember option
  localStorage.setItem("cookie-consent", "accepted");

  closeCookieConsent();
}

function closeCookieConsent() {
  // hide the cookie consent
  document.getElementById("cookieConsent").classList.add("hidden");
  document.getElementById("overlay").style.display = "none";
}
