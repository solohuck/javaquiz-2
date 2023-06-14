
//create a quiz countdown timer
let timer = 60;

let countdown = setInterval(function(){
  if(timer <= 0){
    clearInterval(countdown);
    document.getElementById("timer").innerHTML = "Finished";
  } else {
    document.getElementById("timer").innerHTML = timer + " seconds remaining";
  }
  timer -= 1;
}
, 1000);

// create an array of 5 programming questions
let questions = [
  {
    title: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choices: ["&lt;script href='xxx.js'&gt;","&lt;script name='xxx.js'&gt;","&lt;script src='xxx.js'&gt;","&lt;script file='xxx.js'&gt;"
    ],
    answer: "&lt;script src='xxx.js'&gt;"
  },
  {
    title: "How do you write 'Hello World' in an alert box?",
    choices: ["alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
    answer: "alert('Hello World');"
  },
  {
    title: "How do you create a function in JavaScript?",
    choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function.myFunction()"],
    answer: "function myFunction()"
  },
  {
    title: "How do you call a function named 'myFunction'?",
    choices: ["call function myFunction()", "myFunction()", "call myFunction()", "call.myFunction()"],
    answer: "myFunction()"
  },
  {
    title: "How do you write an IF statement in JavaScript?",
    choices: ["if i = 5 then", "if i == 5 then", "if i = 5", "if (i == 5)"],
    answer: "if (i == 5)"
  }
];

function begin() {
  let question = questions[Math.floor(Math.random() * questions.length)];
  document.getElementById("question").innerHTML = question.title;

  let choiceElements = document.getElementsByClassName("header__answer");
  for (let i = 0; i < choiceElements.length; i++) {
    choiceElements[i].innerHTML = question.choices[i];
  }

  let submitButtons = document.getElementsByClassName("btn");
  let resultMessage = document.getElementById("result__message");
  resultMessage.innerHTML = ""; // Clear previous message

  // check if the answer is correct
  for (let i = 0; i < submitButtons.length; i++) {
    submitButtons[i].addEventListener("click", function(event) {
      event.preventDefault();
      let correctAnswer = question.choices.indexOf(question.answer);
      let userInput = Array.from(submitButtons).indexOf(event.target);
      if (userInput === correctAnswer) {
        // make 'Correct!' message green
        resultMessage.style.color = "green";
        resultMessage.innerHTML = "Correct!"
        // add 10seconds to the countdown timer
        timer += 10;

      } else if (userInput !== correctAnswer){
        resultMessage.style.color = "red";
        resultMessage.innerHTML = "Wrong!";
        // subtract 10seconds from the countdown timer
        timer -= 10;
        
      }


      // Remove answer options and buttons
      for (let j = 0; j < choiceElements.length; j++) {
        choiceElements[j].innerHTML = "";
      }
      // Remove submit buttons
      for (let j = 0; j < submitButtons.length; j++) {
        submitButtons[j].style.display = "none";
      }

      // Delay and display next question
      setTimeout(function() {
        begin();
        // re add answer options and buttons
        for (let j = 0; j < choiceElements.length; j++) {
          choiceElements[j].innerHTML = question.choices[j];
        }
        for (let j = 0; j < submitButtons.length; j++) {
          submitButtons[j].style.display = "block";
        }
      }, 2000); // Adjust the delay time (in milliseconds) as desired
    });
  }
}


// Call the begin function is the start button is clicked
begin();