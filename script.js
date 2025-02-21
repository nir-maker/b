// מערך השאלות - החלפנו את שאלות 4 ו-5 בשאלות חדשות
const questions = [
  {
    questionText: "כמה חודשים נמשכה מלכות יהויכין?",
    choices: ["3 חודשים", "5 חודשים", "12 חודשים", "18 חודשים"],
    correct: 0,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna1.jpg",
    audio: "https://raw.githubusercontent.com/nir-maker/b/main/audio/sound.mp3"
  },
  {
    questionText: "מי נבחר מלך יהודה לאחר גלות יהויכין?",
    choices: ["יהויכין", "צדקיהו", "יהויקים", "מלכים"],
    correct: 1,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna3.jpg",
    audio: "https://raw.githubusercontent.com/nir-maker/b/main/audio/sound.mp3"
  },
  {
    questionText: "מהו המסר העיקרי בפרק זה?",
    choices: [
      "החורבן נגרם מחטאי המלכים והעם",
      "העשרת העם",
      "ניצחון על אויב",
      "תחילת תקופה של שגשוג"
    ],
    correct: 0,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna4.jpg",
    audio: "https://raw.githubusercontent.com/nir-maker/b/main/audio/sound.mp3"
  },
  {
      questionText: "מדוע נבוכדנצר החליף את המלוכה ומינה את מתניה (צדקיהו)?",
    choices: [
      "כדי להשמיד את הממלכה מיד",
      "כדי למנות מלך נאמן שימלא את רצון הבבלים",
      "כדי לגמול לו על נאמנותו",
      "כדי להגן על ירושלים מפני מצרים"
    ],
    correct: 1,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna5.jpg",
    audio: "https://raw.githubusercontent.com/nir-maker/b/main/audio/sound.mp3"
  },
  {
    // שאלה חדשה מספר 5
   questionText: "מה הסיבה העיקרית לחורבן ירושלים לפי הפרק?",
    choices: [
      "חטאי המלכים והעם שהביאו לעונש אלוהי",
      "חולשת הצבא היהודי לעומת הבבלים",
      "הסכמים לא מוצלחים עם מצרים",
      "רעב כבד שפקד את הארץ"
    ],
     correct: 0,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna.jpg",
    audio: "https://raw.githubusercontent.com/nir-maker/b/main/audio/sound.mp3"
  }
];

let currentQuestionIndex = 0;
let score = 0;

// הפניות לאלמנטים במסכים
const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const finalScreen = document.getElementById("final-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionTextEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const questionImageEl = document.getElementById("question-image");
const resultMessageEl = document.getElementById("result-message");

// הפניה לנגן השמע הגלובלי
const backgroundAudio = document.getElementById("background-audio");

// יצירת נגן הצלילים לתשובות נכונות ושגויות
const correctSound = new Audio("https://actions.google.com/sounds/v1/cartoon/ta_da.ogg");
const wrongSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");

// מאזינים לאירועים
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  startScreen.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  
  // אתחול נגן השמע לשאלה הראשונה
  backgroundAudio.src = questions[currentQuestionIndex].audio;
  backgroundAudio.play();
  
  showQuestion();
}

function showQuestion() {
  // הסתרת מסך התוצאה והצגת מסך השאלה
  resultScreen.style.display = "none";
  questionScreen.style.display = "block";
  
  const currentQuestion = questions[currentQuestionIndex];
  questionTextEl.textContent = currentQuestion.questionText;
  questionImageEl.src = currentQuestion.image;
  
  // ניקוי אפשרויות קודמות והצגת אפשרויות השאלה
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => checkAnswer(index));
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  // מניעת לחיצות נוספות לאחר בחירה
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedIndex === currentQuestion.correct) {
    score++;
    // הפעלת צליל תשובה נכונה
    correctSound.play();
    // מעבר לשאלה הבאה לאחר המתנה של 1 שנייה
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  } else {
    // הפעלת צליל תשובה לא נכונה
    wrongSound.play();
    resultMessageEl.textContent = "תשובה לא נכונה.";
    questionScreen.style.display = "none";
    resultScreen.style.display = "block";
  }
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // עדכון השמע לשאלה הבאה
    backgroundAudio.src = questions[currentQuestionIndex].audio;
    backgroundAudio.play();
    showQuestion();
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  resultScreen.style.display = "none";
  finalScreen.style.display = "block";
  
  finalScreen.querySelector("p").textContent =
    `סיימת את המשחק! מספר התשובות הנכונות: ${score} מתוך ${questions.length}.`;
  
  // אפשר לעצור את השמע כאן אם רוצים:
  // backgroundAudio.pause();
}

function restartGame() {
  finalScreen.style.display = "none";
  startScreen.style.display = "block";
}
