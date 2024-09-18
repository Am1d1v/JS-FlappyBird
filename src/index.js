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
const pipeHorizontalDistanceRange = [100, 450];
const PIPES_TO_RENDER = 3;

let bird;
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

    // Add Pipes sprite
    const upperpipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 1);
    const lowerpipe = this.physics.add.sprite(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperpipe, lowerpipe);
  };
  

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

// Pipes placing
function placePipe(uPipe, lPipe){
    pipeHorizontalDistance += Phaser.Math.Between(...pipeHorizontalDistanceRange);
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);

    uPipe.x = pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

    // Pipes X axis velocity
    uPipe.body.velocity.x = -100;
    lPipe.body.velocity.x = -100;
}


new Phaser.Game(config);