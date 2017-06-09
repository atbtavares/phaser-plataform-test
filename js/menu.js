"use strict"; var MenuState = function(game) {}; 

MenuState.prototype.preload = function() 
{
   game.load.image('bg', 'assets/tela_inicial_2.jpg');
   game.load.spritesheet('btn', 'assets/btn_inicio.png',200,35);
   game.load.image('creditos', 'assets/creditos.jpg');
}

MenuState.prototype.create = function() 
{
   game.add.tileSprite(0, 0, 800, 600, 'bg');
   this.sprite_creditos =  game.add.sprite(0, 0, 'creditos');
   this.sprite_creditos.visible = false;
   this.cursors = game.input.keyboard.createCursorKeys();
   this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
   this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESCAPE);
   this.btn_jogar = game.add.button(205, 242, 'btn',this.startGame, this, 2, 1, 0);
   this.btn_creditos = game.add.button(205, 302, 'btn',this.actionOnClick, this, 2, 1, 0);
}


MenuState.prototype.update = function() 
{
   if (this.enterKey.isDown)
   {
   	this.game.state.start('game');
   }
   /*
   if (this.escKey.isDown);
   {
   	this.sprite_creditos.visible = false;
   }
   */
}

MenuState.prototype.startGame= function()
{
   this.game.state.start('game');
}

MenuState.prototype.actionOnClick= function()
{
   if (this.sprite_creditos.visible){
   	this.btn_jogar.input.enabled = true;
   	this.btn_creditos.reset(205,302);
   } else { 
   	this.btn_jogar.input.enabled = false;
   	this.btn_creditos.reset(10,45);
   }
   this.sprite_creditos.visible = !this.sprite_creditos.visible;
}

/*
*/
