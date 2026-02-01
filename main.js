// Game State Management
let gameState = {
  currentScenarioIndex: 0,
  userScore: parseInt(localStorage.getItem("wildlife_score")) || 0,
  highScore: parseInt(localStorage.getItem("wildlife_highscore")) || 0,
  currentContinent: null,
  completedScenarios: JSON.parse(localStorage.getItem("wildlife_completed")) || [],
  unlockedAnimals: JSON.parse(localStorage.getItem("wildlife_unlocked")) || ["Moose", "Elephant"],
  gameSession: {
    scenariosPlayed: 0,
    correctAnswers: 0,
    currentStreak: 0,
    bestStreak: parseInt(localStorage.getItem("wildlife_best_streak")) || 0
  },
  settings: {
    soundEnabled: true,
    animationsEnabled: true,
    difficulty: "medium"
  }
};

// Game Elements
let particlesContainer = null;
let currentScenario = null;
let scenarioQueue = [];

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initGame();
  updateDisplay();
  showNotification("Welcome to Wildlife Survival Game!", "Learn animal behavior and test your survival skills.", "info");
  
  // Initialize particles
  initParticles();
  
  // Load settings from localStorage
  loadSettings();
});

// Initialize game state and UI
function initGame() {
  updateScoreDisplay();
  updateRank();
  updateAnimalCount();
  
  // Initialize scenario queue
  generateScenarioQueue();
}

// Generate random scenario queue
function generateScenarioQueue() {
  scenarioQueue = [];
  const availableScenarios = getAvailableScenarios();
  
  // Shuffle scenarios
  const shuffled = [...availableScenarios].sort(() => Math.random() - 0.5);
  
  // Take up to 10 scenarios for a session
  scenarioQueue = shuffled.slice(0, 10);
}

// Get available scenarios based on unlocked animals and continent
function getAvailableScenarios() {
  return scenarios.filter(scenario => {
    const isUnlocked = gameState.unlockedAnimals.includes(scenario.animal);
    const continentMatch = !gameState.currentContinent || 
                          gameState.currentContinent === "Random" || 
                          scenario.continent === gameState.currentContinent;
    
    return isUnlocked && continentMatch;
  });
}

// Update display elements
function updateDisplay() {
  document.getElementById("score").textContent = gameState.userScore;
  document.getElementById("current-score").textContent = gameState.userScore;
  document.getElementById("animal-count").textContent = `${gameState.unlockedAnimals.length}/${animalsInfo.length}`;
}

// Update score display with animation
function updateScoreDisplay() {
  const scoreElement = document.getElementById("score");
  const currentScore = parseInt(scoreElement.textContent);
  const targetScore = gameState.userScore;
  
  if (currentScore !== targetScore) {
    animateCounter(scoreElement, currentScore, targetScore, 500);
  }
}

// Animate number counter
function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = end > start ? 1 : -1;
  const stepTime = Math.abs(Math.floor(duration / range));
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    element.textContent = current;
    
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Show screen with transition
function showScreen(id) {
  // Hide all screens
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });
  
  // Show target screen with delay for transition
  setTimeout(() => {
    const targetScreen = document.getElementById(id);
    targetScreen.classList.remove("hidden");
    
    // Initialize screen-specific content
    switch(id) {
      case "scenario-screen":
        loadScenario();
        break;
      case "info-screen":
        loadAnimalList();
        break;
    }
  }, 50);
}

// Back to main menu
function backToMenu() {
  showScreen("main-menu");
  updateDisplay();
}

// Show continent selection screen
function showContinentSelect() {
  showScreen("continent-screen");
  updateContinentProgress();
}

// Update continent progress display
function updateContinentProgress() {
  const continents = ["Africa", "North America", "Asia"];
  
  continents.forEach(continent => {
    const card = document.querySelector(`.continent-card[data-continent="${continent}"]`);
    if (!card) return;
    
    const animalsInContinent = animalsInfo.filter(a => a.continent === continent);
    const unlockedInContinent = animalsInContinent.filter(a => gameState.unlockedAnimals.includes(a.name));
    const progress = (unlockedInContinent.length / animalsInContinent.length) * 100;
    
    const progressFill = card.querySelector(".progress-fill");
    const progressText = card.querySelector(".continent-progress span");
    
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${unlockedInContinent.length}/${animalsInContinent.length} animals unlocked`;
    }
  });
}

// Select continent and start game
function selectContinent(continent) {
  gameState.currentContinent = continent;
  showScreen("scenario-screen");
  generateScenarioQueue();
  gameState.gameSession.scenariosPlayed = 0;
  gameState.gameSession.correctAnswers = 0;
  gameState.gameSession.currentStreak = 0;
}

// Start random scenario
function startScenario() {
  gameState.currentContinent = null;
  showScreen("scenario-screen");
  generateScenarioQueue();
  gameState.gameSession.scenariosPlayed = 0;
  gameState.gameSession.correctAnswers = 0;
  gameState.gameSession.currentStreak = 0;
}

// Load scenario - FIXED: Removed hint functionality
function loadScenario() {
  if (scenarioQueue.length === 0) {
    generateScenarioQueue();
  }
  
  currentScenario = scenarioQueue.shift();
  gameState.gameSession.scenariosPlayed++;
  
  // Update UI elements
  document.getElementById("animal-name").textContent = currentScenario.animal;
  document.getElementById("animal-continent").textContent = currentScenario.continent;
  document.getElementById("animal-desc").textContent = currentScenario.description;
  document.getElementById("scenario-number").textContent = gameState.gameSession.scenariosPlayed;
  document.getElementById("scenario-progress-fill").style.width = `${(gameState.gameSession.scenariosPlayed / 10) * 100}%`;
  
  // Load image with fallback
  const imgElement = document.getElementById("animal-img");
  const infoImg = new Image();
  infoImg.onload = () => {
    imgElement.src = currentScenario.image;
  };
  infoImg.onerror = () => {
    imgElement.src = "images/placeholder.png";
  };
  infoImg.src = currentScenario.image;
  
  // Set danger level
  const animalInfo = animalsInfo.find(a => a.name === currentScenario.animal);
  if (animalInfo) {
    document.getElementById("danger-level").innerHTML = 
      `<i class="fas fa-exclamation-triangle"></i> ${animalInfo.dangerLevel || "Medium Danger"}`;
  }
  
  // Load options
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  
  const optionLetters = ["A", "B", "C", "D"];
  currentScenario.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.innerHTML = `
      <span class="option-icon">${optionLetters[index]}</span>
      <span class="option-text">${option.text}</span>
    `;
    button.onclick = () => handleAnswer(option, currentScenario);
    optionsDiv.appendChild(button);
  });
  
  // Reset feedback
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback-text").textContent = "";
  document.getElementById("score-change").textContent = "";
  document.getElementById("unlock-notification").classList.add("hidden");
}

// Handle answer selection
function handleAnswer(selectedOption, scenario) {
  const options = document.querySelectorAll(".option-btn");
  const feedbackDiv = document.getElementById("feedback");
  const feedbackText = document.getElementById("feedback-text");
  const scoreChange = document.getElementById("score-change");
  
  // Disable all options
  options.forEach(opt => {
    opt.disabled = true;
    opt.style.cursor = "default";
  });
  
  // Mark correct/incorrect answers
  options.forEach((opt, index) => {
    const optionText = opt.querySelector(".option-text").textContent;
    const scenarioOption = scenario.options.find(o => o.text === optionText);
    
    if (scenarioOption.correct) {
      opt.classList.add("correct");
    } else if (optionText === selectedOption.text && !selectedOption.correct) {
      opt.classList.add("incorrect");
    }
  });
  
  // Show feedback
  feedbackDiv.classList.remove("hidden");
  
  if (selectedOption.correct) {
    // Correct answer
    const pointsEarned = 10 + (gameState.gameSession.currentStreak * 2);
    gameState.userScore += pointsEarned;
    gameState.gameSession.correctAnswers++;
    gameState.gameSession.currentStreak++;
    
    if (gameState.gameSession.currentStreak > gameState.gameSession.bestStreak) {
      gameState.gameSession.bestStreak = gameState.gameSession.currentStreak;
      localStorage.setItem("wildlife_best_streak", gameState.gameSession.bestStreak);
      showNotification("New Best Streak!", `You've answered ${gameState.gameSession.bestStreak} questions correctly in a row!`, "success");
    }
    
    feedbackText.innerHTML = `✅ <strong>Correct!</strong> ${scenario.explanation}`;
    scoreChange.textContent = `+${pointsEarned} points`;
    scoreChange.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
    
    // Play success sound
    playSound("correct");
    
    // Show particle effect
    createParticles("correct");
  } else {
    // Incorrect answer
    gameState.gameSession.currentStreak = 0;
    feedbackText.innerHTML = `❌ <strong>Incorrect.</strong> ${scenario.explanation}`;
    scoreChange.textContent = `+0 points`;
    scoreChange.style.background = "linear-gradient(135deg, #e74c3c, #c0392b)";
    
    // Play error sound
    playSound("incorrect");
    
    // Show particle effect
    createParticles("incorrect");
  }
  
  // Update game state
  updateGameState();
  
  // Check for unlocks
  checkForUnlocks();
  
  // Show next button
  document.getElementById("next-btn").style.display = "block";
}

// Update game state and localStorage
function updateGameState() {
  // Update high score if needed
  if (gameState.userScore > gameState.highScore) {
    gameState.highScore = gameState.userScore;
    localStorage.setItem("wildlife_highscore", gameState.highScore);
  }
  
  // Save current score
  localStorage.setItem("wildlife_score", gameState.userScore);
  
  // Update UI
  updateScoreDisplay();
  updateRank();
}

// Update player rank
function updateRank() {
  let rank = "Beginner Observer";
  let rankColor = "#95a5a6";
  
  if (gameState.userScore >= 100) {
    rank = "Master Ranger";
    rankColor = "#f39c12";
  } else if (gameState.userScore >= 50) {
    rank = "Wildlife Protector";
    rankColor = "#3498db";
  } else if (gameState.userScore >= 25) {
    rank = "Field Guide";
    rankColor = "#2ecc71";
  } else if (gameState.userScore >= 10) {
    rank = "Junior Ranger";
    rankColor = "#9b59b6";
  }
  
  const rankElement = document.getElementById("rank");
  rankElement.textContent = rank;
  rankElement.style.color = rankColor;
  
  // Save rank to localStorage
  localStorage.setItem("wildlife_rank", rank);
}

// Check for animal unlocks
function checkForUnlocks() {
  animalsInfo.forEach(animal => {
    if (!gameState.unlockedAnimals.includes(animal.name)) {
      // Unlock based on score thresholds
      if (gameState.userScore >= animal.unlockScore) {
        gameState.unlockedAnimals.push(animal.name);
        
        // Show unlock notification
        const unlockNotification = document.getElementById("unlock-notification");
        unlockNotification.querySelector("span").textContent = `New animal unlocked: ${animal.name}!`;
        unlockNotification.classList.remove("hidden");
        
        // Show system notification
        showNotification("Animal Unlocked!", `You've unlocked ${animal.name}! Check the encyclopedia.`, "success");
        
        // Save to localStorage
        localStorage.setItem("wildlife_unlocked", JSON.stringify(gameState.unlockedAnimals));
        
        // Update animal count
        updateAnimalCount();
      }
    }
  });
}

// Update animal count display
function updateAnimalCount() {
  document.getElementById("animal-count").textContent = `${gameState.unlockedAnimals.length}/${animalsInfo.length}`;
}

// Load next scenario
function nextScenario() {
  if (scenarioQueue.length === 0 || gameState.gameSession.scenariosPlayed >= 10) {
    // End of session
    showSessionSummary();
  } else {
    loadScenario();
  }
}

// Show session summary
function showSessionSummary() {
  const accuracy = (gameState.gameSession.correctAnswers / gameState.gameSession.scenariosPlayed) * 100;
  
  showNotification("Session Complete!", 
    `Accuracy: ${accuracy.toFixed(1)}% | Score: +${gameState.userScore} | Best Streak: ${gameState.gameSession.bestStreak}`, 
    "info");
  
  // Return to menu
  backToMenu();
}

// Show animal encyclopedia
function showInfo() {
  showScreen("info-screen");
  loadAnimalList();
}

// Load animal list in encyclopedia
function loadAnimalList() {
  const listDiv = document.getElementById("animal-list");
  listDiv.innerHTML = "";
  
  const searchTerm = document.getElementById("animal-search").value.toLowerCase();
  const filterContinent = document.getElementById("continent-filter").value;
  
  animalsInfo.forEach(animal => {
    // Apply filters
    if (searchTerm && !animal.name.toLowerCase().includes(searchTerm) && 
        !animal.description.toLowerCase().includes(searchTerm)) {
      return;
    }
    
    if (filterContinent !== "all" && animal.continent !== filterContinent) {
      return;
    }
    
    const isUnlocked = gameState.unlockedAnimals.includes(animal.name);
    
    const animalItem = document.createElement("div");
    animalItem.className = `animal-item ${isUnlocked ? '' : 'locked'}`;
    animalItem.onclick = () => showAnimalDetails(animal);
    
    animalItem.innerHTML = `
      <img src="${animal.image || 'images/placeholder.png'}" alt="${animal.name}" class="animal-item-image">
      <div class="animal-item-info">
        <div class="animal-item-name">${animal.name}</div>
        <div class="animal-item-continent">${animal.continent}</div>
        <div class="animal-item-status ${isUnlocked ? 'unlocked' : 'locked'}">
          <i class="fas ${isUnlocked ? 'fa-unlock' : 'fa-lock'}"></i>
          ${isUnlocked ? 'Unlocked' : 'Locked'}
        </div>
      </div>
    `;
    
    listDiv.appendChild(animalItem);
  });
}

// Show animal details
function showAnimalDetails(animal) {
  const isUnlocked = gameState.unlockedAnimals.includes(animal.name);
  
  if (!isUnlocked) {
    showNotification("Animal Locked", `Score ${animal.unlockScore} points to unlock ${animal.name}`, "warning");
    return;
  }
  
  document.getElementById("animal-list").classList.add("hidden");
  document.getElementById("animal-details").classList.remove("hidden");
  
  // Populate details
  document.getElementById("info-name").textContent = animal.name;
  document.getElementById("info-continent").textContent = animal.continent;
  document.getElementById("info-desc").textContent = animal.description;
  
  // Set image
  const imgElement = document.getElementById("info-img");
  const infoImg = new Image();
  infoImg.onload = () => {
    imgElement.src = animal.image;
  };
  infoImg.onerror = () => {
    imgElement.src = "images/placeholder.png";
  };
  infoImg.src = animal.image;
  
  // Populate lists
  populateList("info-signs", animal.signsOfAggression);
  populateList("info-triggers", animal.whatMakesThemMad);
  populateList("info-tips", animal.survivalTips);
  
  // Set statistics
  if (animal.weight) {
    document.getElementById("info-weight").textContent = animal.weight;
  }
  
  if (animal.speed) {
    document.getElementById("info-speed").textContent = animal.speed;
  }
  
  // Set danger level bar
  const dangerLevels = {
    "Low": 25,
    "Medium": 50,
    "High": 75,
    "Extreme": 100
  };
  
  const dangerLevel = animal.dangerLevel || "Medium";
  document.getElementById("danger-bar").style.width = `${dangerLevels[dangerLevel] || 50}%`;
}

// Populate list element
function populateList(elementId, items) {
  const listElement = document.getElementById(elementId);
  listElement.innerHTML = "";
  
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

// Back to animal list
function backToList() {
  document.getElementById("animal-details").classList.add("hidden");
  document.getElementById("animal-list").classList.remove("hidden");
}

// Show tutorial
function showTutorial() {
  showScreen("tutorial-screen");
}

// Share rank
function shareRank() {
  const rank = document.getElementById("rank").textContent;
  const score = gameState.userScore;
  const animalCount = gameState.unlockedAnimals.length;
  
  const shareText = `I just reached ${rank} in Wildlife Survival Game with ${score} points and ${animalCount} animals unlocked! Can you beat me? 🐘🦌🦁`;
  const shareUrl = 'https://yourgamewebsite.com';
  
  if (navigator.share) {
    navigator.share({
      title: 'Wildlife Survival Game',
      text: shareText,
      url: shareUrl
    });
  } else {
    // Fallback for desktop
    const textArea = document.createElement('textarea');
    textArea.value = `${shareText}\n\nPlay here: ${shareUrl}`;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    showNotification("Copied to Clipboard!", "Share text copied to clipboard. Paste it anywhere to share!", "success");
  }
}

// Show notification
function showNotification(title, message, type = "info") {
  const container = document.getElementById("notification-container");
  
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas ${getNotificationIcon(type)}"></i>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
  `;
  
  container.appendChild(notification);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
  switch(type) {
    case "success": return "fa-check-circle";
    case "error": return "fa-times-circle";
    case "warning": return "fa-exclamation-triangle";
    default: return "fa-info-circle";
  }
}

// Play sound
function playSound(type) {
  if (!gameState.settings.soundEnabled) return;
  
  // In a real implementation, you would have audio files
  // For now, we'll just log
  console.log(`Playing ${type} sound`);
}

// Initialize particles
function initParticles() {
  particlesContainer = document.getElementById("particles-container");
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    createParticle();
  }
}

// Create a single particle
function createParticle() {
  const particle = document.createElement("div");
  particle.className = "particle";
  
  // Random properties
  const size = Math.random() * 10 + 5;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  // Apply styles
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, ${Math.random() * 0.1});
    border-radius: 50%;
    left: ${posX}%;
    top: ${posY}%;
    animation: float ${duration}s linear ${delay}s infinite;
    pointer-events: none;
  `;
  
  particlesContainer.appendChild(particle);
}

// Create particles for feedback
function createParticles(type) {
  if (!gameState.settings.animationsEnabled) return;
  
  const color = type === "correct" ? "#2ecc71" : "#e74c3c";
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "feedback-particle";
    
    // Random properties
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 3 + 2;
    const duration = Math.random() * 1 + 0.5;
    
    // Calculate position (center of screen)
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    // Apply styles
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${startX}px;
      top: ${startY}px;
      pointer-events: none;
      z-index: 1000;
      opacity: 0.8;
    `;
    
    document.body.appendChild(particle);
    
    // Animate
    const endX = startX + Math.cos(angle) * velocity * 100;
    const endY = startY + Math.sin(angle) * velocity * 100;
    
    particle.animate([
      { 
        transform: `translate(0, 0) scale(1)`,
        opacity: 0.8
      },
      { 
        transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
        opacity: 0
      }
    ], {
      duration: duration * 1000,
      easing: 'ease-out'
    });
    
    // Remove after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, duration * 1000);
  }
}

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem("wildlife_settings");
  if (savedSettings) {
    gameState.settings = JSON.parse(savedSettings);
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem("wildlife_settings", JSON.stringify(gameState.settings));
}

// Event listeners for search and filter
document.addEventListener("DOMContentLoaded", () => {
  const animalSearch = document.getElementById("animal-search");
  const continentFilter = document.getElementById("continent-filter");
  
  if (animalSearch) {
    animalSearch.addEventListener("input", loadAnimalList);
  }
  
  if (continentFilter) {
    continentFilter.addEventListener("change", loadAnimalList);
  }
});

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 0.1;
    }
    90% {
      opacity: 0.1;
    }
    100% {
      transform: translateY(-100vh) translateX(20px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);