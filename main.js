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

const pickContinentScreen = document.getElementById("pickContinentScreen");
const animalsInfoScreen = document.getElementById("animalsInfoScreen");
const animalDetailScreen = document.getElementById("animalDetailScreen");

const scenarioScreen = document.getElementById("scenarioScreen");
const animalImage = document.getElementById("animalImage");
const scenarioDescription = document.getElementById("scenarioDescription");
const optionsContainer = document.getElementById("optionsContainer");
const feedbackScreen = document.getElementById("feedbackScreen");
const feedbackText = document.getElementById("feedbackText");
const nextBtn = document.getElementById("nextBtn");

// Buttons
const pickContinentBtn = document.getElementById("pickContinentBtn");
const playScenariosBtn = document.getElementById("playScenariosBtn");
const animalsInfoBtn = document.getElementById("animalsInfoBtn");
const backFromContinentBtn = document.getElementById("backFromContinent");
const backFromAnimalsBtn = document.getElementById("backFromAnimals");
const backFromDetailBtn = document.getElementById("backFromDetail");

// ======= INITIALIZATION =======
function initGame() {
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
  if(!name) return alert("Please enter your name!");
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

// ======= MAIN MENU BUTTON EVENTS =======
pickContinentBtn.addEventListener("click", showPickContinentScreen);
playScenariosBtn.addEventListener("click", () => { loadScenarios(); showScenario(); });
animalsInfoBtn.addEventListener("click", showAnimalsInfoScreen);

// ======= PICK CONTINENT SCREEN =======
function showPickContinentScreen() {
  pickContinentScreen.style.display = "flex";
  mainMenu.style.display = "none";
}

backFromContinentBtn.addEventListener("click", showMainMenu);
pickContinentScreen.querySelectorAll("button[data-continent]").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedContinent = btn.dataset.continent;
    showMainMenu();
    alert(`Selected continent: ${selectedContinent}`);
  });
});

// ======= ANIMALS INFO SCREEN =======
function showAnimalsInfoScreen() {
  animalsInfoScreen.style.display = "flex";
  mainMenu.style.display = "none";
  animalDetailScreen.style.display = "none";

  const animalsList = document.getElementById("animalsList");
  animalsList.innerHTML = "";
  animalsInfo.forEach(animal => {
    const unlocked = animal.unlocked || userProfile.score >= animal.unlockScore;
    const btn = document.createElement("button");
    btn.textContent = animal.name + (unlocked ? "" : " 🔒");
    btn.disabled = !unlocked;
    btn.addEventListener("click", () => showAnimalDetailScreen(animal));
    animalsList.appendChild(btn);
  });
}

backFromAnimalsBtn.addEventListener("click", showMainMenu);

// ======= ANIMAL DETAIL SCREEN =======
function showAnimalDetailScreen(animal) {
  animalDetailScreen.style.display = "flex";
  animalsInfoScreen.style.display = "none";
  document.getElementById("animalName").textContent = animal.name;
  document.getElementById("animalDetailImage").src = animal.image || "https://via.placeholder.com/300x200?text=No+Image";
  document.getElementById("animalInfo").textContent = animal.info || "No info available";
}

backFromDetailBtn.addEventListener("click", showAnimalsInfoScreen);

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