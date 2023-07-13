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
questionIndex = 0; // Index of the current question
questionsAnsweredCorrectly = 0; // Number of questions answered
count = 10; // Number of seconds to answer each question
let correctAnswer; // Correct answer to the current question
let userSolution; // User's answer to the current question
let streakCounter = 0; // Number of questions answered correctly in a row

// function calls
// StartQuiz();
// init();
// createQuestion();
// questionTimer();
// quizCompletionTimer();
// handleUserChoice();
// handleUserHealth();
// handleUserStreak();
// nextButton();
// endQuiz();
// restartQuiz();



// qiuz empty array
let quizArray = [];

// Create a question and it's choices
function createQuestion() {
    // clear previous question
    quizContainer.innerHTML = "";

    const operations = ['*', '/', '+', '-']; // Array of operations
    const operation = operations[Math.floor(Math.random() * operations.length)]; // Random operation
    let num1, num2; // Operands for the question
  
    // Generate numbers based on the operation
    switch (operation) {
        case '*': // Multiplication
          num1 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
          num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
          correctAnswer = num1 * num2; // Compute the correct answer
          break;
        case '/': // Division
          correctAnswer = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
          num2 = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
          num1 = correctAnswer * num2; // Compute num1 based on the correct answer
          break;
        case '+': // Addition
          num1 = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
          num2 = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
          correctAnswer = num1 + num2; // Compute the correct answer
          break;
        case '-': // Subtraction
          num1 = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
          num2 = Math.floor(Math.random() * num1) + 1; // Random number between 1 and num1
          correctAnswer = num1 - num2; // Compute the correct answer
          break;
    }
  
      // Function to generate random choices for the question
    function createMultiChoice(correctAnswer) {
        const choices = [correctAnswer.toString()]; // Array to store choices
        const numChoices = 4; // Number of choices (including the correct answer)
  
        while (choices.length < numChoices) {
            const randomNum = Math.floor(Math.random() * 100) + 1; // Generate a random number
  
            // Add the random number to choices if it's not already included
            if (!choices.includes(randomNum.toString())) {
                choices.push(randomNum.toString());
            }
        }

        shuffleArray(choices); // Shuffle the choices
        return choices;
    }
  
    // Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
  
  // Call the function to generate random choices for each question
    for (let i = 0; i < quizArray.length; i++) {
        quizArray[i].options = createMultiChoice(parseInt(quizArray[i].correct));
    } 

    const question = `What is ${num1} ${operation} ${num2}?`;
    const choices = createMultiChoice(correctAnswer);
  
    const div = document.createElement("div");
    div.classList.add("container__mid");
      
    const questionDIV = document.createElement("p");
    questionDIV.classList.add("question");
    questionDIV.textContent = question
    div.appendChild(questionDIV);
      
    choices.forEach((choices) => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option__div");
        optionButton.textContent = choices;
        optionButton.addEventListener("click", () => optionButtonReaction(optionButton));
        div.appendChild(optionButton);
    });
      
    quizContainer.appendChild(div);

   // if correct answer is chosen log correct else log incorrect
    function optionButtonReaction(optionButton) {
        const question = document.querySelector(".container__mid");
        const options = question.querySelectorAll(".option__div");
        const userSolution = optionButton.textContent;

        if (userSolution === correctAnswer.toString()) {
            streakCounter++;
            questionsAnsweredCorrectly++;
            displayUserStreak();
            console.log("correct", questionsAnsweredCorrectly, streakCounter);

            optionButton.classList.add("selected", "correct");

            options.forEach((option) => {
                if (option.textContent !== correctAnswer.toString()) {
                  option.classList.add("blurry", "selected-wrong");
                }
            });

        } else {

            healthCount--;
            streakCounter = 0;
            handleUserHealth();
            console.log("incorrect", streakCounter);

            optionButton.classList.add("selected", "incorrect");

            options.forEach((option) => {
                if (option.textContent === correctAnswer.toString()) {
                  option.classList.add("correct", "selected-wrong");
                } else {
                  option.classList.add("blurry", "selected-wrong");
                }
            });
        }

        clearInterval(countdown);
        nextBtn.style.display = "block";
    }
    
    console.log(correctAnswer)
};

// handle user health 
function handleUserHealth() {
    console.log(healthCount);

    if (healthCount === 3) {
        document.getElementById("health3").style.display = "block";
        document.getElementById("health2").style.display = "block";
        document.getElementById("health1").style.display = "block";
    } else if (healthCount === 2) {
      document.getElementById("health3").style.display = "none";
    } else if (healthCount === 1) {
      document.getElementById("health2").style.display = "none";
    } else if (healthCount === 0) {
      document.getElementById("health1").style.display = "none";

      endQuiz();
      return;
    }

    restartHealth = () => {
        document.getElementById("health1").style.display = "inline-block";
        document.getElementById("health2").style.display = "inline-block";
        document.getElementById("health3").style.display = "inline-block";
        healthCount = 3;
    };
}

const init = () => {
    quizContainer.innerHTML = "";
    timeLeft.textContent = "10s";
    quizStartTime = Date.now(); 
    healthCount = 3;
    count = 10;
    streakCounter = 0;
    nextBtn.style.display = "none";
    displayQuizRemoveStart();
    startTimer();
    createQuestion();
};

const quizCompletionTimer = () => {
    const quizFinishTime = Date.now();
    const totalCompletionTime = Math.floor((quizFinishTime - quizStartTime) / 1000);
  
    if (totalCompletionTime > 60) {
        const minutes = Math.floor(totalCompletionTime / 60);
        const seconds = totalTime % 60;

        return `${minutes} minutes and ${seconds} seconds`;
    } else {

        return `${totalCompletionTime} seconds`;
    }
};

function handleOutOfTime(correctAnswer, userSolution) {
    const question = document.querySelector(".container__mid");
    const options = question.querySelectorAll(".option__div");

    streakCounter = 0;
  
    if (!userSolution) {
        options.forEach((option) => {
            if (option.textContent === correctAnswer.toString()) {
                option.classList.add("clear", "correct__answer", "selected");
            } else {
                option.classList.add("blurry", "selected-wrong");
            }
        });
    }
};

// Timer display function
const startTimer = () => {

    countdown = setInterval(() => {
      count--;
      timeLeft.textContent = `${count}s`;

        if (count === 0) {
            clearInterval(countdown);
            nextBtn.style.display = "block";
            handleUserHealth(healthCount--);
            handleOutOfTime(correctAnswer, userSolution);
        }

    }, 1000);
};

// Calculate user grade based on score
const calculateUserGrade = (questionsAnsweredCorrectly) => {

    if (questionsAnsweredCorrectly === 5) {
      return "A+";
    } else if (questionsAnsweredCorrectly === 3) {
      return "A";
    } else if (questionsAnsweredCorrectly === 2) {
      return "B";
    } else if (questionsAnsweredCorrectly === 1) {
      return "C";
    } else if (questionsAnsweredCorrectly === 0) {
      return "D";
    } else {
      return "F";
    }
};

// Calculate user streak
const calculateUserStreak = (streakCounter) => {

    if (streakCounter > 1 && streakCounter % 2 === 0) {
      if (streakCounter <= 3) {
        return "Heating Up";
      } else if (streakCounter <= 5) {
        return "On Fire";
      } else if (streakCounter <= 7) {
        return "Super Hot";
      } else if (streakCounter <= 9) {
        return "Inferno";
      } else if (streakCounter < 10) {
        return "Godlike";
      } else if (streakCounter === 10) {
        return "Ultra Instinct";
      }
    }

    return "";
    
};

const displayUserStreak = () => {

    userStreak.textContent = `${calculateUserStreak(streakCounter)}`;
    userStreak.classList.remove("hide", "fadeOut")
    userStreak.classList.add("enlarge")
  
    setTimeout(() => {
      userStreak.classList.remove("enlarge")
      userStreak.classList.add("hide", "fadeOut")
    }, 1000);
};
  
const displayQuizRemoveStart = () => {
    startScreen.classList.add("hide");  
    displayContainer.classList.remove("hide");
};

const displayStartRemoveQuiz = () => {    
    displayContainer.classList.add("hide");
    startScreen.classList.remove("hide");
};

const displayQuizRemoveScore = () => {
    scoreContainer.classList.add("hide");
    displayContainer.classList.remove("hide");
};

nextBtn.addEventListener("click", () => {
    questionIndex++;
    nextBtn.style.display = "none";
    timeLeft.textContent = "10s";
    count = 10;
    startTimer();

    if (healthCount >= 1) {
        createQuestion();   
    } else {
        endQuiz();
    }


});

const endQuiz = () => {
    // Hide question container and display score
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
  
    // Calculate user score, grade, and time
    const grade = calculateUserGrade(questionsAnsweredCorrectly);
    const timeCount = quizCompletionTimer();
  
    userHighScore.textContent = `High Score: ${questionsAnsweredCorrectly}`;
    userScore.textContent = `Score: (${grade})`;
    userTime.textContent = `Time: ${timeCount}`;
};

restartBtn.addEventListener("click", () => {
    init();
    displayQuizRemoveScore();
    restartHealth();
});

// Event listener for start button
startBtn.addEventListener("click", () => {
    init();
});
  
// Hide quiz and display start screen on page load
window.onload = () => {
    displayStartRemoveQuiz();
};

  


