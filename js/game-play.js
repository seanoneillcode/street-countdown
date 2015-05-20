BasicGame.GamePlay = function (game) {

	this.countDownText = null;
	this.randomLetters = "";
	this.timer = null;
	this.timerValue = 10;
	this.timerText = null;
	this.game = game;
	this.enterText = null;
	this.internalState = "enterLetters";
	this.playerInput = null;
	this.words = null;
	this.fightWord = null;
	this.choochooButton = null;
	this.dictionary = null;
};

BasicGame.GamePlay.prototype = {

	init: function(letters) {
		this.randomLetters = letters;
		
	},

	create: function () {
		var self = this;
	    this.bg = this.add.sprite(0, 0, 'background');
		countDownText = this.add.text(10, 10, "", { font: "60px Arial", fill: "#ffffff" });
		this.timer = this.game.time.create(false);
	    this.timer.loop(1000, this.updateCounter, this);
		this.internalState = "enterLetters";
		enterText = this.add.text(10, 100, "", { font: "40px Arial", fill: "#ffffff", align: "center" });
		playerInput = "";
		this.timerValue = 20;
		countDownText.setText(this.randomLetters);
		words = [];
		var text = this.game.cache.getText('wordlist');
		var values = text.split("\r\n");
		this.dictionary = {};
		values.forEach(function(value) {
			self.dictionary[value] = true;
		});
		this.startCountdown();
	},

	update: function () {
		
	},

	selectWord: function(text) {
		if (this.internalState === "chooseWord") {
			this.chooseText.setText(text);
			this.fightWord = text;
		}
	},

	keyUp: function(self, e) {
		if (this.internalState != "countingDown") {
			return;
		}
		// console.log(arguments);
		if (e.keyCode === 13) {
			textButton = this.game.add.text(10, (words.length * 40) + 200, playerInput, { font: "20px Arial", fill: "#ffffff", align: "center" });
		    textButton.anchor.setTo(0, 0);
		    textButton.inputEnabled = true;
		    var thisText = playerInput;
		    //This event is fired on click on text event # 2
		    textButton.events.onInputDown.add(function(){
		    	self.selectWord(thisText);
		    }, this, 2);
			words.push(playerInput);
			playerInput = "";
		}
		if (e.keyCode > 64 && e.keyCode < 92) {
			var c = 'abcdefghijklmnopqrstuvwxyz'[e.keyCode - 65];
			playerInput = playerInput + c;
		}
		enterText.setText(playerInput);
	},

	startCountdown: function() {
		var self = this;
		this.internalState = "countingDown";
		this.timerText = this.add.text(300, 400, "" + this.timerValue, { font: "80px Arial", fill: "#ffffff", align: "center" });
	    this.timer.start();
	    this.game.input.keyboard.onUpCallback = function(e) {
			self.keyUp(self, e);
		};
	},

	updateCounter: function() {
		var self = this;
		this.timerValue = this.timerValue - 1;
		this.timerText.setText("" + this.timerValue);
		if (this.timerValue === -1) {
			this.timer.destroy();
			this.timerText.destroy();
			this.chooseText = this.add.text(200, 450, "Choose your answer", { font: "40px Arial", fill: "#ffffff", align: "center" });
			this.internalState = "chooseWord";
			this.choochooButton = this.add.button(300, 500, 'fight', this.fightWithWord, this, 1, 0, 1);
			this.choochooButton.input.useHandCursor = true;
		}
	},

	fightWithWord: function() {
		var resultText = "YOU LOSE";
		if (this.dictionary.hasOwnProperty(this.fightWord)) {
			console.log("AWW YESSS");
			resultText = "YOU WIN";
		}
		this.resultText = this.add.text(10, 700, resultText, { font: "80px Arial", fill: "#ffffff", align: "center" });
		this.timer = this.game.time.create(false);
	    this.timer.loop(2000, this.backToMainMenu, this);
	    this.timer.start();
	},

	backToMainMenu: function() {
		this.state.start('MainMenu',true,false);
	},

	getRandomCharacter: function(charSet) {
		charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
	    var randomPoz = Math.floor(Math.random() * charSet.length);
	    randomString = charSet.substring(randomPoz,randomPoz+1);
	    return randomString;
	},

};