import Phaser from "phaser";

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload,
    create,
  }
};

// Scene Preload. Loading assets
function preload(){
  this.load.image('sky', 'assets/sky.png');
}

// Scene Create
function create(){
  // Add Image to the Scene
  this.add.image(config.width * 0.5, config.height * 0.5, 'sky');
}


new Phaser.Game(config);