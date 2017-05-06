(function () {
    'use strict'; 

    var WinState = function() {
    };

    WinState.prototype.create = function() {
        var game = this.game;
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You win!!!', { fill: '#ffffff', align: 'center' });
        text.anchor.set(0.5);

        setTimeout(function () {
            game.state.start('game');
        }, 1500);
    }

    gameController.addState('win', WinState);

})();