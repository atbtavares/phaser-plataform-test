"use strict"; 

var MenuState = function(game) {};

MenuState.prototype.preload = function() 
{
   game.load.image('bg', 'assets/inicio.jpg');
   game.load.image('more_img', 'assets/creditos.jpg');
   game.load.spritesheet('start', 'assets/btn_inicio.png',283,118);
}

var more_img;
var inicio;
var creditos;
var close_btn;
var uea;

var cursors;
var enterKey;

MenuState.prototype.create = function() 
{
   game.add.tileSprite(0, 0, 800, 600, 'bg');
   cursors = game.input.keyboard.createCursorKeys();
   enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
   more_img = game.add.sprite(0,0,'more_img');
   more_img.visible = false;
   inicio = game.add.button(250, 400, 'start',this.game.state.start('game'), this, 2, 1, 0);
   creditos = game.add.button(650, 50, 'more_img', this.showTeam, this, 2, 1, 0);
}


MenuState.prototype.update = function() 
{
   if (enterKey.isDown)
   {
   	this.game.state.start('game');
   }
}

MenuState.prototype.startGame= function()
{
   this.game.state.start('game');
}

MenuState.prototype.showTeam= function()
{
   inicio.visible = false;
   creditos.visible = false;
   more_img.visible = true;
}

MenuState.prototype.hideTeam= function()
{
   inicio.visible = true;
   creditos.visible = true;
   more_img.visible = false;
}

