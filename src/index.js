import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";


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

// Array of scenes
const SCENES = [PreloadScene, MenuScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG);

// Scenes initialization
const initScenes = () => SCENES.map(createScene);

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
  scene: initScenes()
};



new Phaser.Game(config);