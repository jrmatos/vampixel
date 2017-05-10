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

    Player.prototype.setup = function (stateContext) {   
        this.sprite = this.game.add.sprite(this.initialPositionX, this.initialPositionY, this.imageName);   
        this.sprite.frame = 0;
        this.sprite.animations.add('walk', [0, 1, 2, 3], 10, true);
        this.sprite.animations.play('walk');
        this.sprite.anchor.set(0.5);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = this.gravity;
        this.stateContext = stateContext;
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
            this.stateContext.jumpSound.play();
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

        this.bloodParticleEmitter.setSize(1, 1);
        this.bloodParticleEmitter.x = blood.x;
        this.bloodParticleEmitter.y = blood.y;
 
        this.bloodParticleEmitter.start(true, 500, null, 500);

        // calculate new score
        var newPoint = calculatePoints.call(this, (blood.y));

        // display to the player
        displayNewPoint.call(this, newPoint, blood.x, blood.y)

        // update score
        this.score = this.score + newPoint;
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
        return 1;
    }

    function displayNewPoint(newPoint, x, y) {
        var newPointText = this.game.add.text(x, y, '+' + newPoint, { fill: '#ffffff', align: 'center', fontSize: 15 });
        newPointText.anchor.set(0.5);

        this.game.add.tween(newPointText).to({ y: newPointText.y - 50, alpha: 0 }, 500, "Linear", true);
        setTimeout(function () {
            newPointText.kill();
        }, 500)
    }

    gameManager.addSprite('player', Player);

})();