console.log('if this is logged, app.js is linked correctly');

//VARIABLES

    //QUIZ CONTROL PANEL can change these variables depending on quiz format.
let totalNumberOfQuestions = 6; //must also add additional questions to the HTML.
let quizDurationAtStart = 100; //in seconds
let quizTimerLoopDelayInterval = 1000; //default 1000 in milliseconds, sets delay for each timer tick
let incorrectAnswerTimeLeftPenalty = 10; //Number of seconds subtracted from timer for incorrect answer
let pageTransitionDuration = 500; // in milliseconds be sure to update animation duration values in the CSS classes fade-in and fade-out as well.
let answerCheckPersistDuration = 3000;

//DO NOT CHANGE BELOW VARIABLES

    //Game Value Variables
let pageNumber ='0';
let highScoresPageNumber = totalNumberOfQuestions + 1;
let buttonSelector;
let currentAnswerButtonsShown;
let timeLeft = quizDurationAtStart;
let countDown;
let restartQuizValue = false;
let currentScore = 0;
let mostRecentScore = 0;
  //Highscore List
let userNameScoreSubmitString;
let scoreSubmitTimeStamp;
let formattedTimeStamp;

  //Game UI Element Variables
let timer = document.querySelector('#timeLeftDisplay');
let timeLeftHtmlElement = document.querySelector('#timeLeft');
let startQuizButton = document.querySelector('#quizStart');
let restartQuizButton = document.querySelector('#restartQuiz');
let currentScoreDisplay = document.querySelector('#currentScoreDisplay');
let answerCheckHtmlElement = document.querySelector('#answerCheck');
let mostRecentScoreDisplay = document.querySelector('#mostRecentScoreDisplay');
let viewHighScoresButton = document.querySelector('#viewHighScores');
let clearHighScoreListButton = document.querySelector('#clearHighScoreList');
let highScoresPage = document.querySelector('#highScorePage');
let returnToMainMenuButtons = document.querySelectorAll('.returnToMainMenu');
let highScoreListUL = document.querySelector('#highScoreList');
let submitScoreButton = document.querySelector('#submitScoreButton');
let userNameInputField = document.querySelector('#userNameInput');
let saveScoreForm = document.querySelector('#saveScoreForm');



//EVENT LISTENERS (answer buttons are within for loop in quizProgress.)

//Invoke loadEventListeners on DOMContentLoaded event
document.addEventListener('DOMContentLoaded', loadEventListeners);

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


//FUNCTIONS


function startQuiz(){
  console.log('STARTQUIZ FIRED');
  // revealHUD();
  quizTimer();
  quizProgress();
  console.log('STARTQUIZ FINISHED');
};

function revealHUD(){
  timer.style.display = 'block';
  restartQuizButton.style.display = 'block';
  currentScoreDisplay.style.display = 'block';
};



function restartQuiz(){
  console.log('RESTARTQUIZ FIRED')
   restartQuizValue = true;
   answerCheckHtmlElement.style.display = 'none';
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



function quizProgress(eventObject){
  console.log('QUIZPROGRESS FIRED');
  if(timeLeft > 0){
    console.log(`timeLeft at quizProgress registers as ${timeLeft}`);
    console.log(`eventObject at quizProgress is ${eventObject}`)
      answerCheckPenalty: if (eventObject === undefined) {
        break answerCheckPenalty;
      } else if (eventObject.target.id === "incorrect") {
        timeLeft -= incorrectAnswerTimeLeftPenalty;
        break answerCheckPenalty;
      }

    // ******* fade transition inserted here somewhere
    fadeOut();
    setTimeout(function() {
    console.log(`Page number at quizProgress is ${pageNumber}`)
    // document.querySelector(`#question${pageNumber}`).style.display = 'none';
     advancePageNumber();
     revealHUD();
     fadeIn();
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
  }, pageTransitionDuration);
} else {
  console.log(`quizProgress recognized the current question number "${pageNumber}" is greater than number of questions. Firing quizEnd`);
  quizEnd()
  }
};




function fadeOut() {
  console.log('FADEOUT FIRED.');
  console.log(`the question number at fadeOut is #question${pageNumber}`);
  document.querySelector(`#question${pageNumber}`).classList.add('fade-out');
    setTimeout(function () {
      console.log(`SETTING #question${pageNumber} display to NONE`)
      document.querySelector(`#question${pageNumber}`).style.display = 'none';
      document.querySelector(`#question${pageNumber}`).classList.remove('fade-out');
      }, pageTransitionDuration) // change this back to page transition duration
};

function fadeIn() {
  console.log('FADEIN FIRED.');
  console.log(`the question number at fadeIN is #question${pageNumber}`);
  // document.querySelector(`#question${pageNumber}`).style.display = 'block';
  document.querySelector(`#question${pageNumber}`).classList.add('fade-in');
    setTimeout(function () {
      console.log(`SETTING #question${pageNumber} display to BLOCK`)
      // document.querySelector(`#question${pageNumber}`).style.display = 'block';
      document.querySelector(`#question${pageNumber}`).classList.remove('fade-in');
      }, pageTransitionDuration)
};




function answerCheck(eventObject){
  console.log(`ANSWERCHECK FIRED`);
  
    if(eventObject.target.id === "correct"){
      currentScore += 1;
      revealAnswerCheck();
      answerCheckHtmlElement.innerHTML = 'Your answer was CORRECT! +1 point.';
      answerCheckHtmlElement.style.backgroundColor = 'limegreen';
      setTimeout(hideAnswerCheck, answerCheckPersistDuration);
      
    } else if(eventObject.target.id === "incorrect"){
      revealAnswerCheck();
      answerCheckHtmlElement.innerHTML = 'Your answer was INCORRECT! 0 points.';
      answerCheckHtmlElement.style.backgroundColor = 'red';
      setTimeout(hideAnswerCheck, answerCheckPersistDuration);
    };
  document.querySelector('#currentScore').innerHTML = currentScore;
};

function revealAnswerCheck(){
  console.log(`REVEALANSWERCHECK FIRED`);
  answerCheckHtmlElement.style.display = 'block';
}

function hideAnswerCheck(){
  console.log(`HIDEANSWERCHECK FIRED`)
  answerCheckHtmlElement.style.display = 'none';
};



function viewHighScores(){
  console.log('VIEWHIGHSCORES FIRED');
  document.querySelector(`#question0`).style.display = 'none';
  highScoresPage.style.display = 'flex';
};



function returnToMainMenu(){
  console.log('RETURNTOMAINMENU FIRED');
  document.querySelector(`#question${pageNumber}`).style.display = 'none';
  pageNumber = 0;
  document.querySelector(`#question${pageNumber}`).style.display = 'block';
  highScoresPage.style.display = 'none';
}



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
  document.querySelector('#answerCheck').innerHTML = '';

  if(timeLeft <= 0){ 
      console.log(`The question number at quizEnd timeout path is ${pageNumber}`);
      timeLeft = quizDurationAtStart;
      document.querySelector(`#question${pageNumber}`).style.display = 'none';
      pageNumber = highScoresPageNumber;
      document.querySelector(`#question${pageNumber}`).style.display = 'block';
  } else if (pageNumber > totalNumberOfQuestions){
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
