let currentScenarioIndex = 0;
let userScore = parseInt(localStorage.getItem("score")) || 0;
let currentContinent = null;

document.addEventListener("DOMContentLoaded", () => {
  updateRank();
});

function startScenario() {
  currentContinent = null;
  showScreen("scenario-screen");
  loadScenario();
}

function pickContinent() {
  const continent = prompt("Enter continent (Africa, North America)"); 
  if(!continent) return;
  currentContinent = continent;
  showScreen("scenario-screen");
  loadScenario();
}

function showInfo() {
  showScreen("info-screen");
  const listDiv = document.getElementById("animal-list");
  listDiv.innerHTML = "";
  animalsInfo.forEach(animal => {
    const btn = document.createElement("button");
    btn.textContent = animal.unlocked ? animal.name : animal.name + " 🔒";
    btn.onclick = () => showAnimalDetails(animal);
    listDiv.appendChild(btn);
  });
}

function showAnimalDetails(animal) {
  document.getElementById("animal-details").classList.remove("hidden");
  document.getElementById("info-name").innerText = animal.name;
  document.getElementById("info-img").src = animal.image || "images/placeholder.png";
  document.getElementById("info-desc").innerText = animal.description;
  document.getElementById("info-signs").innerText = animal.signsOfAggression.join(", ");
  document.getElementById("info-triggers").innerText = animal.whatMakesThemMad.join(", ");
  document.getElementById("info-tips").innerText = animal.survivalTips.join(", ");
  document.getElementById("animal-list").classList.add("hidden");
}

function backToList() {
  document.getElementById("animal-details").classList.add("hidden");
  document.getElementById("animal-list").classList.remove("hidden");
}

function backToMenu() { showScreen("main-menu"); }

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function loadScenario() {
  const availableScenarios = scenarios.filter(s => {
    const animal = animalsInfo.find(a => a.name === s.animal);
    return animal.unlocked && (!currentContinent || s.continent === currentContinent);
  });

  if(availableScenarios.length === 0){
    alert("No unlocked animals in this continent yet!");
    backToMenu();
    return;
  }

  currentScenarioIndex = Math.floor(Math.random() * availableScenarios.length);
  const scenario = availableScenarios[currentScenarioIndex];

  document.getElementById("animal-name").innerText = scenario.animal;
  const img = new Image();
  img.src = scenario.image || "images/placeholder.png";
  img.onerror = () => img.src = "images/placeholder.png";
  document.getElementById("animal-img").src = img.src;
  document.getElementById("animal-desc").innerText = scenario.description;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  scenario.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => handleAnswer(opt, scenario);
    optionsDiv.appendChild(btn);
  });

  const feedback = document.getElementById("feedback");
  feedback.innerText = "";
  feedback.className = "";
  document.getElementById("next-btn").style.display = "none";
}

function handleAnswer(selectedOption, scenario) {
  const feedback = document.getElementById("feedback");
  if(selectedOption.correct){
    feedback.className = "correct";
    feedback.innerText = "✅ Correct!\n\n" + scenario.explanation;
    updateScore(1);
  } else {
    feedback.className = "wrong";
    feedback.innerText = "❌ Not the best choice\n\n" + scenario.explanation;
  }
  document.getElementById("next-btn").style.display = "inline-block";
}

function nextScenario() {
  unlockAnimals();
  loadScenario();
}

function updateScore(points) {
  userScore += points;
  localStorage.setItem("score", userScore);
  updateRank();
}

function updateRank() {
  let rank = "Beginner Observer";
  if(userScore >= 5) rank = "Junior Ranger";
  if(userScore >= 10) rank = "Field Guide";
  if(userScore >= 20) rank = "Wildlife Protector";
  if(userScore >= 35) rank = "Master Ranger";
  document.getElementById("rank").innerText = `Rank: ${rank}`;
}

function unlockAnimals() {
  animalsInfo.forEach(animal => {
    if(!animal.unlocked){
      if(userScore >= 5 && animal.name === "Elephant") animal.unlocked = true;
    }
  });
}

function shareRank() {
  const rank = document.getElementById("rank").innerText;
  const text = `I just reached ${rank} in Wildlife Survival Game! Can you beat me? 🐘🦌🦁`;
  const url = "https://yourgamewebsite.com";

  if(navigator.share){
    navigator.share({ title:'Wildlife Survival Game', text, url });
  } else {
    const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(fbShare, "_blank");
  }
}