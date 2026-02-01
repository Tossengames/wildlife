const scenarios = [
  {
    animal: "Moose",
    continent: "North America",
    image: "images/moose.png",
    description: "A moose is staring at you, ears forward, hooves pawing the ground. Its eyes are wide.",
    options: [
      { text: "Run away quickly", correct: false },
      { text: "Stand still and avoid eye contact", correct: true },
      { text: "Wave arms and shout", correct: false }
    ],
    explanation: "Moose are unpredictable. Running can trigger pursuit. Stand still and avoid eye contact."
  },
  {
    animal: "Elephant",
    continent: "Africa",
    image: "images/elephant.png",
    description: "An elephant is flapping its ears and trumpeting loudly.",
    options: [
      { text: "Back away slowly", correct: true },
      { text: "Throw rocks at it", correct: false },
      { text: "Climb a tree nearby", correct: false }
    ],
    explanation: "Elephants give warnings before charging. Slowly backing away without turning your back is safest."
  }
];