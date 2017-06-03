"use strict"; 

//Aten��o sempre: 
// - Letras mai�sculas e min�sculas: sempre usar os "cases" corretos;
// - Abrir e fechar par�nteses: um esquecimento pode gerar um erro dif�cil de notar;
// - Abrir e fechar chaves: mesmo caso anterior
// - Sempre veja o console no navegador apertando F12 caso algo n�o funcione como deveria

//Um estado � sempre um objeto JavaScript, com no m�nimo as 3 fun��es principais: preload, create e update
//As fun��es sempre come�am com NomeDoObjeto.prototype 
var GameState = function(game) {};

// preload: carregar todos os assets necess�rios para esta scene ou para as pr�ximas
GameState.prototype.preload = function() {
    // Para carregar um sprite, basta informar uma chave e dizer qual � o arquivo
    //this.game.load.image('mapTiles', 'assets/spritesheets/tiles.png');
    this.game.load.image('mapTiles', 'assets/spritesheet_glutony.png');

    // Para carregar um spritesheet, � necess�rio saber a altura e largura de cada sprite, e o n�mero de sprites no arquivo
    // No caso do player.png, os sprites s�o de 32x32 pixels, e h� 8 sprites no arquivo
    //this.game.load.spritesheet('player', 'assets/spritesheets/player.png', 32, 32, 8);
    this.game.load.spritesheet('player', 'assets/player.png', 32, 32);
    this.game.load.spritesheet('items', 'assets/spritesheets/items.png', 32, 32, 16);
    this.game.load.spritesheet('enemies', 'assets/spritesheets/enemies.png', 32, 32, 12);
    
    // Para carregar um arquivo do Tiled, o mesmo precisa estar no formato JSON
    //this.game.load.tilemap('level1', 'assets/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);

    // Para carregar os sons, basta informar a chave e dizer qual � o arquivo
    this.game.load.audio('jumpSound', 'assets/sounds/jump.wav');
    this.game.load.audio('pickupSound', 'assets/sounds/pickup.wav');
    this.game.load.audio('playerDeath', 'assets/sounds/hurt3.ogg');
    this.game.load.audio('enemyDeath', 'assets/sounds/hit2.ogg');
    this.game.load.audio('music', 'assets/sounds/mystery.wav');
}

GameState.prototype.create = function() { 
    // Inicializando sistema de f�sica
    // o sistema Arcade � o mais simples de todos, mas tamb�m � o mais eficiente em termos de processamento.
    // https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.html
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Para carregar o mapa do Tiled para o Phaser, 3 est�gios s�o necess�rios:
    // 1 - Criar um objeto com o arquivo do Tiled carregado no preload()
    this.level1 = this.game.add.tilemap('level1');
    // 2 - Adicionar as imagens correspondentes aos tilesets do Tiled dentro do Phaser
    // "tiles" � o nome do tileset dentro do Tiled
    // "mapTiles" � o nome da imagem com os tiles, carregada no preload()
    this.level1.addTilesetImage('spritesheet_glutony', 'mapTiles');
    
    // 3 - Criar os layers do mapa
    // A ordem nesse caso � importante, ent�o os layers que ficar�o no "fundo" dever�o ser
    // criados primeiro, e os que ficar�o na "frente" por �ltimo;
    this.bgLayer = this.level1.createLayer('background');
    this.lavaLayer = this.level1.createLayer('middleground');
    this.wallsLayer = this.level1.createLayer('foreground');
    // Mais informa��es sobre tilemaps:
    // https://photonstorm.github.io/phaser-ce/#toc14

    // Redimensionando o tamanho do "mundo" do jogo
    this.wallsLayer.resizeWorld();
    
    // Para que possamos detectar colis�es dos objetos com os layers do mapa, primeiro precisamos
    // informar quais tiles dever�o efetivamente ter um colisor, para cada layer.
    // Esta contagem � feita olhando o tileset no Tiled, sendo que o tile mais � esquerda da
    // primeira linha do tileset ter� valor 1, o pr�ximo na linha valor 2, e assim por diante,
    // continuando a contagem na pr�xima linha, at� o �ltimo tile da �ltima linha.
    
    // Neste caso, ao inv�s de dizermos quais tiles devem colidir, estamos dizendo quais tiles n�o
    // devem colidir, pois h� mais tiles que colidem do que tiles sem colis�o.
    // Os par�metros s�o a lista dos tiles, "true" indicando que a colis�o deve ser ativada,
    // e o nome do layer.
    this.level1.setCollisionByExclusion([9, 10, 11, 12, 17, 18, 19, 20], true, this.wallsLayer);
    
    // Para o layer de lava � o caso oposto: poucos tiles colidem, ent�o � mais f�cil 
    // informar diretamente quais s�o.
    this.level1.setCollision([5, 6, 13], true, this.lavaLayer);
        
    // Inicializando jogador
    // Adicionando o sprite do jogador na posi��o (160, 64) usando o asset 'player'
    // Como estamos usando um spritesheet, � necess�rio informar qual sprite vamos usar
    // A contagem � da mesma forma do que nos tiles do mapa, mas o primeiro sprite recebe
    // o n�mero 0 ao inv�s de 1.
    // aqui 
    this.player = this.game.add.sprite(200, 131, 'player', 1);
    // Ajustando �ncora do jogador (ponto de refer�ncia para posicionamento)
    this.player.anchor.setTo(0.5, 0.5);
    // Ativando f�sica para o jogador
    // aqui
    this.game.physics.enable(this.player);
    // Ativando gravidade para o jogador
    // Como � positiva no eixo Y, o jogador ter� uma gravidade "normal",
    // ou seja, ir� acelerar para baixo
    //aqui	
    this.player.body.gravity.y = 750;
    // Como o "mundo" � maior do que a �rea vis�vel, � necess�rio que a c�mera siga o jogador.
    // https://photonstorm.github.io/phaser-ce/Phaser.Camera.html#follow
    //aqui 
    this.game.camera.follow(this.player);
    
    // Anima��es do jogador
    // Anima��es, no contexto do Phaser, nada mais s�o do que sequ�ncias de frames do spritesheet
    // Para criar uma anima��o, utilizamos animations.add()
    // Par�metros: nome da anima��o, lista de quadros, quadros por segundo da anima��o
    // https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html
    // aqui 
    this.player.animations.add('walk', [2, 3, 2], 12);
    this.player.animations.add('idle', [2]);
    this.player.animations.add('jump', [0]);
    /*
    */
    
    // Adicionando entradas
    // createCursorKeys() cria automaticamente mapeamentos para as 4 teclas de dire��o
    // https://photonstorm.github.io/phaser-ce/Phaser.Keyboard.html#createCursorKeys
    // Lista de teclas dispon�veis: https://photonstorm.github.io/phaser-ce/Phaser.KeyCode.html
    this.keys = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    // Adicionando objetos do Tiled, utilizando grupos
    // Um grupo � como se fosse um array de sprites, mas com v�rias facilidades adicionais, 
    // como por exemplo alterar atributos e facilitar detectar colis�es com objetos do grupo
    // Especificamente, estamos criando physicsGroups, que j� armazenam objetos com f�sica ativada
    // https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#physicsGroup
    
    // Criando objetos que foram criados em um layer de objetos do Tiled
    // Par�metros do createFromObjects():
    // nome do layer do Tiled de onde vamos criar os objetos
    // nome dos objetos do Tiled que ser�o criados
    // nome do spritesheet carregado no preload() com os objetos
    // frame do spritesheet, basta setar para um dos frames do objeto em quest�o
    // true, false - estes dois par�metros podem ficar com estes valores
    // grupo - qual grupo do Phaser devemos adicionar esses objetos
    
    // Grupo de diamantes
    //this.diamonds = this.game.add.physicsGroup();
    //this.level1.createFromObjects('Items', 'diamond', 'items', 5, true, false, this.diamonds);
    // Para cada objeto do grupo, vamos executar uma fun��o
    //this.diamonds.forEach(function(diamond){
        //// body.immovable = true indica que o objeto n�o � afetado por for�as externas
        //diamond.body.immovable = true;
        // Adicionando anima��es; o par�metro true indica que a anima��o � em loop
        //diamond.animations.add('spin', [4, 5, 6, 7, 6, 5], 6, true);
        //diamond.animations.play('spin');
    //});

    // Grupo de morcegos:
    /*
    this.bats = this.game.add.physicsGroup();
    this.level1.createFromObjects('Enemies', 'bat', 'enemies', 8, true, false, this.bats);
    this.bats.forEach(function(bat){
        bat.anchor.setTo(0.5, 0.5);
        bat.body.immovable = true;
        bat.animations.add('fly', [8, 9, 10], 6, true);
        bat.animations.play('fly');
	*/
        // Velocidade inicial do inimigo
        //bat.body.velocity.x = 100;
        // bounce.x=1 indica que, se o objeto tocar num objeto no eixo x, a for�a dever�
        // ficar no sentido contr�rio; em outras palavras, o objeto � perfeitamente el�stico
        //bat.body.bounce.x = 1;
    //});

    // Criando assets de som com this.game.add.audio()
    // O par�metro � o nome do asset definido no preload()
    this.jumpSound = this.game.add.audio('jumpSound');
    this.pickupSound = this.game.add.audio('pickupSound');
    this.playerDeathSound = this.game.add.audio('playerDeath');
    this.enemyDeathSound = this.game.add.audio('enemyDeath');
    
    // M�sica de fundo - criada da mesma forma, mas com o par�metro loop = true
    this.music = this.game.add.audio('music');
    this.music.loop = true;
    // J� iniciamos a m�sica aqui mesmo pra ficar tocando ao fundo
    this.music.play();
    
    // HUD de score
    // A linha abaixo adiciona um texto na tela, e a pr�xima faz com o que o texto fique
    // fixo na c�mera, dessa forma n�o vai se deslocar quando a c�mera mudar
    this.scoreText = this.game.add.text(500, 50, "Score: 0", 
                            {font: "25px Arial", fill: "#ffffff"});
    this.scoreText.fixedToCamera = true;
    
    // Estado do jogo - Vari�veis para guardar quaisquer informa��es pertinentes para as condi��es de 
    // vit�ria/derrota, a��es do jogador, etc
    //this.totalDiamonds = this.diamonds.length;
    this.collectedDiamonds = 0;
    this.score = 0;
}

GameState.prototype.update = function() {
    // Detec��o de colis�es
    // Todas as colis�es entre os objetos do jogo s�o avaliadas com arcade.collide() ou 
    // arcade.overlap(). O Phaser ir� automaticamente calcular a colis�o dos objetos
    // Inicialmente, adicionando colis�es do player com as paredes da fase, que � um layer:
    // aqui
    this.game.physics.arcade.collide(this.player, this.wallsLayer);

    // Adicionando colis�es do jogador com outros elementos, onde h� uma fun��o de tratamento
    // Cada colis�o ter� um callback, que � o terceiro par�metro, que ir� fazer alguma coisa
    // sempre que essa quando essa colis�o ocorrer; este callback receber� os 2 objetos que 
    // colidiram; veremos mais abaixo na implementa��o
    // Colis�o com a lava - o jogador morre
    // aqui 
    this.game.physics.arcade.collide(this.player, this.lavaLayer, this.lavaDeath, null, this);
    // Colis�o com os diamantes - devem ser coletados
    //this.game.physics.arcade.overlap(this.player, this.diamonds, this.diamondCollect, null, this);
    // Colis�o com os morcegos - depende de como foi a colis�o, veremos abaixo
    //this.game.physics.arcade.overlap(this.player, this.bats, this.batCollision, null, this);
    
    // Adicionando colis�o entre os morcegos e as paredes
    // this.game.physics.arcade.collide(this.bats, this.wallsLayer);
    
    // Movimenta��o do player
    // Para detectar se uma das teclas referenciadas foi pressionada,
    // basta verificar a vari�vel .isDown da mesma
    // Caso seja a tecla para a esquerda, ajustar uma velocidade negativa
    // ao eixo X, que far� a posi��o X diminuir e consequentemente o jogador
    // ir para a esquerda;
    
    if(this.keys.left.isDown){
        this.player.body.velocity.x = -150; // Ajustar velocidade
        // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
        if(this.player.scale.x == 1) this.player.scale.x = -1;
        // Iniciando a anima��o 'walk'
        this.player.animations.play('walk');
    }
    // Se a tecla direita estiver pressionada (this.keys.right.isDown == true),
    // mover o sprite para a direita
    else if(this.keys.right.isDown){
        // se a tecla direita estiver pressionada
        this.player.body.velocity.x = 150;  // Ajustar velocidade
        // Se o jogador estiver virado para a direita, inverter a escala para que ele vire para o outro lado
        if(this.player.scale.x == -1) this.player.scale.x = 1;
        this.player.animations.play('walk');
    }
    else {
        // Ajustar velocidade para zero
        this.player.body.velocity.x = 0;
        this.player.animations.play('idle'); //changoto 'idle'
    }

    // Se o a barra de espa�o ou a tecla cima estiverem pressionadas, e o jogador estiver com a parte de baixo tocando em alguma coisa
    if((this.jumpButton.isDown || this.keys.up.isDown) && (this.player.body.touching.down || this.player.body.onFloor())){
        // Adicione uma velocidade no eixo Y, fazendo o jogador pular
        this.player.body.velocity.y = -400;
        // Tocando o som de pulo
        this.jumpSound.play();
    }

    // Se o jogador n�o estiver no ch�o, inicie a anima��o 'jump'
    if(!this.player.body.touching.down && !this.player.body.onFloor()){
        this.player.animations.play('jump'); //changeto 'jump'
    }
    /* aqui
    */
    
    // Para cada morcego, verificar em que sentido ele est� indo
    // Se a velocidade for positiva, a escala no eixo X ser� 1, caso
    // contr�rio -1
    /*
    this.bats.forEach(function(bat){
       if(bat.body.velocity.x != 0) {
           // Math.sign apenas retorna o sinal do par�metro: positivo retorna 1, negativo -1
           bat.scale.x = 1 * Math.sign(bat.body.velocity.x);
       }
    });
    */
}

// Tratamento da colis�o entre o jogador e os diamantes
// As fun��es para esse fim sempre recebem os dois objetos que colidiram,
// e ent�o podemos manipular tais objetos
/*
GameState.prototype.diamondCollect = function(player, diamond){
    // Atualizando estado do jogo e HUD
    this.collectedDiamonds++;
    this.score += 100;
    this.scoreText.text = "Score: " + this.score;
    // Condi��o de vit�ria: pegar todos os diamantes
    if(this.collectedDiamonds == this.totalDiamonds){
        Globals.score = this.score; // Guardando score na vari�vel global para o pr�ximo estado
        this.game.state.start('win');
    }
    this.pickupSound.play(); // som de pegar o diamante
    diamond.kill(); // removendo o diamante do jogo
}
*/

// Tratamento da colis�o entre o jogador e os diamantes
GameState.prototype.batCollision = function(player, bat){
    // Se o jogador colidir por baixo e o morcego por cima, isso indica que o jogador pulou
    // em cima do morcego, nesse caso vamos "matar" o morcego
    if(player.body.touching.down && bat.body.touching.up){
        this.enemyDeathSound.play(); // tocando som de morte do morcego
        this.player.body.velocity.y = -200; // adicionando um pequeno impulso vertical ao jogador
        this.score += 100; // atualizando score
        this.scoreText.text = "Score: " + this.score;
        bat.kill();
    }
    else this.lose(); // caso contr�rio, ir para condi��o de derrota
}

// Tratamento da colis�o entre o jogador e os diamantes
// Nesse caso, apenas desligamos a colis�o com a lava para evitar chamar o evento
// repetidas vezes, e vamos para a condi��o de derrota
GameState.prototype.lavaDeath = function(player, lava){
    this.level1.setCollision([5, 6, 13], false, this.lavaLayer);
    this.music.stop(); // parando a m�sica
    this.lose();
}

// Condi��o de derrota: guarde o score e siga para o pr�ximo estado
GameState.prototype.lose = function(){
    console.debug("No c�u tem p�o?");
    Globals.score = this.score;
    this.playerDeathSound.play();
    this.game.state.start('lose');
}
