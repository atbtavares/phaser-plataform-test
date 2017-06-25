BasicGame.Win = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
BasicGame.Win.prototype = {

  preload: function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
  },

// create: instanciar e inicializar todos os objetos dessa scene
  create: function() {
    // Adicionando textos
    this.game.add.text(70, 100, "YOU HAVE EATEN IT ALL!", {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(70, 200, "Score: " + Globals.score, {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(70, 300, "You will be challenged again, soon...", {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(180, 450, "tecle ENTER para continuar", {font: "35px Arial", fill: "#ffffff"});
    // Capturando tecla enter para uso posterior
    this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  },

// update: o que fazer a cada quadro por segundo
  update: function() {
    // Detectar se a tecla foi pressionada
    if(this.returnKey.isDown){
        this.game.state.start('MainMenu');
    }
  }
}
