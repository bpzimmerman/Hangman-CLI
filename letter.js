// Letter constructor
var Letter = function(character){
    // variable to hold the letter character
    this.character = character;
    // boolean variable to determine if the letter has been guessed
    this.guessed = false;
    // function that either returns the character (if the guessed variable is true) or a placeholder (if the guessed variable is false)
    this.characterDisplay = function(){
        if(this.guessed){
            return this.character;
        } else {
            return "_";
        };
    };
    // function to switch the guessed variable to true if the argument passed to it is the same as the character variable
    this.userGuess = function(guess){
        if (guess === this.character){
            this.guessed = true;
        };
    };
};

// makes the Letter constructor available to other modules
module.exports = Letter;