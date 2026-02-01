const animalsInfo = [
  {
    name: "Moose",
    scientificName: "Alces alces",
    continent: "North America",
    image: "images/moose.png",
    description: "The moose is the largest member of the deer family. They inhabit boreal and mixed deciduous forests of the Northern Hemisphere. While typically solitary and peaceful, moose can become aggressive during mating season (rut) or when protecting calves.",
    signsOfAggression: [
      "Ears forward and pinned back",
      "Eyes wide with visible whites",
      "Hooves pawing or stomping the ground",
      "Raised hackles (hair on neck and back)",
      "Lowering head with antlers forward"
    ],
    whatMakesThemMad: [
      "Approaching too close to calves",
      "Blocking their escape route",
      "Sudden loud noises or movements",
      "Dogs (moose are naturally fearful of canines)",
      "During rutting season (September-October)"
    ],
    survivalTips: [
      "Do NOT run - moose can reach 35 mph",
      "Stand still and avoid direct eye contact",
      "Slowly back away while speaking calmly",
      "If charged, get behind a solid object (tree, boulder)",
      "If knocked down, curl into a ball and protect your head"
    ],
    dangerLevel: "High",
    weight: "400-700 kg (880-1,540 lb)",
    speed: "35 mph (56 km/h)",
    habitat: "Boreal forests, wetlands, mixed woodlands",
    diet: "Herbivore (twigs, bark, roots, aquatic plants)",
    unlockScore: 0,
    unlocked: true,
    funFact: "A moose's antlers can span up to 6 feet (1.8 m) and weigh up to 40 pounds (18 kg)!"
  },
  {
    name: "Elephant",
    scientificName: "Loxodonta africana",
    continent: "Africa",
    image: "images/elephant.png",
    description: "African elephants are the largest land animals on Earth. They're highly intelligent, social creatures that live in matriarchal herds. While generally peaceful, elephants can be unpredictable and dangerous when threatened or surprised.",
    signsOfAggression: [
      "Ear flapping (different from cooling behavior)",
      "Trumpeting loudly and repeatedly",
      "Mock charging (running forward then stopping)",
      "Head shaking with ears out",
      "Dust bathing before charge"
    ],
    whatMakesThemMad: [
      "Getting between mother and calf",
      "Surprising them (especially bulls in musth)",
      "Encroaching on their territory",
      "Vehicle engines revving loudly",
      "Flash photography at night"
    ],
    survivalTips: [
      "Stay downwind so they can smell you",
      "If charged, don't run in a straight line",
      "Look for uphill escape routes (elephants struggle uphill)",
      "Find a substantial obstacle (large tree, vehicle, building)",
      "If in vehicle, keep engine running but don't rev it"
    ],
    dangerLevel: "Extreme",
    weight: "2,700-6,000 kg (6,000-13,200 lb)",
    speed: "25 mph (40 km/h)",
    habitat: "Savannas, forests, deserts, marshes",
    diet: "Herbivore (grasses, leaves, bark, fruit)",
    unlockScore: 10,
    unlocked: false,
    funFact: "Elephants can recognize themselves in mirrors, a sign of self-awareness shared only with humans, great apes, dolphins, and magpies."
  },
  {
    name: "Mountain Lion",
    scientificName: "Puma concolor",
    continent: "North America",
    image: "images/mountain-lion.png",
    description: "Also known as cougars or pumas, mountain lions are solitary, elusive predators that inhabit a variety of ecosystems across the Americas. They're ambush predators that typically avoid humans but can be dangerous in close encounters.",
    signsOfAggression: [
      "Crouching low to the ground",
      "Tail twitching intensely",
      "Direct, unwavering eye contact",
      "Ears flattened against head",
      "Growling or hissing sounds"
    ],
    whatMakesThemMad: [
      "Running (triggers chase instinct)",
      "Turning your back on them",
      "Approaching their kill or cubs",
      "Surprising them at close range",
      "Cyclists or runners (movement triggers prey drive)"
    ],
    survivalTips: [
      "Make yourself look larger (raise arms, open jacket)",
      "Maintain eye contact but don't stare aggressively",
      "Speak firmly and loudly (don't scream)",
      "Throw objects (not at them, but nearby)",
      "If attacked, fight back aggressively - never play dead"
    ],
    dangerLevel: "Medium",
    weight: "36-120 kg (80-265 lb)",
    speed: "40-50 mph (64-80 km/h) in short bursts",
    habitat: "Mountains, forests, deserts, wetlands",
    diet: "Carnivore (deer, elk, smaller mammals)",
    unlockScore: 15,
    unlocked: false,
    funFact: "Mountain lions can jump 15 feet high and 40 feet horizontally, allowing them to ambush prey from impressive distances."
  },
  {
    name: "Hippopotamus",
    scientificName: "Hippopotamus amphibius",
    continent: "Africa",
    image: "images/hippo.png",
    description: "Despite their seemingly docile appearance, hippos are extremely aggressive and territorial. They're responsible for more human fatalities in Africa than any other large animal. Hippos spend most days in water but graze on land at night.",
    signsOfAggression: [
      "Opening mouth wide to display teeth",
      "Loud grunting and honking",
      "Charging through water creating wakes",
      "Yawning repeatedly (a threat display)",
      "Defecating while spinning tail (territory marking)"
    ],
    whatMakesThemMad: [
      "Blocking their path to water",
      "Getting between them and deep water",
      "Boats or swimmers in their territory",
      "Surprising them on land at night",
      "Approaching calves"
    ],
    survivalTips: [
      "Stay at least 100 yards away on land",
      "In boats, move quietly and don't block their routes",
      "If charged on land, run for thick vegetation (not water)",
      "Never get between a hippo and deep water",
      "In water, exit immediately if you see hippos"
    ],
    dangerLevel: "Extreme",
    weight: "1,300-1,800 kg (2,900-4,000 lb)",
    speed: "19 mph (30 km/h) on land, 5 mph (8 km/h) in water",
    habitat: "Rivers, lakes, mangrove swamps",
    diet: "Herbivore (mainly grasses)",
    unlockScore: 30,
    unlocked: false,
    funFact: "Hippos secrete a natural sunscreen that's red and looks like blood, leading to the myth that they sweat blood."
  },
  {
    name: "Grizzly Bear",
    scientificName: "Ursus arctos horribilis",
    continent: "North America",
    image: "images/grizzly.png",
    description: "Grizzly bears are powerful omnivores that inhabit North America's wilderness. They're typically shy but can be dangerous when surprised, threatened, or protecting food or cubs. Proper bear safety is essential in their habitat.",
    signsOfAggression: [
      "Huffing or woofing sounds",
      "Paw swatting the ground",
      "Jaw popping (clacking teeth together)",
      "Lowering head with ears back",
      "Bluff charging (running then stopping)"
    ],
    whatMakesThemMad: [
      "Surprising them at close range",
      "Getting between mother and cubs",
      "Approaching their food source",
      "Dogs (bears often view dogs as threats)",
      "Running (triggers chase response)"
    ],
    survivalTips: [
      "Carry bear spray and know how to use it",
      "Speak calmly to identify yourself as human",
      "Back away slowly, never turn and run",
      "If attacked by a defensive bear, play dead",
      "If attacked by a predatory bear, fight back aggressively"
    ],
    dangerLevel: "Extreme",
    weight: "180-360 kg (400-790 lb)",
    speed: "35 mph (56 km/h)",
    habitat: "Forests, alpine meadows, tundra",
    diet: "Omnivore (berries, roots, fish, small mammals)",
    unlockScore: 20,
    unlocked: false,
    funFact: "Despite their size, grizzly bears can run faster than Olympic sprinters and climb trees almost as well as black bears."
  },
  {
    name: "Cape Buffalo",
    scientificName: "Syncerus caffer",
    continent: "Africa",
    image: "images/buffalo.png",
    description: "Known as 'the Black Death' or 'widowmaker', Cape buffalo are considered one of Africa's most dangerous animals. They're unpredictable, highly protective of herd members, and known to ambush hunters who have wounded them.",
    signsOfAggression: [
      "Lowering head with horns pointed forward",
      "Pawing the ground aggressively",
      "Loud snorting and grunting",
      "Shaking head from side to side",
      "Direct, unwavering stare"
    ],
    whatMakesThemMad: [
      "Separating them from the herd",
      "Wounding them (they remember and seek revenge)",
      "Surprising them at close range",
      "Approaching calves",
      "Blocking escape routes"
    ],
    survivalTips: [
      "Always give them a wide berth (at least 100 yards)",
      "If charged, find a substantial obstacle (large tree, termite mound)",
      "Climb a tree if possible (they can't climb)",
      "Never approach a wounded buffalo",
      "In groups, stay together to appear larger"
    ],
    dangerLevel: "Extreme",
    weight: "500-900 kg (1,100-2,000 lb)",
    speed: "35 mph (56 km/h)",
    habitat: "Savannas, grasslands, woodlands",
    diet: "Herbivore (grasses, herbs, aquatic plants)",
    unlockScore: 40,
    unlocked: false,
    funFact: "Cape buffalo have been known to ambush hunters who wounded them hours or even days earlier, demonstrating remarkable memory and planning ability."
  },
  {
    name: "Rattlesnake",
    scientificName: "Crotalus species",
    continent: "North America",
    image: "images/rattlesnake.png",
    description: "Rattlesnakes are venomous pit vipers found throughout the Americas. Their distinctive rattle serves as a warning when they feel threatened. Most bites occur when people accidentally step on them or try to handle them.",
    signsOfAggression: [
      "Rattling tail (warning sound)",
      "Coiling body in striking position",
      "Raised head in S-shaped curve",
      "Hissing sound",
      "Tongue flicking rapidly"
    ],
    whatMakesThemMad: [
      "Stepping on or near them",
      "Cornering them with no escape route",
      "Trying to handle or kill them",
      "Vibrations from footsteps or machinery",
      "Approaching during shedding (they can't see well)"
    ],
    survivalTips: [
      "Wear sturdy boots and long pants in snake country",
      "Watch where you step and place your hands",
      "If you hear rattling, freeze immediately",
      "Back away slowly in the direction you came",
      "If bitten, stay calm, remove constrictive items, and seek medical help immediately"
    ],
    dangerLevel: "Medium",
    weight: "0.5-4 kg (1-9 lb)",
    speed: "Strike speed: 8 ft/sec (2.4 m/sec)",
    habitat: "Deserts, grasslands, forests, swamps",
    diet: "Carnivore (rodents, birds, lizards)",
    unlockScore: 5,
    unlocked: false,
    funFact: "Rattlesnake rattles are made of keratin (same material as human fingernails) and a new segment is added each time the snake sheds its skin."
  },
  {
    name: "African Lion",
    scientificName: "Panthera leo",
    continent: "Africa",
    image: "images/lion.png",
    description: "As apex predators, lions are powerful social cats that hunt in coordinated groups. While they generally avoid humans, hunger, surprise encounters, or protection of cubs can lead to dangerous situations.",
    signsOfAggression: [
      "Crouching low with tail twitching",
      "Ears flattened against head",
      "Direct stare with pupils dilated",
      "Growling or snarling",
      "Swishing tail from side to side"
    ],
    whatMakesThemMad: [
      "Surprising them at close range",
      "Running (triggers chase instinct)",
      "Approaching cubs or kills",
      "Being alone (lions target isolated individuals)",
      "Crouching or bending over (appears vulnerable)"
    ],
    survivalTips: [
      "Stand upright and maintain eye contact",
      "Make yourself look larger (raise arms, open jacket)",
      "Speak firmly and back away slowly",
      "Throw objects (not at the lion) to distract",
      "If attacked, fight back aggressively - never play dead"
    ],
    dangerLevel: "Extreme",
    weight: "120-190 kg (265-420 lb)",
    speed: "50 mph (80 km/h) in short bursts",
    habitat: "Savannas, grasslands, open woodlands",
    diet: "Carnivore (wildebeest, zebra, buffalo)",
    unlockScore: 50,
    unlocked: false,
    funFact: "Lion roars can be heard up to 5 miles (8 km) away and are used to communicate territory boundaries and locate pride members."
  },
  {
    name: "Alligator",
    scientificName: "Alligator mississippiensis",
    continent: "North America",
    image: "images/alligator.png",
    description: "American alligators are large reptiles found in southeastern United States. They're apex predators in their aquatic habitats. While they generally avoid humans, they can be dangerous when provoked, surprised, or during mating season.",
    signsOfAggression: [
      "Hissing loudly",
      "Opening mouth wide",
      "Slapping tail on water surface",
      "Body arching out of water",
      "Rapid approach in water"
    ],
    whatMakesThemMad: [
      "Swimming near them (especially during mating season)",
      "Feeding them (causes association of humans with food)",
      "Approaching nests or hatchlings",
      "Surprising them on land near water",
      "Dogs swimming in alligator habitat"
    ],
    survivalTips: [
      "Stay at least 60 feet away on land",
      "Never swim in areas where alligators live",
      "If charged on land, run in a straight line (they're fast only short distances)",
      "If bitten, fight back aggressively - hit snout and eyes",
      "Never feed or approach alligators"
    ],
    dangerLevel: "High",
    weight: "90-360 kg (200-800 lb)",
    speed: "20 mph (32 km/h) on land, 10 mph (16 km/h) in water",
    habitat: "Freshwater marshes, swamps, rivers, lakes",
    diet: "Carnivore (fish, turtles, mammals, birds)",
    unlockScore: 10,
    unlocked: false,
    funFact: "Alligators can go through 2,000-3,000 teeth in a lifetime as they constantly grow new ones to replace worn or lost teeth."
  },
  {
    name: "Wild Boar",
    scientificName: "Sus scrofa",
    continent: "Asia",
    image: "images/boar.png",
    description: "Wild boars are intelligent, adaptable omnivores found across Europe and Asia. Males have sharp tusks used for defense. While typically wary of humans, they can be aggressive when cornered, surprised, or protecting young.",
    signsOfAggression: [
      "Lowering head with tusks visible",
      "Pawing the ground aggressively",
      "Champing (loud teeth clacking)",
      "Hair raised along spine",
      "Direct charge with minimal warning"
    ],
    whatMakesThemMad: [
      "Surprising them at close range",
      "Getting between mother and piglets",
      "Cornering them with no escape route",
      "Dogs (boars often stand their ground against canines)",
      "During mating season"
    ],
    survivalTips: [
      "Give them plenty of space and escape routes",
      "Climb a tree or get to higher ground",
      "If charged, move behind a solid object",
      "Never corner or trap a wild boar",
      "If attacked, protect your abdomen and neck areas"
    ],
    dangerLevel: "Medium",
    weight: "50-200 kg (110-440 lb)",
    speed: "30 mph (48 km/h)",
    habitat: "Forests, grasslands, wetlands, agricultural areas",
    diet: "Omnivore (roots, nuts, carrion, small animals)",
    unlockScore: 15,
    unlocked: false,
    funFact: "Wild boars have a 'shield' of thickened skin and cartilage on their shoulders that protects them during fights with other boars and from predator attacks."
  },
  {
    name: "Tiger",
    scientificName: "Panthera tigris",
    continent: "Asia",
    image: "images/tiger.png",
    description: "Tigers are the largest of all big cats and powerful apex predators. While they generally avoid humans, habitat loss has increased human-tiger conflicts. They're ambush predators that stalk prey silently.",
    signsOfAggression: [
      "Low crouching stance",
      "Tail twitching intensely",
      "Ears flattened against head",
      "Growling or snarling",
      "Direct, unwavering stare"
    ],
    whatMakesThemMad: [
      "Surprising them at close range",
      "Turning your back and running",
      "Approaching cubs or kills",
      "Bending over or crouching",
      "Being alone in tiger territory"
    ],
    survivalTips: [
      "Maintain eye contact but don't stare aggressively",
      "Make yourself look larger (raise arms, open jacket)",
      "Back away slowly while speaking firmly",
      "Throw objects to distract, not at the tiger",
      "If attacked, fight back aggressively - tigers respect strength"
    ],
    dangerLevel: "Extreme",
    weight: "90-310 kg (200-680 lb)",
    speed: "40-50 mph (64-80 km/h) in short bursts",
    habitat: "Tropical forests, grasslands, mangrove swamps",
    diet: "Carnivore (deer, wild boar, buffalo)",
    unlockScore: 60,
    unlocked: false,
    funFact: "No two tigers have the same stripe pattern - like human fingerprints, each tiger's stripes are unique to that individual."
  },
  {
    name: "Komodo Dragon",
    scientificName: "Varanus komodoensis",
    continent: "Asia",
    image: "images/komodo.png",
    description: "Komodo dragons are the world's largest lizards, found only on a few Indonesian islands. They're powerful predators with venomous bites. While they generally avoid humans, they can be dangerous when surprised or during feeding.",
    signsOfAggression: [
      "Hissing loudly with forked tongue flicking",
      "Arching body and puffing up",
      "Tail lashing from side to side",
      "Opening mouth wide",
      "Rapid approach with body low to ground"
    ],
    whatMakesThemMad: [
      "Surprising them at close range",
      "Running (triggers chase response)",
      "Blood or food smells",
      "During mating season",
      "Approaching during feeding"
    ],
    survivalTips: [
      "Stay at least 30 feet away",
      "Never run - they can sprint up to 13 mph",
      "If approached, back away slowly while facing them",
      "Climb a tree if possible (they can climb when young)",
      "If bitten, seek immediate medical attention (venom is anticoagulant)"
    ],
    dangerLevel: "High",
    weight: "70-90 kg (150-200 lb)",
    speed: "13 mph (20 km/h)",
    habitat: "Tropical forests, savannas, beaches",
    diet: "Carnivore (deer, pigs, water buffalo, carrion)",
    unlockScore: 45,
    unlocked: false,
    funFact: "Komodo dragons have venom glands that secrete toxins preventing blood clotting, causing their prey to bleed to death after a single bite."
  }
];

// Additional utility functions for animals
function getAnimalByName(name) {
  return animalsInfo.find(animal => animal.name === name);
}

function getAnimalsByContinent(continent) {
  return animalsInfo.filter(animal => animal.continent === continent);
}

function getUnlockedAnimals() {
  return animalsInfo.filter(animal => animal.unlocked);
}

function getLockedAnimals() {
  return animalsInfo.filter(animal => !animal.unlocked);
}