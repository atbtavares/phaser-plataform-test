"use strict"; var MenuState = function(game) {}; 
MenuState.prototype.preload = function() 
{
   game.load.image('bg', 'assets/inicio.jpg');
   game.load.spritesheet('btn', 'assets/btn_inicio.png',283,118);
   game.load.image('creditos', 'assets/creditos.jpg');
}

MenuState.prototype.create = function() 
{
   game.add.tileSprite(0, 0, 800, 600, 'bg');
   this.cursors = game.input.keyboard.createCursorKeys();
   this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
   this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESCAPE);
   this.sprite_creditos = game.add.sprite(0,0,'creditos');
   this.sprite_creditos.visible = false;
   this.btn_jogar= game.add.button(200, 210, 'btn',this.startGame, this, 2, 1, 0);
   this.btn_creditos= game.add.button(200, 270, 'btn',this.showTeam, this, 2, 1, 0);
}


MenuState.prototype.update = function() 
{
   if (this.enterKey.isDown)
   {
   	this.game.state.start('game');
   }
   if (this.escKey.isDown);
   {
   	this.sprite_creditos.visible = false;
   }
}

MenuState.prototype.startGame= function()
{
   this.game.state.start('game');
}

MenuState.prototype.showTeam= function()
{
   this.sprite_creditos.visible = true;
}

MenuState.prototype.hideTeam = function()
{
   this.sprite_creditos.visible = false;
}

