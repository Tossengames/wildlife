let currentScenarioIndex = 0;
let userScore = parseInt(localStorage.getItem("score")) || 0;
let currentContinent = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    updateRank();
});

// Navigation
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function backToMenu() { showScreen('main-menu'); }

// Continent Selection
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal() { document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')); }

function setContinent(continent) {
    currentContinent = continent;
    closeModal();
    showToast(`Region set to: ${continent || 'Global'}`);
}

// Gameplay
function startScenario() {
    showScreen("scenario-screen");
    loadScenario();
}

function loadScenario() {
    const availableScenarios = scenarios.filter(s => {
        const animal = animalsInfo.find(a => a.name === s.animal);
        return animal.unlocked && (!currentContinent || s.continent === currentContinent);
    });
    
    if(availableScenarios.length === 0){
        showToast("No unlocked animals in this region!", "error");
        backToMenu();
        return;
    }

    const scenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];

    document.getElementById("animal-name").innerText = scenario.animal;
    document.getElementById("animal-img").src = scenario.image;
    document.getElementById("animal-desc").innerText = scenario.description;
    document.getElementById("feedback-panel").classList.add("hidden");
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    scenario.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.textContent = opt.text;
        btn.onclick = (e) => handleAnswer(opt, scenario, e);
        optionsDiv.appendChild(btn);
    });
}

function handleAnswer(selectedOption, scenario, event) {
    const status = document.getElementById("feedback-status");
    const explanation = document.getElementById("feedback-explanation");
    
    if(selectedOption.correct){
        status.innerText = "✅ SUCCESS";
        status.style.color = "var(--primary)";
        spawnParticles(event.clientX, event.clientY);
        updateScore(2);
    } else {
        status.innerText = "❌ DANGER";
        status.style.color = "#e74c3c";
        updateScore(-1);
    }
    
    explanation.innerText = scenario.explanation;
    document.getElementById("feedback-panel").classList.remove("hidden");
}

function nextScenario() {
    unlockAnimals();
    loadScenario();
}

// Score & Rank
function updateScore(points) {
    userScore = Math.max(0, userScore + points);
    localStorage.setItem("score", userScore);
    updateRank();
}

function updateRank() {
    let rank = "Beginner Observer";
    if(userScore >= 5) rank = "Junior Ranger";
    if(userScore >= 15) rank = "Field Guide";
    if(userScore >= 30) rank = "Wildlife Protector";
    if(userScore >= 50) rank = "Master Ranger";

    document.getElementById("rank-text").innerText = `Rank: ${rank}`;
    if(document.getElementById("score-tag")) {
        document.getElementById("score-tag").innerText = `Score: ${userScore}`;
    }
}

function unlockAnimals() {
    animalsInfo.forEach(animal => {
        if(!animal.unlocked && userScore >= 10 && animal.name === "Elephant") {
            animal.unlocked = true;
            showToast("🔓 Unlocked: Elephant!");
        }
    });
}

// Encyclopedia
function showInfo() {
    showScreen("info-screen");
    const listDiv = document.getElementById("animal-list");
    listDiv.innerHTML = "";
    listDiv.classList.remove("hidden");
    document.getElementById("animal-details").classList.add("hidden");

    animalsInfo.forEach(animal => {
        const btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.style.width = "100%";
        btn.style.marginBottom = "10px";
        btn.innerHTML = animal.unlocked ? `<strong>${animal.name}</strong>` : `🔒 ${animal.name} (Locked)`;
        btn.onclick = () => { if(animal.unlocked) showAnimalDetails(animal); };
        listDiv.appendChild(btn);
    });
}

function showAnimalDetails(animal) {
    document.getElementById("animal-list").classList.add("hidden");
    const details = document.getElementById("animal-details");
    details.classList.remove("hidden");
    
    document.getElementById("info-name").innerText = animal.name;
    document.getElementById("info-img").src = animal.image;
    document.getElementById("info-desc").innerText = animal.description;
    document.getElementById("info-signs").innerText = animal.signsOfAggression.join(", ");
    document.getElementById("info-triggers").innerText = animal.whatMakesThemMad.join(", ");
    document.getElementById("info-tips").innerText = animal.survivalTips.join(", ");
}

function backToList() {
    document.getElementById("animal-details").classList.add("hidden");
    document.getElementById("animal-list").classList.remove("hidden");
}

// Utils
function showToast(msg) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerText = msg;
    toast.style.cssText = "background:#333;color:white;padding:10px 20px;border-radius:20px;margin-bottom:10px;animation:fadeIn 0.3s forwards;";
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function spawnParticles(x, y) {
    for(let i=0; i<15; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        const destX = (Math.random() - 0.5) * 200;
        const destY = (Math.random() - 0.5) * 200;
        document.body.appendChild(p);
        p.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' }).onfinish = () => p.remove();
    }
}

function shareRank() {
    const rank = document.getElementById("rank-text").innerText;
    const text = `I just reached ${rank} in Wildlife Survival! Beat my score? 🐘🦁`;
    if(navigator.share) {
        navigator.share({ title: 'Wildlife Survival', text: text, url: window.location.href });
    } else {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
    }
}
