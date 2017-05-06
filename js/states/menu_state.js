(function () {
    'use strict'; 

    var MenuState = function() {
    };

    MenuState.prototype.preload = function() {
        this.game.load.image('start', 'assets/img/start1.png');
    }   
    
    MenuState.prototype.create = function() {
        this.game.stage.backgroundColor = '#697e96';
        
        this.game.add.button(400, 300, 'start', clicked, this);

        function clicked() {
            this.game.state.start('game');
        }  
    }
    
    gameManager.addState('menu', MenuState);

})();