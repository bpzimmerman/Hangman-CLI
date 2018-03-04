// reads the Letter constructor and stores it in a variable
var Letter = require('./Letter');

// Word constructor
var Word = function(wordArray){
    // function to create an array of letter objects using the Letter constructor and an array of letters passed as an argument 
    this.letterObjArray = function(wordArray){
        // array variable to hold the letter objects
        var letterArray = [];
        // loop to pass each letter to the Letter constructor and push each letter object to the letterArray
        wordArray.forEach(function(item){
            var letter = new Letter(item);
            letterArray.push(letter);
        });
        // outputs the finished array
        return letterArray;
    };
    // variable to hold the array of letter objects
    this.letterObjects = this.letterObjArray(wordArray);
    // function that creates an array containing either the placeholder or correctly guessed letter character
    this.word = function(){
        // array variable to hold the characters to be displayed
        var displayArray = [];
        // loop to go through each of the letter objects and runs the function that determines if the character or placeholder is to be pushed to the array
        this.letterObjects.forEach(function(item){
            displayArray.push(item.characterDisplay());
        });
        // outputs the finished array
        return displayArray;
    };
    // function to evaluate the user's guess passed as an argument and display the result 
    this.guess = function(guess){
        // loop to go through each of the letter objects and run the function to evaluate the guess
        this.letterObjects.forEach(function(item){
            item.userGuess(guess);
        });
        // displays the result of the word function
        console.log("\n" + this.word().join(" ") + "\n");
    };
};

// makes the Word constructor available to other modules
module.exports = Word;