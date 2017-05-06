(function () {
    'use strict'; 
    
    var player = {
        sprite: null,
        jumpVelocity: -450,
        isJumping: false,
        isDoubleJumping: false,

        setup: function () {
            player.sprite = this.game.add.sprite(this.game.world.centerX, 450, 'player');
            player.sprite.anchor.set(0.5);
            this.game.physics.arcade.enable(player.sprite);
            player.sprite.body.gravity.y = 750;
        },
        jump: function () {
            if(player.sprite.body.touching.down) {
                player.isJumping = true;
                doJump.apply(this);
            }
            else if(!player.isDoubleJumping) {
                player.isDoubleJumping = true;
                doJump.apply(this);
            }

            function doJump() {
                this.jumpSound.play();
                this.game.add.tween(player.sprite).to({ angle: 360 }, 750, Phaser.Easing.Exponential.Out).start();
                player.sprite.body.velocity.y = player.jumpVelocity || -450;
            }
        },
        groundCollision: function (playerSprite) {
            if(player.isJumping) {
                player.isJumping = false;
                player.isDoubleJumping = false;
                playerSprite.angle = 0;
            }
        }
        
    }

    var GameState = function() {
    };

    GameState.prototype.preload = function() {
        this.game.load.image('player', 'assets/img/player.png');
        this.game.load.image('platform', 'assets/img/wallHorizontal.png');
        this.game.load.image('particle', 'assets/img/pixel.png');
        this.game.load.image('coin', 'assets/img/coin.png');
        this.game.load.audio('jumpSound', 'assets/audio/jump.ogg');
        this.game.load.audio('coinSound', 'assets/audio/coin.ogg');
    }

    GameState.prototype.create = function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = "#0082bc";
        player.setup.apply(this);
        this.jumpSound = this.game.add.audio('jumpSound');
        this.coinSound = this.game.add.audio('coinSound');

        // platform group
        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        this.platforms.create(300, 300, 'platform');
        this.movingPlatform = this.platforms.create(100, 400, 'platform');
        this.platforms.create(300, 500, 'platform');
        this.platforms.setAll('body.immovable', true);

        // coin group
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        this.coins.create(500, 200, 'coin');
        this.coins.create(180, 200, 'coin');
        this.coins.create(650, 300, 'coin');
        this.coins.setAll('body.immovable', true);

        this.movingPlatform.body.velocity.x = -100;

        this.coinCount = 3;

        // Emissor de particulas
        this.particleEmitter = this.game.add.emitter(0, 0, 100);
        this.particleEmitter.makeParticles('particle');
    }

    GameState.prototype.update = function() {
        handleColliders.apply(this);
        handleInput.apply(this);
        handleMovingPlatform.apply(this);
        
        
        if(this.coinCount == 0) {
            this.game.state.start('win');
        }

        if(player.sprite.y > 659) {
            this.game.state.start('lose');
        }
    }    
    
    GameState.prototype.render = function() {
        // if(player.isJumping) {
        //     player.sprite.angle += 10;
        // }
        // else {
        //     player.sprite.angle = 0;
        // }
    }

    function handleColliders() {
        this.game.physics.arcade.collide(player.sprite, this.platforms, player.groundCollision, null, this);
        this.game.physics.arcade.overlap(player.sprite, this.coins, this.coinCollision, null, this);
    }

    function handleInput() {
        
        this.game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(function () {
            player.jump.apply(this);
        }, this);

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            player.sprite.body.velocity.x = -150;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.sprite.body.velocity.x = 150;
        }
        else {
             player.sprite.body.velocity.x = 0;
        }
    }

    function random(min, max) {
        return Math.floor((Math.random() * max) + min);
    }

    function handleMovingPlatform() {
        if(this.movingPlatform.x < 100) {
            this.movingPlatform.body.velocity.x = 100;
        }
        else if(this.movingPlatform.x > 500) {
            this.movingPlatform.body.velocity.x = -100;
        }
    }

    GameState.prototype.coinCollision = function (player, coin) {
        this.coinCount--;
        this.coinSound.play();
        coin.kill();

        this.particleEmitter.x = coin.x;
        this.particleEmitter.y = coin.y;
        this.particleEmitter.start(true, 500, null, 10);
    }

    gameController.addState('game', GameState);

})();