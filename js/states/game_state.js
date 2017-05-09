(function () {
    'use strict'; 

    // globals
    var bloodsVelociy = -200;
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
        this.obstacle            = gameManager.getSprite('obstacles');
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
        this.obstacle.preload();
        
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
        
        // generate blood every second
        this.game.time.events.loop(Phaser.Timer.SECOND, createBloods, this);
        
        // handle all inputs
        handleInputs.apply(this);        
        
        // obstacles        
        this.obstacles = this.add.group(); 
        //var hole = Math.floor(Math.random() * 5) + 1;
        var time = this.game.rnd.integerInRange(600, 2000)
        this.game.time.events.loop(time, this.addRowOfObstacle, this);
        
    }

    GameState.prototype.update = function() {
        updateParallaxes.apply(this);
        updateBloods.apply(this);        
        handleColliders.apply(this);
    }    
    
    GameState.prototype.render = function() {
        this.game.debug.inputInfo(32, 32);
    }

    // collision checkers
    function handleColliders() {
        this.game.physics.arcade.collide(this.player.sprite, this.transparentGround.sprite, this.player.groundCollision, null, this.player);
        this.game.physics.arcade.collide(this.bloods, this.wallLeft.sprite, bloodOutsideCollision, null, this);
        this.game.physics.arcade.overlap(this.player.sprite, this.bloods, this.player.bloodCollision, null, this);
    }

    // check this
    function bloodOutsideCollision(wallLeft, blood) {
        blood.kill();
    }

    function handleInputs() {
        this.game.input.onDown.add(this.player.jump, this.player); // mouse click or touch
    }

    function updateParallaxes() {
        this.backgroundOne.sprite.tilePosition.x -= 0.85;
        this.backgroundTwo.sprite.tilePosition.x -= 0.60;
        this.backgroundThree.sprite.tilePosition.x -= 0.10;
        this.backgroundFour.sprite.tilePosition.x -= 0.05;
        this.ground.sprite.tilePosition.x -= 3;
    }

    function createBloods() {
        this.bloods.create(this.game.world.width + 10, this.game.rnd.integerInRange(135, 410), 'blood');
        this.bloods.setAll('body.immovable', true);
    }

    function updateBloods() {
        this.bloods.children.forEach(function (blood) {
            blood.body.velocity.x = bloodsVelociy;
        });
    }
    
    GameState.prototype.addObstacle = function(x, y) {
        // Create a obstacle at the position x and y
        var obstacle = this.game.add.sprite(x, y, 'obstacle');

        // Add the obstacle to our previously created group
        this.obstacles.add(obstacle);

        // Enable physics on the obstacle 
        this.game.physics.arcade.enable(obstacle);

        // Add velocity to the obstacle to make it move left
        obstacle.body.velocity.x = -200; 

        // Automatically kill the obstacle when it's no longer visible 
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
    }
    
    GameState.prototype.addRowOfObstacle = function() {
        
        this.addObstacle(800, 550);  
        
        /*// Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 obstacles 
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addObstacle(400, 550);   */
    }

    gameManager.addState('game', GameState);

})();