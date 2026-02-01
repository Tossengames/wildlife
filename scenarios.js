const scenarios = [
  {
    animal: "Moose",
    continent: "North America",
    image: "https://images.unsplash.com/photo-1549471380-3023219aa760?auto=format&fit=crop&w=400",
    description: "A moose is staring at you, ears forward, hooves pawing the ground. Its eyes are wide.",
    options: [
      { text: "Run away quickly", correct: false },
      { text: "Stand still and avoid eye contact", correct: true },
      { text: "Wave arms and shout", correct: false }
    ],
    explanation: "Moose are unpredictable. Standing still and avoiding eye contact shows you aren't a challenger."
  },
  {
    animal: "Elephant",
    continent: "Africa",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=400",
    description: "An elephant is flapping its ears and trumpeting loudly toward you.",
    options: [
      { text: "Back away slowly", correct: true },
      { text: "Throw rocks at it", correct: false },
      { text: "Climb a tree nearby", correct: false }
    ],
    explanation: "Elephants flap ears to look bigger as a warning. Slowly backing away respect their space."
  }
];
