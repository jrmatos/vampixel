/* Created by Paulo Matos */
var gameManager = (function () {
    'use strict';
    
    var gameInstance = null,
        states = {},
        sprites = {},
        global = {};

    var addSprite =  function (name, Sprite) {
        sprites[name] = Sprite;
    }

    var getSprite = function (name) {
        if(sprites.hasOwnProperty(name)) {
            return sprites[name];
        }
        else {
            throw new ReferenceError("Sprite '"+ name +"' was not found");
        }
    }

    var addState =  function (name, theClass) {
        states[name] = theClass;
    }

    var addAllStatesToGame =  function() {
        Object.keys(states).forEach(function (stateName) {
            getGameInstance().state.add(stateName, states[stateName]);
        });
    }

    var bindGameToSprites = function () {
        Object.keys(sprites).forEach(function (spriteName) {
            sprites[spriteName].prototype.game = getGameInstance();
            sprites[spriteName] = new sprites[spriteName]();
        });
    }

    var createNewGameInstance = function (w, h, r, p) {
        gameInstance = new Phaser.Game(w, h, r, p);
        return this;
    }

    var getGameInstance = function () {
        return gameInstance;
    }

    var getSprites = function () {
        return sprites;
    }

    var getStates = function () {
        return states;
    }

    var create = function (width, height, renderer, parent, mainState) {
        this.createNewGameInstance(width, height, renderer, parent);
        setTimeout(function () {
            bindGameToSprites()
            addAllStatesToGame();
            getGameInstance().state.start(mainState);
        }, 0);
        return this;
    }
    
    return {
        addState: addState,
        create: create,
        addSprite: addSprite,
        getSprite: getSprite,
        createNewGameInstance: createNewGameInstance,
        getGameInstance: getGameInstance,
        getSprites: getSprites,
        getStates: getStates,
        global: global
    }
    
})();