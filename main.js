// Ensure game state persists and updates cleanly
const updateDisplay = () => {
    // Score update
    const scoreEls = ['score', 'current-score'];
    scoreEls.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.textContent = gameState.userScore;
    });

    // Rank & Stats update
    const rankEl = document.getElementById('rank');
    if(rankEl) {
        rankEl.textContent = getRank(gameState.userScore);
        rankEl.style.color = getRankColor(gameState.userScore);
    }

    const countEl = document.getElementById('animal-count');
    if(countEl) countEl.textContent = `${gameState.unlockedAnimals.length}/${animalsInfo.length}`;
};

// Simplified Rank Logic
const getRank = (score) => {
    if (score >= 100) return "Master Ranger";
    if (score >= 50) return "Protector";
    if (score >= 25) return "Guide";
    return "Beginner";
};

const getRankColor = (score) => {
    if (score >= 100) return "#f59e0b";
    if (score >= 50) return "#3b82f6";
    if (score >= 25) return "#22c55e";
    return "#94a3b8";
};

// Enhanced Scenario Loading for Mobile
function loadScenario() {
    if (scenarioQueue.length === 0) {
        generateScenarioQueue();
    }
    
    currentScenario = scenarioQueue.shift();
    gameState.gameSession.scenariosPlayed++;
    
    // UI Updates
    document.getElementById("animal-name").textContent = currentScenario.animal;
    document.getElementById("animal-desc").textContent = currentScenario.description;
    
    const fill = document.getElementById("scenario-progress-fill");
    fill.style.width = `${(gameState.gameSession.scenariosPlayed / 10) * 100}%`;
    
    const imgElement = document.getElementById("animal-img");
    imgElement.src = currentScenario.image;
    imgElement.onerror = () => imgElement.src = "https://via.placeholder.com/400x200?text=Animal+Image";

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    currentScenario.options.forEach((option) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option.text;
        button.onclick = () => handleAnswer(option, currentScenario);
        optionsDiv.appendChild(button);
    });
}

// Fixed Notification System
function showNotification(title, message, type = "info") {
    const container = document.getElementById("notification-container");
    const div = document.createElement("div");
    div.className = `notification ${type}`;
    div.innerHTML = `<strong>${title}</strong><br><small>${message}</small>`;
    container.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// Keep your existing scenarios.js and animals.js as they are data-driven.
