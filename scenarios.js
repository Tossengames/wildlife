const scenarios = [
  {
    id: 1,
    animal: "Moose",
    continent: "North America",
    image: "images/moose.png",
    description: "You're hiking in a North American forest when you encounter a large moose. It's staring directly at you with its ears forward, hooves pawing the ground aggressively. Its eyes are wide and focused on your movement.",
    options: [
      { text: "Run away as quickly as possible", correct: false },
      { text: "Stand still, avoid eye contact, and slowly back away", correct: true },
      { text: "Wave your arms and shout to scare it off", correct: false },
      { text: "Climb the nearest tree immediately", correct: false }
    ],
    explanation: "Moose can charge at speeds up to 35 mph. Running may trigger their chase instinct. Standing still and avoiding eye contact shows you're not a threat. Slowly backing away gives the moose space while maintaining your safety.",
    difficulty: "medium",
    unlockScore: 0
  },
  {
    id: 2,
    animal: "Elephant",
    continent: "Africa",
    image: "images/elephant.png",
    description: "During a safari in Africa, you encounter an elephant that's flapping its ears vigorously, trumpeting loudly, and mock-charging by stomping its front feet. It seems agitated by your vehicle's presence.",
    options: [
      { text: "Back away slowly while keeping the elephant in view", correct: true },
      { text: "Throw something to distract it", correct: false },
      { text: "Honk the vehicle horn to assert dominance", correct: false },
      { text: "Speed away quickly in your vehicle", correct: false }
    ],
    explanation: "Elephants often give warning signs before actually charging. Backing away slowly shows respect for their space while keeping them in your peripheral vision. Sudden movements or loud noises may escalate the situation.",
    difficulty: "hard",
    unlockScore: 10
  },
  {
    id: 3,
    animal: "Mountain Lion",
    continent: "North America",
    image: "images/mountain-lion.png",
    description: "While hiking in mountain terrain, you spot a mountain lion watching you from a distance. It's crouched low, tail twitching, and maintaining intense eye contact.",
    options: [
      { text: "Make yourself look bigger and maintain eye contact", correct: true },
      { text: "Turn and run down the trail", correct: false },
      { text: "Play dead immediately", correct: false },
      { text: "Approach slowly to show you're friendly", correct: false }
    ],
    explanation: "Mountain lions are ambush predators. Running triggers their chase instinct. Making yourself look bigger (raise arms, open jacket) and maintaining eye contact shows you're not easy prey. Never turn your back or crouch down.",
    difficulty: "hard",
    unlockScore: 15
  },
  {
    id: 4,
    animal: "Hippopotamus",
    continent: "Africa",
    image: "images/hippo.png",
    description: "You're on a riverboat in Africa when a hippopotamus surfaces near your boat. It opens its mouth wide, displaying large teeth, and makes loud grunting sounds. The boat is between you and the shore.",
    options: [
      { text: "Remain still and let the boat drift away quietly", correct: true },
      { text: "Paddle quickly toward the shore", correct: false },
      { text: "Splash water to scare it away", correct: false },
      { text: "Stand up and wave your arms", correct: false }
    ],
    explanation: "Hippos are extremely territorial in water and responsible for more human fatalities in Africa than any other large animal. Sudden movements may be perceived as threats. Staying calm and letting the boat drift away minimizes disturbance.",
    difficulty: "extreme",
    unlockScore: 30
  },
  {
    id: 5,
    animal: "Grizzly Bear",
    continent: "North America",
    image: "images/grizzly.png",
    description: "While camping in grizzly country, you encounter a bear that has noticed you. It's standing on its hind legs, sniffing the air, and making huffing sounds. It's about 50 yards away.",
    options: [
      { text: "Speak calmly while slowly backing away", correct: true },
      { text: "Play dead immediately", correct: false },
      { text: "Run toward the nearest tree", correct: false },
      { text: "Throw your backpack at it as a distraction", correct: false }
    ],
    explanation: "A bear standing up is usually curious, not aggressive. Speaking calmly identifies you as human. Slowly backing away gives the bear space. Never run from a bear - they can outrun humans easily. Playing dead is only for actual attacks.",
    difficulty: "hard",
    unlockScore: 20
  },
  {
    id: 6,
    animal: "Cape Buffalo",
    continent: "Africa",
    image: "images/buffalo.png",
    description: "On an African plain, you accidentally come between a Cape buffalo and its herd. It lowers its head, snorts loudly, and paws the ground aggressively. There's a large tree about 20 feet behind you.",
    options: [
      { text: "Slowly move toward the tree without turning your back", correct: true },
      { text: "Stand your ground and stare it down", correct: false },
      { text: "Run in a zigzag pattern away from it", correct: false },
      { text: "Make loud noises to scare it", correct: false }
    ],
    explanation: "Cape buffalo are known as one of Africa's most dangerous animals. Putting a solid obstacle like a tree between you and the buffalo can stop a charge. Never run in a straight line or zigzag - they're faster than you. Slow movement is key.",
    difficulty: "extreme",
    unlockScore: 40
  },
  {
    id: 7,
    animal: "Rattlesnake",
    continent: "North America",
    image: "images/rattlesnake.png",
    description: "While walking on a desert trail, you hear a distinct rattling sound near your feet. You look down to see a rattlesnake coiled and ready to strike, about 2 feet away.",
    options: [
      { text: "Freeze immediately, then slowly back away", correct: true },
      { text: "Jump backward quickly", correct: false },
      { text: "Try to kill it with a nearby rock", correct: false },
      { text: "Slowly reach down to move it with a stick", correct: false }
    ],
    explanation: "Rattlesnakes can strike up to half their body length. Sudden movements may trigger a strike. Freezing gives you time to assess, then slowly moving out of strike range is safest. Most snake bites occur when people try to handle or kill snakes.",
    difficulty: "easy",
    unlockScore: 5
  },
  {
    id: 8,
    animal: "African Lion",
    continent: "Africa",
    image: "images/lion.png",
    description: "During a walking safari, you encounter a lioness that has separated from her pride. She's crouched low, tail twitching, and staring directly at you. You're with a group but no vehicle is nearby.",
    options: [
      { text: "Stand your ground in a group and make noise", correct: true },
      { text: "Everyone should scatter in different directions", correct: false },
      { text: "One person should approach to distract it", correct: false },
      { text: "Climb the nearest tree individually", correct: false }
    ],
    explanation: "Lions typically avoid groups that appear confident and loud. Staying together makes your group look larger and more formidable. Scattering triggers the predator's instinct to chase the weakest target. Lions can climb trees if motivated.",
    difficulty: "extreme",
    unlockScore: 50
  },
  {
    id: 9,
    animal: "Alligator",
    continent: "North America",
    image: "images/alligator.png",
    description: "While fishing in Florida wetlands, an alligator approaches your boat. It's swimming directly toward you with only its eyes and nostrils visible above water. The boat is small and unstable.",
    options: [
      { text: "Paddle away calmly without splashing", correct: true },
      { text: "Splash water to scare it away", correct: false },
      { text: "Reach out to touch its snout with the paddle", correct: false },
      { text: "Jump into the water and swim to shore", correct: false }
    ],
    explanation: "Alligators are curious but generally avoid humans. Sudden movements or splashing may be interpreted as injured prey. Calm, deliberate paddling shows you're not food. Never enter water with alligators - they're ambush predators.",
    difficulty: "medium",
    unlockScore: 10
  },
  {
    id: 10,
    animal: "Wild Boar",
    continent: "Asia",
    image: "images/boar.png",
    description: "While hiking in Asian forests, you encounter a wild boar with piglets. The mother boar charges toward you, tusks visible, making aggressive grunting sounds. There's a large rock formation to your left.",
    options: [
      { text: "Get to higher ground on the rocks", correct: true },
      { text: "Run in a straight line away from it", correct: false },
      { text: "Make yourself look bigger and shout", correct: false },
      { text: "Play dead immediately", correct: false }
    ],
    explanation: "Mother boars are extremely protective. They can run up to 30 mph. Getting to higher ground puts you out of reach since boars can't climb well. Running triggers chase instinct. Playing dead doesn't work with boars - they may continue attacking.",
    difficulty: "medium",
    unlockScore: 15
  }
];

// Additional scenario sets can be added for more continents
const asiaScenarios = [
  // Asian animal scenarios would go here
];

const europeScenarios = [
  // European animal scenarios would go here
];