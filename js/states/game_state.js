(function () {
    'use strict'; 

    // globals
    var bloodsVelociy = -200;
    var gameVelocity = 1;

    // sprites
    var player = null;
    var backgroundOne = null;
    var backgroundTwo = null;
    var backgroundThree = null;
    var ground = null;
    var transparentGround = null;
    var wallLeft = null;

    var GameState = function() {
        // load sprites here
        player = gameManager.getSprite('player');
        backgroundOne = gameManager.getSprite('backgroundOne');
        backgroundTwo = gameManager.getSprite('backgroundTwo');
        backgroundThree = gameManager.getSprite('backgroundThree');
        ground = gameManager.getSprite('ground');
        transparentGround = gameManager.getSprite('transparentGround');
        wallLeft = gameManager.getSprite('wallLeft');
    }

    GameState.prototype.preload = function() {
        // player
        player.preload();

        // parallax
        backgroundOne.preload();
        backgroundTwo.preload();
        backgroundThree.preload();
        ground.preload();

        // wall horizontal
        this.game.load.image('wall', 'assets/img/wallHorizontal.png');

        // blood
        this.game.load.audio('jumpSound', 'assets/audio/jump.ogg');
        this.game.load.image('blood', 'assets/img/blood.png');
        this.game.load.audio('bloodSound', 'assets/audio/blood.ogg');
    }

    GameState.prototype.create = function() {

        // sound
        this.game.sound.stopAll();
        this.jumpSound = this.game.add.audio('jumpSound');
        this.bloodSound = this.game.add.audio('bloodSound');

        // activate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#697e96';

        // parallax
        backgroundOne.setup();
        backgroundTwo.setup();
        backgroundThree.setup();

        // ground sprite
        ground.setup();

        // transparent ground platform
        // this one is where the player collides     
        transparentGround.setup('wall');        
        
        // wall left
        // use this to kill objects outside the screen
        wallLeft.setup('wall');

        // setup initial player properties
        player.setup();

        // blood group
        this.bloods = this.game.add.group();
        this.bloods.enableBody = true;
        
        // generate blood every second
        this.game.time.events.loop(Phaser.Timer.SECOND, createBloods, this);
        
        // handle all inputs
        handleInputs.apply(this);

    }

    GameState.prototype.update = function() {
        updateParallaxes.apply(this);
        updateBloods.apply(this);        
        handleColliders.apply(this);
    }    
    
    GameState.prototype.render = function() {
        // this.game.debug.inputInfo(32, 32);
    }

    // collision checkers
    function handleColliders() {
        this.game.physics.arcade.collide(player.sprite, transparentGround.sprite, player.groundCollision, null, player);
        this.game.physics.arcade.collide(this.bloods, wallLeft.sprite, bloodOutsideCollision, null, this);
        this.game.physics.arcade.overlap(player.sprite, this.bloods, player.bloodCollision, null, this);
    }

    // check this
    function bloodOutsideCollision(wallLeft, blood) {
        blood.kill();
    }

    function handleInputs() {
        this.game.input.onDown.add(player.jump, player); // mouse click or touch
    }

    function updateParallaxes() {
        backgroundOne.sprite.tilePosition.x -= 0.05;
        backgroundTwo.sprite.tilePosition.x -= 0.3;
        backgroundThree.sprite.tilePosition.x -= 0.75;
        ground.sprite.tilePosition.x -= 3;
    }

    function createBloods() {
        this.bloods.create(810, this.game.rnd.integerInRange(135, 410), 'blood');
        this.bloods.setAll('body.immovable', true);
    }

    function updateBloods() {
        this.bloods.children.forEach(function (blood) {
            blood.body.velocity.x = bloodsVelociy;
        });
    }

    gameManager.addState('game', GameState);

})();