const scenarios = [
  // African Elephant — 4 scenarios
  {
    animal: "African Elephant",
    continent: "Africa",
    image: "",
    description: "You see an adult African elephant blocking your path, ears extended and trunk raised.",
    options: [
      { text: "Wave arms and shout", correct: false },
      { text: "Back away slowly", correct: true },
      { text: "Run quickly forward", correct: false }
    ],
    explanation: "Elephants use ear flapping and trunk raising as warning signs. Backing away slowly reduces threat." 
  },
  {
    animal: "African Elephant",
    continent: "Africa",
    image: "",
    description: "An elephant sprays dust and trumpets loudly after spotting you.",
    options: [
      { text: "Hold still and stay quiet", correct: true },
      { text: "Throw sticks at it", correct: false },
      { text: "Face it and approach", correct: false }
    ],
    explanation: "Trumpeting and dusting are warning signs; staying calm and still helps avoid escalation."
  },
  {
    animal: "African Elephant",
    continent: "Africa",
    image: "",
    description: "You accidentally get between an elephant and its calf.",
    options: [
      { text: "Step aside slowly", correct: true },
      { text: "Run straight away", correct: false },
      { text: "Approach them to pet", correct: false }
    ],
    explanation: "Elephants protect calves fiercely. Stepping aside slowly removes threat."
  },
  {
    animal: "African Elephant",
    continent: "Africa",
    image: "",
    description: "Elephant shows a mock charge—ears out, front foot lifted.",
    options: [
      { text: "Stand your ground", correct: false },
      { text: "Retreat slowly while facing it", correct: true },
      { text: "Turn and sprint", correct: false }
    ],
    explanation: "Mock charges are bluffs, but you should retreat while facing it, not run."
  },

  // Lion — 4 scenarios
  {
    animal: "Lion",
    continent: "Africa",
    image: "",
    description: "A lion is watching you from a distance and growls softly.",
    options: [
      { text: "Turn your back and walk away quickly", correct: false },
      { text: "Stand tall and make noise", correct: true },
      { text: "Approach slowly to pet", correct: false }
    ],
    explanation: "Lions may see you as a threat or prey; making noise while staying large deters approach."
  },
  {
    animal: "Lion",
    continent: "Africa",
    image: "",
    description: "You encounter a lion near a carcass and it stares intently at you.",
    options: [
      { text: "Slowly back away without running", correct: true },
      { text: "Throw stones at it", correct: false },
      { text: "Creep closer to take photo", correct: false }
    ],
    explanation: "Backing away signals you are not a threat without triggering chase."
  },
  {
    animal: "Lion",
    continent: "Africa",
    image: "",
    description: "A lion roars loudly and taked a step toward you.",
    options: [
      { text: "Stay calm and widen your stance", correct: true },
      { text: "Run quickly away", correct: false },
      { text: "Crouch and hide", correct: false }
    ],
    explanation: "Roaring and stepping forward are warning signs; standing tall and backing off is safer."
  },
  {
    animal: "Lion",
    continent: "Africa",
    image: "",
    description: "You see lion cubs near you with adults watching.",
    options: [
      { text: "Back away slowly with attention", correct: true },
      { text: "Run toward them", correct: false },
      { text: "Throw your bag at them", correct: false }
    ],
    explanation: "Protective adults are dangerous; slowly moving away signals non‑ threat." 
  },

  // Cape Buffalo — 4 scenarios
  {
    animal: "Cape Buffalo",
    continent: "Africa",
    image: "",
    description: "A buffalo snorts and lowers its head as you approach.",
    options: [
      { text: "Retreat calmly", correct: true },
      { text: "Yell and wave arms", correct: false },
      { text: "Throw rocks toward it", correct: false }
    ],
    explanation: "Charging posture means retreat calmly to avoid provoking it."
  },
  {
    animal: "Cape Buffalo",
    continent: "Africa",
    image: "",
    description: "You see a buffalo herd blocking your trail.",
    options: [
      { text: "Back away and find alternate route", correct: true },
      { text: "Try to walk through", correct: false },
      { text: "Stand still near trees", correct: false }
    ],
    explanation: "Buffalo can charge unpredictably; backing away is safest."
  },
  {
    animal: "Cape Buffalo",
    continent: "Africa",
    image: "",
    description: "A buffalo snorts loudly and paw at ground.",
    options: [
      { text: "Retreat while facing the herd", correct: true },
      { text: "Turn and sprint", correct: false },
      { text: "Stand completely still", correct: false }
    ],
    explanation: "Pawing ground is aggression; retreat while facing them."
  },
  {
    animal: "Cape Buffalo",
    continent: "Africa",
    image: "",
    description: "A buffalo charges you directly.",
    options: [
      { text: "Duck behind large rock if nearby", correct: true },
      { text: "Wave sticks at it", correct: false },
      { text: "Jump sideways quickly", correct: false }
    ],
    explanation: "Using large cover stops charging unpredictable animals."
  },

  // Hippopotamus — 4 scenarios
  {
    animal: "Hippopotamus",
    continent: "Africa",
    image: "",
    description: "You're near a river and a hippo opens its mouth wide at you.",
    options: [
      { text: "Back away slowly", correct: true },
      { text: "Throw sticks at it", correct: false },
      { text: "Shout loudly", correct: false }
    ],
    explanation: "A wide open mouth is a warning; retreat quietly."
  },
  {
    animal: "Hippopotamus",
    continent: "Africa",
    image: "",
    description: "A hippo splashes toward you from water.",
    options: [
      { text: "Move farther from water edge", correct: true },
      { text: "Stand ground", correct: false },
      { text: "Wave arms wildly", correct: false }
    ],
    explanation: "Hippos defend water territory; move away."
  },
  {
    animal: "Hippopotamus",
    continent: "Africa",
    image: "",
    description: "A hippo snorts and chases your boat.",
    options: [
      { text: "Head toward shore calmly", correct: true },
      { text: "Row faster toward hippo", correct: false },
      { text: "Jump out into water", correct: false }
    ],
    explanation: "Approaching shore signals you mean no threat."
  },
  {
    animal: "Hippopotamus",
    continent: "Africa",
    image: "",
    description: "Hippo yawns and shows teeth near water bank.",
    options: [
      { text: "Back up slowly away", correct: true },
      { text: "Make loud noises", correct: false },
      { text: "Approach it", correct: false }
    ],
    explanation: "Yawning and teeth showing are warnings; leave slowly."
  },

  // Black Rhino — 4 scenarios
  {
    animal: "Black Rhino",
    continent: "Africa",
    image: "",
    description: "You come close and the rhino snorts loudly.",
    options: [
      { text: "Retreat slowly", correct: true },
      { text: "Throw rocks", correct: false },
      { text: "Hide behind bush", correct: false }
    ],
    explanation: "Loud snorts are warning; retreat calmly to avoid provoking charge."
  },
  {
    animal: "Black Rhino",
    continent: "Africa",
    image: "",
    description: "Rhino lowers head and starts moving toward you.",
    options: [
      { text: "Step aside and back away calmly", correct: true },
      { text: "Stand still", correct: false },
      { text: "Wave arms", correct: false }
    ],
    explanation: "Rhinos react to motion; calm retreat is safer."
  },
  {
    animal: "Black Rhino",
    continent: "Africa",
    image: "",
    description: "Rhino paws ground and fixes gaze on you.",
    options: [
      { text: "Retreat slowly while facing it", correct: true },
      { text: "Run sideways quickly", correct: false },
      { text: "Approach to look closer", correct: false }
    ],
    explanation: "Pawing ground is aggression; retreat while facing reduces uncertainty."
  },
  {
    animal: "Black Rhino",
    continent: "Africa",
    image: "",
    description: "Rhino snorts and charges from behind bush.",
    options: [
      { text: "Seek cover behind large rock", correct: true },
      { text: "Jump forward", correct: false },
      { text: "Clap loudly", correct: false }
    ],
    explanation: "Cover blocks charging dangerous animals."
  }
];