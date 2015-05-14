BasicGame.GamePlay = function (game) {

	this.vowelButton = null;
	this.conButton = null;
	this.doneButton = null;
	this.countDownText = null;
	this.randomLetters = "";
	this.timer = null;
	this.timerValue = 30;
	this.timerText = null;
	this.game = game;
	this.enterText = null;
	this.state = "enterLetters";
	this.playerInput = null;
	this.words = null;

};

BasicGame.GamePlay.prototype = {

	create: function () {
		var self = this;
	    this.bg = this.add.sprite(0, 0, 'background');
		this.vowelButton = this.add.button(130, 700, 'vowel', this.addVowel, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		this.vowelButton = this.add.button(230, 700, 'consonant', this.addCon, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		this.vowelButton = this.add.button(330, 700, 'done', this.startCountdown, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		countDownText = this.add.text(30, 50, "", { font: "60px Arial", fill: "#ffffff", align: "center" });
		countDownText.setText(this.randomLetters);
		this.timer = this.game.time.create(false);
	    this.timer.loop(1000, this.updateCounter, this);
		this.state = "enterLetters";
		enterText = this.add.text(30, 100, "", { font: "40px Arial", fill: "#ffffff", align: "center" });
		playerInput = "";
		this.game.input.keyboard.onUpCallback = this.keyUp;
		words = [];
		allWords = this.add.text(30, 200, "", { font: "20px Arial", fill: "#ffffff", align: "center" });
		
		console.log(Phaser.Keyboard);
		// Phaser.Keyboard.addKeyCapture(8);
	},

	update: function () {
		countDownText.setText(this.randomLetters);
		enterText.setText(playerInput);
	},

	keyUp: function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 13) {
			words.push(playerInput);
			playerInput = "";
		}
		if (e.keyCode > 64 && e.keyCode < 92) {
			var c = 'abcdefghijklmnopqrstuvwxyz'[e.keyCode - 65];
			playerInput = playerInput + c;
		}
		var allText = "";
		for (var i = 0; i < words.length; i++) {
			allText = allText + " \n " + words[i];
		}
		allWords.setText(allText);
	},

	addWord: function() {

	},

	addVowel: function() {
		if (this.state === "enterLetters") {
			this.randomLetters = this.randomLetters + this.getRandomCharacter("aueio") + " ";
		}
	},

	addCon: function() {
		if (this.state === "enterLetters") {
			this.randomLetters = this.randomLetters + this.getRandomCharacter("bcdfghjklmnpqrstvwxyz") + " ";
		}
	},

	startCountdown: function() {
		this.state = "countingDown";
		this.timerText = this.add.text(30, 440, "" + this.timerValue, { font: "80px Arial", fill: "#ff0000", align: "center" });
	    this.timer.start();
	},

	updateCounter: function() {
		this.timerValue = this.timerValue - 1;
		this.timerText.setText("" + this.timerValue);
		if (this.timerValue === -1) {
			this.timer.destroy();
			this.timerText.setText("");
		}
	},

	getRandomCharacter: function(charSet) {
		charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
	    var randomPoz = Math.floor(Math.random() * charSet.length);
	    randomString = charSet.substring(randomPoz,randomPoz+1);
	    return randomString;
	},

};