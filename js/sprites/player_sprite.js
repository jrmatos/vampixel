(function () {
    'use strict';

    var Player = function () {
        this.imageName = 'player_image';
        this.imageUrl = 'assets/img/walk-idle-transform.png';
        this.sprite = null;
        this.gravity = 750;
        this.jumpVelocity = -450;
        this.isJumping = false;
        this.isDoubleJumping = false;
        this.isTripleJumping = false;
        this.initialPositionX = 100;
        this.initialPositionY = this.game.height - 65;
    }

    Player.prototype.preload = function () {
        this.game.load.spritesheet(this.imageName, this.imageUrl, 48, 64);
    }

    Player.prototype.setup = function () {   
        this.sprite = this.game.add.sprite(this.initialPositionX, this.initialPositionY, this.imageName);   
        this.sprite.frame = 0;
        this.sprite.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.sprite.animations.play('walk');
        this.sprite.anchor.set(0.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = this.gravity;
    }

    Player.prototype.jump = function () {
        if(this.sprite.body.touching.down) {
            this.isJumping = true;
            return doJump.apply(this);
        }
        else if(!this.isDoubleJumping) {
            this.isDoubleJumping = true;
            return doJump.apply(this);
        }
        else if(!this.isTripleJumping) {
            this.isTripleJumping = true;
            return doJump.apply(this);
        }

        function doJump() {
            this.sprite.body.velocity.y = this.jumpVelocity || -450;
        }
    }

    Player.prototype.groundCollision = function (playerSprite) {
        if(this.isJumping) {
            this.isJumping = false;
            this.isDoubleJumping = false;
            this.isTripleJumping = false;
        }
    }

    Player.prototype.bloodCollision = function (player, blood) {
        this.bloodSound.play();



        // update score
        this.score = this.score + calculatePoints.call(this, (blood.y));
        this.scoreText.setText(this.score);

        // destroy blood
        blood.kill();
    }

    // give points based on the Y of blood
    function calculatePoints(bloodY) {
         if(bloodY <= 150) {
            return 5;
        }
        if(bloodY <= 200) {
            return 3;
        }
        if(bloodY <= 300) {
            return 2;
        }
        if(bloodY <= 400) {
            return 1;
        }
    }

    gameManager.addSprite('player', Player);

})();