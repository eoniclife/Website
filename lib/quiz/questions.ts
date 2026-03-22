import type { ClusterKey, QuizQuestion } from "@/lib/quiz/types";

export const triageQuestions: QuizQuestion[] = [
  {
    id: "QT1",
    cluster: "triage",
    text: "I am...",
    options: [
      { id: "male", text: "Male", score: 0 },
      { id: "female", text: "Female", score: 0 },
      { id: "prefer-not", text: "Prefer not to say", score: 0 },
    ],
  },
  {
    id: "QT2",
    cluster: "triage",
    text: "My age...",
    options: [
      { id: "18-24", text: "18–24", score: 0 },
      { id: "25-34", text: "25–34", score: 0 },
      { id: "35-44", text: "35–44", score: 0 },
      { id: "45plus", text: "45+", score: 0 },
    ],
  },
  {
    id: "QT3",
    cluster: "triage",
    text: "Right now, the areas where I feel most off are...",
    options: [
      { id: "energy", text: "My energy — fatigued, crashing, or running low", score: 0 },
      { id: "focus", text: "My focus — brain fog, distraction, or mental fatigue", score: 0 },
      { id: "stress", text: "My stress — I can't switch off or recover properly", score: 0 },
      { id: "sleep", text: "My sleep — falling asleep, staying asleep, or waking unrested", score: 0 },
      { id: "gut", text: "My gut — bloating, discomfort, or unpredictable digestion", score: 0 },
      { id: "metabolic", text: "My weight or metabolism — changes I'm not happy about", score: 0 },
      { id: "optimizer", text: "Everything's mostly fine — I just want to perform at a higher level", score: 0 },
    ],
  },
];

export const clusterBanks: Record<ClusterKey, QuizQuestion[]> = {
  energy: [
    {
      id: "QE1",
      cluster: "energy",
      text: "When my alarm goes off, my first feeling is...",
      weights: { energy: 1 },
      options: [
        { id: "ready", text: "Ready to move", score: 0 },
        { id: "minutes", text: "Need a few minutes", score: 1 },
        { id: "tired", text: "Already tired", score: 2 },
      ],
    },
    {
      id: "QE2",
      cluster: "energy",
      text: "My energy between 2–4pm...",
      weights: { energy: 2, metabolic: 1 },
      options: [
        { id: "steady", text: "Stays steady", score: 0 },
        { id: "push-through", text: "Dips, I push through", score: 1 },
        { id: "crashes", text: "Crashes hard", score: 2 },
      ],
    },
    {
      id: "QE3",
      cluster: "energy",
      text: "By evening, I usually feel...",
      weights: { energy: 1 },
      options: [
        { id: "gas-left", text: "Still have gas left", score: 0 },
        { id: "fumes", text: "Running on fumes", score: 1 },
        { id: "done", text: "Completely done", score: 2 },
      ],
    },
    {
      id: "QE4",
      cluster: "energy",
      text: "On a demanding day, my energy...",
      weights: { energy: 2 },
      options: [
        { id: "holds-up", text: "Holds up well", score: 0 },
        { id: "manage", text: "Dips but I manage", score: 1 },
        { id: "struggles", text: "Genuinely struggles", score: 2 },
      ],
    },
    {
      id: "QE5",
      cluster: "energy",
      text: "I reach for caffeine or sugar to get through the day...",
      weights: { energy: 1, metabolic: 1 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "once-or-twice", text: "Once or twice daily", score: 1 },
        { id: "daily-habit", text: "It's a daily habit", score: 2 },
      ],
    },
    {
      id: "QEP",
      cluster: "energy",
      text: "When my energy dips, what else tends to happen?",
      options: [
        { id: "nothing", text: "Not much else", score: 0 },
        { id: "clouds-over", text: "My thinking clouds over", score: 1, dimensionOverrides: { focus: 1 } },
        { id: "mood-drops", text: "My mood and patience drop", score: 1, dimensionOverrides: { stress: 1 } },
      ],
    },
  ],
  focus: [
    {
      id: "QF1",
      cluster: "focus",
      text: "When I sit down for deep work, my mind...",
      weights: { focus: 2 },
      options: [
        { id: "locks-in", text: "Locks in quickly", score: 0 },
        { id: "settle", text: "Takes time to settle", score: 1 },
        { id: "wanders", text: "Wanders constantly", score: 2 },
      ],
    },
    {
      id: "QF2",
      cluster: "focus",
      text: "By mid-afternoon, my thinking feels...",
      weights: { focus: 2 },
      options: [
        { id: "sharp", text: "Sharp", score: 0 },
        { id: "cloudy", text: "Cloudy but workable", score: 1 },
        { id: "fog", text: "Like wading through fog", score: 2 },
      ],
    },
    {
      id: "QF3",
      cluster: "focus",
      text: "When I need to solve something complex or creative...",
      weights: { focus: 2 },
      options: [
        { id: "easily", text: "Get into it easily", score: 0 },
        { id: "effort", text: "Takes real effort", score: 1 },
        { id: "wont-cooperate", text: "Brain won't cooperate", score: 2 },
      ],
    },
    {
      id: "QF4",
      cluster: "focus",
      text: "My focus in the first hour of work is...",
      weights: { focus: 2 },
      options: [
        { id: "strong", text: "Strong — I hit the ground running", score: 0 },
        { id: "depends", text: "Depends on the day", score: 1 },
        { id: "fighting", text: "Fighting distraction", score: 2 },
      ],
    },
    {
      id: "QF5",
      cluster: "focus",
      text: "After a demanding mental task, I feel...",
      weights: { focus: 1 },
      options: [
        { id: "ready", text: "Ready for the next one", score: 0 },
        { id: "break", text: "Need a break first", score: 1 },
        { id: "wiped", text: "Completely wiped", score: 2 },
      ],
    },
    {
      id: "QFP",
      cluster: "focus",
      text: "What most often breaks my concentration is...",
      options: [
        { id: "rarely", text: "Rarely interrupted", score: 0 },
        { id: "anxiety", text: "Restlessness or anxiety", score: 1, dimensionOverrides: { stress: 1 } },
        { id: "tiredness", text: "Tiredness or low energy", score: 1, dimensionOverrides: { energy: 1 } },
      ],
    },
  ],
  stress: [
    {
      id: "QS1",
      cluster: "stress",
      text: "When work pressure peaks...",
      weights: { stress: 2 },
      options: [
        { id: "trouble", text: "I handle it without trouble", score: 0 },
        { id: "manage", text: "I feel it but manage", score: 1 },
        { id: "hits-everything", text: "It hits everything", score: 2 },
      ],
    },
    {
      id: "QS2",
      cluster: "stress",
      text: "After a stressful period, I'm back to normal in...",
      weights: { stress: 2 },
      options: [
        { id: "day", text: "A day or so", score: 0 },
        { id: "several", text: "Several days", score: 1 },
        { id: "never-lifts", text: "It never fully lifts", score: 2 },
      ],
    },
    {
      id: "QS3",
      cluster: "stress",
      text: "When I have free time, my mind...",
      weights: { stress: 2 },
      options: [
        { id: "settles", text: "Settles easily", score: 0 },
        { id: "come-down", text: "Needs time to come down", score: 1 },
        { id: "wont-switch-off", text: "Doesn't switch off", score: 2 },
      ],
    },
    {
      id: "QS4",
      cluster: "stress",
      text: "I feel on edge or reactive without a clear reason...",
      weights: { stress: 1 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "sometimes", text: "Sometimes", score: 1 },
        { id: "often", text: "More often than I'd like", score: 2 },
      ],
    },
    {
      id: "QS5",
      cluster: "stress",
      text: "I feel genuinely calm and recovered...",
      weights: { stress: 2 },
      options: [
        { id: "most-days", text: "Most days", score: 0 },
        { id: "some-days", text: "Some days", score: 1 },
        { id: "rarely", text: "Rarely, honestly", score: 2 },
      ],
    },
    {
      id: "QSP",
      cluster: "stress",
      text: "When stress peaks, my sleep that night is...",
      options: [
        { id: "fine", text: "Fine — I can separate them", score: 0 },
        { id: "worse", text: "Worse than usual", score: 1, dimensionOverrides: { sleep: 1 } },
        { id: "disrupted", text: "Significantly disrupted", score: 2, dimensionOverrides: { sleep: 2 } },
      ],
    },
  ],
  sleep: [
    {
      id: "QSL1",
      cluster: "sleep",
      text: "It takes me to fall asleep...",
      weights: { sleep: 2 },
      options: [
        { id: "under-15", text: "Under 15 minutes", score: 0 },
        { id: "15-30", text: "15 to 30 minutes", score: 1 },
        { id: "over-30", text: "Over 30 minutes", score: 2 },
      ],
    },
    {
      id: "QSL2",
      cluster: "sleep",
      text: "I wake up during the night...",
      weights: { sleep: 2 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "occasionally", text: "Occasionally", score: 1 },
        { id: "often", text: "Often", score: 2 },
      ],
    },
    {
      id: "QSL3",
      cluster: "sleep",
      text: "My sleep feels...",
      weights: { sleep: 2 },
      options: [
        { id: "deep", text: "Deep and restorative", score: 0 },
        { id: "light", text: "Light, not restful", score: 1 },
        { id: "barely", text: "I barely slept", score: 2 },
      ],
    },
    {
      id: "QSL4",
      cluster: "sleep",
      text: "I get roughly this many hours per night...",
      weights: { sleep: 1 },
      options: [
        { id: "7plus", text: "7 or more", score: 0 },
        { id: "6-7", text: "6 to 7", score: 1 },
        { id: "under-6", text: "Under 6", score: 2 },
      ],
    },
    {
      id: "QSL5",
      cluster: "sleep",
      text: "My ideal bedtime versus when I actually sleep...",
      weights: { sleep: 1 },
      options: [
        { id: "aligned", text: "Pretty aligned", score: 0 },
        { id: "later", text: "I sleep later than I should", score: 1 },
        { id: "past-midnight", text: "Regularly past midnight", score: 2 },
      ],
    },
    {
      id: "QSLP",
      cluster: "sleep",
      text: "The day after a poor night of sleep, what suffers most?",
      options: [
        { id: "adapt", text: "I adapt fine", score: 0 },
        { id: "focus-output", text: "My focus and output", score: 1, dimensionOverrides: { focus: 1 } },
        { id: "mood-patience", text: "My mood and patience", score: 1, dimensionOverrides: { stress: 1 } },
      ],
    },
  ],
  gut: [
    {
      id: "QG1",
      cluster: "gut",
      text: "My digestion is generally...",
      weights: { gut: 2 },
      options: [
        { id: "regular", text: "Regular and comfortable", score: 0 },
        { id: "occasionally-off", text: "Occasionally off", score: 1 },
        { id: "often-off", text: "Often uncomfortable", score: 2 },
      ],
    },
    {
      id: "QG2",
      cluster: "gut",
      text: "After a regular meal, I feel...",
      weights: { gut: 1, metabolic: 2 },
      options: [
        { id: "neutral", text: "Energized or neutral", score: 0 },
        { id: "sluggish", text: "Slightly sluggish", score: 1 },
        { id: "heavy", text: "Heavy and tired", score: 2 },
      ],
    },
    {
      id: "QG3",
      cluster: "gut",
      text: "Compared to others, I seem to get sick...",
      weights: { gut: 1 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "average", text: "About average", score: 1 },
        { id: "more-than-most", text: "More than most", score: 2 },
      ],
    },
    {
      id: "QG4",
      cluster: "gut",
      text: "Bloating or digestive discomfort shows up...",
      weights: { gut: 2 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "sometimes", text: "Sometimes", score: 1 },
        { id: "regularly", text: "Pretty regularly", score: 2 },
      ],
    },
    {
      id: "QGP",
      cluster: "gut",
      text: "On days when my gut is off, what else do I notice?",
      options: [
        { id: "nothing", text: "Not much else", score: 0 },
        { id: "energy-hit", text: "My energy takes a hit", score: 1, dimensionOverrides: { energy: 1 } },
        {
          id: "mood-focus",
          text: "My mood and focus drop",
          score: 1,
          dimensionOverrides: { focus: 1, stress: 1 },
        },
      ],
    },
  ],
  metabolic: [
    {
      id: "QM1",
      cluster: "metabolic",
      text: "After a regular meal, I feel...",
      weights: { metabolic: 2, gut: 1 },
      options: [
        { id: "neutral", text: "Energized or neutral", score: 0 },
        { id: "sluggish", text: "Slightly sluggish", score: 1 },
        { id: "heavy", text: "Heavy and tired", score: 2 },
      ],
    },
    {
      id: "QM2",
      cluster: "metabolic",
      text: "My weight and body composition lately...",
      weights: { metabolic: 1 },
      options: [
        { id: "comfortable", text: "Comfortable and consistent", score: 0 },
        { id: "changes", text: "Changes I'm not happy about", score: 1 },
        { id: "struggle", text: "I actively struggle with it", score: 2 },
      ],
    },
    {
      id: "QM3",
      cluster: "metabolic",
      text: "Processed or packaged food in my diet...",
      weights: { metabolic: 1 },
      options: [
        { id: "rarely", text: "Rarely", score: 0 },
        { id: "sometimes", text: "Sometimes", score: 1 },
        { id: "regularly", text: "Regularly — it's convenient", score: 2 },
      ],
    },
    {
      id: "QM4",
      cluster: "metabolic",
      text: "After exercise or a demanding physical day, I recover...",
      weights: { recovery: 2, metabolic: 1 },
      options: [
        { id: "fast", text: "Fast — I bounce back easily", score: 0 },
        { id: "day-or-two", text: "Takes a day or two", score: 1 },
        { id: "slow", text: "Slowly — longer than I should", score: 2 },
      ],
    },
    {
      id: "QM5",
      cluster: "metabolic",
      text: "My hunger and cravings across the day are...",
      weights: { metabolic: 2 },
      options: [
        { id: "steady", text: "Steady and predictable", score: 0 },
        { id: "variable", text: "Variable, occasional spikes", score: 1 },
        { id: "cravings", text: "Strong cravings or crash-hunger", score: 2 },
      ],
    },
    {
      id: "QMP",
      cluster: "metabolic",
      text: "When my metabolism feels off, what else tends to follow?",
      options: [
        { id: "nothing", text: "Nothing obvious", score: 0 },
        { id: "low-energy", text: "Low energy and sluggishness", score: 1, dimensionOverrides: { energy: 1 } },
        { id: "gut-discomfort", text: "Gut discomfort or bloating", score: 1, dimensionOverrides: { gut: 1 } },
      ],
    },
  ],
};

export const dietQuestion: QuizQuestion = {
  id: "QDIET",
  cluster: "shared",
  text: "My diet is mostly...",
  options: [
    { id: "vegetarian", text: "Vegetarian", score: 0, flag: "vegetarian" },
    { id: "mixed", text: "A mix of veg and non-veg", score: 0 },
    { id: "non-veg", text: "Primarily non-vegetarian", score: 0 },
  ],
};

export const optimizerSequence: string[] = ["QE2", "QE4", "QF1", "QF3", "QS3", "QS5", "QSL3", "QSL4", "QG1", "QG4", "QM2", "QM4"];

export const allQuestions: QuizQuestion[] = [
  ...triageQuestions,
  ...Object.values(clusterBanks).flat(),
  dietQuestion,
];

export const questionsById = Object.fromEntries(allQuestions.map((question) => [question.id, question])) as Record<string, QuizQuestion>;
