import Phaser from "phaser";

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const VELOCITY = 200;  

let bird;
let totalDelta = null;

// Scene Preload. Loading assets
function preload(){
  // Load sky background image
  this.load.image('sky', 'assets/sky.png');

  // Load Bird image
  this.load.image('bird', 'assets/bird.png');
}

// Scene Create
function create(){
  // Add Image to the Scene
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  // Add Bird sprite
  bird = this.physics.add.sprite(config.width * 0.1, config.height * 0.5, 'bird').setOrigin(0);

  this.input.keyboard.on('keydown-SPACE', () => {
    console.log('W');
  })

  this.input.on('pointerdown', () => {
    console.log('click');
  });
}

// Scene update. Application rerendering
function update(time, delta){
  
  
}


new Phaser.Game(config);