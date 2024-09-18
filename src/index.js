import Phaser from "phaser";

// Game Configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
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
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height * 0.5
};
const pipeVerticalDistanceRange = [150, 250];
const PIPES_TO_RENDER = 4;

let bird;
let upperpipe;
let lowerpipe;
let flapVelocity = 300;
let pipeHorizontalDistance = 0;


// Scene Preload. Loading assets
function preload(){
  // Load sky background image
  this.load.image('sky', 'assets/sky.png');

  // Load Bird image
  this.load.image('bird', 'assets/bird.png');

  // Load Pipe image
  this.load.image('pipe', 'assets/pipe.png')
}

// Scene Create
function create(){
  // Add Image to the Scene
  this.add.image(0, 0, 'sky').setOrigin(0);

  // Add Bird sprite
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 300;
  
  // Pipes generation
  for(let i = 0; i < PIPES_TO_RENDER; i++){

    pipeHorizontalDistance += 300;
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

    // Add Pipes sprite
    upperpipe = this.add.sprite(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0, 1);
    lowerpipe = this.add.sprite(pipeHorizontalDistance, upperpipe.y + pipeVerticalDistance, 'pipe').setOrigin(0, 0);
  }
  

  // Flap the bird
  this.input.keyboard.on('keydown-SPACE', flap)
  this.input.on('pointerdown', flap);

}

// Scene update. Application rerendering
function update(time, delta){
  

  // Restart the game if the bird cross Y axis top/bottom borders of the Scene
  if(bird.y > config.height || bird.y < 0){
    restartPlayerPosition();
  }
}

// Flap. Move up the bird
function flap(){
  bird.body.velocity.y = -flapVelocity;
}

// Restart player position
function restartPlayerPosition(){
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
}


new Phaser.Game(config);