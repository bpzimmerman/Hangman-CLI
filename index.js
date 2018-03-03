var Word = require('./Word');
var data = require('./data');
var inquirer = require('inquirer');

var Game = function(){
    this.guessedArray = [" "];
    this.remainingGuesses = 5;
    this.newWord = function(){
        var breedIndex = Math.floor(Math.random() * data.breeds.length);
        var dog = data.breeds[breedIndex].toLowerCase().split("");
        return dog;
    };
    this.wordArray = this.newWord();
    this.word = new Word(this.wordArray);
    this.count = function(){
        var x = 0;
        for (var i = 0; i < this.word.letterObjects.length; i += 1){
            if (this.word.letterObjects[i].guessed){
                x += 1;
            };
        };
        return x;
    };
    this.number = 0;
    this.initial = function(){
        for (var i = 0; i < this.guessedArray.length; i += 1){
            this.word.guess(this.guessedArray[i]);
        };
        this.number = this.count();
    };
}

var newGame = new Game();

console.log(newGame.wordArray);
newGame.initial();

var run = function(){
    if (newGame.count() < newGame.wordArray.length){
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter!",
                    name: "letter",
                    validate: function(value){
                        if (data.alphabet.indexOf(value) === -1){
                            console.log("\n\nThat is not a letter! Try again!\n");
                            return false;
                        }
                        else if (newGame.guessedArray.indexOf(value) != -1){
                            console.log("\n\nYou already guessed that letter! Try again!\n")
                            return false;
                        } else {
                            return true;
                        };
                    }
                }
            ])
            .then(function(response){
                newGame.guessedArray.push(response.letter);
                newGame.word.guess(response.letter);
                if (newGame.number === newGame.count()){
                    newGame.remainingGuesses -= 1;
                    switch(newGame.remainingGuesses){
                        case 0:
                            console.log("SORRY, YOU LOST!\n");
                            console.log("The correct answer was:\n" + newGame.wordArray.join(" "));
                            break;
                        case 1:
                            console.log("INCORRECT!!! Try again!")
                            console.log("Last chance! You are only allowed " + newGame.remainingGuesses + " more wrong answer.\n\n");
                            break;
                        default:
                            console.log("INCORRECT!!! Try again!")
                            console.log("You are only allowed " + newGame.remainingGuesses + " more wrong answers.\n\n");
                    }
                } else {
                    newGame.number = newGame.count();
                    console.log("CORRECT!!!\n\n");
                };
                if (newGame.remainingGuesses > 0){
                    run();
                };
            });
    } else {
        console.log("CONGRATULATIONS! YOU WON!")
    };
};

run();