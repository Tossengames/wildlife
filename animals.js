const animalsInfo = [
  {
    name: "African Elephant",
    continent: "Africa",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/African_elephant_high_resolution.jpg",
    description: "The African elephant is the largest land animal. They can be calm but may charge if threatened or startled.",
    signsOfAggression: ["Ear flapping", "Trumpeting", "Head raised high"],
    whatMakesThemMad: ["Getting between mother and calf", "Loud sudden noises", "Encroaching on territory"],
    survivalTips: ["Back away slowly without turning your back", "Avoid sudden movements", "Do not make direct eye contact"],
    unlocked: true,
    unlockScore: 0
  },
  {
    name: "Lion",
    continent: "Africa",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
    description: "Lions are social predators. Though not normally aggressive toward humans, they can attack when hungry or provoked.",
    signsOfAggression: ["Growling", "Staring intensely", "Ears back"],
    whatMakesThemMad: ["Approaching too close", "Running away quickly", "Cornering them"],
    survivalTips: ["Stand your ground", "Make yourself look larger", "Back away slowly if they show warning signs"],
    unlocked: false,
    unlockScore: 5
  },
  {
    name: "Cape Buffalo",
    continent: "Africa",
    image: "https://pixabay.com/get/g51fdcdf9a872dfe2dbeb57d2e7d138380cb891679a88f00bbca4affdd469ee9514dc441f3b18e441bb6741d6455cf269_640.jpg",
    description: "Cape buffalo are unpredictable and can be very dangerous. They attack without much warning.",
    signsOfAggression: ["Snorting", "Head lowered", "Charging forward"],
    whatMakesThemMad: ["Surprise encounters", "Getting between them and water/food", "Loud noises"],
    survivalTips: ["Keep distance", "Do not run in a straight line", "Seek cover behind large objects"],
    unlocked: false,
    unlockScore: 10
  },
  {
    name: "Hippopotamus",
    continent: "Africa",
    image: "https://pixabay.com/get/gf1d5eaec3718fc775c8e2a9a078145fd81023cb08dcf081c8ef86f2394ebcba2_640.jpg",
    description: "Hippos are highly territorial and attack boats and humans that come too close.",
    signsOfAggression: ["Tail wagging", "Yawning with wide mouth", "Lunging toward the threat"],
    whatMakesThemMad: ["Approaching their territory", "Getting between them and water"],
    survivalTips: ["Stay far from water edges", "Do not stand between hippo and water", "Back away slowly"],
    unlocked: false,
    unlockScore: 15
  },
  {
    name: "Black Rhino",
    continent: "Africa",
    image: "https://pixabay.com/get/ga5c0857379e1f50996d7e1571bf64bbbd2ff60b6753680ce0e3bd8807f9db2c9_640.jpg",
    description: "Black rhinos can be aggressive if startled. They have poor eyesight but great hearing and smell.",
    signsOfAggression: ["Snorting", "Charging", "Short high‑pitched grunts"],
    whatMakesThemMad: ["Sudden appearance", "Loud noises", "Humans approaching calves"],
    survivalTips: ["Stay calm and still", "Do not approach", "Retreat slowly"],
    unlocked: false,
    unlockScore: 20
  },
  {
    name: "Grizzly Bear",
    continent: "North America",
    image: "https://pixabay.com/get/g1b95b03bb6d69f95f6f013b983faaf0f_640.jpg",
    description: "Grizzly bears are powerful and can attack if surprised or protecting cubs.",
    signsOfAggression: ["Bluff charges", "Huffing", "Stomping"],
    whatMakesThemMad: ["Approaching too close", "Getting between mother and cub", "Food competition"],
    survivalTips: ["Speak calmly and slowly back away", "Do not run", "Stand your ground if charge stops"],
    unlocked: true,
    unlockScore: 0
  },
  {
    name: "Moose",
    continent: "North America",
    image: "https://pixabay.com/get/gd9dc8cc4fa9d249d35eb1d3b1fd4f416_640.jpg",
    description: "Moose can become aggressive, especially during mating season or when defending calves.",
    signsOfAggression: ["Ears forward", "Foot stamping", "Neck lowered"],
    whatMakesThemMad: ["Too close to calves", "Startling them", "Obstructing their path"],
    survivalTips: ["Stand still", "Avoid eye contact", "Retreat slowly"],
    unlocked: true,
    unlockScore: 0
  },
  {
    name: "American Bison",
    continent: "North America",
    image: "https://pixabay.com/get/gf8a16eaa1e9fc51f68b23c0f3e79ab_640.jpg",
    description: "Bison are large and fast. They can run down predators and humans if threatened.",
    signsOfAggression: ["Growling", "Lowered head", "Rapid charges"],
    whatMakesThemMad: ["Getting too close", "Loud noises", "Sudden movements"],
    survivalTips: ["Keep distance", "Do not try to pet or feed", "Back off slowly"],
    unlocked: false,
    unlockScore: 8
  },
  {
    name: "Cougar",
    continent: "North America",
    image: "https://pixabay.com/get/g332639f0ae099f46b6cdb6b3f0f9acd_640.jpg",
    description: "Cougars are stealthy predators but attacks on humans are rare.",
    signsOfAggression: ["Hissing", "Ears flat", "Stalk‑like movements"],
    whatMakesThemMad: ["Running away", "Getting between mother and young"],
    survivalTips: ["Stay big and loud", "Do not turn your back", "Back away slowly"],
    unlocked: false,
    unlockScore: 12
  },
  {
    name: "Bengal Tiger",
    continent: "Asia",
    image: "https://pixabay.com/get/g9b17c635f7e2a53fa7b80bb43e3a9b_640.jpg",
    description: "Tigers are powerful predators; attacks can occur if surprised or defending territory.",
    signsOfAggression: ["Growling", "Tail flicking", "Stalking posture"],
    whatMakesThemMad: ["Approaching nest/territory", "Startling them"],
    survivalTips: ["Do not run", "Make yourself look large", "Back away slowly"],
    unlocked: false,
    unlockScore: 10
  },
  {
    name: "Asian Elephant",
    continent: "Asia",
    image: "https://pixabay.com/get/g6c4b5127a6e0b7c6562524aa947f_640.jpg",
    description: "Asian elephants can be unpredictable; males in musth are especially dangerous.",
    signsOfAggression: ["Ear flapping", "Trunk raised", "Mock charging"],
    whatMakesThemMad: ["Threats to calves", "Sudden movements"],
    survivalTips: ["Back away slowly", "Do not make direct eye contact"],
    unlocked: false,
    unlockScore: 15
  },
  {
    name: "Komodo Dragon",
    continent: "Asia",
    image: "https://pixabay.com/get/g5743fb91efb1f12f_640.jpg",
    description: "Komodo dragons are large lizards with a powerful bite.",
    signsOfAggression: ["Hissing", "Tail lashing", "Open mouth"],
    whatMakesThemMad: ["Approaching nest", "Sudden movements"],
    survivalTips: ["Stand tall and make noise", "Leave area calmly"],
    unlocked: false,
    unlockScore: 18
  },
  {
    name: "Kangaroo",
    continent: "Australia",
    image: "https://pixabay.com/get/g8c9d8f85c70b6c7_640.jpg",
    description: "Kangaroos are usually calm but can kick if cornered.",
    signsOfAggression: ["Growling", "Standing upright", "Pawing ground"],
    whatMakesThemMad: ["Threatened space", "Approaching too close"],
    survivalTips: ["Back away slowly", "Keep distance"],
    unlocked: false,
    unlockScore: 5
  },
  {
    name: "Saltwater Crocodile",
    continent: "Australia",
    image: "https://pixabay.com/get/gad7c4cb0fbcd_640.jpg",
    description: "Crocodiles are ambush predators; attacks are sudden.",
    signsOfAggression: ["Low slow approach", "Splashing", "Open jaws"],
    whatMakesThemMad: ["Getting too close to water edge"],
    survivalTips: ["Stay far from edge", "Back away slowly"],
    unlocked: false,
    unlockScore: 20
  },
  {
    name: "Emu",
    continent: "Australia",
    image: "https://pixabay.com/get/gabc123dummy_640.jpg",
    description: "Emus are large flightless birds; rarely aggressive, but can kick.",
    signsOfAggression: ["Stomping", "Hissing"],
    whatMakesThemMad: ["Threatened space"],
    survivalTips: ["Back away calmly", "Do not approach"],
    unlocked: false,
    unlockScore: 3
  }
];