(function () {
    'use strict';

    var BackgroundThree = function () {
        this.sprite = null; 
        this.imageName = 'backgroundthree_image';
        this.imageUrl = 'assets/img/bg3.png';
    }

    BackgroundThree.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    BackgroundThree.prototype.setup = function () {
        this.sprite = this.game.add.tileSprite(
            0, 
            this.game.height - this.game.cache.getImage(this.imageName).height, 
            this.game.width, 
            this.game.cache.getImage(this.imageName).height,
            this.imageName
        );
    }

    gameManager.addSprite('backgroundThree', BackgroundThree);

})();