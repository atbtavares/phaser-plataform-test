// Objeto para armazenar as variávels "globais" do jogo
var Globals = { 
    score: 0
};

// main.js: Neste arquivo criamos uma instância de Phaser.Game e 
// determinamos quais scenes farão parte do jogo
// logo após iniciamos a primeira scene

// Criação do objeto principal do Phaser: Phaser.game
// parâmetros: largura, altura, tipo de renderização, ID do div
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-canvas');

// Adicionando os states do nosso jogos no objeto game
// Os states já deverão ter sido criados anteriormente
game.state.add('menu', MenuState);
game.state.add('lose', LoseState);
game.state.add('win', WinState);
game.state.add('game', GameState);
game.state.add('level3', Level3State);
game.state.add('level2', Level2State);

// Iniciando primeiro estado do jogo
game.state.start('menu');
