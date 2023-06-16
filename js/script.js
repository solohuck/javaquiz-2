// DOM elements
const timeLeft = document.querySelector(".time__left");
const quizContainer = document.getElementById("container");
const nextBtn = document.getElementById("next__btn");
const countOfQuestion = document.querySelector(".question__count");
const displayContainer = document.getElementById("display__container");
const scoreContainer = document.querySelector(".score__container");
const restartBtn = document.getElementById("restart");
const userScore = document.getElementById("user__score");
const startScreen = document.querySelector(".start__screen");
const startBtn = document.getElementById("start__btn");
const userTime = document.getElementById("user__time");
const userHighScore = document.getElementById("user__highscore");
const userStreak = document.getElementById("user__streak");

// Quiz variables
let questionCount;
let scoreCount;
let count;
let quizStartTime;
let countdown;
let streakCount;



// Quiz array with questions, options, and correct answers
const quizArray = [
  {
    question: "What is the correct syntax to declare a JavaScript variable?",
    options: ["var myVariable;", "variable myVariable;", "v myVariable;", "let myVariable;"],
    correct: "var myVariable;"
  },
  {
    question: "What is the result of the following expression: '2' + 2?",
    options: ["22", "4", "NaN", "Error"],
    correct: "22"
  },
  {
    question: "What is the scope of a variable declared with the 'let' keyword?",
    options: ["Global scope", "Function scope", "Block scope", "Local scope"],
    correct: "Block scope"
  },
  {
    question: "What does the '=== operator' do in JavaScript?",
    options: ["Compares the values and types of two variables", "Assigns a value to a variable", "Checks if two variables are equal", "None of the above"],
    correct: "Compares the values and types of two variables"
  },
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    options: ["Returns the type of a variable", "Checks if a variable is defined", "Converts a value to a boolean", "Performs a mathematical operation"],
    correct: "Returns the type of a variable"
  }
];

// Restart quiz
const restartQuiz = () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
};

// restartBtn event listener
restartBtn.addEventListener("click", restartQuiz);

// Next button event listener
nextBtn.addEventListener("click", () => {
  questionCount++;
  console.log(questionCount);
  nextQuestion();
  quizDisplay(questionCount);
  nextBtn.style.display = "none";
  timeLeft.textContent = "10s";
});

const nextQuestion = () => {

  if (questionCount === quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");

    // Calculate user score, grade, and time
    const grade = calculateGrade(scoreCount);
    const timeCount = calculateTimeResult();

    userHighScore.textContent = `High Score: ${grade}`;
    userScore.textContent = `Score: ${scoreCount}/${quizArray.length} (${grade})`;
    userTime.textContent = `Time: ${timeCount}`;
    questionCount = 0;

  } else {
    countOfQuestion.textContent = `${questionCount + 1} of ${quizArray.length} Questions`;

    count = 10;
    clearInterval(countdown);
    timerDisplay();
  }
};


// Timer display function
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.textContent = `${count}s`;

    if (count === 0) {
      clearInterval(countdown);
      handleTimeout();
      userStreak.textContent = "";
    }
  }, 1000);
};

// Handle timeout when no option is selected
const handleTimeout = () => {
  const question = document.getElementsByClassName("container__mid")[questionCount];

  if (question) {
    const options = question.querySelectorAll(".option__div");

    options.forEach((option) => {
      option.classList.remove("selected", "blurry", "correct", "incorrect", "selected-wrong");
    });

    options.forEach((option) => {
      if (option.innerText === quizArray[questionCount].correct) {
        option.classList.add("clear", "correct__answer", "selected-wrong");
      } else {
        option.classList.add("blurry", "selected-wrong");
      }
    });
  }

  streakCount = 0;
  nextBtn.style.display = "block";

  clearInterval(countdown);
  userStreak.textContent = `${calculateStreak(streakCount)}`;
};

// Quiz display function
const quizDisplay = (questionCount) => {
  const quizCards = document.querySelectorAll(".container__mid");

  if (quizCards.length > 0) {
    quizCards.forEach((card) => {
      card.classList.add("hide");
    });

     if (quizCards[questionCount]) {
      quizCards[questionCount].classList.remove("hide");
    }
  }
};

// Quiz creation function
const quizCreator = () => {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < quizArray.length; i++) {
    const question = quizArray[i];
    question.options.sort(() => Math.random() - 0.5);

    const div = document.createElement("div");
    div.classList.add("container__mid", "hide");

    countOfQuestion.textContent = `1 of ${quizArray.length} Question`;

    const questionDIV = document.createElement("p");
    questionDIV.classList.add("question");
    questionDIV.textContent = question.question;
    div.appendChild(questionDIV);

    question.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option__div");
      optionButton.textContent = option;
      optionButton.addEventListener("click", () => checker(optionButton));
      div.appendChild(optionButton);
    });

    quizContainer.appendChild(div);
  }
};

// Checker function
const checker = (userOption) => {
  const userSolution = userOption.textContent;
  const question = document.getElementsByClassName("container__mid")[questionCount];
  const options = question.querySelectorAll(".option__div");

  options.forEach((option) => {
    option.classList.remove("selected", "blurry", "correct", "incorrect", "selected-wrong");
  });

  const answerControl = () => {

    nextBtn.style.display = "block";

    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("selected", "correct");
      scoreCount++;
      streakCount++;

      userStreak.textContent = `${calculateStreak(streakCount)}`;

      options.forEach((option) => {
        if (option.textContent !== quizArray[questionCount].correct) {
          option.classList.add("blurry", "selected-wrong");
        }
      });
    } else {
      streakCount = 0;
      userOption.classList.add("incorrect", "selected");

      options.forEach((option) => {
        if (option.textContent === quizArray[questionCount].correct) {
          option.classList.add("correct", "selected-wrong");
        } else {
          option.classList.add("blurry", "selected-wrong");
        }
      });
    }
  };

  options.forEach((element) => {
    element.disabled = true;
  });



  clearInterval(countdown);
  answerControl();
};

// Initial setup function
const initial = () => {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 10;
  timeLeft.textContent = "10s";
  streakCount = 0;
  quizStartTime = Date.now();
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
};

// Calculate user grade based on score
const calculateGrade = (scoreCount) => {
  const percentage = (scoreCount / quizArray.length) * 100;

  if (percentage >= 90) {
    return "A+";
  } else if (percentage >= 80) {
    return "A";
  } else if (percentage >= 70) {
    return "B";
  } else if (percentage >= 60) {
    return "C";
  } else if (percentage >= 50) {
    return "D";
  } else {
    return "F";
  }
};

// Calculate user streak
const calculateStreak = (streakCount) => {

  if (streakCount > 1 && streakCount % 2 === 0) {
    if (streakCount <= 3) {
      return "Heating Up";
    } else if (streakCount <= 5) {
      return "On Fire";
    } else if (streakCount <= 7) {
      return "Super Hot";
    } else if (streakCount <= 9) {
      return "Inferno";
    } else if (streakCount < 10) {
      return "Godlike";
    } else if (streakCount === 10) {
      return "Ultra Instinct";
    }
  }
  return "";
};


// Calculate user time
const calculateTimeResult = () => {
  const quizEndTime = Date.now();
  const totalTime = Math.floor((quizEndTime - quizStartTime) / 1000);

  if (totalTime > 60) {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  } else {
    return `${totalTime} seconds`;
  }
};

// Event listener for start button
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

// Hide quiz and display start screen on page load
window.onload = () => {
  displayContainer.classList.add("hide");
  startScreen.classList.remove("hide");
};


