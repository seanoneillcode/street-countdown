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
	this.state = "enterLetters";
};

BasicGame.GamePlay.prototype = {

	create: function () {
	    this.bg = this.add.sprite(0, 0, 'background');
		this.vowelButton = this.add.button(30, 30, 'vowel', this.addVowel, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		this.vowelButton = this.add.button(130, 30, 'consonant', this.addCon, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		this.vowelButton = this.add.button(230, 30, 'done', this.startCountdown, this, 1, 0, 1);
		this.vowelButton.input.useHandCursor = true;
		countDownText = this.add.text(30, 140, "", { font: "50px Arial", fill: "#ffffff", align: "center" });
		countDownText.setText(this.randomLetters);
		this.timer = this.game.time.create(false);
	    this.timer.loop(1000, this.updateCounter, this);
		this.state = "enterLetters";
	},

	update: function () {
		countDownText.setText(this.randomLetters);
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
		this.timerText = this.add.text(30, 340, "" + this.timerValue, { font: "80px Arial", fill: "#ff0000", align: "center" });
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