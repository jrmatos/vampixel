(function () {
    'use strict'; 

    var MenuState = function() {
    };

    MenuState.prototype.preload = function() {
        this.onMenu = true;
        this.game.load.image('start', 'assets/img/start1.png');
        // this.game.load.audio('environment', 'assets/audio/environment.wav');
    }   
    
    MenuState.prototype.create = function() {
        
        // this.environmentSound = this.game.add.audio('environment');
        // this.environmentSound.play();
        
        this.onMenu = true;
        
        var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, 'Vampixel', { fill: '#ffffff', align: 'center', fontSize: 80 });
        text.anchor.set(0.5);

        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'start', clicked, this);
        button.anchor.set(0.5);

        function clicked() {
            // this.environmentSound.pause();
            this.game.state.start('game');
        }  
    }
    
    MenuState.prototype.update = function() {
    }  
    
    gameManager.addState('menu', MenuState);

})();