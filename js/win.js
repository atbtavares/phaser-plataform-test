"use strict"; //sempre começar o arquivo com essa linha

//Atenção sempre: 
// - Letras maiúsculas e minúsculas: sempre usar os "cases" corretos;
// - Abrir e fechar parênteses: um esquecimento pode gerar um erro difícil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo não funcione como deveria

//Um estado é sempre um objeto JavaScript, com no mínimo as 3 funções principais: preload, create e update
//As funções sempre começam com NomeDoObjeto.prototype 
var WinState = function(game) {};

// preload: carregar todos os assets necessários para esta scene ou para as próximas
WinState.prototype.preload = function() {
    // Não há nenhum asset a ser carregado aqui, então a função fica vazia
}

// create: instanciar e inicializar todos os objetos dessa scene
WinState.prototype.create = function() {
    // Adicionando textos
    this.game.add.text(70, 100, "YOU HAVE EATEN IT ALL!", {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(70, 200, "Score: " + Globals.score, {font: "35px Arial", fill: "#ffffff"});
    this.game.add.text(70, 300, "You will be challenged again, soon...", {font: "35px Arial", fill: "#ffffff"});
    // Capturando tecla enter para uso posterior
    this.returnKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

// update: o que fazer a cada quadro por segundo
WinState.prototype.update = function() {
    // Detectar se a tecla foi pressionada
    if(this.returnKey.isDown){
        this.game.state.start('menu');
    }
}
