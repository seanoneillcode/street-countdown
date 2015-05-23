BasicGame.Countdown = function (game) {
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
};

BasicGame.Countdown.prototype = {

	init: function(letters) {
		this.randomLetters = letters;//"bedlam";
		
	},

	create: function () {
		var self = this;

		var game = this.game;
		var drawnObject;
		var bmd = game.add.bitmapData(600, 80);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, 600, 80);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();
		drawnObject = game.add.sprite(0, 160, bmd);
		drawnObject.anchor.setTo(0, 0);

		countDownText = this.add.text(300, 80, this.randomLetters, { font: "80px Arial", fill: "#ffffff" });
		countDownText.anchor.setTo(0.5, 0.5);

		this.timer = this.game.time.create(false);
	    this.timer.loop(1000, this.updateCounter, this);

		enterText = this.add.text(300, 200, "[start typing]", { font: "60px Arial", fill: "#000000", align: "center" });
		enterText.anchor.setTo(0.5, 0.5);

		this.game.input.keyboard.onDownCallback = function(e) {
			self.keyDown(self, e);
		};
		playerInput = "";
		this.timerValue = 20;
		this.startCountdown();
		words = [];
	},

	keyDown: function(self, e) {
		if (e.keyCode === 13) {
			var rowCount = 6;
			var wordHeight = 50;
			var wordWidth = 200;
			var posy = 10 + (Math.floor(words.length / rowCount) * wordWidth);
			textButton = this.game.add.text(posy, ((words.length % rowCount) * wordHeight) + 480, playerInput, { font: "40px Arial", fill: "#ffffff", align: "center" });
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
		this.timerText = this.add.text(300, 400, "" + this.timerValue, { font: "80px Arial", fill: "#ffffff", align: "center" });
		this.timerText.anchor.setTo(0.5, 0.5);
	    this.timer.start();
	    
	},

	updateCounter: function() {
		var self = this;
		this.timerValue = this.timerValue - 1;
		this.timerText.setText("" + this.timerValue);
		if (this.timerValue === -1) {
			this.state.start('Reckoning', true, false, words);
		}
	},

	getRandomCharacter: function(charSet) {
		charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
	    var randomPoz = Math.floor(Math.random() * charSet.length);
	    randomString = charSet.substring(randomPoz,randomPoz+1);
	    return randomString;
	}
};