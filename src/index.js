import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {
  x: WIDTH * 0.1,
  y: HEIGHT * 0.5 
};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
};

// Game Configuration
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

const VELOCITY = 200;  
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height * 0.5
}

let flapVelocity = 300;





new Phaser.Game(config);