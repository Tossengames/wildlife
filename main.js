// State Management
let state = {
    score: parseInt(localStorage.getItem('ranger_score')) || 0,
    region: null,
    unlockedAnimals: JSON.parse(localStorage.getItem('unlocked_animals')) || ["Moose"]
};

// Initial Setup
document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function updateUI() {
    const ranks = [
        { min: 0, name: "Beginner Observer" },
        { min: 10, name: "Junior Ranger" },
        { min: 30, name: "Senior Tracker" },
        { min: 60, name: "Wildlife Master" }
    ];
    
    const rank = [...ranks].reverse().find(r => state.score >= r.min);
    document.getElementById("rank-name").innerText = rank.name;
    document.getElementById("score-display").innerText = `${state.score} XP`;
    
    const nextRank = ranks[ranks.indexOf(rank) + 1] || rank;
    const progress = (state.score / nextRank.min) * 100;
    document.getElementById("rank-bar").style.width = `${Math.min(progress, 100)}%`;
}

// Gameplay Logic
function startScenario() {
    const available = scenarios.filter(s => 
        state.unlockedAnimals.includes(s.animal) && 
        (!state.region || s.continent === state.region)
    );

    if (available.length === 0) {
        showToast("No scenarios found for this region/level!");
        return;
    }

    const scene = available[Math.floor(Math.random() * available.length)];
    
    document.getElementById("animal-name").innerText = scene.animal;
    document.getElementById("animal-desc").innerText = scene.description;
    document.getElementById("animal-img").src = scene.image;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";
    
    scene.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.innerText = opt.text;
        btn.onclick = (e) => checkAnswer(opt, scene, e);
        container.appendChild(btn);
    });

    showScreen('scenario-screen');
}

function checkAnswer(opt, scene, event) {
    const overlay = document.getElementById("feedback-overlay");
    const title = document.getElementById("fb-title");
    const explanation = document.getElementById("fb-explanation");
    
    if (opt.correct) {
        title.innerText = "✅ SURVIVED";
        title.style.color = "var(--success)";
        state.score += 5;
        createParticles(event.clientX, event.clientY);
        checkUnlocks();
    } else {
        title.innerText = "❌ INJURED";
        title.style.color = "var(--danger)";
        state.score = Math.max(0, state.score - 2);
    }
    
    explanation.innerText = scene.explanation;
    overlay.classList.remove("hidden");
    saveData();
    updateUI();
}

function checkUnlocks() {
    if (state.score >= 10 && !state.unlockedAnimals.includes("Elephant")) {
        state.unlockedAnimals.push("Elephant");
        showToast("🔓 New Animal Unlocked: Elephant!");
    }
}

function nextScenario() {
    document.getElementById("feedback-overlay").classList.add("hidden");
    startScenario();
}

// Encyclopedia Logic
function showEncyclopedia() {
    const grid = document.getElementById("animal-grid");
    grid.innerHTML = "";
    
    animalsInfo.forEach(animal => {
        const isUnlocked = state.unlockedAnimals.includes(animal.name);
        const card = document.createElement("div");
        card.className = `rank-card ${!isUnlocked ? 'locked' : ''}`;
        card.innerHTML = `
            <h3>${isUnlocked ? animal.name : "???"}</h3>
            <p>${isUnlocked ? animal.description : "Keep playing to unlock info."}</p>
            ${isUnlocked ? `<small>Tips: ${animal.survivalTips[0]}</small>` : ""}
        `;
        grid.appendChild(card);
    });
    showScreen('info-screen');
}

// Utils
function showToast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.innerText = msg;
    document.getElementById("toast-container").appendChild(t);
    setTimeout(() => t.remove(), 2500);
}

function createParticles(x, y) {
    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.setProperty('--tw-x', (Math.random() - 0.5) * 100 + "px");
        p.style.setProperty('--tw-y', (Math.random() - 0.5) * 100 + "px");
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
function closeModal() { document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add("hidden")); }
function setRegion(r) { state.region = r; closeModal(); showToast(`Region: ${r || 'Global'}`); }
function backToMenu() { showScreen('main-menu'); }
function saveData() {
    localStorage.setItem('ranger_score', state.score);
    localStorage.setItem('unlocked_animals', JSON.stringify(state.unlockedAnimals));
}
