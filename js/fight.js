BasicGame.Fight = function (game) {

	this.countDownText = null;
	this.randomLetters = "";
	this.timer = null;
	this.timerValue = 10;
	this.timerText = null;
	this.game = game;
	this.enterText = null;
	this.internalState = "enterLetters";
	this.playerInput = null;
	this.word = null;
	this.fightWord = null;
	this.choochooButton = null;
	this.dictionary = null;
	this.dramatic = null;
	this.wordText = null;
};

BasicGame.Fight.prototype = {

	init: function(chosenWord) {
		this.word = chosenWord;
	},

	create: function () {
		var self = this;

		var game = this.game;
		var drawnObject;
		var bmd = game.add.bitmapData(600, 600);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 600, 600);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();
		drawnObject = game.add.sprite(0, 100, bmd);
		drawnObject.anchor.setTo(0, 0);

		this.dramatic = this.add.sprite(300, 340, 'dramatic');

		var drawnObject2;
		var bmd2 = game.add.bitmapData(500, 240);
		bmd2.ctx.beginPath();
		bmd2.ctx.rect(0, 0, 500, 240);
		bmd2.ctx.fillStyle = '#000000';
		bmd2.ctx.fill();
		drawnObject2 = game.add.sprite(50, 140, bmd2);
		drawnObject2.anchor.setTo(0, 0);

		this.wordText = this.add.text(300, 250, this.word, { font: "80px Arial", fill: "#ffffff", align: "center" });
		this.wordText.anchor.setTo(0.5, 0.5)

		var text = this.game.cache.getText('wordlist');
		if (!text) {
			console.log("failed to load dictionry file");
		}

		var values = text.split(";");
		this.dictionary = {};
		values.forEach(function(value) {
			self.dictionary[value] = true;
		});

		this.timer = this.game.time.create(false);
	    this.timer.loop(2000, this.fightWithWord, this);
	    this.timer.start();
	},

	fightWithWord: function() {
		var resultText = "YOU LOSE";
		if (this.dictionary.hasOwnProperty(this.word)) {
			console.log("Dictionary found word");
			resultText = "YOU WIN";
		}
		this.resultText = this.add.text(100, 700, resultText, { font: "80px Arial", fill: "#ffffff", align: "center" });
		this.timer = this.game.time.create(false);
	    this.timer.loop(2000, this.backToMainMenu, this);
	    this.timer.start();
	},

	backToMainMenu: function() {
		this.state.start('MainMenu',true,false);
	}

};