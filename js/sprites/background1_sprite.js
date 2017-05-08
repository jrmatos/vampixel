(function () {
    'use strict';

    var BackgroundOne = function () {
        this.sprite = null; 
        this.imageName = 'backgroundone_image';
        this.imageUrl = 'assets/img/mountains-back.png';
    }

    BackgroundOne.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    BackgroundOne.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
    }

    gameManager.addSprite('backgroundOne', BackgroundOne);

})();