
BasicGame.Level3 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.


};

BasicGame.Level3.prototype = {

    create: function () {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.level3 = this.game.add.tilemap('level3');
	this.level3.addTilesetImage('spritesheet_glutony','mapTiles');
	this.bgLayer = this.level3.createLayer('background');
	this.lavaLayer = this.level3.createLayer('middleground');
	this.wallsLayer = this.level3.createLayer('foreground');

	this.wallsLayer.resizeWorld();
        this.level3.setCollisionByExclusion([9, 10, 11, 12, 17, 18, 19, 20], true, this.wallsLayer);
    	this.level3.setCollision([5, 6, 13], true, this.lavaLayer);
    	this.respawn = this.add.group();
    	this.level3.createFromObjects('Items', 'player', '', 0, true, false, this.respawn);
    	this.player = this.game.add.sprite(0, 0, 'player',1);
    	this.player.anchor.setTo(0.5, 0.5);
    	this.game.physics.enable(this.player);
    	this.player.body.gravity.y = 750;
    	this.game.camera.follow(this.player);
    	this.respawn.forEach(function(spawnpoint){
		this.player.reset(spawnpoint.x,spawnpoint.y);
    	},this);
    	this.player.animations.add('walk', [2, 3, 2], 12);
    	this.player.animations.add('idle', [2]);
    	this.player.animations.add('jump', [0]);

    	this.keys = this.game.input.keyboard.createCursorKeys();
    	this.frutas = this.add.physicsGroup();
    	this.level3.createFromObjects('Items', 'fruta', 'items', 51, true, false, this.frutas); // frutas 51 a 53
    	this.frutas.forEach(function(fruta){
        	fruta.body.immovable = true;
        	fruta.animations.add('spin', [51, 52, 53], 3, true);
        	fruta.animations.play('spin');
    	});
    	this.jumpSound = this.add.audio('jumpSound');
    	this.pickupSound = this.add.audio('pickupSound');
    	this.playerDeathSound = this.add.audio('playerDeath');
    	this.enemyDeathSound = this.add.audio('enemyDeath');
    	this.music = this.add.audio('music');
    	this.music.loop = true;
    	this.music.play();
    	this.scoreText = this.add.text(500, 50, "Score: 0", 
                            {font: "25px Arial", fill: "#ffffff"});
    	this.scoreText.fixedToCamera = true;
    	this.totalFrutas = this.frutas.length;
    	this.collectedFrutas = 0;
    	this.score = 0;
    },

    update: function () {
    	this.game.physics.arcade.collide(this.player, this.wallsLayer);
    	this.game.physics.arcade.overlap(this.player, this.frutas, this.frutaCollect, null, this);
    	var standing = this.player.body.blocked.down || this.player.body.touching.down;
    	if (!standing)
    	{
        	this.edgeTimer = this.time.time + 1000;
    	}
	
    	if(this.keys.left.isDown){
        	this.player.body.velocity.x = -150; 
        	if(this.player.scale.x == 1) this.player.scale.x = -1;
        	this.player.animations.play('walk');
    	}
    	else if(this.keys.right.isDown){
        	this.player.body.velocity.x = 150;
        	if(this.player.scale.x == -1) this.player.scale.x = 1;
        	this.player.animations.play('walk');
    	}
    	else {
        	this.player.body.velocity.x = 0;
        	this.player.animations.play('idle'); 
    	}
	
    	if(this.keys.up.isDown && (this.player.body.touching.down || this.player.body.onFloor())){
		this.player.body.velocity.y = -400;
        	this.jumpSound.play();
    	}
	
    	if(!this.player.body.touching.down && !this.player.body.onFloor()){
        	this.player.animations.play('jump'); 
    	}
    	
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
	this.music.stop();
        this.state.start('MainMenu');

    },
    
    frutaCollect: function(player, fruta){
    	// Atualizando estado do jogo e HUD
    	this.collectedFrutas++;
    	this.score += 100;
    	this.scoreText.text = "Score: " + this.score;
    	// Condição de vitória: pegar todos os diamantes
    	if(this.collectedFrutas == this.totalFrutas){
		this.music.stop();
    		this.state.start('Win');
    	}
    	this.pickupSound.play(); // som de pegar o diamante
    	fruta.kill(); // removendo o diamante do jogo
    }



};
