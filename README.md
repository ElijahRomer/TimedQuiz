<h1>TimedQuiz</h1>
In this project, I created a Quiz template with timer, multiple choices, looped progression and event listeners, and high score list stored via localStorage. It has some basic Javascript questions to begin with but can be easily switched to different content matter in the future. The quiz is timed with a default of 100 seconds. When an incorrect answer is submitted, the user is penalized 10 seconds from the timer. When the timer reaches 0, all the questions are answered, or the user clicks "restart quiz" then the quiz ends. 

If the timer runs out or all questions are answered, the user has the opportunity to submit their name and score, to be added to the highscore list. This creates a string with the user input name, recorded score, and time stamp for submit, which is added to the high score list and persisted to local storage for viewing later. The list is automatically pulled and parsed into JSON from local storage upon page load. 

This project was an amazing learning experience in everything from naming conventions, to best practices in CSS, CSS variables, CSS animations, CSS media queries, as well as Javascript loops, traversing the DOM, scoping functions,  variables, general problem solving, HTML forms and attributes, and more. Going forward my code will be more modular and clean, and sticking to SOLID design principles much more than this project did, as I was learning as I went!

URL: https://elijahromer.github.io/TimedQuiz/

![image](https://user-images.githubusercontent.com/80494962/122417592-36948080-cf4f-11eb-8f1f-d374921a1f59.png)
