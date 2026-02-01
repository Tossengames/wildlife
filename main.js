let currentScenarioIndex = 0;
let userScore = parseInt(localStorage.getItem("score")) || 0;
let currentContinent = null;

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// Modal Controls
function openContinentSelect() { document.getElementById('modal-overlay').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }

function setContinent(continent) {
    currentContinent = continent;
    closeModal();
    showToast(`Region set to: ${continent || 'Global'}`);
}

function startScenario() {
    showScreen('scenario-screen');
    loadScenario();
}

function loadScenario() {
    const available = scenarios.filter(s => {
        const animal = animalsInfo.find(a => a.name === s.animal);
        return animal.unlocked && (!currentContinent || s.continent === currentContinent);
    });

    if (available.length === 0) {
        showToast("Unlock more animals first!", "warning");
        backToMenu();
        return;
    }

    const scenario = available[Math.floor(Math.random() * available.length)];
    
    // UI Update
    document.getElementById("animal-name").innerText = scenario.animal;
    document.getElementById("animal-desc").innerText = scenario.description;
    document.getElementById("animal-img").src = scenario.image;
    document.getElementById("feedback-panel").classList.add("hidden");

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    scenario.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = opt.text;
        btn.onclick = () => handleAnswer(opt, scenario, btn);
        optionsDiv.appendChild(btn);
    });
}

function handleAnswer(opt, scenario, btn) {
    const panel = document.getElementById("feedback-panel");
    const title = document.getElementById("feedback-title");
    const text = document.getElementById("feedback-text");
    
    // Disable all buttons after choice
    document.querySelectorAll('.option-btn').forEach(b => b.style.pointerEvents = 'none');

    if (opt.correct) {
        btn.style.borderColor = "var(--correct)";
        btn.style.backgroundColor = "#e8f5e9";
        title.innerText = "✅ Excellent Ranger!";
        title.style.color = "var(--correct)";
        spawnParticles(btn);
        updateScore(2);
    } else {
        btn.style.borderColor = "var(--wrong)";
        btn.style.backgroundColor = "#ffebee";
        title.innerText = "❌ Dangerous Move!";
        title.style.color = "var(--wrong)";
        updateScore(-1);
    }

    text.innerText = scenario.explanation;
    panel.classList.remove("hidden");
}

function updateScore(pts) {
    userScore = Math.max(0, userScore + pts);
    localStorage.setItem("score", userScore);
    updateUI();
    unlockAnimals();
}

function updateUI() {
    const ranks = [
        { min: 0, name: "Beginner Observer" },
        { min: 10, name: "Junior Ranger" },
        { min: 25, name: "Field Guide" },
        { min: 50, name: "Wildlife Master" }
    ];

    const currentRank = [...ranks].reverse().find(r => userScore >= r.min);
    document.getElementById("rank-display").querySelector('span').innerText = currentRank.name;
    document.getElementById("score-tag").innerText = `Score: ${userScore}`;
    
    // Update progress bar
    const nextRank = ranks[ranks.indexOf(currentRank) + 1] || currentRank;
    const progress = (userScore / nextRank.min) * 100;
    document.getElementById("rank-progress").style.width = `${Math.min(progress, 100)}%`;
}

// Visual Effects
function showToast(msg, type = "info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function spawnParticles(el) {
    for(let i=0; i<10; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${el.offsetLeft + el.offsetWidth/2}px`;
        p.style.top = `${el.offsetTop}px`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }
}

function backToMenu() { showScreen('main-menu'); }
