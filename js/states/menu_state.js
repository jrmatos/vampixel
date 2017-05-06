(function () {
    'use strict'; 

    var MenuState = function() {
    };

    MenuState.prototype.preload = function() {
        this.game.load.image('start', 'assets/img/start1.png');
    }   
    
    MenuState.prototype.create = function() {
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, 'Vampixel', { fill: '#ffffff', align: 'center', fontSize: 80 });
        text.anchor.set(0.5);

        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'start', clicked, this);
        button.anchor.set(0.5);

        function clicked() {
            this.game.state.start('game');
        }  
    }
    
    gameManager.addState('menu', MenuState);

})();