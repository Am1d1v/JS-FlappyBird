import Phaser from "phaser";

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload,
    create,
    update
  }
};

// Scene Preload. Loading assets
function preload(){

}

// Scene Create
function create(){

}


new Phaser.Game(config);