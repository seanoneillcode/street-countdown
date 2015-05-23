
window.onload = function() {

  var game = new Phaser.Game(600, 800, Phaser.AUTO, "countdown" );

  game.state.add('Boot', BasicGame.Boot);
  game.state.add('MainMenu', BasicGame.MainMenu);
  game.state.add('CharacterSelect', BasicGame.CharacterSelect);
  game.state.add('Picking', BasicGame.Picking);
  game.state.add('Fight', BasicGame.Fight);
  game.state.add('Reckoning', BasicGame.Reckoning);
  game.state.add('Countdown', BasicGame.Countdown);
  game.state.add('GamePlay', BasicGame.GamePlay);
  game.state.start('Boot');

}