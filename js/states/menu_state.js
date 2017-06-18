(function () {
    'use strict'; 

    var MenuState = function() {
    };

    MenuState.prototype.preload = function() {
        this.onMenu = true;
        this.game.load.image('start', 'assets/img/startButton.png');
        this.game.load.image('credits', 'assets/img/creditButton.png');
        this.game.load.image('backgroundMenu', 'assets/img/bgMenu.png');
        this.game.load.audio('environment', 'assets/sounds/gameSoundMenu.ogg');
        this.game.load.audio('clickSound', 'assets/sounds/click.ogg');
    }   
    
    MenuState.prototype.create = function() {
        
        this.clickSound = this.game.add.audio('clickSound');
        
        this.environmentSound = this.game.add.audio('environment');
        this.environmentSound.loop = true;
        this.environmentSound.play();
        
        this.onMenu = true;
        
        this.bgMenu = this.game.add.tileSprite(0, 0, 800, 600, 'backgroundMenu');

        var buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY +130, 'start', clickedStart, this);
        buttonStart.anchor.set(0.5);

        var buttonCredits = this.game.add.button(95, 560, 'credits', clickedCredits, this);
        buttonCredits.anchor.set(0.5);

        function clickedStart() {
            this.clickSound.play();
            this.environmentSound.stop();
            this.game.state.start('game');
        }  
        
        function clickedCredits() {
            this.clickSound.play();
            this.environmentSound.stop();
            this.game.state.start('credits');
        }  
    }
    
    MenuState.prototype.update = function() {
    }  
    
    gameManager.addState('menu', MenuState);

})();