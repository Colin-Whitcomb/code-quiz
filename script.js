// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerEl = document.getElementById("answer-buttons")

// going to default to underfined
var shuffledQuestions, currentQuestionIndex

// function to strt game - called by clicking Start
function startGame() {
console.log("Started");
startButtonEl.classList.add("hide");
shuffledQuestions = questions.sort(() => Math.random() - 0.5);
currentQuestionIndex = 0;
questionContainerEl.classList.remove("hide");
sendNextQuestion();
}

// sequences 
function sendNextQuestion () {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function that shows hidden questions and corresponding answers
function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct 
        }
    })

}

function selectAnswer () {

}

// array of objects of questions 
var questions = [
    { 
        question: "What is 4+4?",
        answers: [
            { text: "8", correct: true},
            { text: "6", correct: false},
            { text: "44", correct: false},
            { text: "4", correct: false},
        ]
    }
]





// Timer:
//    1) Count down from beginning
//    2) Decrease if wrong answer 
//    3) Display on screen 

// Start button - click event 

// View high school - click event 

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