let filterLetters = [];
let bundeslaender = [];

function init() {
  loadData();
}

async function loadData() {
  let response = await fetch("bundesland.json");
  bundeslaender = await response.json();
  renderCards();
  filterLetter();
}

function renderCards() {
  document.getElementById("content").innerHTML = "";
  for (let i = 0; i < bundeslaender.length; i++) {
    let bundesland = bundeslaender[i];
    document.getElementById("content").innerHTML += `
        <div class="card">
            <div class="cardContent">
                <a href=${bundesland["url"]}>
                    <h4>${bundesland["name"]}</h4>
                    <span>${bundesland["population"]} Millionen</span>
                </a>
            </div>
        </div>`;
  }
}

function renderNav() {
  for (let i = 0; i < filterLetters.length; i++) {
    let letter = filterLetters[i];
    document.getElementById("renderNav").innerHTML += `
        <a onclick="filter('${letter}')">${letter}</a>`;
  }
  document.getElementById("renderNav").innerHTML += `
        <a onclick="init()">ALL</a>`;
}

function filterLetter() {
  document.getElementById("renderNav").innerHTML = "";
  for (let i = 0; i < bundeslaender.length; i++) {
    let bundesland = bundeslaender[i]["name"];
    let letter = bundesland.charAt(0);
    appendLetter(letter);
  }

  renderNav();
}

function appendLetter(letter) {
  let i = filterLetters.indexOf(letter);
  if (i < 0) {
    filterLetters.push(letter);
  }
}

function filter(letter) {
  letter = letter.toLowerCase();
  document.getElementById("content").innerHTML = "";

  for (let i = 0; i < bundeslaender.length; i++) {
    let bundesland = bundeslaender[i]["name"];
    let population = bundeslaender[i]["population"];
    if (bundesland.toLowerCase().charAt(0).includes(letter)) {
      renderFilter(bundesland, population);
    }
  }
}

function renderFilter(bundesland, population) {
  document.getElementById("content").innerHTML += `
    <div class="card">
        <div class="cardContent">
            <h4>${bundesland}</h4>
            <span>${population} Millionen</span>
        </div>
    </div>`;
}
