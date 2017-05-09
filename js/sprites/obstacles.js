(function () {
    'use strict';

    var Obstacles = function () {
        this.sprite = null; 
        this.imageName = 'obstacles_image';
        this.imageUrl = 'assets/img/obstaculo.png';
    }

    Obstacles.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    Obstacles.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
    }

    gameManager.addSprite('obstacles', Obstacles);

})();