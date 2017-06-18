(function () {
    'use strict'; 

    var CreditState = function() {
    };

    CreditState.prototype.preload = function() {
        //this.game.load.image('background', 'assets/spritesheets/tela-instrucoes.png');
        this.game.load.image('back', 'assets/img/voltarButton.png');
        this.game.load.audio('clickSound', 'assets/sounds/click.ogg');
    }  
    
    CreditState.prototype.create = function() {
        var game = this.game;
        
        this.clickSound = this.game.add.sound('clickSound');
        
        var text = this.game.add.text(30, 30, 'Credit Screen\n University of the State of Amazonas\n graduate degree in Electronic Game Development\n Team: MarmotaStudios\n - Fernando Dantas\n - Paulo Matos\n - Jeferson Barros\n - Irlan Gomes\n - Josue Aguiar\n Orientador: Professor Bruno Araujo \n Assets Externos:\n -\n -\n Sounds Credits:\n -\n -\n', 
        { fill: '#ffffff'});
        
        var voltarButton = this.game.add.button(710, 560, 'back', voltarButtonClicked, this);
        voltarButton.anchor.set(0.5);
        
        function voltarButtonClicked() {
            this.clickSound.play();
            this.game.state.start('menu');
        }
        
    }

    gameManager.addState('credits', CreditState);

})();