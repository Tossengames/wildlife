// ======== main.js ========

// ======= USER PROFILE & GAME STATE =======
let userProfile = {
  name: "",
  score: 0,
  unlockedAnimals: [],
  currentRank: "Beginner"
};

let currentScenarioIndex = 0;
let currentScenarioList = [];
let selectedContinent = "All";

// ======= RANKS =======
const ranks = [
  { name: "Beginner", minScore: 0 },
  { name: "Tracker", minScore: 10 },
  { name: "Ranger", minScore: 25 },
  { name: "Survival Expert", minScore: 50 },
  { name: "Master of the Wild", minScore: 80 }
];

// ======= DOM ELEMENTS =======
const startScreen = document.getElementById("startScreen");
const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");

const mainMenu = document.getElementById("mainMenu");
const userNameDisplay = document.getElementById("userNameDisplay");
const rankDisplay = document.getElementById("rankDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

const pickContinentScreen = document.createElement("div");
pickContinentScreen.id = "pickContinentScreen";
pickContinentScreen.className = "screen";
pickContinentScreen.style.display = "none";

const animalsInfoScreen = document.createElement("div");
animalsInfoScreen.id = "animalsInfoScreen";
animalsInfoScreen.className = "screen";
animalsInfoScreen.style.display = "none";

const animalDetailScreen = document.createElement("div");
animalDetailScreen.id = "animalDetailScreen";
animalDetailScreen.className = "screen";
animalDetailScreen.style.display = "none";

const scenarioScreen = document.getElementById("scenarioScreen");
const animalImage = document.getElementById("animalImage");
const scenarioDescription = document.getElementById("scenarioDescription");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackScreen = document.getElementById("feedbackScreen");
const feedbackText = document.getElementById("feedbackText");
const nextBtn = document.getElementById("nextBtn");

// ======= INITIALIZATION =======
function initGame() {
  document.body.appendChild(pickContinentScreen);
  document.body.appendChild(animalsInfoScreen);
  document.body.appendChild(animalDetailScreen);

  const savedProfile = localStorage.getItem("wildSurvivalProfile");
  if(savedProfile) userProfile = JSON.parse(savedProfile);

  updateRankDisplay();
  showStartScreen();
}

// ======= START SCREEN =======
function showStartScreen() {
  startScreen.style.display = "flex";
  mainMenu.style.display = "none";
  pickContinentScreen.style.display = "none";
  animalsInfoScreen.style.display = "none";
  animalDetailScreen.style.display = "none";
  scenarioScreen.style.display = "none";
  feedbackScreen.style.display = "none";
}

startButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if(name === "") return alert("Please enter your name!");
  userProfile.name = name;
  localStorage.setItem("wildSurvivalProfile", JSON.stringify(userProfile));
  userNameDisplay.textContent = userProfile.name;
  showMainMenu();
});

// ======= MAIN MENU =======
function showMainMenu() {
  startScreen.style.display = "none";
  mainMenu.style.display = "flex";
  pickContinentScreen.style.display = "none";
  animalsInfoScreen.style.display = "none";
  animalDetailScreen.style.display = "none";
  scenarioScreen.style.display = "none";
  feedbackScreen.style.display = "none";
  userNameDisplay.textContent = userProfile.name || "Player";
  updateRankDisplay();
}

// Main menu buttons
const pickContinentBtn = document.createElement("button");
pickContinentBtn.textContent = "Pick Continent";
pickContinentBtn.addEventListener("click", showPickContinentScreen);

const playScenariosBtn = document.createElement("button");
playScenariosBtn.textContent = "Play Scenarios";
playScenariosBtn.addEventListener("click", () => {
  loadScenarios();
  showScenario();
});

const animalsInfoBtn = document.createElement("button");
animalsInfoBtn.textContent = "Animals Info";
animalsInfoBtn.addEventListener("click", showAnimalsInfoScreen);

mainMenu.appendChild(pickContinentBtn);
mainMenu.appendChild(playScenariosBtn);
mainMenu.appendChild(animalsInfoBtn);

// ======= PICK CONTINENT SCREEN =======
function showPickContinentScreen() {
  pickContinentScreen.innerHTML = "<h2>Select Continent</h2>";
  ["All","Africa","North America","Asia","Australia"].forEach(cont => {
    const btn = document.createElement("button");
    btn.textContent = cont;
    btn.addEventListener("click", () => {
      selectedContinent = cont;
      showMainMenu();
      alert(`Selected: ${cont}`);
    });
    pickContinentScreen.appendChild(btn);
  });
  pickContinentScreen.style.display = "flex";
  mainMenu.style.display = "none";
}

// ======= ANIMALS INFO SCREEN =======
function showAnimalsInfoScreen() {
  animalsInfoScreen.innerHTML = "<h2>Animals Info</h2>";
  animalsInfo.forEach(animal => {
    const unlocked = animal.unlocked || userProfile.score >= animal.unlockScore;
    const btn = document.createElement("button");
    btn.textContent = animal.name + (unlocked ? "" : " 🔒");
    btn.disabled = !unlocked;
    btn.addEventListener("click", () => showAnimalDetailScreen(animal));
    animalsInfoScreen.appendChild(btn);
  });
  const backBtn = document.createElement("button");
  backBtn.textContent = "Back to Menu";
  backBtn.addEventListener("click", showMainMenu);
  animalsInfoScreen.appendChild(backBtn);

  animalsInfoScreen.style.display = "flex";
  mainMenu.style.display = "none";
}

// ======= ANIMAL DETAIL SCREEN =======
function showAnimalDetailScreen(animal) {
  animalDetailScreen.innerHTML = `<h2>${animal.name}</h2>
  <img src="${animal.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
       class="animalImage">
  <p>${animal.info || "No info available"}</p>`;

  const backBtn = document.createElement("button");
  backBtn.textContent = "Back to Animals";
  backBtn.addEventListener("click", showAnimalsInfoScreen);
  animalDetailScreen.appendChild(backBtn);

  animalDetailScreen.style.display = "flex";
  animalsInfoScreen.style.display = "none";
}

// ======= SCENARIO FLOW =======
function loadScenarios() {
  currentScenarioList = scenarios.filter(scn => {
    const animalData = animalsInfo.find(a => a.name === scn.animal);
    return animalData && (animalData.unlocked || userProfile.score >= animalData.unlockScore) &&
           (selectedContinent === "All" || animalData.continent === selectedContinent);
  });
  currentScenarioIndex = 0;
}

function showScenario() {
  if(currentScenarioIndex >= currentScenarioList.length) {
    alert("All scenarios completed!");
    showMainMenu();
    return;
  }

  scenarioScreen.style.display = "flex";
  mainMenu.style.display = "none";
  feedbackScreen.style.display = "flex";
  feedbackText.textContent = "";

  const scenario = currentScenarioList[currentScenarioIndex];
  const animal = animalsInfo.find(a => a.name === scenario.animal);

  animalImage.src = animal.image || "https://via.placeholder.com/300x200?text=No+Image";
  animalImage.onerror = () => animalImage.src = "https://via.placeholder.com/300x200?text=No+Image";

  scenarioDescription.textContent = scenario.description;

  // Options
  optionsContainer.innerHTML = "";
  scenario.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("optionBtn");
    btn.addEventListener("click", () => handleOptionSelect(idx));
    optionsContainer.appendChild(btn);
  });

  // Back button
  const backBtn = document.createElement("button");
  backBtn.textContent = "Back to Menu";
  backBtn.addEventListener("click", showMainMenu);
  optionsContainer.appendChild(backBtn);

  nextBtn.style.display = "none";
}

// Handle option selection
function handleOptionSelect(optionIndex) {
  const scenario = currentScenarioList[currentScenarioIndex];
  const selectedOption = scenario.options[optionIndex];

  document.querySelectorAll(".optionBtn").forEach(btn => btn.disabled = true);

  feedbackText.innerHTML = selectedOption.correct ? 
    `✅ Correct!<br>${scenario.explanation}` : 
    `❌ Wrong!<br>${scenario.explanation}`;

  if(selectedOption.correct) {
    userProfile.score += 1;
    checkAnimalUnlocks();
    updateRankDisplay();
    localStorage.setItem("wildSurvivalProfile", JSON.stringify(userProfile));
  }

  nextBtn.style.display = "inline-block";
}

// Next scenario
nextBtn.addEventListener("click", () => {
  currentScenarioIndex += 1;
  nextBtn.style.display = "none";
  showScenario();
});

// ======= RANK & SCORE =======
function updateRankDisplay() {
  for(let i = ranks.length-1; i>=0; i--) {
    if(userProfile.score >= ranks[i].minScore) {
      userProfile.currentRank = ranks[i].name;
      break;
    }
  }
  rankDisplay.textContent = `Rank: ${userProfile.currentRank}`;
  scoreDisplay.textContent = `Score: ${userProfile.score}`;
}

// Unlock animals
function checkAnimalUnlocks() {
  animalsInfo.forEach(animal => {
    if(!animal.unlocked && userProfile.score >= animal.unlockScore) {
      animal.unlocked = true;
      alert(`🎉 New animal unlocked: ${animal.name}!`);
    }
  });
}

// ======= INIT GAME =======
initGame();