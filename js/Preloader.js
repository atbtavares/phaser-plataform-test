
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		//this.load.image('titlepage', 'images/title.jpg');
		//this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
		//this.load.audio('titleMusic', ['audio/main_menu.mp3']);
		//this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
		this.load.image('titlePage', 'assets/tela_inicial_2.jpg');
		this.load.spritesheet('playButton', 'assets/btn_inicio.png',200,35);
		this.load.image('creditos', 'assets/creditos.jpg');

		
	    	this.load.image('mapTiles', 'assets/spritesheet_glutony.png');
	        this.load.spritesheet('player', 'assets/player.png', 32, 32);
		this.load.spritesheet('items', 'assets/spritesheet_glutony.png', 32, 32, 144);
		this.load.spritesheet('enemies', 'assets/spritesheets/enemies.png', 32, 32, 12);
		this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3', 'assets/level3.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.audio('jumpSound', 'assets/sounds/jump.wav');
		this.load.audio('pickupSound', 'assets/sounds/NenadSimic - Menu Selection Click - OpenGameArt.ogg');
		this.load.audio('playerDeath', 'assets/sounds/hurt3.ogg');
		this.load.audio('enemyDeath', 'assets/sounds/hit2.ogg');

		//	+ lots of other required assets here
	//	this.load.audio('titleMusic', 'assets/sounds/Mathew Pablo - Curious Critters (Extended Version) - OpenGameArt.ogg');
		this.load.audio('titleMusic', 'assets/sounds/Bruno Belotti - Polka_Loop - OpenGameArt.org.ogg');
		this.load.audio('music', 'assets/sounds/Mathew Pablo Caketown - OpenGameArt.ogg');


	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
