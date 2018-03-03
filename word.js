var Letter = require('./Letter');

var Word = function(wordArray){
    this.letterObjArray = function(wordArray){
        var letterArray = [];
        wordArray.forEach(function(item){
            var letter = new Letter(item);
            letterArray.push(letter);
        });
        return letterArray;
    };
    this.letterObjects = this.letterObjArray(wordArray);
    this.word = function(){
        var displayArray = [];
        this.letterObjects.forEach(function(item){
            displayArray.push(item.characterDisplay());
        });
        return displayArray;
    };
    this.guess = function(guess){
        this.letterObjects.forEach(function(item){
            item.userGuess(guess);
        });
        console.log("\n" + this.word().join(" ") + "\n");
    };
};

module.exports = Word;