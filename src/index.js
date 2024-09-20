import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";


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
  scene: [PlayScene]
};

const VELOCITY = 200;  
const initialBirdPosition = {
  x: config.width * 0.1,
  y: config.height * 0.5
};
const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [200, 450];
const PIPES_TO_RENDER = 3;

let bird;
let pipes = null;
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
  // Bird's gravity
  bird.body.gravity.y = 300;
  
  pipes = this.physics.add.group();

  // Pipes generation
  for(let i = 0; i < PIPES_TO_RENDER; i++){

    // Add Pipes sprite
    const upperpipe = pipes.create(0, 0, 'pipe').setOrigin(0, 1);
    const lowerpipe = pipes.create(0, 0, 'pipe').setOrigin(0, 0);

    placePipe(upperpipe, lowerpipe);
  };
  
  // Pipes X axis velocity
  pipes.setVelocityX(-200);

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

  recyclePipes();
}

// Flap. Move up the bird
function flap(){
  bird.body.velocity.y = -flapVelocity;
};

// Restart player position
function restartPlayerPosition(){
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 0;
};

// Pipes placing
function placePipe(uPipe, lPipe){
    const mostRightX = getMostRightPipe();
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 + 20, config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange); 

    uPipe.x = mostRightX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
};

// Pipes Recycling
function recyclePipes(){
  let pipesArray = [];

  pipes.getChildren().forEach((pipe) => {

    if(pipe.getBounds().right <= 0){
      pipesArray.push(pipe);
      if(pipesArray.length === 2){
        placePipe(...pipesArray);
      }
    }

  });

};

function getMostRightPipe(){
  let mostRightX = 0;

  pipes.getChildren().forEach((pipe) => {
    mostRightX = Math.max(pipe.x, mostRightX);
  });

  return mostRightX;
}


new Phaser.Game(config);