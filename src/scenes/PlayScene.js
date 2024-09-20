import Phaser from "phaser";


const PIPES_TO_RENDER = 3;


class PlayScene extends Phaser.Scene{
    constructor(config){
        super('PlayScene');

        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.pipeVerticalDistanceRange = [150, 250];
        this.pipeHorizontalDistanceRange = [200, 450];


let pipeHorizontalDistance = 0;
    }

    // Scene Preload. Loading assets
    preload(){
        // Load sky background image
        this.load.image('sky', 'assets/sky.png');

        // Load Bird image
        this.load.image('bird', 'assets/bird.png');

        // Load Pipe image
        this.load.image('pipe', 'assets/pipe.png');
    };

    // Scene Create
    create(){
        // Add Image to the Scene
        this.add.image(0, 0, 'sky').setOrigin(0);

        // Add Bird sprite
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);

        // Bird's gravity
        this.bird.body.gravity.y = 300;

        this.pipes = this.physics.add.group();

        // Pipes generation
        for(let i = 0; i < PIPES_TO_RENDER; i++){
        
          // Add Pipes sprite
          const upperpipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 1);
          const lowerpipe = this.pipes.create(0, 0, 'pipe').setOrigin(0, 0);
        
          this.placePipe(upperpipe, lowerpipe);
        };

        // Pipes X axis velocity
        this.pipes.setVelocityX(-200);
    
        // Flap the bird
        this.input.keyboard.on('keydown-SPACE', this.flap)
        this.input.on('pointerdown', this.flap);
    };

    // Scene update. Application rerendering
    update(){
        // Restart the game if the bird cross Y axis top/bottom borders of the Scene
        if(this.bird.y > this.config.height || this,bird.y < 0){
          restartPlayerPosition();
        }

        this.recyclePipes();
    };

    // Flap. Move up the bird
    flap(){
        this.bird.body.velocity.y = -flapVelocity;
    };

    // Restart player position
    restartPlayerPosition(){
        this.bird.x = initialBirdPosition.x;
        this.bird.y = initialBirdPosition.y;
        this.bird.body.velocity.y = 0;
    };

    // Pipes placing
    placePipe(uPipe, lPipe){
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
    recyclePipes(){
      let pipesArray = [];
    
      this.pipes.getChildren().forEach((pipe) => {
    
        if(pipe.getBounds().right <= 0){
          pipesArray.push(pipe);
          if(pipesArray.length === 2){
            placePipe(...pipesArray);
          }
        }
    
        });
    
    };

    getMostRightPipe(){
        let mostRightX = 0;
      
        pipes.getChildren().forEach((pipe) => {
          mostRightX = Math.max(pipe.x, mostRightX);
        });
      
        return mostRightX;
    };

}

export default PlayScene;