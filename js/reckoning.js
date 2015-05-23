BasicGame.Reckoning = function (game) {

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
	this.thoughtful = null;
};

BasicGame.Reckoning.prototype = {

	init: function(chosenWords) {
		this.words = chosenWords;//["all","about","myself","all","fgdfg","myself","all","about","myself","all","about","myself"];
	},

	create: function () {
		var self = this;

		var game = this.game;
		var drawnObject;
		var bmd = game.add.bitmapData(500, 500);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 500, 500);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();
		drawnObject = game.add.sprite(20, 100, bmd);
		drawnObject.anchor.setTo(0, 0);

		this.thoughtful = this.add.sprite(80, 600, 'thoughtful');

		this.chooseText = this.add.text(40, 20, "Choose your answer", { font: "40px Arial", fill: "#ffffff", align: "center" });
		this.internalState = "chooseWord";
		this.choochooButton = this.add.button(400, 700, 'fight', this.fightWithWord, this, 1, 0, 1);
		this.choochooButton.input.useHandCursor = true;

		var text = this.game.cache.getText('wordlist');
		var values = text.split("\r\n");
		this.dictionary = {};
		values.forEach(function(value) {
			self.dictionary[value] = true;
		});

		this.words.forEach(function(word, index) {
			self.addWord(word, index);
		});		
	},

	addWord: function(word, index) {
		var self = this;
		var rowCount = 8;
		var wordHeight = 60;
		var wordWidth = 250;
		var posy = 30 + (Math.floor(index / rowCount) * wordWidth);
		textButton = this.game.add.text(posy, ((index % rowCount) * wordHeight) + 100, word, { font: "50px Arial", fill: "#000000", align: "center" });
	    textButton.anchor.setTo(0, 0);
	    textButton.inputEnabled = true;
	    var thisText = word;
	    //This event is fired on click on text event # 2
	    textButton.events.onInputDown.add(function(){
	    	self.selectWord(thisText);
	    }, this, 2);
	},

	selectWord: function(text) {
		this.chooseText.setText(text);
		this.fightWord = text;
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
	}

};