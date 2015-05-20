
BasicGame.CharacterSelect = function (game) {

    this.titleText = null;
    this.playerOneAvatar = null;
    this.playerTwoAvatar = null;
    this.characters = null;
    this.playerOneIndex = 0;
    this.playerTwoIndex = 0;
    this.playerOneHighlight = null;
    this.playerTwoHighlight = null;
    this.playerOneAvatarText = null;
    this.playerTwoAvatarText = null;
    this.playerTwoSelectionText = null;
    this.playerOneSelectionText = null;
};

BasicGame.CharacterSelect.prototype = {

    create: function () {
        var self = this;
        this.add.button(10, 360, 'avatar-sml', function() {
            self.selectPlayer(0);
        }, this, 1, 0, 1);
        this.add.button(160, 360, 'avatar-sml', function() {
            self.selectPlayer(1);
        }, this, 1, 0, 1);
        this.add.button(310, 360, 'avatar-sml', function() {
            self.selectPlayer(2);
        }, this, 1, 0, 1);
        this.add.button(460, 360, 'avatar-sml', function() {
            self.selectPlayer(3);
        }, this, 1, 0, 1);

        titleText = this.add.text(60, 30, "Player Select", { font: "80px Arial", fill: "#ffffff", align: "center" });
        
        this.add.sprite(0, 150, 'character-background');
        this.add.sprite(0, 500, 'character-background');
        playerOneAvatar = this.add.sprite(30, 150, 'avatar');
        playerTwoAvatar = this.add.sprite(350, 500, 'avatar');
        characters = ["roy", "word", "prime", "negative one"];
        playerOneIndex = 2;
        playerTwoIndex = 0;
        playerOneHighlight = this.add.sprite(310, 350, 'highlighted-player');
        playerTwoHighlight = this.add.sprite(10, 360, 'highlighted-player');
        playerOneAvatarText = this.add.text(280, 200, characters[playerOneIndex], { font: "80px Arial", fill: "#000000", align: "right" });
        playerTwoAvatarText = this.add.text(80, 550, characters[playerTwoIndex], { font: "80px Arial", fill: "#000000", align: "center" });
        playerOneSelectionText = this.add.text(350, 440, "P1", { font: "40px Arial", fill: "#000000", align: "center" });
        playerTwoSelectionText = this.add.text(50, 370, "P2", { font: "40px Arial", fill: "#000000", align: "center" });
        this.fightButton = this.add.button(280, 720, 'done', this.goFight, this, 1, 0, 1);
        this.fightButton.input.useHandCursor = true;
    },

    goFight: function() {
        this.state.start('Picking',true,false);
    },

    selectPlayer: function(index) {
        playerOneIndex = index;
        playerOneHighlight.position.x = 10 + (index * 150);
        playerOneSelectionText.position.x = 50 + (index * 150);
        playerOneAvatarText.setText(characters[playerOneIndex]);
    }
};
