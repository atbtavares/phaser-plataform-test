"use strict"; //sempre começar o arquivo com essa linha

var LoseState = function(game) {};

LoseState.prototype.preload = function() {
}

LoseState.prototype.create = function() {
    this.game.add.text(200, 200, "You Lose :(", {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(200, 300, "Faltou comer " + Globals.score + " frutas", {font: "35px Arial", fill: "#ffffff"});
    this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

LoseState.prototype.update = function() {
    if(this.returnKey.isDown){
        this.game.state.start('menu');
    }
}
