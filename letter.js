var Letter = function(character){
    this.character = character;
    this.guessed = false;
    this.characterDisplay = function(){
        if(this.guessed){
            return this.character;
        } else {
            return "_";
        };
    };
    this.userGuess = function(guess){
        if (guess === this.character){
            this.guessed = true;
        };
    };
};

module.exports = Letter;