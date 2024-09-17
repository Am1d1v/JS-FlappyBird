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
        y: 300,
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
let flapVelocity = 300;

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

  // Flap the bird
  this.input.keyboard.on('keydown-SPACE', flap)
  this.input.on('pointerdown', flap);
}

// Scene update. Application rerendering
function update(time, delta){
  

  // Restart the game if the bird cross Y axis top/bottom borders of the Scene
  if(bird.y > config.height || bird.y < 0){
    console.log(bird.body);
  }
}

// Flap. Move up the bird
function flap(){
  bird.body.velocity.y = -flapVelocity;
}


new Phaser.Game(config);