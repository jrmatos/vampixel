(function () {
    'use strict'; 

    var MenuState = function() {
    };

    MenuState.prototype.preload = function() {
        this.onMenu = true;
<<<<<<< HEAD
        this.game.load.image('start', 'assets/img/startButton.png');
        this.game.load.image('credits', 'assets/img/creditButton.png');
        this.game.load.image('backgroundMenu', 'assets/img/bgMenu.png');
        this.game.load.audio('environment', 'assets/sounds/gameSoundMenu.ogg');
        this.game.load.audio('clickSound', 'assets/sounds/click.ogg');
=======
        this.game.load.image('background', 'assets/img/LOGO_SPLASH.png');
        this.game.load.image('start', 'assets/img/start1.png');
        this.game.load.audio('environment', 'assets/audio/environment.ogg');
        this.game.load.audio('clickSound', 'assets/audio/click.ogg');
>>>>>>> c3c1bddaf0ce6dacaf75cad971476571d3fd4a56
    }   
    
    MenuState.prototype.create = function() {
        
        this.game.add.tileSprite(0, 0, 800, 600, 'background');
        
        this.clickSound = this.game.add.audio('clickSound');
        
        this.environmentSound = this.game.add.audio('environment');
        this.environmentSound.loop = true;
        this.environmentSound.play();
        
        this.onMenu = true;
        
<<<<<<< HEAD
        this.bgMenu = this.game.add.tileSprite(0, 0, 800, 600, 'backgroundMenu');

        var buttonStart = this.game.add.button(this.game.world.centerX, this.game.world.centerY +130, 'start', clickedStart, this);
        buttonStart.anchor.set(0.5);

        var buttonCredits = this.game.add.button(95, 560, 'credits', clickedCredits, this);
        buttonCredits.anchor.set(0.5);
=======
        //var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, 'Vampixel', { fill: '#ffffff', align: 'center', fontSize: 80 });
        //text.anchor.set(0.5);

        var button = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 150, 'start', clicked, this);
        button.anchor.set(0.5);
>>>>>>> c3c1bddaf0ce6dacaf75cad971476571d3fd4a56

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