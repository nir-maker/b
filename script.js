const questions = [
  {
    questionText: "כמה חודשים נמשכה מלכות יהויכין?",
    choices: ["3 חודשים", "5 חודשים", "12 חודשים", "18 חודשים"],
    correct: 0,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna1.jpg"
  },
  {
    questionText: "מי נבחר מלך יהודה לאחר גלות יהויכין?",
    choices: ["יהויכין", "צדקיהו", "יהויקים", "מלכים"],
    correct: 1,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna3.jpg"
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
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna4.jpg"
  },
  {
    questionText: "שאלה לדוגמה רביעית",
    choices: ["תשובה א", "תשובה ב", "תשובה ג", "תשובה ד"],
    correct: 1,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna5.jpg"
  },
  {
    questionText: "שאלה לדוגמה חמישית",
    choices: ["תשובה א", "תשובה ב", "תשובה ג", "תשובה ד"],
    correct: 2,
    image: "https://raw.githubusercontent.com/nir-maker/b/main/images/tmuna.jpg"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let attempts = 0; // משתנה לניסיון ראשון/שני בשאלה

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

// יצירת אובייקטי שמע לתשובות נכונות ושגויות
const correctSound = new Audio("https://raw.githubusercontent.com/nir-maker/b/main/audio/correct.mp3");
const wrongSound = new Audio("https://raw.githubusercontent.com/nir-maker/b/main/audio/wrong.mp3");

// מאזינים לאירועים
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  startScreen.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  // אתחול ניסיונות עבור השאלה הנוכחית
  attempts = 0;
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
    btn.addEventListener("click", () => checkAnswer(index, btn));
    choicesEl.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, btnElement) {
  const currentQuestion = questions[currentQuestionIndex];
  
  if (selectedIndex === currentQuestion.correct) {
    // תשובה נכונה
    score++;
    btnElement.classList.add("correct");
    correctSound.play();
    disableAllButtons();
    // מעבר אוטומטי לשאלה הבאה לאחר השהייה קצרה
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  } else {
    // תשובה שגויה
    if (attempts === 0) {
      // ניסיון ראשון - השבת הכפתור השגוי בלבד והפעלת צליל שגיאה
      attempts++;
      btnElement.disabled = true;
      btnElement.classList.add("wrong");
      wrongSound.play();
    } else {
      // ניסיון שני - מציגים את התשובה הנכונה
      wrongSound.play();
      disableAllButtons();
      markCorrectAnswer();
      resultMessageEl.textContent = `תשובה לא נכונה. התשובה הנכונה: ${currentQuestion.choices[currentQuestion.correct]}`;
      questionScreen.style.display = "none";
      resultScreen.style.display = "block";
    }
  }
}

function disableAllButtons() {
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

function markCorrectAnswer() {
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach((btn, index) => {
    if(index === questions[currentQuestionIndex].correct) {
      btn.classList.add("correct");
    }
  });
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
  
  finalScreen.querySelector("p").textContent =
    `סיימת את המשחק! מספר התשובות הנכונות: ${score} מתוך ${questions.length}.`;
}

function restartGame() {
  finalScreen.style.display = "none";
  startScreen.style.display = "block";
}
