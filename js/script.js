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

// Quiz variables
let questionCount;
let scoreCount = 0;
let count = 11;
let quizStartTime;
let countdown;

// Quiz array with questions, options, and correct answers
const quizArray = [
  {
    id: 1,
    question: "What is the time complexity of the following code snippet?",
    options: ["O(n)", "O(n^2)", "O(n^3)", "O(n^4)"],
    correct: "O(n^2)"
  },
  // Add more questions here...
];

// Restart quiz
restartBtn.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Next button event listener
nextBtn.addEventListener("click", () => {
  questionCount += 1;

  if (questionCount === quizArray.length) {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");

    // Calculate user score
    const grade = calculateGrade(scoreCount);
    const timeResultCount = calculateTimeResult();

    userHighScore.innerHTML = `High Score: ${grade}`;
    userScore.innerHTML = `Score: ${grade}`;
    userTime.innerHTML = `Time: ${timeResultCount} seconds`;
  } else {
    countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Question`;
    quizDisplay(questionCount);
    count = 11;
    clearInterval(countdown);
    timerDisplay();
  }
});

// Timer display function
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count === 0) {
      clearInterval(countdown);
      nextBtn.click();
    }
  }, 1000);
};

// Function to get the user's best score from local storage
const getHighScore = () => {
  const highScore = localStorage.getItem("highScore");
  if (highScore) {
    userHighScore.innerHTML = `High Score: ${highScore}`;
  } else {
    userHighScore.innerHTML = `High Score: 0`;
  }
};

// Function to set the user's best score in local storage
const setHighScore = (score) => {
  const highScore = localStorage.getItem("highScore");
  if (highScore) {
    if (score > highScore) {
      localStorage.setItem("highScore", score);
    }
  } else {
    localStorage.setItem("highScore", score);
  }
};


// Quiz display function
const quizDisplay = (questionCount) => {
  const quizCards = document.querySelectorAll(".container__mid");
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

// Quiz creation function
const quizCreator = () => {
  quizArray.sort(() => Math.random() - 0.5);

  for (const question of quizArray) {
    question.options.sort(() => Math.random() - 0.5);

    const div = document.createElement("div");
    div.classList.add("container__mid", "hide");

    countOfQuestion.innerHTML = `1 of ${quizArray.length} Question`;

    const questionDIV = document.createElement("p");
    questionDIV.classList.add("question");
    questionDIV.innerHTML = question.question;
    div.appendChild(questionDIV);

    div.innerHTML += `
      <button class="option__div" onclick="checker(this)">${question.options[0]}</button>
      <button class="option__div" onclick="checker(this)">${question.options[1]}</button>
      <button class="option__div" onclick="checker(this)">${question.options[2]}</button>
      <button class="option__div" onclick="checker(this)">${question.options[3]}</button>
    `;

    quizContainer.appendChild(div);
  }
};

// Checker function
const checker = (userOption) => {
  const userSolution = userOption.innerText;
  const question = document.getElementsByClassName("container__mid")[questionCount];
  const options = question.querySelectorAll(".option__div");

  options.forEach((option) => {
  option.classList.remove("selected", "blurry", "correct", "incorrect", "selected-wrong");
});

  if (userSolution === quizArray[questionCount].correct) {
  userOption.classList.add("selected", "clear", "correct");
  scoreCount += 1;

  options.forEach((option) => {
    if (option.innerText !== quizArray[questionCount].correct) {
      option.classList.add("blurry", "selected-wrong");
  }
}); 
  } else {
  userOption.classList.add("incorrect", "selected");

  options.forEach((option) => {
    if (option.innerText === quizArray[questionCount].correct) {
      option.classList.add("clear", "correct__answer", "selected-wrong");
    } else {
      option.classList.add("blurry", "selected-wrong");
    }
});
  } 

  options.forEach((element) => {
    element.disabled = true;
  });

  const optionSelected = Array.from(options).some((option) =>
    option.classList.contains("selected")
  );

  if (optionSelected) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }

  nextBtn.addEventListener("click", () => {
    nextBtn.style.display = "none";
  });

  clearInterval(countdown);
};

// Initial setup function
const initial = () => {
quizContainer.innerHTML = "";
questionCount = 0;
scoreCount = 0;
count = 11;
quizStartTime = Date.now();
clearInterval(countdown);
timerDisplay();
quizCreator();
quizDisplay(questionCount);
};

// Calculate user grade based on score
const calculateGrade = (scoreCount) => {
if (scoreCount === quizArray.length) {
return "A+";
} else if (scoreCount / quizArray.length >= 0.9) {
return "A";
} else if (scoreCount / quizArray.length >= 0.8) {
return "B";
} else if (scoreCount / quizArray.length >= 0.7) {
return "C";
} else if (scoreCount / quizArray.length >= 0.6) {
return "D";
} else {
return "F";
}
};

// Calculate user time
const calculateTimeResult = () => {
const quizEndTime = Date.now();
const totalTime = Math.floor((quizEndTime - quizStartTime) / 1000);
return totalTime;
};

// Event listener for start button
startBtn.addEventListener("click", () => {
startScreen.classList.add("hide");
displayContainer.classList.remove("hide");
initial();
});

// Hide quiz and display start screen on page load
window.onload = () => {
startScreen.classList.remove("hide");
displayContainer.classList.add("hide");
}

