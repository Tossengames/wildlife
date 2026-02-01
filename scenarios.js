const animalsInfo = [
  {
    name: "Moose",
    continent: "North America",
    image: "https://images.unsplash.com/photo-1549471380-3023219aa760?auto=format&fit=crop&w=400",
    description: "Huge antlers, very territorial.",
    survivalTips: ["Stand still", "Avoid eye contact"]
  },
  {
    name: "Elephant",
    continent: "Africa",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400",
    description: "Intelligent but protective of young.",
    survivalTips: ["Don't run", "Find a barrier"]
  }
];

const scenarios = [
  {
    animal: "Moose",
    continent: "North America",
    image: "https://images.unsplash.com/photo-1549471380-3023219aa760?auto=format&fit=crop&w=400",
    description: "A moose is staring at you, hooves pawing the ground.",
    options: [
      { text: "Run for it", correct: false },
      { text: "Stand still, no eye contact", correct: true }
    ],
    explanation: "Running triggers a chase. Standing still shows you aren't a threat."
  },
  {
    animal: "Elephant",
    continent: "Africa",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400",
    description: "An elephant is flapping ears and trumpeting.",
    options: [
      { text: "Back away slowly", correct: true },
      { text: "Climb a small tree", correct: false }
    ],
    explanation: "Slowly backing away is the standard safety protocol for elephant warnings."
  }
];
