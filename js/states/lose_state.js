(function () {
    'use strict'; 

    var LoseState = function() {
    };

    LoseState.prototype.create = function() {
        var game = this.game;
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'You lose!!!', { fill: '#ffffff', align: 'center' });
        text.anchor.set(0.5);
        
        score = 0;
        
        setTimeout(function () {
            game.state.start('game');
        }, 1000);
    }

    gameManager.addState('lose', LoseState);

})();