
window.onload = function() {

  var game = new Phaser.Game(600, 800, Phaser.AUTO, "countdown" );

  game.state.add('Boot', BasicGame.Boot);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('GamePlay', BasicGame.GamePlay);
  game.state.start('Boot');


  // function create() {
  //   countDownText = this.add.text(0, 100, timer, { font: "65px Arial", fill: "#ff0044", align: "center" });

  //   this.scale.pageAlignHorizontally = true;
  //   countDownText.setText("ASS");
  //   centerCountDownText();
  // }

  // function centerCountDownText() {
  //   countDownText.x = (game.width / 2) - (countDownText.width / 2);
  // }


}