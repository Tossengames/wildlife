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
const continentButtons = document.querySelectorAll(".continentBtn");
const playBtn = document.getElementById("playBtn");
const infoBtn = document.getElementById("infoBtn");
const userNameDisplay = document.getElementById("userNameDisplay");

const scenarioScreen = document.getElementById("scenarioScreen");
const animalImage = document.getElementById("animalImage");
const scenarioDescription = document.getElementById("scenarioDescription");
const optionsContainer = document.getElementById("optionsContainer");

const feedbackScreen = document.getElementById("feedbackScreen");
const feedbackText = document.getElementById("feedbackText");
const nextBtn = document.getElementById("nextBtn");

const rankDisplay = document.getElementById("rankDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");

// ======= INITIALIZATION =======
function initGame() {
  // Load saved profile if exists
  const savedProfile = localStorage.getItem("wildSurvivalProfile");
  if(savedProfile) {
    userProfile = JSON.parse(savedProfile);
  }

  updateRankDisplay();
  showStartScreen();
}

// ======= START SCREEN =======
function showStartScreen() {
  startScreen.style.display = "flex";
  mainMenu.style.display = "none";
  scenarioScreen.style.display = "none";
  feedbackScreen.style.display = "none";
}

// Start button
startButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if(name === "") {
    alert("Please enter your name!");
    return;
  }

  userProfile.name = name;
  localStorage.setItem("wildSurvivalProfile", JSON.stringify(userProfile));

  userNameDisplay.textContent = userProfile.name;

  showMainMenu();
});

// ======= MAIN MENU =======
function showMainMenu() {
  startScreen.style.display = "none";
  mainMenu.style.display = "flex";
  scenarioScreen.style.display = "none";
  feedbackScreen.style.display = "none";

  userNameDisplay.textContent = userProfile.name || "Player";
  updateRankDisplay();
}

// Continent buttons
continentButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedContinent = btn.dataset.continent;
    alert(`Selected continent: ${selectedContinent}`);
  });
});

// Play button
playBtn.addEventListener("click", () => {
  loadScenarios();
  showScenario();
});

// Info button (simple demo alert)
infoBtn.addEventListener("click", () => {
  let infoText = "Animals Info:\n";
  animalsInfo.forEach(animal => {
    const unlocked = animal.unlocked || userProfile.score >= animal.unlockScore;
    infoText += `${animal.name} - ${unlocked ? "Unlocked" : "Locked"}\n`;
  });
  alert(infoText);
});

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
  feedbackScreen.style.display = "none";

  const scenario = currentScenarioList[currentScenarioIndex];
  const animal = animalsInfo.find(a => a.name === scenario.animal);

  // Animal image (placeholder if missing)
  animalImage.src = animal.image || "https://via.placeholder.com/300x200?text=No+Image";
  animalImage.onerror = () => { animalImage.src = "https://via.placeholder.com/300x200?text=No+Image"; }

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
}

// Handle user selecting option
function handleOptionSelect(optionIndex) {
  const scenario = currentScenarioList[currentScenarioIndex];
  const selectedOption = scenario.options[optionIndex];

  // Disable all options
  document.querySelectorAll(".optionBtn").forEach(btn => btn.disabled = true);

  // Show feedback
  feedbackScreen.style.display = "flex";
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

// Unlock animals based on score
function checkAnimalUnlocks() {
  animalsInfo.forEach(animal => {
    if(!animal.unlocked && userProfile.score >= animal.unlockScore) {
      animal.unlocked = true;
      alert(`🎉 New animal unlocked: ${animal.name}!`);
    }
  });
}

// ======= START GAME =======
initGame();