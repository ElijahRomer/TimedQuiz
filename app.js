console.log('if this is logged, app.js is linked correctly');

//want to add a quiz End page that displays score and then provides option to add name and input to local storage

//add a highscores page that pulls from local storage

//VARIABLES

    //can change these variables depending on quiz format.
let totalNumberOfQuestions = 6; //must also add additional questions to the HTML.
let quizDurationAtStart = 100; //in seconds
let quizTimerLoopDelayInterval = 1000; //default 1000 in milliseconds, sets delay for each timer tick

    //Do not change the below variables

let pageNumber ='0';//previously named question number
let highScoresPageNumber = totalNumberOfQuestions + 1;
let buttonSelector;
let currentAnswerButtonsShown;
let timer = document.querySelector('#timeLeftDisplay');
let timeLeftHtmlElement = document.querySelector('#timeLeft');
let timeLeft = quizDurationAtStart;
let countDown;
let startQuizButton = document.querySelector('#quizStart');
let restartQuizButton = document.querySelector('#restartQuiz');
let currentScoreDisplay = document.querySelector('#currentScoreDisplay');
let restartQuizValue = false;
let answerCheckHtmlElement = document.querySelector('#answerCheck');
let currentScore = 0;
let mostRecentScore = 0;
let mostRecentScoreDisplay = document.querySelector('#mostRecentScoreDisplay');
let viewHighScoresButton = document.querySelector('#viewHighScores');
let clearHighScoreListButton = document.querySelector('#clearHighScoreList');

//let answerCheckTextDisplay = document.querySelector('#answerCheck').innerHTML;
let highScoresPage = document.querySelector('#highScorePage');
let returnToMainMenuButtons = document.querySelectorAll('.returnToMainMenu');


//EVENT LISTENERS (answer buttons are within for loop in quizProgress.)


document.addEventListener('DOMContentLoaded', loadEventListeners);

//FUNCTIONS

function loadEventListeners(){
  console.log('LOADEVENTLISTENERS FIRED');
    getHighScoreList();
    startQuizButton.addEventListener('click', startQuiz);
    restartQuizButton.addEventListener('click', restartQuiz);
    viewHighScoresButton.addEventListener('click', viewHighScores);
    saveScoreForm.addEventListener('submit', addHighScore);
    clearHighScoreListButton.addEventListener('click', clearHighScoreList);
    for (i = 0; i < returnToMainMenuButtons.length; i++){
      returnToMainMenuButtons[i].addEventListener('click', returnToMainMenu)
    };
    //there is another event listener within a for loop in the quizProgress function, not included here as it must dynamically progress when a new question is answered.
};



function startQuiz(){
  console.log('STARTQUIZ FIRED');
  timer.style.display = 'block';
  restartQuizButton.style.display = 'block';
  currentScoreDisplay.style.display = 'block';
  answerCheckHtmlElement.style.display = 'block';
  quizTimer();
  quizProgress();
  console.log('STARTQUIZ FINISHED');
};



function restartQuiz(){
  console.log('RESTARTQUIZ FIRED')
   restartQuizValue = true;
  console.log(`restartQuizValue is now ${restartQuizValue}. Firing quizTimer.`);
  quizTimer();
};



function quizTimer(){
  console.log('QUIZTIMER FIRED');
  console.log(timeLeftHtmlElement);
  if(restartQuizValue === false){
  countDown= setInterval(function(){
    if(pageNumber > totalNumberOfQuestions){
          clearInterval(countDown);
          console.log('quizTimer recognizes last question answered. Firing quizEnd.');
          quizEnd();
    }else if(timeLeft <= 0){
          clearInterval(countDown);
          console.log('quizTimer recognizes the timer has run out. Firing quizEnd.');
          quizEnd();
    }
    timeLeft -= 1;
    timeLeftHtmlElement.innerHTML = timeLeft;
    return timeLeft;
  }, quizTimerLoopDelayInterval);
}else if(restartQuizValue === true){
  clearInterval(countDown);
  console.log(`quizTimer recognizes restartQuizValue as ${restartQuizValue}. Firing quizEnd.`);
  quizEnd();
}};



function advancePageNumber() {
  console.log(`ADVANCEPAGENUMBER FIRED`)
  pageNumber = parseInt(pageNumber);
  pageNumber += 1;
  pageNumber = pageNumber.toString();
    console.log(`The pageNumber has been updated by advancePageNumber to ${pageNumber}`);
  return pageNumber;
};



function quizProgress(){
  console.log('QUIZPROGRESS FIRED');
  if(timeLeft > 0){
    document.querySelector(`#question${pageNumber}`).style.display = 'none';
    advancePageNumber();
    console.log(`The pageNumber at quizProgress has been updated to ${pageNumber}`);
    if (pageNumber <= totalNumberOfQuestions){
      document.querySelector(`#question${pageNumber}`).style.display = 'block';
      buttonSelector = `.answerChoiceQ${pageNumber}`;
      console.log(`The buttonSelector at quizProgress is ${buttonSelector}`);
      currentAnswerButtonsShown = document.querySelectorAll(buttonSelector);
      console.log(`The pageNumber at quizProgress is ${pageNumber}`);
      for (i = 0; i < currentAnswerButtonsShown.length; i++){
        currentAnswerButtonsShown[i].addEventListener("click", quizProgress);
        currentAnswerButtonsShown[i].addEventListener("click", answerCheck);
      };}
    return pageNumber;
  } else {
  console.log(`quizProgress recognized the current question number "${pageNumber}" is greater than number of questions. Firing quizEnd`);
  quizEnd()
  }
};



function answerCheck(eventObject){
  console.log(`ANSWERCHECK FIRED`);
    if(eventObject.target.id === "correct"){
      currentScore += 1;
      document.querySelector('#answerCheck').innerHTML = 'Your answer was CORRECT! +1 point.';
    } else if(eventObject.target.id === "incorrect"){
      document.querySelector('#answerCheck').innerHTML = 'Your answer was INCORRECT! 0 points.';
    };
  document.querySelector('#currentScore').innerHTML = currentScore;
};



function viewHighScores(){
  console.log('VIEWHIGHSCORES FIRED');
  document.querySelector(`#question0`).style.display = 'none';
  highScoresPage.style.display = 'block';
};



function returnToMainMenu(){
  console.log('RETURNTOMAINMENU FIRED');
  document.querySelector(`#question${pageNumber}`).style.display = 'none';
  pageNumber = 0;
  document.querySelector(`#question${pageNumber}`).style.display = 'block';
  highScoresPage.style.display = 'none';
}




let highScoreListUL = document.querySelector('#highScoreList');
let submitScoreButton = document.querySelector('#submitScoreButton');
let userNameInputField = document.querySelector('#userNameInput');
let saveScoreForm = document.querySelector('#saveScoreForm');
let userNameScoreSubmitString;
let scoreSubmitTimeStamp;
// let highScoreListArray = [];
let formattedTimeStamp;

console.log(highScoreListUL);
console.log(userNameInputField);
console.log(highScoreListUL);
console.log(submitScoreButton);
console.log(saveScoreForm);

function addHighScore(eventObject){
  console.log('ADDHIGHSCORE FIRED');
  eventObject.preventDefault();
  formattedTimeStamp = getFormattedTimeStamp();
  console.log(`Timestamp at addHighScore is ${formattedTimeStamp}`);
  // console.log(userNameInput.value);
  if(userNameInput.value == ''){
    alert(`Please Enter a name.`)
  } else {
    createUserNameScoreSubmitString();
    console.log(userNameScoreSubmitString);
    insertScoreIntoHighScoreList();
    storeScoreInLocalStorage(userNameScoreSubmitString);
    alert('Your score has been saved.');
    returnToMainMenu();
  }
};



function getFormattedTimeStamp(){
  console.log('GETFORMATTEDTIMESTAMP FIRED')
  scoreSubmitTimeStamp = new Date();
  let dateFormat = {
    year:'numeric',
    month:'long',
    day:'2-digit',
    hour:'numeric',
    minute:'numeric',
  };
  let scoreSubmitTimeStampFormatted = new Intl.DateTimeFormat('en', dateFormat).format(scoreSubmitTimeStamp);
  console.log(scoreSubmitTimeStampFormatted);
  return scoreSubmitTimeStampFormatted;
}



function createUserNameScoreSubmitString(){
  console.log(`CREATEUSERNAMESCORESUBMITSTRING FIRED`);
  console.log(userNameInput.value);
  if(userNameInput.value === null){
    alert(`Please Enter your name.`)
  }
  userNameScoreSubmitString = 
  `${userNameInput.value} -- Score: ${mostRecentScore} -- ${formattedTimeStamp}`;
  console.log(userNameScoreSubmitString);
  return userNameScoreSubmitString;
}



function insertScoreIntoHighScoreList(){
  console.log(`INSERTSCOREINTOHIGHSCORELIST FIRED`);
  let li = document.createElement('li');
  li.className = 'highScoreEntry';
  li.appendChild(document.createTextNode(userNameScoreSubmitString));
  highScoreListUL.appendChild(li);
};



function getHighScoreList(){
  console.log(`GETHIGHSCORELIST FIRED`);
  let highScoreListArray;
      if (localStorage.getItem('highScoreList') === null){
        console.log(`getHighScoreList recognizes no value present for highScoreList in localStorage. Setting to an empty array.`);
        highScoreListArray = [];
      } else {
        console.log(`getHighScoreList recognizes value is present for highScoreList in localStorage. Parsing to JSON and inserting array items into dom.`)

        highScoreListArray = JSON.parse(localStorage.getItem('highScoreList'));
        console.log(`highScoreListArray is now ${highScoreListArray}`);
      };
  highScoreListArray.forEach(function(scoreString){
    let li = document.createElement('li');
    li.className = 'highScoreEntry';
    li.appendChild(document.createTextNode(scoreString));
    highScoreListUL.appendChild(li);
  })
};



function storeScoreInLocalStorage(scoreString){
  console.log(`STORESCOREINLOCALSTORAGE FIRED`);
  let highScoreListArray;
  if (localStorage.getItem('highScoreList') === null){
    highScoreListArray = [];
  } else {
    highScoreListArray = JSON.parse(localStorage.getItem('highScoreList'));
  };

  highScoreListArray.push(scoreString);

  localStorage.setItem('highScoreList', JSON.stringify(highScoreListArray));
};



function clearHighScoreList(){
  console.log('CLEARHIGHSCORELIST FIRED');
  if(confirm('Are you sure you want to clear ALL High Scores?')){
  localStorage.clear();
    while(highScoreListUL.firstChild) {
      highScoreListUL.removeChild(highScoreListUL.firstChild)
    }
  }
};



function quizEnd(){
  console.log('QUIZEND FIRED');
  console.log(`The pageNumber at quizEnd is ${pageNumber}`);
  console.log(`The timeLeft at quizEnd is ${timeLeft}`);
  console.log(`The currentScore at quizEnd is ${currentScore}`);

  mostRecentScore = currentScore;
  currentScore = 0;
  timer.style.display = 'none';
  
  restartQuizButton.style.display = 'none';
  currentScoreDisplay.style.display = 'none';
  answerCheckHtmlElement.style.display = 'none';
  mostRecentScoreDisplay.style.display = 'block';
  viewHighScoresButton.style.display = 'block';
  document.querySelector('#mostRecentScore').innerHTML = mostRecentScore;
  document.querySelector('#scoreSubmitValue').innerHTML = mostRecentScore;
  document.querySelector('#currentScore').innerHTML = currentScore;
  timeLeftHtmlElement.innerHTML = 100;

  if(timeLeft <= 0){ 
      console.log(`The question number at quizEnd timeout path is ${pageNumber}`);
      timeLeft = quizDurationAtStart;
      document.querySelector(`#question${pageNumber}`).style.display = 'none';
      pageNumber = highScoresPageNumber;
      document.querySelector(`#question${pageNumber}`).style.display = 'block';
  } else if (pageNumber >= totalNumberOfQuestions){
      console.log(`The pageNumber at quizEnd last question path is ${pageNumber}`);
      timeLeft = quizDurationAtStart;
      // pageNumber = 0;
      document.querySelector(`#question${pageNumber}`).style.display = 'block';
  } else if (restartQuizValue === true){
      console.log(`The restartQuizValue at quizEnd restartQuiz path is ${restartQuizValue}`);
      timeLeft = quizDurationAtStart;
      restartQuizValue = false;
      document.querySelector(`#question${pageNumber}`).style.display = 'none';
      pageNumber = 0;
      document.querySelector(`#question${pageNumber}`).style.display = 'block';
  };
};


//JAVASCRIPT ELEMENTS TO CREATE*******************
//make a variable for currentTimeLeft
//make a variable for element currentTimeLeftDisplay
//make a variable for name element user input at beginning of game
//make a variable for score 
//make a variable for concatenated value of score and name called scoreItem
//make a variable for highScores and set it equal to an array

//add event listener to quiz start button
//add event listener to high score submit button

//create function for quizProgress
//create function for timer
//create function for managing css visibility of each HTML Element
//create score submit function

//HTML ELEMENTS TO CREATE***********************
  //quiz landing page
    //most recent score
    //start button
    //view highscore button
  //each quiz question and answers in a div
  //view high score page


//PSEUDOCODE BELOW********************************

//button click for quiz start

  //quizProgress function
      //each question and answer display is contained in a separate HTML <div> with css visibility set to hidden by default
      //each button clicked will hide the current q/a display and reveal the next
        //if correct, "Correct" will be displayed below element, if incorrect, "Incorrect" will be displayed
      //when all questions answered, clearInterval on timeLeft, trigger quiz end function

  //timerCountdown function
      //starts timer ticking backwards, value = timeLeft, dispayed in the innerhtml of currentTimeLeftDisplay
      //if timer reaches 0, trigger quizEnd function
  
  //quiz end function
      //alert game over
      //make visible the following:
        //Top 10 scores
        //enter name input field
        //display name (key) 
        //display score (value)
        //submit score button - triggers score submit function
  
  //SCORE SUBMIT FUNCTION
      // if statement
        //if highScores in local storage does not exist (= null), set equal to an empty array
        //ELSE parse from string to array and set equal to highScores variable
      //take each value for name and score and set as variable "name" and "score"
      //push to highscores array formatted as an object combining the two into a key value pair
      //(highScores.push({[name]: score});)
      //convert highscores back to a string and set = to highScores key in localStorage
      //run view scores function

  //VIEW SCORE FUNCTION
      //set visibility for all other pages to hidden
      //set visibility for high score page to visible, position absolute
      //access local storage and convert highScores string into an array
      //create for loop to parse through array and append each index into an Li
      //append each li into the ul on the highscores page.

