BasicGame.MainMenu = function (game) {

	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

		// this.add.sprite(0, 0, 'titlepage');

		// Add Main Menu Graphics
	    		
	    //this.bg = this.add.sprite(0, 0, 'background');

	    // Add "Click here to Play" Button
		countDownText = this.add.text(0, 0, "test", { font: "65px Arial", fill: "#ffffff", align: "center" });
		countDownText.setText("STREET \nCOUNTDOWN");

		this.playButton = this.add.button(100, 300, 'new-game', this.startGame, this, 1, 0, 1);
		this.playButton.input.useHandCursor = true;

	},

	update: function () {

	},

	startGame: function (pointer) {
		
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();

		// And start the actual game
		this.state.start('GamePlay',true,false);

	}

};