(function () {
    'use strict'; 

    var player = null;
    var bloodsVelociy = -200;
    var gameVelocity = 1;

    var GameState = function() {
        player = gameManager.getSprite('player')
    }

    GameState.prototype.preload = function() {
        // player
        player.preload();

        // wall horizontal
        this.game.load.image('wall', 'assets/img/wallHorizontal.png');

        // blood
        this.game.load.audio('jumpSound', 'assets/audio/jump.ogg');
        this.game.load.image('blood', 'assets/img/blood.png');
        this.game.load.audio('bloodSound', 'assets/audio/blood.ogg');
        
        // Parallax
        this.game.load.image('mountains-back', 'assets/img/mountains-back.png');
        this.game.load.image('mountains-mid1', 'assets/img/mountains-mid1.png');
        this.game.load.image('mountains-mid2', 'assets/img/mountains-mid2.png');

        // ground
        this.game.load.image('ground', 'assets/img/ground.png');
    }

    GameState.prototype.create = function() {
        this.game.sound.stopAll();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#697e96';

        // parallax
        this.mountainsBack = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage('mountains-back').height, 
            this.game.width, 
            this.game.cache.getImage('mountains-back').height,
            'mountains-back'
        );
 
        // parallax
        this.mountainsMid1 = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage('mountains-mid1').height, 
            this.game.width, 
            this.game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );
 
        // parallax
        this.mountainsMid2 = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage('mountains-mid2').height, 
            this.game.width, 
            this.game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );  

        // ground
        this.ground = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage('ground').height, 
            this.game.width, 
            this.game.cache.getImage('ground').height,
            'ground'
        );  
        
        // transparent platform        
        this.platform = this.game.add.sprite(0, this.game.world.height - 75, 'wall');
        this.platform.alpha = 0;
        this.game.physics.arcade.enable(this.platform);
        this.platform.body.immovable = true;
        this.platform.width = this.game.world.width;
        this.platform.height = 75;
        this.jumpSound = this.game.add.audio('jumpSound');
        this.bloodSound = this.game.add.audio('bloodSound');

         // setup initial player properties
        player.setup();

        // wall left
        this.wallLeft = this.game.add.sprite(-40, 0, 'wall');
        this.game.physics.arcade.enable(this.wallLeft);
        this.wallLeft.body.immovable = true;
        this.wallLeft.width = 20;
        this.wallLeft.height = this.game.world.height;

        // blood group
        this.bloods = this.game.add.group();
        this.bloods.enableBody = true;
        
        this.game.time.events.loop(Phaser.Timer.SECOND, createBloods, this);

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

    /*  ====================================================================
     *                             Helpers
     *  ==================================================================== */
    function handleColliders() {
        this.game.physics.arcade.collide(player.sprite, this.platform, player.groundCollision, null, player);
        this.game.physics.arcade.collide(this.bloods, this.wallLeft, bloodOutsideCollision, null, this);
        this.game.physics.arcade.overlap(player.sprite, this.bloods, player.bloodCollision, null, this);
    }

    function bloodOutsideCollision(wallLeft, blood) {
        blood.kill();
    }

    function handleInputs() {
        // mouse click or touch
        this.game.input.onDown.add(function () {
            player.jump();
        }, this);
    }

    function updateParallaxes() {
        this.mountainsBack.tilePosition.x -= 0.05;
        this.mountainsMid1.tilePosition.x -= 0.3;
        this.mountainsMid2.tilePosition.x -= 0.75;
        this.ground.tilePosition.x -= 3;
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