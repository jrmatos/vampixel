(function () {
    'use strict';

    var backgroundTwo = function () {
        this.sprite = null;
        this.imageName = 'backgroundtwo_image';
        this.imageUrl = 'assets/img/mountains-mid1.png';
    }

    backgroundTwo.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    backgroundTwo.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
    }

    gameManager.addSprite('backgroundTwo', backgroundTwo);

})();