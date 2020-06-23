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
const pushData =(ev)=>{
    console.log("Push Data has begun");
    // stop from submitting automatically
    // ev.preventDefault(); 

    var initials = input.value.trim();
    //putting score and initials in object
    if (initials !== "") {

var highScore = JSON.parse(window.localStorage.getItim("highScores")) || [];
    var newScore = {
        heldScore: score,
        heldInitials: initials,
    };

    
//pushing new scores into array of high score list. 
highScoreArr.push(newScore);
}
//saving to local storage 
localStorage.setItem("High Scores Go Here", JSON.stringify(highScoreArr) );
}
    
let producedHS = JSON.parse(localStorage.getItem("newScore"));
console.log("Produced HS goes here: " + producedHS);

// taking info from local storage and display it 
function createHighScoreList() {
    
// parse from JSON
    dataCollected.forEach(element => {
        var dataCollected = JSON.parse(window.localStorage.getItem("producedHS")) || [];
        // check if worked
        console.log('This is parsed ' + dataCollected);
        // write what we collected from JSON in HTML element
        hsArea.textContent = dataCollected; 
        // show the high score div in
        hsArea.classList.remove("hide");
    });
}

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

submitBtn.addEventListener("click", pushData);
startButtonEl.addEventListener("click", startGame);


// Get the modal
// var modal = document.getElementById("myModal");
// // Get modal-content
// var modalContent = document.getElementsByClassName("modal-content");

// // Get the button that opens the modal
// var modalBtn = document.getElementById("modalBtn");

// // Get the <span> element that closes the modal
// var modalSpan = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// modalBtn.onclick = function () {
//     modal.style.display = "block";
//     //   modal.textContent = "Hello!!!";
// }

// // When the user clicks on <span> (x), close the modal
// modalSpan.onclick = function () {
//     modal.style.display = "none";
//     //   modalSpan.textContent = "Hello!!!";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target === modal) {
//         modal.style.display = remove("none");
//     }
// }

// Needs: 
// 2 - add view score page
// 3 - only allow 1 answer per question
// 4 - layout (grid instead of stack); moving up and down