BasicGame.Countdown = function (game) {
	this.countDownText = null;
	this.randomLetters = "";
	this.timer = null;
	this.timerValue = 10;
	this.timerText = null;
	this.game = game;
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
		// var drawnObject;
		// var bmd = game.add.bitmapData(600, 80);
		// bmd.ctx.beginPath();
		// bmd.ctx.rect(0, 0, 600, 80);
		// bmd.ctx.fillStyle = '#ffffff';
		// bmd.ctx.fill();
		// drawnObject = game.add.sprite(0, 160, bmd);
		// drawnObject.anchor.setTo(0, 0);

		countDownText = this.add.text(300, 80, this.randomLetters, { font: "80px Arial", fill: "#ffffff" });
		countDownText.anchor.setTo(0.5, 0.5);

		this.timer = this.game.time.create(false);
	    this.timer.loop(1000, this.updateCounter, this);

		playerInput = "";
		this.timerValue = 30;
		this.startCountdown();
		words = [];

		var inputElement = $("#input-box")[0];
		inputElement.style.display = "block";
		var height = $(window).height();
		var width = $(window).width();
		inputElement.style.left = "" + ((width / 2) - 300) + "px";
		inputElement.style.top = "170px";
		inputElement.focus();
		$('input').on('keyup', function(event) {
			if (event.keyCode === 13) {
				self.addWord(event.currentTarget.value);
				event.currentTarget.value = "";
			}
		});
	},

	addWord: function(text) {
		var rowCount = 6;
		var wordHeight = 50;
		var wordWidth = 200;
		var posy = 10 + (Math.floor(words.length / rowCount) * wordWidth);
		textButton = this.game.add.text(posy, ((words.length % rowCount) * wordHeight) + 480, text, { font: "40px Arial", fill: "#ffffff", align: "center" });
	    textButton.anchor.setTo(0, 0);
	    textButton.inputEnabled = true;
	    var thisText = text;
	    //This event is fired on click on text event # 2
	    textButton.events.onInputDown.add(function(){
	    	self.selectWord(thisText);
	    }, this, 2);
		words.push(text);
		
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
			var inputElement = $("#input-box")[0];
			inputElement.style.display = "none";
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