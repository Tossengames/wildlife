// Game State Management
let gameState = {
  currentScenarioIndex: 0,
  userScore: parseInt(localStorage.getItem("wildlife_score")) || 0,
  highScore: parseInt(localStorage.getItem("wildlife_highscore")) || 0,
  currentContinent: null,
  completedScenarios: JSON.parse(localStorage.getItem("wildlife_completed")) || [],
  unlockedAnimals: JSON.parse(localStorage.getItem("wildlife_unlocked")) || ["Moose"],
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
let isInitialized = false;

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // Show loading overlay
  showLoading(true);
  
  // Initialize with a small delay for better UX
  setTimeout(() => {
    console.log("Game initializing...");
    
    // Hide everything except main menu
    hideAllScreens();
    showScreen("main-menu");
    
    initGame();
    updateDisplay();
    
    // Initialize particles
    initParticles();
    
    // Load settings from localStorage
    loadSettings();
    
    // Add event listeners
    const animalSearch = document.getElementById("animal-search");
    const continentFilter = document.getElementById("continent-filter");
    
    if (animalSearch) {
      animalSearch.addEventListener("input", debounce(loadAnimalList, 300));
    }
    
    if (continentFilter) {
      continentFilter.addEventListener("change", loadAnimalList);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Prevent zoom on double-tap
    preventDoubleTapZoom();
    
    isInitialized = true;
    showLoading(false);
    
    console.log("Game initialized successfully");
    
    // Show welcome notification
    setTimeout(() => {
      showNotification("Welcome!", "Start by playing scenarios or browsing the encyclopedia", "info");
    }, 1000);
  }, 500);
});

// Show/hide loading overlay
function showLoading(show) {
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    if (show) {
      loadingOverlay.classList.add('active');
    } else {
      loadingOverlay.classList.remove('active');
    }
  }
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Hide all screens
function hideAllScreens() {
  const screens = document.querySelectorAll('.screen, .screen-overlay');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
}

// Show screen with transition
function showScreen(id) {
  if (!isInitialized) return;
  
  console.log("Showing screen:", id);
  
  // Hide all screens first
  hideAllScreens();
  
  // Show target screen
  const targetScreen = document.getElementById(id);
  if (targetScreen) {
    targetScreen.classList.add('active');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Initialize screen-specific content
    switch(id) {
      case "scenario-screen":
        loadScenario();
        break;
      case "info-screen":
        loadAnimalList();
        break;
      case "animal-details-screen":
        // Already handled by showAnimalDetails
        break;
      case "continent-screen":
        updateContinentProgress();
        break;
    }
  }
}

// Show overlay screen
function showOverlay(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Hide overlay screen
function hideOverlay(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Back to main menu
function backToMenu() {
  console.log("Back to menu");
  showScreen("main-menu");
  updateDisplay();
}

// Special back function from feedback overlay
function backToMenuFromFeedback() {
  hideOverlay("feedback-screen");
  showScreen("main-menu");
  updateDisplay();
}

// Initialize game state and UI
function initGame() {
  updateScoreDisplay();
  updateRank();
  updateAnimalCount();
  
  // Initialize scenario queue
  generateScenarioQueue();
  
  // Update best streak display
  document.getElementById('best-streak').textContent = gameState.gameSession.bestStreak;
}

// Generate random scenario queue
function generateScenarioQueue() {
  scenarioQueue = [];
  const availableScenarios = getAvailableScenarios();
  
  if (availableScenarios.length === 0) {
    showNotification("No Scenarios Available", "Unlock more animals to play scenarios", "warning");
    return;
  }
  
  // Shuffle scenarios
  const shuffled = [...availableScenarios].sort(() => Math.random() - 0.5);
  
  // Take up to 10 scenarios for a session
  scenarioQueue = shuffled.slice(0, 10);
  
  console.log(`Generated ${scenarioQueue.length} scenarios for queue`);
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
  const currentScore = parseInt(scoreElement.textContent) || 0;
  const targetScore = gameState.userScore;
  
  if (currentScore !== targetScore) {
    animateCounter(scoreElement, currentScore, targetScore, 500);
  }
}

// Animate number counter
function animateCounter(element, start, end, duration) {
  if (!element) return;
  
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

// Show continent selection screen
function showContinentSelect() {
  showScreen("continent-screen");
  updateContinentProgress();
}

// Update continent progress display
function updateContinentProgress() {
  const continents = ["Africa", "North America", "Asia", "Random"];
  
  continents.forEach(continent => {
    const card = document.querySelector(`.continent-card[data-continent="${continent}"]`);
    if (!card) return;
    
    let animalsInContinent, unlockedInContinent;
    
    if (continent === "Random") {
      animalsInContinent = animalsInfo;
      unlockedInContinent = animalsInfo.filter(a => gameState.unlockedAnimals.includes(a.name));
    } else {
      animalsInContinent = animalsInfo.filter(a => a.continent === continent);
      unlockedInContinent = animalsInContinent.filter(a => gameState.unlockedAnimals.includes(a.name));
    }
    
    const progress = animalsInContinent.length > 0 ? 
      (unlockedInContinent.length / animalsInContinent.length) * 100 : 0;
    
    const progressFill = card.querySelector(".progress-fill");
    const progressText = card.querySelector(".progress-text");
    
    if (progressFill) {
      progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
      progressText.textContent = `${unlockedInContinent.length}/${animalsInContinent.length} animals`;
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
  
  // Update session display
  document.getElementById("scenario-number").textContent = "1";
  document.getElementById("scenario-progress-fill").style.width = "10%";
  document.getElementById("current-streak").textContent = "0";
  document.getElementById("session-accuracy").textContent = "0%";
}

// Start random scenario
function startScenario() {
  gameState.currentContinent = null;
  showScreen("scenario-screen");
  generateScenarioQueue();
  gameState.gameSession.scenariosPlayed = 0;
  gameState.gameSession.correctAnswers = 0;
  gameState.gameSession.currentStreak = 0;
  
  // Update session display
  document.getElementById("scenario-number").textContent = "1";
  document.getElementById("scenario-progress-fill").style.width = "10%";
  document.getElementById("current-streak").textContent = "0";
  document.getElementById("session-accuracy").textContent = "0%";
}

// Load scenario
function loadScenario() {
  console.log("Loading scenario...");
  
  if (scenarioQueue.length === 0) {
    generateScenarioQueue();
  }
  
  if (scenarioQueue.length === 0) {
    showNotification("No Scenarios", "Please unlock more animals to continue", "warning");
    backToMenu();
    return;
  }
  
  // Reset any previous state
  hideOverlay("feedback-screen");
  const unlockNotification = document.getElementById("unlock-notification");
  if (unlockNotification) {
    unlockNotification.style.display = "none";
  }
  
  // Clear any previous option selections
  const options = document.querySelectorAll(".option-btn");
  options.forEach(opt => {
    opt.classList.remove("correct", "incorrect");
    opt.disabled = false;
  });
  
  currentScenario = scenarioQueue.shift();
  gameState.gameSession.scenariosPlayed++;
  
  // Update UI elements
  document.getElementById("animal-name").textContent = currentScenario.animal;
  document.getElementById("animal-continent").textContent = currentScenario.continent;
  document.getElementById("animal-desc").textContent = currentScenario.description;
  document.getElementById("scenario-number").textContent = gameState.gameSession.scenariosPlayed;
  
  // Update progress bar
  const progressPercent = (gameState.gameSession.scenariosPlayed / 10) * 100;
  document.getElementById("scenario-progress-fill").style.width = `${progressPercent}%`;
  
  // Load image with fallback
  const imgElement = document.getElementById("animal-img");
  if (imgElement) {
    const infoImg = new Image();
    infoImg.onload = function() {
      imgElement.src = currentScenario.image;
      imgElement.style.opacity = "1";
    };
    infoImg.onerror = function() {
      imgElement.src = "images/placeholder.png";
      imgElement.style.opacity = "1";
    };
    imgElement.style.opacity = "0.5";
    infoImg.src = currentScenario.image;
  }
  
  // Set danger level
  const animalInfo = getAnimalByName(currentScenario.animal);
  if (animalInfo) {
    const dangerElement = document.getElementById("danger-level");
    if (dangerElement) {
      dangerElement.innerHTML = 
        `<i class="fas fa-exclamation-triangle"></i><span>${animalInfo.dangerLevel || "Medium Danger"}</span>`;
    }
  }
  
  // Load options
  const optionsDiv = document.getElementById("options");
  if (!optionsDiv) return;
  
  optionsDiv.innerHTML = "";
  
  const optionLetters = ["A", "B", "C", "D"];
  currentScenario.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.setAttribute("data-index", index);
    button.innerHTML = `
      <span class="option-icon">${optionLetters[index]}</span>
      <span class="option-text">${option.text}</span>
    `;
    button.onclick = function() { 
      handleAnswer(option, currentScenario); 
    };
    
    // Add touch feedback
    button.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    button.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
    
    optionsDiv.appendChild(button);
  });
}

// Handle answer selection
function handleAnswer(selectedOption, scenario) {
  console.log("Answer selected:", selectedOption.text);
  
  const options = document.querySelectorAll(".option-btn");
  
  // Disable all options immediately
  options.forEach(opt => {
    opt.disabled = true;
    opt.style.cursor = "not-allowed";
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
  
  // Calculate results
  const basePoints = 10;
  const streakBonus = gameState.gameSession.currentStreak * 2;
  const pointsEarned = selectedOption.correct ? basePoints + streakBonus : 0;
  
  if (selectedOption.correct) {
    gameState.userScore += pointsEarned;
    gameState.gameSession.correctAnswers++;
    gameState.gameSession.currentStreak++;
    
    if (gameState.gameSession.currentStreak > gameState.gameSession.bestStreak) {
      gameState.gameSession.bestStreak = gameState.gameSession.currentStreak;
      localStorage.setItem("wildlife_best_streak", gameState.gameSession.bestStreak);
      document.getElementById('best-streak').textContent = gameState.gameSession.bestStreak;
    }
  } else {
    gameState.gameSession.currentStreak = 0;
  }
  
  // Update game state
  updateGameState();
  
  // Show feedback overlay after a short delay
  setTimeout(() => {
    showFeedbackOverlay(selectedOption.correct, pointsEarned, scenario.explanation);
  }, 500);
  
  // Check for unlocks
  checkForUnlocks();
}

// Show feedback overlay
function showFeedbackOverlay(isCorrect, points, explanation) {
  console.log("Showing feedback overlay");
  
  const icon = document.getElementById("feedback-icon");
  const title = document.getElementById("feedback-title");
  const scoreChange = document.getElementById("score-change");
  const feedbackText = document.getElementById("feedback-text");
  const currentStreak = document.getElementById("current-streak");
  const sessionAccuracy = document.getElementById("session-accuracy");
  
  if (!icon || !title || !scoreChange || !feedbackText || !currentStreak || !sessionAccuracy) {
    console.error("Feedback elements not found");
    return;
  }
  
  // Set feedback content
  if (isCorrect) {
    icon.innerHTML = '<i class="fas fa-check-circle"></i>';
    title.textContent = "Correct!";
    scoreChange.textContent = `+${points} points`;
    scoreChange.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
  } else {
    icon.innerHTML = '<i class="fas fa-times-circle"></i>';
    title.textContent = "Incorrect";
    scoreChange.textContent = "+0 points";
    scoreChange.style.background = "linear-gradient(135deg, #e74c3c, #c0392b)";
  }
  
  feedbackText.textContent = explanation;
  currentStreak.textContent = gameState.gameSession.currentStreak;
  
  // Calculate session accuracy
  const accuracy = gameState.gameSession.scenariosPlayed > 0 ? 
    Math.round((gameState.gameSession.correctAnswers / gameState.gameSession.scenariosPlayed) * 100) : 0;
  sessionAccuracy.textContent = `${accuracy}%`;
  
  // Show overlay
  showOverlay("feedback-screen");
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
  
  // Save unlocked animals
  localStorage.setItem("wildlife_unlocked", JSON.stringify(gameState.unlockedAnimals));
  
  // Save settings
  saveSettings();
  
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
  if (rankElement) {
    rankElement.textContent = rank;
    rankElement.style.color = rankColor;
    
    // Save rank to localStorage
    localStorage.setItem("wildlife_rank", rank);
  }
}

// Check for animal unlocks
function checkForUnlocks() {
  let unlockedNewAnimal = false;
  let unlockedAnimalName = "";
  
  animalsInfo.forEach(animal => {
    if (!gameState.unlockedAnimals.includes(animal.name)) {
      // Unlock based on score thresholds
      if (gameState.userScore >= animal.unlockScore) {
        gameState.unlockedAnimals.push(animal.name);
        unlockedNewAnimal = true;
        unlockedAnimalName = animal.name;
        
        // Save to localStorage
        localStorage.setItem("wildlife_unlocked", JSON.stringify(gameState.unlockedAnimals));
        
        // Update animal count
        updateAnimalCount();
      }
    }
  });
  
  // Show unlock notification in feedback overlay
  if (unlockedNewAnimal) {
    const unlockNotification = document.getElementById("unlock-notification");
    const unlockMessage = document.getElementById("unlock-message");
    if (unlockNotification && unlockMessage) {
      unlockMessage.textContent = `You've unlocked ${unlockedAnimalName}!`;
      unlockNotification.style.display = "flex";
      
      // Show system notification
      showNotification("Animal Unlocked!", `Check ${unlockedAnimalName} in the encyclopedia!`, "success");
    }
  }
}

// Update animal count display
function updateAnimalCount() {
  const animalCountElement = document.getElementById("animal-count");
  if (animalCountElement) {
    animalCountElement.textContent = `${gameState.unlockedAnimals.length}/${animalsInfo.length}`;
  }
}

// Load next scenario
function nextScenario() {
  console.log("Loading next scenario");
  
  // Hide feedback overlay
  hideOverlay("feedback-screen");
  
  if (scenarioQueue.length === 0 || gameState.gameSession.scenariosPlayed >= 10) {
    // End of session
    showSessionSummary();
  } else {
    // Small delay before loading next scenario for better UX
    setTimeout(() => {
      loadScenario();
    }, 300);
  }
}

// Show session summary
function showSessionSummary() {
  const accuracy = gameState.gameSession.scenariosPlayed > 0 ? 
    Math.round((gameState.gameSession.correctAnswers / gameState.gameSession.scenariosPlayed) * 100) : 0;
  
  showNotification("Session Complete!", 
    `Accuracy: ${accuracy}% | Score: +${gameState.userScore} | Best Streak: ${gameState.gameSession.bestStreak}`, 
    "info");
  
  // Return to menu after a delay
  setTimeout(() => {
    backToMenu();
  }, 2000);
}

// Show animal encyclopedia
function showInfo() {
  showScreen("info-screen");
  loadAnimalList();
}

// Load animal list in encyclopedia
function loadAnimalList() {
  const listDiv = document.getElementById("animal-list");
  if (!listDiv) return;
  
  // Show loading state
  listDiv.innerHTML = '<div class="loading-state">Loading animals...</div>';
  
  // Small delay for better UX
  setTimeout(() => {
    listDiv.innerHTML = "";
    
    const searchTerm = document.getElementById("animal-search")?.value.toLowerCase() || "";
    const filterContinent = document.getElementById("continent-filter")?.value || "all";
    
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
      animalItem.setAttribute("data-continent", animal.continent);
      animalItem.setAttribute("data-unlocked", isUnlocked);
      animalItem.onclick = function() { showAnimalDetails(animal); };
      
      // Add touch feedback
      animalItem.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
      }, { passive: true });
      
      animalItem.addEventListener('touchend', function() {
        this.style.transform = '';
      }, { passive: true });
      
      animalItem.innerHTML = `
        <img src="${animal.image || 'images/placeholder.png'}" alt="${animal.name}" class="animal-item-image" loading="lazy">
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
    
    // If no animals match the filter
    if (listDiv.children.length === 0) {
      listDiv.innerHTML = '<div class="no-results">No animals found matching your search.</div>';
    }
  }, 100);
}

// Show animal details in separate screen
function showAnimalDetails(animal) {
  const isUnlocked = gameState.unlockedAnimals.includes(animal.name);
  
  if (!isUnlocked) {
    showNotification("Animal Locked", `Score ${animal.unlockScore} points to unlock ${animal.name}`, "warning");
    return;
  }
  
  // Switch to animal details screen
  showScreen("animal-details-screen");
  
  // Populate details
  document.getElementById("info-name").textContent = animal.name;
  document.getElementById("info-continent").textContent = animal.continent;
  document.getElementById("info-desc").textContent = animal.description;
  
  // Set animal status
  const statusElement = document.getElementById("animal-status");
  if (statusElement) {
    if (isUnlocked) {
      statusElement.innerHTML = '<i class="fas fa-unlock"></i><span>Unlocked</span>';
      statusElement.className = "animal-status";
    } else {
      statusElement.innerHTML = '<i class="fas fa-lock"></i><span>Locked</span>';
      statusElement.className = "animal-status locked";
    }
  }
  
  // Set image
  const imgElement = document.getElementById("info-img");
  if (imgElement) {
    const infoImg = new Image();
    infoImg.onload = function() {
      imgElement.src = animal.image;
      imgElement.style.opacity = "1";
    };
    infoImg.onerror = function() {
      imgElement.src = "images/placeholder.png";
      imgElement.style.opacity = "1";
    };
    imgElement.style.opacity = "0.5";
    infoImg.src = animal.image;
  }
  
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
  
  if (animal.scientificName) {
    document.getElementById("info-scientific-name").textContent = animal.scientificName;
  }
  
  if (animal.funFact) {
    document.getElementById("info-funfact").textContent = animal.funFact;
  }
  
  // Set danger level
  const dangerLevels = {
    "Low": { width: 25, color: "#2ecc71", text: "Low" },
    "Medium": { width: 50, color: "#f39c12", text: "Medium" },
    "High": { width: 75, color: "#e67e22", text: "High" },
    "Extreme": { width: 100, color: "#e74c3c", text: "Extreme" }
  };
  
  const dangerLevel = animal.dangerLevel || "Medium";
  const dangerConfig = dangerLevels[dangerLevel] || dangerLevels.Medium;
  
  const dangerBar = document.getElementById("danger-bar");
  const dangerLevelText = document.getElementById("danger-level-text");
  
  if (dangerBar) {
    dangerBar.style.width = `${dangerConfig.width}%`;
    dangerBar.style.background = `linear-gradient(90deg, #2ecc71 0%, #f39c12 ${dangerConfig.width/2}%, #e74c3c 100%)`;
  }
  
  if (dangerLevelText) {
    dangerLevelText.textContent = dangerConfig.text;
    dangerLevelText.style.color = dangerConfig.color;
  }
}

// Populate list element
function populateList(elementId, items) {
  const listElement = document.getElementById(elementId);
  if (!listElement) return;
  
  listElement.innerHTML = "";
  
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
}

// Back to animal list from details screen
function backToAnimalList() {
  showScreen("info-screen");
  loadAnimalList();
}

// Show tutorial
function showTutorial() {
  showScreen("tutorial-screen");
}

// Share rank
function shareRank() {
  const rank = document.getElementById("rank")?.textContent || "Beginner Observer";
  const score = gameState.userScore;
  const animalCount = gameState.unlockedAnimals.length;
  
  const shareText = `I'm a ${rank} in Wildlife Survival Game with ${score} points and ${animalCount} animals unlocked! Can you beat me? 🐘🦌🦁`;
  const shareUrl = window.location.href;
  
  if (navigator.share) {
    navigator.share({
      title: 'Wildlife Survival Game',
      text: shareText,
      url: shareUrl
    }).catch(err => {
      console.log('Error sharing:', err);
      fallbackShare(shareText, shareUrl);
    });
  } else {
    fallbackShare(shareText, shareUrl);
  }
}

// Fallback share for desktop
function fallbackShare(text, url) {
  const shareText = `${text}\n\nPlay here: ${url}`;
  
  // Try clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareText)
      .then(() => {
        showNotification("Copied to Clipboard!", "Share text copied to clipboard", "success");
      })
      .catch(() => {
        showNotification("Share", "Please copy the text manually", "info");
      });
  } else {
    // Old school method
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        showNotification("Copied to Clipboard!", "Share text copied to clipboard", "success");
      } else {
        showNotification("Share", "Please copy the text manually", "info");
      }
    } catch (err) {
      showNotification("Share", "Please copy the text manually", "info");
    }
    
    document.body.removeChild(textArea);
  }
}

// Show notification
function showNotification(title, message, type = "info") {
  const container = document.getElementById("notification-container");
  if (!container) return;
  
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

// Initialize particles
function initParticles() {
  particlesContainer = document.getElementById("particles-container");
  if (!particlesContainer) return;
  
  // Clear existing particles
  particlesContainer.innerHTML = '';
  
  // Create particles based on screen size
  const particleCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 5000));
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
}

// Create a single particle
function createParticle() {
  if (!particlesContainer) return;
  
  const particle = document.createElement("div");
  particle.className = "particle";
  
  // Random properties
  const size = Math.random() * 8 + 4;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  
  // Apply styles
  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05});
    left: ${posX}%;
    top: ${posY}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;
  
  particlesContainer.appendChild(particle);
}

// Load settings from localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem("wildlife_settings");
  if (savedSettings) {
    try {
      gameState.settings = JSON.parse(savedSettings);
    } catch (e) {
      console.error("Error loading settings:", e);
    }
  }
}

// Save settings to localStorage
function saveSettings() {
  localStorage.setItem("wildlife_settings", JSON.stringify(gameState.settings));
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Only handle shortcuts when not in input fields
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  switch(e.key) {
    case '1':
    case '2':
    case '3':
    case '4':
      // Handle option selection in scenario screen
      if (document.getElementById('scenario-screen')?.classList.contains('active')) {
        const index = parseInt(e.key) - 1;
        const option = document.querySelector(`.option-btn[data-index="${index}"]`);
        if (option && !option.disabled) {
          option.click();
        }
      }
      break;
    case 'Enter':
      // Handle enter in feedback screen
      if (document.getElementById('feedback-screen')?.classList.contains('active')) {
        const nextBtn = document.querySelector('.feedback-actions .btn-primary');
        if (nextBtn) nextBtn.click();
      }
      break;
    case 'Escape':
      // Handle escape to go back
      if (document.getElementById('feedback-screen')?.classList.contains('active')) {
        hideOverlay('feedback-screen');
      } else if (!document.getElementById('main-menu')?.classList.contains('active')) {
        backToMenu();
      }
      break;
  }
}

// Prevent double-tap zoom on mobile
function preventDoubleTapZoom() {
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
  // Reinitialize particles on resize
  if (particlesContainer) {
    initParticles();
  }
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && isInitialized) {
    // Page became visible again, refresh data if needed
    updateDisplay();
  }
});

// Export utility functions for animals.js
window.getAnimalByName = function(name) {
  return animalsInfo.find(animal => animal.name === name);
};

window.getAnimalsByContinent = function(continent) {
  return animalsInfo.filter(animal => animal.continent === continent);
};

window.getUnlockedAnimals = function() {
  return animalsInfo.filter(animal => gameState.unlockedAnimals.includes(animal.name));
};

window.getLockedAnimals = function() {
  return animalsInfo.filter(animal => !gameState.unlockedAnimals.includes(animal.name));
};