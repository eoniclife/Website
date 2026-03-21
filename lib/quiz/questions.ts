import type { QuizQuestion } from "@/lib/quiz/types";

export const questions: QuizQuestion[] = [
  {
    id: "Q1",
    cluster: "entry",
    text: "I am...",
    options: [
      { id: "male", text: "Male", icon: "○", score: 0 },
      { id: "female", text: "Female", icon: "○", score: 0 },
      { id: "other", text: "Prefer not to say", icon: "○", score: 0 },
    ],
  },
  {
    id: "Q2",
    cluster: "entry",
    text: "My age is...",
    options: [
      { id: "18-24", text: "18–24", score: 0 },
      { id: "25-34", text: "25–34", score: 0 },
      { id: "35-44", text: "35–44", score: 0 },
      { id: "45plus", text: "45+", score: 0 },
    ],
  },
  {
    id: "Q3",
    cluster: "entry",
    text: "My days are mostly spent...",
    options: [
      { id: "founder", text: "Running my own business or startup", score: 0 },
      { id: "professional", text: "In a demanding professional role", score: 0 },
      { id: "mixed", text: "Managing work, family, and everything in between", score: 0 },
      { id: "other", text: "Something else", score: 0 },
    ],
  },
  {
    id: "Q4",
    cluster: "energy",
    text: "When my alarm goes off, my first feeling is usually...",
    options: [
      { id: "ready", text: "Ready to move", score: 0 },
      { id: "slow", text: "I need a few minutes", score: 1 },
      { id: "exhausted", text: "Already tired before the day starts", score: 2 },
    ],
  },
  {
    id: "Q5",
    cluster: "energy",
    text: "My energy between 2pm and 4pm is usually...",
    options: [
      { id: "steady", text: "Steady — I keep going", score: 0 },
      { id: "dip", text: "Dips, but I push through", score: 1 },
      { id: "crash", text: "Crashes hard — I need coffee or sugar", score: 2 },
    ],
  },
  {
    id: "Q6",
    cluster: "energy",
    text: "By the time evening arrives, I feel...",
    options: [
      { id: "good", text: "Still have something left", score: 0 },
      { id: "fumes", text: "Running on fumes", score: 1 },
      { id: "done", text: "Completely done", score: 2 },
    ],
  },
  {
    id: "Q7",
    cluster: "energy",
    text: "I reach for caffeine or sugar to get through the day...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "sometimes", text: "Once or twice a day", score: 1 },
      { id: "habit", text: "It's become a daily habit", score: 2 },
    ],
  },
  {
    id: "Q8",
    cluster: "energy",
    text: "After a full night of sleep, I wake up feeling...",
    options: [
      { id: "refreshed", text: "Refreshed and ready", score: 0 },
      { id: "okay", text: "Okay, not great", score: 1 },
      { id: "unrested", text: "Like I barely slept", score: 2 },
    ],
  },
  {
    id: "Q9",
    cluster: "energy",
    text: "My energy across the week...",
    options: [
      { id: "consistent", text: "Stays fairly consistent", score: 0 },
      { id: "drops", text: "Drops toward Thursday or Friday", score: 1 },
      { id: "peaks-falls", text: "Peaks on Monday and falls off fast", score: 2 },
    ],
  },
  {
    id: "Q10",
    cluster: "energy",
    text: "On a demanding day, my energy...",
    options: [
      { id: "holds", text: "Holds up well", score: 0 },
      { id: "manages", text: "Dips but I manage", score: 1 },
      { id: "struggles", text: "I genuinely struggle to get through it", score: 2 },
    ],
  },
  {
    id: "Q11",
    cluster: "focus",
    text: "When I sit down for deep work, my mind...",
    options: [
      { id: "locks-in", text: "Locks in quickly", score: 0 },
      { id: "settles", text: "Takes a while to settle", score: 1 },
      { id: "wanders", text: "Wanders constantly — I'm easily pulled away", score: 2 },
    ],
  },
  {
    id: "Q12",
    cluster: "focus",
    text: "By mid-afternoon, my thinking feels...",
    options: [
      { id: "sharp", text: "Sharp", score: 0 },
      { id: "cloudy", text: "Cloudy but workable", score: 1 },
      { id: "fog", text: "Like wading through fog", score: 2 },
    ],
  },
  {
    id: "Q13",
    cluster: "focus",
    text: "I forget things I just heard or read...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "sometimes", text: "Sometimes", score: 1 },
      { id: "often", text: "More than I'm comfortable with", score: 2 },
    ],
  },
  {
    id: "Q14",
    cluster: "focus",
    text: "When I need to be creative or solve something complex...",
    options: [
      { id: "easy", text: "I get into it fairly easily", score: 0 },
      { id: "effort", text: "I can, but it takes real effort", score: 1 },
      { id: "wont-cooperate", text: "My brain just won't cooperate", score: 2 },
    ],
  },
  {
    id: "Q15",
    cluster: "focus",
    text: "After a demanding mental task, I feel...",
    options: [
      { id: "ready", text: "Ready for the next one", score: 0 },
      { id: "need-break", text: "I need a break first", score: 1 },
      { id: "wiped", text: "Completely wiped", score: 2 },
    ],
  },
  {
    id: "Q16",
    cluster: "focus",
    text: "My focus in the first hour of work is usually...",
    options: [
      { id: "strong", text: "Strong — I hit the ground running", score: 0 },
      { id: "varies", text: "Depends on the day", score: 1 },
      { id: "fighting", text: "I spend most of it fighting distraction", score: 2 },
    ],
  },
  {
    id: "Q17",
    cluster: "stress",
    text: "When work pressure peaks, I...",
    options: [
      { id: "handles", text: "Handle it without too much trouble", score: 0 },
      { id: "feels-manages", text: "Feel it, but manage", score: 1 },
      { id: "hits-everywhere", text: "Feel it everywhere — body, mood, sleep all take a hit", score: 2 },
    ],
  },
  {
    id: "Q18",
    cluster: "stress",
    text: "After a stressful period, I feel normal again in...",
    options: [
      { id: "day", text: "A day or so", score: 0 },
      { id: "days", text: "Several days", score: 1 },
      { id: "never", text: "It kind of never fully lifts", score: 2 },
    ],
  },
  {
    id: "Q19",
    cluster: "stress",
    text: "I feel on edge or reactive without a clear reason...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "sometimes", text: "Sometimes", score: 1 },
      { id: "often", text: "More often than I'd like to admit", score: 2 },
    ],
  },
  {
    id: "Q20",
    cluster: "stress",
    text: "Physical signs of stress — tight shoulders, jaw tension, headaches — show up...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "occasionally", text: "Occasionally", score: 1 },
      { id: "regularly", text: "Pretty regularly", score: 2 },
    ],
  },
  {
    id: "Q21",
    cluster: "stress",
    text: "When I have free time, my mind...",
    options: [
      { id: "settles", text: "Settles easily — I can actually relax", score: 0 },
      { id: "comes-down", text: "Needs some time to come down", score: 1 },
      { id: "no-off", text: "Doesn't really switch off", score: 2 },
    ],
  },
  {
    id: "Q22",
    cluster: "stress",
    text: "After a stressful day, my sleep is...",
    options: [
      { id: "fine", text: "Fine — I can separate work from rest", score: 0 },
      { id: "worse", text: "Worse than usual", score: 1 },
      { id: "significantly-affected", text: "Significantly affected — mind races at night", score: 2 },
    ],
  },
  {
    id: "Q23",
    cluster: "stress",
    text: "I feel genuinely calm and recovered...",
    options: [
      { id: "most-days", text: "Most days", score: 0 },
      { id: "some-days", text: "Some days", score: 1 },
      { id: "rarely", text: "Rarely, honestly", score: 2 },
    ],
  },
  {
    id: "Q24",
    cluster: "sleep",
    text: "It usually takes me to fall asleep...",
    options: [
      { id: "fast", text: "Under 15 minutes", score: 0 },
      { id: "medium", text: "15–30 minutes", score: 1 },
      { id: "slow", text: "More than 30 minutes, or it varies a lot", score: 2 },
    ],
  },
  {
    id: "Q25",
    cluster: "sleep",
    text: "I wake up in the middle of the night...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "occasionally", text: "Occasionally", score: 1 },
      { id: "often", text: "Often", score: 2 },
    ],
  },
  {
    id: "Q26",
    cluster: "sleep",
    text: "When I wake up at night, it's usually because...",
    options: [
      { id: "no-reason", text: "No particular reason", score: 0 },
      { id: "mind-running", text: "My mind starts running", score: 1 },
      { id: "restless", text: "My body feels restless or uncomfortable", score: 2 },
    ],
  },
  {
    id: "Q27",
    cluster: "sleep",
    text: "I get approximately this many hours of sleep per night...",
    options: [
      { id: "7plus", text: "7 or more", score: 0 },
      { id: "6-7", text: "6 to 7", score: 1 },
      { id: "under6", text: "Less than 6", score: 2 },
    ],
  },
  {
    id: "Q28",
    cluster: "sleep",
    text: "My sleep feels...",
    options: [
      { id: "deep", text: "Deep and restorative", score: 0 },
      { id: "light", text: "Light, not very restful", score: 1 },
      { id: "barely", text: "I barely feel like I slept", score: 2 },
    ],
  },
  {
    id: "Q29",
    cluster: "sleep",
    text: "My ideal bedtime vs when I actually sleep...",
    options: [
      { id: "aligned", text: "Pretty aligned", score: 0 },
      { id: "later", text: "I sleep later than I should", score: 1 },
      { id: "past-midnight", text: "I'm regularly up past midnight", score: 2 },
    ],
  },
  {
    id: "Q30",
    cluster: "metabolic",
    text: "After a regular meal, I feel...",
    options: [
      { id: "energized", text: "Energized or neutral", score: 0 },
      { id: "sluggish", text: "Slightly sluggish", score: 1 },
      { id: "heavy", text: "Heavy and tired — I need to sit or lie down", score: 2 },
    ],
  },
  {
    id: "Q31",
    cluster: "metabolic",
    text: "My digestion is generally...",
    options: [
      { id: "regular", text: "Regular and comfortable", score: 0 },
      { id: "occasionally-off", text: "Occasionally off", score: 1 },
      { id: "often-uncomfortable", text: "Often bloated, uncomfortable, or unpredictable", score: 2 },
    ],
  },
  {
    id: "Q32",
    cluster: "metabolic",
    text: "My diet is mostly...",
    options: [
      { id: "vegetarian", text: "Vegetarian", score: 0, flag: "vegetarian" },
      { id: "mixed", text: "A mix of veg and non-veg", score: 0 },
      { id: "non-veg", text: "Primarily non-vegetarian", score: 0 },
    ],
  },
  {
    id: "Q33",
    cluster: "metabolic",
    text: "Processed or packaged food features in my diet...",
    options: [
      { id: "rarely", text: "Rarely", score: 0 },
      { id: "sometimes", text: "Sometimes", score: 1 },
      { id: "regularly", text: "Regularly — it's convenient", score: 2 },
    ],
  },
  {
    id: "Q34",
    cluster: "metabolic",
    text: "My weight and body composition lately...",
    options: [
      { id: "comfortable", text: "I'm comfortable and consistent", score: 0 },
      { id: "noticed-changes", text: "I've noticed changes I'm not happy about", score: 1 },
      { id: "struggle", text: "It's something I actively struggle with", score: 2 },
    ],
  },
  {
    id: "Q35",
    cluster: "metabolic",
    text: "After exercise or a physically demanding day, I recover...",
    options: [
      { id: "fast", text: "Fast — I bounce back easily", score: 0 },
      { id: "day-or-two", text: "It takes a day or two", score: 1 },
      { id: "slowly", text: "Slowly — I stay sore or fatigued longer than I should", score: 2 },
    ],
  },
  {
    id: "Q36",
    cluster: "metabolic",
    text: "My immunity — colds, infections, falling sick — compared to others...",
    options: [
      { id: "rarely-sick", text: "I rarely get sick", score: 0 },
      { id: "average", text: "About average", score: 1 },
      { id: "more-than-most", text: "I seem to get hit more than most", score: 2 },
    ],
  },
];

export const questionsById = Object.fromEntries(questions.map((question) => [question.id, question]));
