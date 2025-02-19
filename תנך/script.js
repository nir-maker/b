// מערך השאלות – הנתיבים לתמונות עודכנו לפי השמות, 
// והקובץ שמע זהה לכל השאלות (נשתמש בו כנגן גלובלי).
const questions = [
  {
    questionText: "כמה חודשים נמשכה מלכות יהויכין?",
    choices: ["3 חודשים", "5 חודשים", "12 חודשים", "18 חודשים"],
    correct: 0,
    image: "C:\\Users\\ניר\\Desktop\\תנך\\images\\תמונה1.jpg",
    audio: "C:\\Users\\ניר\\Desktop\\תנך\\audio\\קובץ שמע.mp3"
  },
  {
    questionText: "מי נבחר מלך יהודה לאחר גלות יהויכין?",
    choices: ["יהויכין", "צדקיהו", "יהויקים", "מלכים"],
    correct: 1,
    image: "C:\\Users\\ניר\\Desktop\\תנך\\images\\תמונה2.jpg",
    audio: "C:\\Users\\ניר\\Desktop\\תנך\\audio\\קובץ שמע.mp3"
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
    image: "C:\\Users\\ניר\\Desktop\\תנך\\images\\תמונה3.jpg",
    audio: "C:\\Users\\ניר\\Desktop\\תנך\\audio\\קובץ שמע.mp3"
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

// מאזינים לאירועים
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartGame);

function startGame() {
  startScreen.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  
  // אתחול נגן השמע – מכיוון שכל השאלות משתמשות באותו קובץ שמע,
  // אנו מגדירים אותו פעם אחת בתחילת המשחק.
  backgroundAudio.src = "C:\\Users\\ניר\\Desktop\\תנך\\audio\\קובץ שמע.mp3";
  backgroundAudio.play();
  
  showQuestion();
}

function showQuestion() {
  // הצגת מסך השאלה והסתרת מסך התוצאה
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
  // מניעת לחיצות מרובות על אפשרויות התשובה
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
  
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.correct) {
    score++;
    resultMessageEl.textContent = "תשובה נכונה!";
  } else {
    resultMessageEl.textContent = "תשובה לא נכונה.";
  }
  
  // מעבר למסך התוצאה (הנגן לא נוגע – ממשיך להתנגן)
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
  
  // במידת הצורך, אפשר להפסיק את נגן השמע כאן
  // backgroundAudio.pause();
}

function restartGame() {
  finalScreen.style.display = "none";
  startScreen.style.display = "block";
}
