var gameManager = (function () {
    'use strict';
    
    var phaserGame = null,
        states= [];

    var addState =  function (name, theClass) {
        states.push({ name: name, theClass: theClass });
    }

    var addAllStatesToGame =  function(_phaserGame) {
        states.forEach(function (state) {
            _phaserGame.state.add(state.name, state.theClass);
        });
        return _phaserGame;
    }

    var create = function (width, height, renderer, parent) {
        phaserGame = addAllStatesToGame(new Phaser.Game(width, height, renderer, parent));
        return this;
    }
    
    var start = function(mainState) {
        phaserGame.state.start(mainState);
    }

    var utils = {
        random: function (min, max) {
            return Math.floor((Math.random() * max) + min);
        }
    }

    return {
        addState: addState,
        create: create,
        start: start,
        utils: utils
    }
    
})();