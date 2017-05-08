(function () {
    'use strict';

    var WallLeft = function () {
        this.sprite = null; 
    }

    WallLeft.prototype.setup = function (imageKey) {
        this.sprite = this.game.add.sprite(-40, 0, imageKey);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.immovable = true;
        this.sprite.width = 20;
        this.sprite.height = this.game.world.height;
    }

    gameManager.addSprite('wallLeft', WallLeft);

})();