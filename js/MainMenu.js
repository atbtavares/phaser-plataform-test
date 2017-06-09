
BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		this.add.sprite(0, 0, 'titlePage');

		this.sprite_creditos =  this.add.sprite(0, 0, 'creditos');
		this.sprite_creditos.visible = false;
		   
		this.cursors = this.input.keyboard.createCursorKeys();
		this.enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.escKey = this.input.keyboard.addKey(Phaser.Keyboard.ESCAPE);

		this.playButton = this.add.button(205, 242, 'playButton', this.startGame, this, 2, 1, 0);
		this.creditButton = this.add.button(205, 302, 'playButton',this.actionOnClick, this, 2, 1, 0);

	},

	update: function () {

		//	Do some nice funky main menu effect here
		if (this.enterKey.isDown) {
			this.music.stop();
			this.state.start('Game');
		}

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	},

	actionOnClick: function() {
		if (this.sprite_creditos.visible){
			this.playButton.input.enabled = true;
			this.creditButton.reset(205,302);
		} else { 
			this.playButton.input.enabled = false;
			this.creditButton.reset(10,45);
		}
		this.sprite_creditos.visible = !this.sprite_creditos.visible;
	}


};
