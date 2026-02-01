let currentScenarioIndex = 0;
let userScore = parseInt(localStorage.getItem("score")) || 0;
let currentContinent = null;

// INIT
document.addEventListener("DOMContentLoaded",()=>{updateRank();});

// ===== SCREENS =====
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
function backToMenu(){showScreen("main-menu");}
function backToList(){document.getElementById("animal-details").classList.add("hidden");document.getElementById("animal-list").classList.remove("hidden");}

// ===== MENU ACTIONS =====
function startScenario(){currentContinent=null;showScreen("scenario-screen");loadScenario();}
function pickContinent(){const c=prompt("Enter continent (Africa, North America)");if(!c)return;currentContinent=c;showScreen("scenario-screen");loadScenario();}
function showInfo(){showScreen("info-screen");const d=document.getElementById("animal-list");d.innerHTML="";animalsInfo.forEach(a=>{const b=document.createElement("button");b.textContent=a.unlocked?a.name:a.name+" 🔒";b.onclick=()=>showAnimalDetails(a);d.appendChild(b);});}

// ===== INFO SCREEN =====
function showAnimalDetails(a){
  document.getElementById("animal-details").classList.remove("hidden");
  document.getElementById("info-name").innerText = a.name;
  const infoImg = document.getElementById("info-img");
  infoImg.src = a.image || "https://via.placeholder.com/400x300?text=Animal+Image";
  infoImg.onerror = ()=>{infoImg.src="https://via.placeholder.com/400x300?text=Animal+Image";}
  document.getElementById("info-desc").innerText = a.description;
  document.getElementById("info-signs").innerText = a.signsOfAggression.join(", ");
  document.getElementById("info-triggers").innerText = a.whatMakesThemMad.join(", ");
  document.getElementById("info-tips").innerText = a.survivalTips.join(", ");
  document.getElementById("animal-list").classList.add("hidden");
}

// ===== SCENARIO =====
function loadScenario(){
  const available = scenarios.filter(s=>{
    const a = animalsInfo.find(an=>an.name===s.animal);
    return a.unlocked && (!currentContinent || s.continent===currentContinent);
  });
  if(available.length===0){alert("No unlocked animals for this continent!");backToMenu();return;}
  currentScenarioIndex = Math.floor(Math.random()*available.length);
  const scn = available[currentScenarioIndex];

  document.getElementById("animal-name").innerText = scn.animal;
  const imgEl = document.getElementById("animal-img");
  imgEl.src = scn.image || "https://via.placeholder.com/400x300?text=Animal+Image";
  imgEl.onerror = ()=>{imgEl.src="https://via.placeholder.com/400x300?text=Animal+Image";}
  document.getElementById("animal-desc").innerText = scn.description;

  const optsDiv = document.getElementById("options");
  optsDiv.innerHTML = "";
  scn.options.forEach(o=>{
    const b = document.createElement("button");
    b.textContent = o.text;
    b.onclick = ()=>handleAnswer(o,scn);
    optsDiv.appendChild(b);
  });

  const f = document.getElementById("feedback"); f.innerText=""; f.className="";
  document.getElementById("next-btn").style.display = "none";
}

function handleAnswer(opt,scn){
  const f = document.getElementById("feedback");
  if(opt.correct){f.className="correct"; f.innerText="✅ Correct!\n\n"+scn.explanation; updateScore(1);}
  else{f.className="wrong"; f.innerText="❌ Not the best choice\n\n"+scn.explanation;}
  document.getElementById("next-btn").style.display="inline-block";
}

function nextScenario(){unlockAnimals();loadScenario();}

// ===== SCORE & RANK =====
function updateScore(p){userScore+=p; localStorage.setItem("score",userScore); updateRank();}
function updateRank(){
  let r="Beginner Observer";
  if(userScore>=5) r="Junior Ranger";
  if(userScore>=10) r="Field Guide";
  if(userScore>=20) r="Wildlife Protector";
  if(userScore>=35) r="Master Ranger";
  document.getElementById("rank").innerText = "Rank: "+r;
}
function unlockAnimals(){
  animalsInfo.forEach(a=>{
    if(!a.unlocked && a.name==="Elephant" && userScore>=5) a.unlocked=true;
  });
}

// ===== SHARE =====
function shareRank(){
  const r = document.getElementById("rank").innerText;
  const t = `I just reached ${r} in Wildlife Survival Game! Can you beat me? 🐘🦌🦁`;
  const u = "https://yourgamewebsite.com";
  if(navigator.share){navigator.share({title:"Wildlife Survival Game",text:t,url:u});}
  else{window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&quote=${encodeURIComponent(t)}`,"_blank");}
}