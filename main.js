import GamePlay from './scenes/game.js'
import Menu from './scenes/menu.js'
import Splash from './scenes/splash.js'
import GameOver from './scenes/gameOver.js'
import Achivments from './scenes/achivments.js'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    firstLoad: true,
    scene: [Splash, Menu, GamePlay, GameOver, Achivments],
    scale: {
        parent: 'mygame',
        width: 800,
        height: 450
  },
  powerPreference:"high-performance"
};

const game = new Phaser.Game(config);




