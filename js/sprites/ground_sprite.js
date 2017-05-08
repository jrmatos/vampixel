(function () {
    'use strict';

    var Ground = function () {
        this.sprite = null; 
        this.imageName = 'ground_image';
        this.imageUrl = 'assets/img/ground.png';
    }

    Ground.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    Ground.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
    }

    gameManager.addSprite('ground', Ground);

})();