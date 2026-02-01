let currentScenarioIndex=0;
let currentContinent=null;
let userScore=0;
let userName="";

// ===== INIT =====
document.addEventListener("DOMContentLoaded",()=>{
  // Load profile
  const savedName = localStorage.getItem("userName");
  const savedScore = parseInt(localStorage.getItem("userScore")) || 0;
  if(savedName){userName=savedName; userScore=savedScore; showMainMenu(); }
  else{ showScreen("profile-screen"); }
});

// ===== PROFILE =====
function saveProfile(){
  const nameInput=document.getElementById("player-name").value.trim();
  if(!nameInput){alert("Please enter your name."); return;}
  userName=nameInput;
  localStorage.setItem("userName",userName);
  localStorage.setItem("userScore",0);
  showMainMenu();
}

// ===== SCREENS =====
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
function showMainMenu(){ 
  document.getElementById("profile-name").innerText=userName;
  updateRank();
  showScreen("main-menu"); 
}
function backToMenu(){showMainMenu();}
function backToList(){document.getElementById("animal-details").classList.add("hidden");document.getElementById("animal-list").classList.remove("hidden");}

// ===== CONTINENT SELECTION =====
function showContinentSelection(){
  const div = document.getElementById("continent-buttons");
  div.innerHTML="";
  const continents = [...new Set(animalsInfo.map(a=>a.continent))];
  continents.forEach(c=>{
    const btn = document.createElement("button");
    const unlocked = animalsInfo.some(a=>a.continent===c && a.unlocked);
    btn.textContent=c+(unlocked?"":" 🔒");
    btn.disabled=!unlocked;
    btn.onclick=()=>{currentContinent=c; startScenario();};
    div.appendChild(btn);
  });
  showScreen("continent-screen");
}

// ===== INFO SCREEN =====
function showInfo(){
  showScreen("info-screen");
  const d=document.getElementById("animal-list"); d.innerHTML="";
  animalsInfo.forEach(a=>{
    const b=document.createElement("button");
    b.textContent=a.unlocked?a.name:a.name+" 🔒";
    b.disabled=!a.unlocked;
    b.onclick=()=>{if(a.unlocked) showAnimalDetails(a); else alert(`Unlock ${a.name} by earning ${a.unlockScore} points!`);}
    d.appendChild(b);
  });
}

function showAnimalDetails(a){
  document.getElementById("animal-details").classList.remove("hidden");
  document.getElementById("info-name").innerText=a.name;
  const infoImg=document.getElementById("info-img");
  infoImg.src=a.image || "https://via.placeholder.com/400x300?text=Animal+Image";
  infoImg.onerror=()=>{infoImg.src="https://via.placeholder.com/400x300?text=Animal+Image";}
  document.getElementById("info-desc").innerText=a.description;
  document.getElementById("info-signs").innerText=a.signsOfAggression.join(", ");
  document.getElementById("info-triggers").innerText=a.whatMakesThemMad.join(", ");
  document.getElementById("info-tips").innerText=a.survivalTips.join(", ");
  document.getElementById("animal-list").classList.add("hidden");
}

// ===== SCENARIO =====
function startScenario(){ 
  showScreen("scenario-screen"); 
  loadScenario(); 
}

function loadScenario(){
  const available = scenarios.filter(s=>{
    const a = animalsInfo.find(an=>an.name===s.animal);
    return a.unlocked && (!currentContinent || s.continent===currentContinent);
  });
  if(available.length===0){alert("No unlocked animals for this continent!"); backToMenu(); return;}
  currentScenarioIndex=Math.floor(Math.random()*available.length);
  const scn=available[currentScenarioIndex];

  document.getElementById("animal-name").innerText=scn.animal;
  const imgEl=document.getElementById("animal-img");
  imgEl.src=scn.image || "https://via.placeholder.com/400x300?text=Animal+Image";
  imgEl.onerror=()=>{imgEl.src="https://via.placeholder.com/400x300?text=Animal+Image";}
  document.getElementById("animal-desc").innerText=scn.description;

  const optsDiv=document.getElementById("options"); optsDiv.innerHTML="";
  scn.options.forEach(o=>{
    const b=document.createElement("button");
    b.textContent=o.text;
    b.onclick=()=>handleAnswer(o,scn);
    optsDiv.appendChild(b);
  });

  const f=document.getElementById("feedback"); f.innerText=""; f.className="";
  document.getElementById("next-btn").style.display="none";
}

function handleAnswer(opt,scn){
  const f=document.getElementById("feedback");
  // disable all option buttons
  document.querySelectorAll("#options button").forEach(b=>b.disabled=true);
  if(opt.correct){f.className="correct"; f.innerText="✅ Correct!\n\n"+scn.explanation; addScore(1);}
  else{f.className="wrong"; f.innerText="❌ Not the best choice\n\n"+scn.explanation;}
  document.getElementById("next-btn").style.display="inline-block";
}

function nextScenario(){unlockAnimals(); loadScenario();}

// ===== SCORE & RANK =====
function addScore(p){userScore+=p; localStorage.setItem("userScore",userScore); updateRank();}
function updateRank(){
  let rank="Beginner Observer", next=5;
  if(userScore>=5){rank="Junior Ranger"; next=10;}
  if(userScore>=10){rank="Field Guide"; next=20;}
  if(userScore>=20){rank="Wildlife Protector"; next=35;}
  if(userScore>=35){rank="Master Ranger"; next="—";}
  document.getElementById("rank").innerText="Rank: "+rank;
  document.getElementById("progress").innerText=next==="—"?"Max Rank":"Points to next rank: "+(next-userScore);
}

// ===== UNLOCK ANIMALS =====
function unlockAnimals(){
  animalsInfo.forEach(a=>{
    if(!a.unlocked && userScore>=a.unlockScore) a.unlocked=true;
}

// ===== SHARE =====
function shareRank(){
  const r=document.getElementById("rank").innerText;
  const t=`I just reached ${r} in Wildlife Survival Game! Can you beat me? 🐘🦌🦁`;
  const u="https://yourgamewebsite.com";
  if(navigator.share){navigator.share({title:"Wildlife Survival Game",text:t,url:u});}
  else{window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}&quote=${encodeURIComponent(t)}`,"_blank");}
}