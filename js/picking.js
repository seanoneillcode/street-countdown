BasicGame.Picking = function (game) {

    this.letterBox = null;
    this.vowelButton = null;
    this.conButton = null;
    this.smackButton = null;
    this.doneButton = null;
    this.actionHighlight = null;
    this.actionBoxBackground = null;
    this.letters = null;
    this.pickingBackground = null;
    this.speechBubble = null;
    this.speechText = null;
    this.speechTimer = null;
};

BasicGame.Picking.prototype = {

    create: function () {

		this.bg = this.add.sprite(0, 566, 'action-box');
        this.pickingBackground = this.add.sprite(0, 80, 'picking-background');
		this.vowelButton = this.add.button(18, 574, 'vowel', this.addVowel, this, 1, 0, 1);
		this.conButton = this.add.button(306, 574, 'consonant', this.addCons, this, 1, 0, 1);
		this.smackButton = this.add.button(18, 686, 'smack-talk', this.smackTalk, this, 1, 0, 1);
		this.doneButton = this.add.button(306, 686, 'done', this.done, this, 1, 0, 1);

		this.letters = "";
		letterBox = this.add.text(10, 10, "", { font: "60px Arial", fill: "#ffffff" });

        this.speechBubble = this.add.sprite(20, 100, 'speech-bubble');
        this.speechBubble.visible = false;
        this.speechText = this.add.text(60, 140, "", { font: "60px Arial", fill: "#000000" });
        this.speechText.visible = false;

        // titleText = this.add.text(60, 30, "Player Select", { font: "80px Arial", fill: "#ffffff", align: "center" });
        
        // this.add.sprite(0, 150, 'character-background');
        // this.add.sprite(0, 500, 'character-background');
        // playerOneAvatar = this.add.sprite(30, 150, 'avatar');
        // playerTwoAvatar = this.add.sprite(350, 500, 'avatar');
        // characters = ["roy", "word", "prime", "negative one"];
        // playerOneIndex = 3;
        // playerTwoIndex = 0;
        // playerOneHighlight = this.add.sprite(310, 350, 'highlighted-player');
        // playerTwoHighlight = this.add.sprite(10, 360, 'highlighted-player');
        // playerOneAvatarText = this.add.text(280, 200, characters[playerOneIndex], { font: "80px Arial", fill: "#000000", align: "right" });
        // playerTwoAvatarText = this.add.text(80, 550, characters[playerTwoIndex], { font: "80px Arial", fill: "#000000", align: "center" });
        // playerOneSelectionText = this.add.text(350, 440, "P1", { font: "40px Arial", fill: "#000000", align: "center" });
        // playerTwoSelectionText = this.add.text(50, 370, "P2", { font: "40px Arial", fill: "#000000", align: "center" });
        // this.fightButton = this.add.button(280, 720, 'done', this.goFight, this, 1, 0, 1);
        // this.fightButton.input.useHandCursor = true;
    },

    addVowel: function() {
    	if (this.letters.length > 24) {
    		return;
    	}
    	this.letters = this.letters + this.getRandomCharacter("aueio") + " ";
    	letterBox.setText(this.letters);
        this.showAction("vowel", 80);
    },

    addCons: function() {
    	if (this.letters.length > 24) {
    		return;
    	}
    	this.letters = this.letters + this.getRandomCharacter("bcdfghjklmnpqrstvwxyz") + " ";
    	letterBox.setText(this.letters);
        this.showAction("consonant", 60);
    },

    smackTalk: function() {
        var lines = [
        "You fight like a cow",
        "Your odor is an aura",
        "You spell like a fool\n       fool!",
        "Your visage is disturbing",
        "Having difficulty?\nI'll speak monosyllabically",
        "You're the missing link",
        "Stop attempting to think.\nIt's disturbing",
        "Moron",
        "I doubt your masculinity",
        "Stop standing there,\nwasting our oxygen",
        "If you were any dumber,\nyou'd need watering",
        "your IQ wallows,\naround room tempreture",
        "You know, frowning isn't\n thinking.",
        "You're a health\n and safety violation",
        "Go away! I can feel the \nroom's IQ plummeting",
        "Have a banana,\nMonkey man!"];
        var index = Math.floor(Math.random() * lines.length);
        this.showAction(lines[index], 30);
    },

    done: function() {
        clearTimeout(this.speechTimer);
        this.state.start('GamePlay', true, false, this.letters);
    },

    showAction: function(action, size) {
        var self = this;
        this.speechText.setText(action);
        this.speechBubble.visible = true;
        this.speechText.visible = true;
        this.speechText.fontSize = size;
        clearTimeout(this.speechTimer);
        this.speechTimer = setTimeout(function(){
            self.speechBubble.visible = false;
            this.speechText.visible = false;
        }, 1500);
    },

    getRandomCharacter: function(charSet) {
		charSet = charSet || 'abcdefghijklmnopqrstuvwxyz';
	    var randomPoz = Math.floor(Math.random() * charSet.length);
	    randomString = charSet.substring(randomPoz,randomPoz+1);
	    return randomString;
	}
};
