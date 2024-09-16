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
        //y: 20,
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
  bird.body.velocity.x = VELOCITY;
}

// Scene update. Application rerendering
function update(time, delta){

  totalDelta += delta;

  if(totalDelta >= 1000){
    //console.log(bird.body.velocity.y);

    // Reset totalDelta value to 0 after 1 second
    totalDelta = 0;
  };

  // If bird X position is same or larger than width of canvas change bird X axis movement direction
  // If bird X position is smaller or equal to zero change bird X axis movement direction
  if(bird.x >= config.width - bird.width){
    bird.body.velocity.x = -VELOCITY;
  } else if(bird.x <= 0){
    bird.body.velocity.x = VELOCITY;
  };

  
  
}


new Phaser.Game(config);