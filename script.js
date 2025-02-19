// מערך השאלות – משתמש בנתיבים יחסיים לתמונות ולקובץ שמע
const questions = [
  {
    questionText: "כמה חודשים נמשכה מלכות יהויכין?",
    choices: ["3 חודשים", "5 חודשים", "12 חודשים", "18 חודשים"],
    correct: 0,
    image: "images/תמונה1.jpg",
    audio: "audio/קובץ שמע.mp3"
  },
  {
    questionText: "מי נבחר מלך יהודה לאחר גלות יהויכין?",
    choices: ["יהויכין", "צדקיהו", "יהויקים", "מלכים"],
    correct: 1,
    image: "images/תמונה2.jpg",
    audio: "audio/קובץ שמע.mp3"
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
    image: "images/תמונה3.jpg",
    audio: "audio/קובץ שמע.mp3"
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

// נגן השמע הגלובלי
const backgroundAudio = document.getElementById("background-audio");

// מאזינים לאירועים
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  startScreen.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  
  // אתחול נגן השמע עם הקובץ היחיד
  backgroundAudio.src = "audio/קובץ שמע.mp3";
  backgroundAudio.play();
  
  showQuestion();
}

function showQuestion() {
  resultScreen.style.display = "none";
  questionScreen.style.display = "block";
  
  const currentQuestion = questions[currentQuestionIndex];
  questionTextEl.textContent = currentQuestion.questionText;
  questionImageEl.src = currentQuestion.image;
  
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => checkAnswer(index));
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correct) {
    score++;
    resultMessageEl.textContent = "תשובה נכונה!";
  } else {
    resultMessageEl.textContent = "תשובה לא נכונה.";
  }
  
  questionScreen.style.display = "none";
  resultScreen.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScreen();
  }
}

function showFinalScreen() {
  resultScreen.style.display = "none";
  finalScreen.style.display = "block";
  finalScreen.querySelector("p").textContent = `סיימת את המשחק! מספר התשובות הנכונות: ${score} מתוך ${questions.length}.`;
  // במידת הצורך: backgroundAudio.pause();
}

function restartGame() {
  finalScreen.style.display = "none";
  startScreen.style.display = "block";
}
