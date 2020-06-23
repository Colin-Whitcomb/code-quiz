// connecting ID's from HTML
var startButtonEl = document.getElementById("start-btn")
var questionContainerEl = document.getElementById("question-container")
var questionEl = document.getElementById("question")
var answerButtonsEl = document.getElementById("answer-buttons")
var openingHeaderEl = document.getElementById("welcome-div")
var counterNum = document.getElementById("counter-num")
// var buttonA = document.getElementById("button-a")
var nextButton = document.getElementById("next-btn")
var corrWrongEl = document.getElementById("correct-wrong")
var submitBtn = document.getElementById("submitButton")
var input = document.getElementById("input")
var endGameForm = document.getElementById("endGameForm")
var hsArea = document.getElementById("hsArea")

// global variables 
var questionIndex;
var score;
var correct;
var timerGlobal;
var initials;
// console.log(highScoreArr);
// let producedHS = [];


// if (localStorage.getItem(highScoreArr) || JSON.parse(localStorage.getItem(highScoreArr).length === 0)) {
// let highScoreArr = [];
// } else {

// }

// function to strt game - called by clicking Start
function startGame() {
    openingHeaderEl.style.display = "none";
    startButtonEl.classList.add("hide");
    counterNum.classList.remove("hide");
    questionContainerEl.classList.remove("hide");
    questionIndex = 0;
    score = 0;
    timerGlobal = setInterval(updateTimer, 1000);
    showQuestion();

}

// function that shows hidden questions and corresponding answers
function showQuestion() {
    questionEl.textContent = questionsArr[questionIndex].question;
    var answers = questionsArr[questionIndex].options;
    for (var i = 0; i < answers.length; i++) {
        answerButtonsEl.children[i].textContent = answers[i];
        answerButtonsEl.children[i].addEventListener("click", selectAnswer);
    }
}

//  function once answer is selected
function selectAnswer(event) {
    var selectedButton = event.target.innerText;
    console.log(selectedButton);
    // determines whether or not the selected button is correct
    var correct = questionsArr[questionIndex].answer;

    if (selectedButton === correct) {
        score++; // make sure only one right answer per attempt
        console.log("This is the score" + score);
        corrWrongEl.classList.remove("hide");
        corrWrongEl.children[0].textContent = "Correct!";

    } else {
        corrWrongEl.children[0].textContent = "Wrong!";
        corrWrongEl.classList.remove("hide")
        // need more efficient way of doing this. 
        time--;
        time--;
    }
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", nextQuestion);
}

function nextQuestion() {
    questionIndex++;
    nextButton.classList.add("hide");
    corrWrongEl.classList.add("hide");
    showQuestion();
    if (questionIndex >= 4) {
        return endGame();
    }

}
// total seconds in game
let time = 25;

//Timer function 
function updateTimer() {
    // let seconds =;
    time--;
    counterNum.innerHTML = time;
    if (time <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(timerGlobal);
    questionContainerEl.classList.add("hide");
    nextButton.classList.add("hide");
    endGameForm.classList.remove("hide");
    pushData();
    endGameForm.children[0].textContent = "You got " + score + " point(s)!";

}

//function to push to local storage 
function pushData () {
    console.log("Push Data has begun");
    // stop from submitting automatically
    // ev.preventDefault(); 

    var initials = input.value.trim();
    //putting score and initials in object
    if (initials !== "") {
        // check to see if there are any saved high scores in localStorage
        var highScores = JSON.parse(window.localStorage.getItim("highScores")) || [];
        var newScore = {
            heldScore: score,
            heldInitials: initials,
        };

        // adding new player in to high score list
        highScores.push(newScore);
        localStorage.setItem("highScores" , JSON.stringify(highScores));
            //redirect to where I want to keep high scores. 
        }
    }

    let producedHS = JSON.parse(localStorage.getItem("newScore"));
    console.log("Produced HS goes here: " + producedHS);

    // taking info from local storage and display it 
    function printScores() {
        var dataCollected = JSON.parse(window.localStorage.getItem("highScores")) || [];
        // parse from JSON

        highScores.sort(function (a, b) {
            return b.score - a.score 
        });

        // loop through JSON list 
        highScores.forEach(function(score) {
            var player = document.createElement('li');
            player.textContent = score.initials + ' -- ' + score.score;

            var winners = document.getElementById("winners"); // NEED the space for me to put this to match ID winners 
            winnder.appendChild(player);
        });

    } 
    function clearScores() {
        window.localStorage.removeItem("highScores"); 
        window.location.reload();
    }

    printScores ();

    // array of questions and their corresponding options and answer. 
    let questionsArr = [{
            question: "What is the capital of South Carolina?",
            options: ["Raleigh", "Myrtle Beach", "Charleston", "Columbia", ],
            answer: "Columbia",
        }, {
            question: "What is the capital of California?",
            options: ["Sacramento", "Los Angeles", "San Francisco", "San Diego", ],
            answer: "Sacramento",
        }, {
            question: "What is the capital of New York?",
            options: ["NYC", "Buffalo", "Albany", "Rochester", ],
            answer: "Albany",
        }, {
            question: "What is the capital of Florida?",
            options: ["Tampa", "Orlando", "Miami", "Tallahassee", ],
            answer: "Tallahassee",
        },
        {
            question: "What is the capital of Oregon?",
            options: ["Portland", "Salem", "Oregon City", "Eugene", ],
            answer: "Salem",
        }
    ]
// NEED a clear button!! 
    document.getElementById("clear").onclick = clearScores;
    submitBtn.addEventListener("click", pushData);
    startButtonEl.addEventListener("click", startGame);
