/**
 * @author Paulo Matos
 * @description Use this example for creating new sprites
 */
(function () {
    'use strict';

    /**
     * @type Required
     * @description you can't use it as a sprite constructor. Instead, use the `setup` method
     */
    var Example = function () {
        // required
        this.sprite = null; 

        // the bellow properties are optionals
        // you can hard code it when creating the sprite directly
        this.imageName = 'example_image';
        this.imageUrl = 'assets/img/example.png';
        this.initialPositionX = 100;
        this.initialPositionY = 100;
    }

    /**
     * @type Optional
     * @description Call it inside the preload method in your state
     */
    Example.prototype.preload = function () {
        this.game.load.image(this.imageName, this.imageUrl);
    }

    /**
     * @type Required
     * @description Call it inside the create method in your state
     */
    Example.prototype.setup = function () {   
        // required
        // here you'll actually create your sprite
        this.sprite = this.game.add.sprite(this.initialPositionX, this.initialPositionY, this.imageName);   
    }

    /**
     * @type Optional
     */
    Example.prototype.customMethod = function () {
        // write here your custom method
    }

    // required
    gameManager.addSprite('example', Example);

})();
