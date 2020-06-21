// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var nextButton = document.getElementById("start-btn")

// going to default to underfined
var shuffledQuestions, currentQuestionIndex

// I'll need the following work to be done once user chooses answer: 
// nextButton.addEventListener("click", () => {
//     currentQuestionIndex++;
//     sendNextQuestion();
// })

// function to strt game - called by clicking Start
function startGame() {
    // check to see if the function has been called
    console.log("Game has started");
    // hide the start button
    startButtonEl.classList.add("hide");
    // choose from the array of questions randomly
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // set the current index to zero
    currentQuestionIndex = 0;
    // show the question element
    questionContainerEl.classList.remove("hide");
    // call the sendNextQuestion function
    sendNextQuestion();
}

// sequences through next questions
function sendNextQuestion() {
    // call the resetState function
    resetState();
    // call the showQuestion function
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// removes answer
function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

// function that shows hidden questions and corresponding answers
function showQuestion(question) {
    // writes the question line 
    questionEl.innerText = question.question;

    question.answers.forEach(answer => {
        // creates button element
        var button = document.createElement("button");
        // writes the answer text 
        button.innerText = answer.text;
        // turns answers into buttons
        button.classList.add("btn");

        // if (answer.correct) {
        //     button.dataset.correct = answer.correct;
        // }

        // listens for user to click the answer buttons 
        button.addEventListener("click", selectAnswer);
        // appends button into answer buttons elemts
        answerButtonsEl.appendChild(button);
    })

}

//  
function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        currentQuestionIndex++;
        sendNextQuestion();
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        console.log("Correct!")
    } else {
        element.classList.add("wrong");
        console.log("Wrong!");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// array of objects of questions 
var questions = [{
    question: "What is 4+8?",
    answers: [{
            text: "8",
            correct: true
        },
        {
            text: "6",
            correct: false
        },
        {
            text: "44",
            correct: false
        },
        {
            text: "4",
            correct: false
        }
    ]
},
{
    question: "What is 4+4?",
    answers: [{
            text: "12",
            correct: true
        },
        {
            text: "6",
            correct: false
        },
        {
            text: "44",
            correct: false
        },
        {
            text: "4",
            correct: false
        }
    ]
}]






// Timer:
//    1) Count down from beginning
//    2) Decrease if wrong answer 
//    3) Display on screen 

// View high score - click event 

// For questions:
//      1) Choose answer - click event 
//      2) If correct - display "Correct!"
//      3) If incorrect - display "Wrong!"

// All done! 
//     1) Enter Initials
//      2) Submit button

// High Scores: 
//      1) Show IF clicked submit button OR by clicking "View Highschore"
//      2) "View High Score" needs to be visible on screen. 


startButtonEl.addEventListener("click", startGame)