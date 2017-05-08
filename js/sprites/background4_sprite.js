(function () {
    'use strict';

    var BackgroundFour = function () {
        this.sprite = null; 
        this.imageName = 'backgroundfour_image';
        this.imageUrl = 'assets/img/bg4.png';
    }

    BackgroundFour.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    BackgroundFour.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
        this.sprite.tilePosition.x -= 200;
    }

    gameManager.addSprite('backgroundFour', BackgroundFour);

})();