var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        // Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        // Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = false;

        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
        this.scale.pageAlignHorizontally = true;

    },

    preload: function () {

        // Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('background', 'assets/images/background.png');
		this.load.image('new-game', 'assets/images/new-game.png');
        this.load.image('vowel', 'assets/images/vowel.png');
        this.load.image('consonant', 'assets/images/consonant.png');
        this.load.image('done', 'assets/images/done.png');
        this.load.image('fight', 'assets/images/fight.png');

        this.load.text('wordlist', 'wordlist.txt');
    },

    create: function () {

        // By this point the preloader assets have loaded to the cache, we've set the game settings
        // So now let's start the real preloader going
        this.state.start('MainMenu');

    }

};
