(function () {
    'use strict'; 

    // globals
    var bloodsVelociy = -200;
    var obstaclesVelociy = -200;
    var gameVelocity = 1;

    var GameState = function() {
        // load sprites here
        this.player              = gameManager.getSprite('player');
        this.backgroundOne       = gameManager.getSprite('backgroundOne');
        this.backgroundTwo       = gameManager.getSprite('backgroundTwo');
        this.backgroundThree     = gameManager.getSprite('backgroundThree');
        this.backgroundFour      = gameManager.getSprite('backgroundFour');
        this.ground              = gameManager.getSprite('ground');
        this.transparentGround   = gameManager.getSprite('transparentGround');
        this.wallLeft            = gameManager.getSprite('wallLeft');
    }

    GameState.prototype.preload = function() {
        // player
        this.player.preload();

        // parallax
        this.backgroundOne.preload();
        this.backgroundTwo.preload();
        this.backgroundThree.preload();
        this.backgroundFour.preload();
        this.ground.preload();

        // wall horizontal
        this.game.load.image('wall', 'assets/img/wallHorizontal.png');

        // blood
        this.game.load.audio('jumpSound', 'assets/audio/jump.ogg');
        this.game.load.image('blood', 'assets/img/blood.png');
        this.game.load.audio('bloodSound', 'assets/audio/blood.ogg');
        
        // obstacles
        this.game.load.image('obstacle', 'assets/img/obstaculo.png');
        
    }

    GameState.prototype.create = function() {

        // sound
        this.game.sound.stopAll();
        this.jumpSound = this.game.add.audio('jumpSound');
        this.bloodSound = this.game.add.audio('bloodSound');

        // activate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#53078e';

        // parallax
        this.backgroundFour.setup();
        this.backgroundThree.setup();
        this.backgroundTwo.setup();
        this.backgroundOne.setup();

        // ground sprite
        this.ground.setup();

        // transparent ground platform
        // this one is where the player collides     
        this.transparentGround.setup('wall');        
        
        // wall left
        // use this to kill objects outside the screen
        this.wallLeft.setup('wall');

        // setup initial player properties
        this.player.setup();

        // blood group
        this.bloods = this.game.add.group();
        this.bloods.enableBody = true;
        this.game.time.events.loop(Phaser.Timer.SECOND, createBloods, this);
        
        // obstacles        
        this.obstacles = this.game.add.group(); 
        this.obstacles.enableBody = true;
        this.game.time.events.loop(this.game.rnd.integerInRange(1500, 2000), createObstacles, this);

        // handle all inputs
        handleInputs.apply(this);
    }

    GameState.prototype.update = function() {
        updateParallaxes.apply(this);
        handleColliders.apply(this);
    }    
    
    GameState.prototype.render = function() {
        // this.game.debug.inputInfo(32, 32);
    }

    // collision checkers
    function handleColliders() {
        this.game.physics.arcade.collide(this.player.sprite, this.transparentGround.sprite, this.player.groundCollision, null, this.player);
        this.game.physics.arcade.overlap(this.player.sprite, this.bloods, this.player.bloodCollision, null, this);
        
        // obstacles collision
        this.game.physics.arcade.overlap(this.player.sprite, this.obstacles, platformCollision, null, this);
    }
    
    function platformCollision(player, platform){
        this.game.state.start("lose");
    }

    function handleInputs() {
        // mouse click or touch
        this.game.input.onDown.add(this.player.jump, this.player); 
    }

    function updateParallaxes() {
        this.backgroundOne.sprite.tilePosition.x -= 0.85;
        this.backgroundTwo.sprite.tilePosition.x -= 0.60;
        this.backgroundThree.sprite.tilePosition.x -= 0.10;
        this.backgroundFour.sprite.tilePosition.x -= 0.05;
        this.ground.sprite.tilePosition.x -= 3;
    }

    function createBloods() {
        var blood = this.bloods.create(this.game.world.width, this.game.rnd.integerInRange(135, 410), 'blood');
        blood.body.velocity.x = bloodsVelociy; 
        blood.body.immovable = true;
        blood.checkWorldBounds = true;
        blood.outOfBoundsKill = true;
    }

    function createObstacles() {
        var obstacle = this.obstacles.create(this.game.world.width, 530, 'obstacle');
        obstacle.scale.setTo(0.2, 0.2);
        obstacle.body.velocity.x = obstaclesVelociy; 
        obstacle.body.immovable = true;
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
    }

    gameManager.addState('game', GameState);

})();