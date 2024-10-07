let result;
let resultText = document.createElement("p");
let button;
let repoDiv;

document.addEventListener("DOMContentLoaded", async () => {
  const select = document.getElementById("language");
  result = document.getElementById("result");
  button = document.querySelector("button");

  setupButton();
  setupResultText();

  try {
    const languages = await getLanguages();
    populateLanguageDropdown(languages, select);
  } catch (error) {
    state("error");
  }

  // Handle language change and fetch repos
  select.addEventListener("change", async (event) => {
    const language = event.target.value;
    await fetchAndDisplayRepos(language);
  });
});

function setupButton() {
  button.innerText = "Refresh";
  button.addEventListener("click", refresh);
}

function setupResultText() {
  resultText.innerHTML = "Select a language to get a random repo";
  result.appendChild(resultText);
}

async function fetchAndDisplayRepos(language) {
  state("loading");

  try {
    const repos = await getRepos(language);
    const randomRepo = getRandomRepo(repos.items);
    displayRepo(randomRepo);
    state("done");
  } catch (error) {
    state("error");
  }
}

async function refresh() {
  // refetch and display repos

  const select = document.getElementById("language");

  const language = select.value;

  await fetchAndDisplayRepos(language);
}

function state(type) {
  resultText.innerText = ""; // Clear any existing messages
  switch (type) {
    case "loading":
      resultText.innerText = "Loading...";
      break;
    case "error":
      resultText.innerText = "An error occurred";
      result.classList.add("error");
      console.error("An error occurred");
      break;
    case "done":
      console.log("Done");
      break;
    default:
      resultText.innerText = "Something unexpected happened";
  }
}

async function getLanguages() {
  const url =
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json";
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch languages");
  return await response.json();
}

async function getRepos(language = "javascript") {
  const url = `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch repositories");
  result.innerHTML = ""; // Clear previous results
  return await response.json();
}

function getRandomRepo(repos) {
  const randomIndex = Math.floor(Math.random() * repos.length);
  return repos[randomIndex];
}

function displayRepo(repo) {
  repoDiv = document.createElement("div");
  repoDiv.id = "repoDiv";

  const repoName = document.createElement("a");
  repoName.href = repo.html_url;
  repoName.target = "_blank";
  repoName.innerText = repo.name;
  repoDiv.appendChild(repoName);

  const repoDescription = document.createElement("p");
  repoDescription.innerText = repo.description || "No description available";
  repoDiv.appendChild(repoDescription);

  result.appendChild(repoDiv);
}

function populateLanguageDropdown(languages, select) {
  languages
    .filter((language) => language.title !== "All Languages")
    .forEach((language) => {
      const option = document.createElement("option");
      option.value = language.title;
      option.innerText = language.title;
      select.appendChild(option);
    });
}
