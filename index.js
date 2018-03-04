// reads the Word constructor and stores it in a variable
var Word = require('./Word');
// reads the data and stores it in a variable
var data = require('./data');
// makes the inquirer node module available
var inquirer = require('inquirer');
// makes the chalk node module available
var chalk = require('chalk');

// Game constructor
var Game = function(){
    // variable to hold each of the letters that have been guessed (spaces are given)
    this.guessedArray = [" "];
    // variable defining the number of allowable incorrect guesses
    this.remainingGuesses = 5;
    // function to randomly select one of the dog breeds from the data file
    this.newWord = function(){
        // generates a random number
        var breedIndex = Math.floor(Math.random() * data.breeds.length);
        // creates an array made up of each individual character in the word selected from the data file using the random number
        var dog = data.breeds[breedIndex].toLowerCase().split("");
        // outputs the resulting array
        return dog;
    };
    // variable to hold the selected dog breed
    this.wordArray = this.newWord();
    // passes the selected word (as an array) to the Word constructor
    this.word = new Word(this.wordArray);
    // function that counts the number of letterObjects that have been correctly guessed (guessed variable is true);
    this.count = function(){
        var x = 0;
        for (var i = 0; i < this.word.letterObjects.length; i += 1){
            if (this.word.letterObjects[i].guessed){
                x += 1;
            };
        };
        return x;
    };
    // variable storing the number of letters that have been correctly guessed
    this.number = 0;
    // function that initializes the game
    this.initial = function(){
        console.log(chalk.bold.underline("\nGuess the dog breed!"));
        // loop to go through each of the letters in the guessedArray and run the function to evaluate whether or not it has been guessed (must be run initially to correctly set the spaces)
        for (var i = 0; i < this.guessedArray.length; i += 1){
            this.word.guess(this.guessedArray[i]);
        };
        // set the number of correctly guessed letters equal to the output of the count function
        this.number = this.count();
    };
}

// define the variable to be used to hold a new Game
var newGame;

var start = function(){
    // create a newGame from the Game constructor
    newGame = new Game();

    // un-commenting the following line will display the selected dog breed for testing purposes
    // console.log(newGame.wordArray);

    // runs the initial function to start the game
    newGame.initial();

    // runs the play function to begin the game
    play();
};

// function to run inquirer asking if the user wants to play again
var again = function(){
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to play again?",
                name: "playAgain",
                default: false
            }
        ])
        .then(function(response){
            // if the response is "yes", then the start function is run to restart the game
            if (response.playAgain === true){
                start();
            };
        });
};

// function containing the game play
var play = function(){
    // will run inquirer as long as the output of the count function (number of letters with guessed set to true) is less than the number of characters in the selected word
    if (newGame.count() < newGame.wordArray.length){
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter!",
                    name: "letter",
                    validate: function(value){
                        var result = value.toLowerCase();
                        // makes sure the character typed is a letter
                        if (data.alphabet.indexOf(result) === -1){
                            console.log("\n\nThat is not a letter! Try again!\n");
                            return false;
                        }
                        // makes sure the typed letter has not already been guessed
                        else if (newGame.guessedArray.indexOf(result) != -1){
                            console.log("\n\nYou already guessed that letter! Try again!\n")
                            return false;
                        } else {
                            return true;
                        };
                    }
                }
            ])
            .then(function(response){
                var modLetter = response.letter.toLowerCase();
                // pushes the typed letter into the guessedArray
                newGame.guessedArray.push(modLetter);
                // runs the guess function against the typed letter
                newGame.word.guess(modLetter);
                // checks to see if the number of letter objects with guessed set to true has changed
                if (newGame.number === newGame.count()){
                    // if number of letter objects with guessed set to true has not changed, the guess was wrong - decrement the number of allowable wrong guesses
                    newGame.remainingGuesses -= 1;
                    // switch statement depending on the number of allowable wrong guesses remaining
                    switch(newGame.remainingGuesses){
                        case 0:
                            // no allowable wrong guesses remaining - user lost, ask if he/she wants to play again
                            console.log(chalk.bold("SORRY, YOU LOST!\n"));
                            console.log("The correct answer was:\n" + newGame.wordArray.join(" ") + "\n");
                            again();
                            break;
                        case 1:
                            // 1 allowable wrong guess remaining - change the display message
                            console.log("INCORRECT!!! Try again!")
                            console.log("Last chance! You are only allowed " + newGame.remainingGuesses + " more wrong answer.\n\n");
                            break;
                        default:
                            // >1 allowable wrong guesses remaining - default display message
                            console.log("INCORRECT!!! Try again!")
                            console.log("You are only allowed " + newGame.remainingGuesses + " more wrong answers.\n\n");
                    }
                // if number of letter objects with guessed set to true has changed, the guess was correct - display correct message and set the number of correctly guessed letters equal to the output of the count function
                } else {
                    newGame.number = newGame.count();
                    console.log("CORRECT!!!\n\n");
                };
                // if the remaining allowable worng answers is greater than 0, run the play function from the beginning
                if (newGame.remainingGuesses > 0){
                    play();
                };
            });
    // if all the letters have been guessed, display the win message and ask if user wants to play again
    } else {
        console.log(chalk.bold("CONGRATULATIONS! YOU WON!\n"));
        again();
    };
};

// runs the start function to begin running the code
start();