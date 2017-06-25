
var Globals = { 
	score: 0
};

var Level = { 
	music: 0
};

//Create your Phaser game and inject it into the gameContainer div.
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

//	Add the States your game has.
//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
game.state.add('Boot', BasicGame.Boot);
game.state.add('Preloader', BasicGame.Preloader);
game.state.add('MainMenu', BasicGame.MainMenu);
game.state.add('Game', BasicGame.Game);
game.state.add('Level2', BasicGame.Level2);
game.state.add('Level3', BasicGame.Level3);
game.state.add('Win', BasicGame.Win);

//	Now start the Boot state.
game.state.start('Boot');

