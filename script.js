// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var openingHeaderEl = document.getElementById("welcome-div")
var counterNum = document.getElementById("counter-num")
// var buttonA = document.getElementById("button-a")
var nextButton = document.getElementById("next-btn")

var questionIndex;
var score;

// array of questions and their corresponding options and answer. 
let questionsArr = [
    {
    question: "What is 4+8?",
    options: ["8", "6", "12", "14",],
    answer: "12",
},{
    question: "What is 4+4?",
    options: ["8", "4", "44", "19", ],
    answer: "8",
},{
    question: "What is the capital of New York?",
    options: ["NYC", "Buffalo", "Albany", "Rochester",],
    answer: "Albany",
// },{
//     question: "What is the name of Jeromes' cat?",
//     options: ["Manuel", "Asher", "Farley", "Garfield", ],
//     answer: "Farley",
// },{
//     question: "What is 4+4?",
//     options: ["7", "4", "44", "19", ],
//     answer: "8",
}
]

// function to strt game - called by clicking Start
function startGame() {
    // check to see if the function has been called
    console.log("Game has started");
    // hide the Welcome to the Code Quiz 
    // display none takes out the empty space 
    openingHeaderEl.style.display = "none";
    // hide the start button
    startButtonEl.classList.add("hide");
    // shows the count down #
    counterNum.classList.remove("hide");
    // show the question element
    questionContainerEl.classList.remove("hide");
    // call the sendNextQuestion function
    // set timer to max time
    questionIndex = 0;
    score = 0;
    setInterval(updateTimer, 1000);
    showQuestion();

}

// function that shows hidden questions and corresponding answers
function showQuestion() {
    // writes the question line 
    questionEl.textContent = questionsArr[questionIndex].question;
    // for every answer on the question array...
    // questionArr[questionIndex].answers.forEach( ()=> {
        // // creates button element
        // var button = document.createElement("button");
        // writes the answer text 
        var answers = questionsArr[questionIndex].options;
        for (var i=0; i < answers.length; i++) {
        answerButtonsEl.children[i].textContent = answers[i];
        answerButtonsEl.children[i].addEventListener("click", selectAnswer);
        }
    }


//  function once answer is selected
function selectAnswer(event) {
    // checking when selectAnswer starts
    console.log("Answer has been selected");
    // setting variable for which button is clicked
    var selectedButton = event.target.innerText;
    console.log(selectedButton);
    // determines whether or not the selected button is correct
    var correct = questionsArr[questionIndex].answer;

    if (selectedButton = correct) {
        score++; // make sure only one right answer per attempt
        console.log(score);
        // document.textContent = "Correct!"
        // add text to say "Correct"
    } else {
        // document.textContent = "Wrong!"
    }
    nextButton.classList.remove("hide");
}

function nextQuestion () {
questionIndex++;
nextButton.classList.add("hide");
showQuestion();
// add if (last question) - go to submit initials page. 
}

// // total seconds in game
let time = 45;

//Timer function 

   function updateTimer() {
       console.log("Time has begun");
    // let seconds =;

    counterNum.innerHTML = time;
       time--;

   }

startButtonEl.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);

// All done! 
//     1) Enter Initials
//     2) Submit button

// High Scores: 
//      1) Show IF clicked submit button OR by clicking "View Highschore"
//      2) "View High Score" needs to be visible on screen