import GamePlay from './scenes/gamePlay.js'
import Menu from './scenes/menu.js'
import Splash from './scenes/splash.js'
import GameOver from './scenes/gameOver.js'
import Achivments from './scenes/achivments.js'
import ViewRange from './scenes/viewRange.js'
import ChooseGun from './scenes/chooseGun.js'
import GameEnd from './scenes/gameEnd.js'

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
    scene: [Splash, Menu, GamePlay, GameOver, ViewRange, ChooseGun, GameEnd],
    scale: {
        parent: 'mygame',
        width: 800,
        height: 450
  },
  dom: {
        createContainer: true
    },
  powerPreference:"high-performance"
};

const game = new Phaser.Game(config);




