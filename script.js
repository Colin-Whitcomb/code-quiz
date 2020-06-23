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

var questionIndex;
var score;
var correct;
var timerGlobal;
var initials;

// function to strt game - called by clicking Start
function startGame() {
    // check to see if the function has been called
    // console.log("Game has started");
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
    timerGlobal = setInterval(updateTimer, 1000);
    showQuestion();

}

// function that shows hidden questions and corresponding answers
function showQuestion() {
    // writes the question line 
    questionEl.textContent = questionsArr[questionIndex].question;
    // writes the answer text 
    var answers = questionsArr[questionIndex].options;
    // for every answer on the question array...
    for (var i = 0; i < answers.length; i++) {
        // write that text content 
        answerButtonsEl.children[i].textContent = answers[i];
        // listen for a click, then run selectAnswer
        answerButtonsEl.children[i].addEventListener("click", selectAnswer);
    }
}

//  function once answer is selected
function selectAnswer(event) {
    // checking when selectAnswer starts
    // console.log("Answer has been selected");
    // setting variable for which button is clicked
    var selectedButton = event.target.innerText;
    console.log(selectedButton);

    // determines whether or not the selected button is correct
    var correct = questionsArr[questionIndex].answer;

    if (selectedButton === correct) {
        score++; // make sure only one right answer per attempt
        console.log("This is the score" + score);
        // document.textContent = displays "Correct!"
        corrWrongEl.classList.remove("hide");
        corrWrongEl.children[0].textContent = "Correct!";

    } else {
        // changes text from "Correct!" to "Wrong!"
        corrWrongEl.children[0].textContent = "Wrong!";
        // removes hide element to make sure "Wrong is displayed"
        corrWrongEl.classList.remove("hide")
        // need more efficient way of doing this. 
        time--;
        time--;
    }
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", nextQuestion);
    // adds index to draw next question in array

}

function nextQuestion() {
    questionIndex++;
    // console.log("This is the question index:" + questionIndex);
    // hides the next button
    nextButton.classList.add("hide");
    //hides the "Correct!"/"Wrong!" text
    corrWrongEl.classList.add("hide");
    showQuestion();
    // if you answer all questions - end game 
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
    // if time runs out end game
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
    // changes text from "Correct!" to "Wrong!"
    endGameForm.children[0].textContent = "You got " + score + " point(s)!";

}
// let paraG = hsArea.querySelector('p');
// paraG.innerHTML = "Test 1"

//array where we will hold all high scores 
let highScoreArr = [];
console.log(highScoreArr);

const pushData =(ev)=>{
    console.log("Push Data has begun");
    // stop from submitting automatically
    // ev.preventDefault(); 
    //putting score and initials in object
    var newScore = {
        heldScore: score,
        heldInitials: input.value,
    }
//pushing new scores into array of high score list. 
highScoreArr.push(newScore);

// resetting form 
// document.querySelector("form").reset();

//saving to local storage 
localStorage.setItem("High Scores Go Here", JSON.stringify(highScoreArr) );

}


    // var tag = document.createElement("p");

//     if (initials !== "") {
//         paraG.innerHTML = initials + ": " + score;
//         // tag.appendChild(text);

//     }
// }

// function createHighScoreList() {
//     var dataCollected = JSON.parse(window.localStorage.getItem("grabScores")) || [];
//  

//     dataCollected.forEach(element => {
//         // parse JSON - returned as object {score: initials}
//     });
// }

// function pushHighScore() {
//     var initials = input.value.trim();
//     if (initials !== "") {
//         var grabScores = JSON.parse(window.localStorage.getItem("getscores")) || [];
//         var newScore = {
//             heldScore: score,
//             heldInit: initials
//         };
//         grabScores.push(newScore);
//  
//     }
// }


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
// When submit button is clicked, push data to modal
submitBtn.addEventListener("click", pushData);
// When start button is clicked, start game
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