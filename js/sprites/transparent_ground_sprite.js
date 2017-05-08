(function () {
    'use strict';

    var TransparentGround = function () {
        this.sprite = null; 
    }

    TransparentGround.prototype.setup = function (imageKey) {
        this.sprite = this.game.add.sprite(0, this.game.world.height - 35, imageKey);
        this.sprite.alpha = 0;
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.width = this.game.world.width;
        this.sprite.height = 35;
    }

    gameManager.addSprite('transparentGround', TransparentGround);

})();