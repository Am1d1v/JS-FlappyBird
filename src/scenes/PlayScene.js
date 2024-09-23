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
        this.pipeHorizontalDistance = 0;
        this.flapVelocity = 300;

        this.score = 0;
        this.scoreText = '';
    }

    // Scene Preload. Loading assets
    preload(){
        // Load sky background image
        this.load.image('sky', 'assets/sky.png');

        // Load Bird image
        this.load.image('bird', 'assets/bird.png');

        // Load Pipe image
        this.load.image('pipe', 'assets/pipe.png');

        // Load Pause Image
        this.load.image('pause', 'assets/pause.png');
    };

    // Scene Create
    create(){
        this.createBackground();
        this.createBird();
        this.createPipes();
        this.createColliders();
        this.createScore();
        this.pauseBotton();
        this.handleInputs();
    };

    // Scene update. Application rerendering
    update(){
        this.checkGameStatus();

        this.recyclePipes();
    };

    // Set Image origin to the scene
    createBackground(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    };

    // Add Bird position
    createBird(){
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);

        // Bird's gravity
        this.bird.body.gravity.y = 600;

        // Canvas borders.
        this.bird.setCollideWorldBounds(true);
    };

    // Set pipe group
    createPipes(){
        this.pipes = this.physics.add.group();

         // Pipes generation
         for(let i = 0; i < PIPES_TO_RENDER; i++){
        
            // Add Pipes sprite
            const upperpipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(1)
                .setOrigin(0, 1);
            const lowerpipe = this.pipes.create(0, 0, 'pipe')
                .setImmovable(1)
                .setOrigin(0, 0);
          
            this.placePipe(upperpipe, lowerpipe);
          };
  
        // Pipes X axis velocity
        this.pipes.setVelocityX(-200);
        console.log(this.pipes);
    };

    // Inputs
    handleInputs(){
        // Make bird flap on Slace Bar
        this.input.keyboard.on('keydown-SPACE', this.flap, this);
        // Make Bird flap on left mouse click
        this.input.on('pointerdown', this.flap, this);
    };

    checkGameStatus(){
        // Restart the game if the bird cross Y axis top/bottom borders of the Scene
        if(this.bird.getBounds().bottom >= this.config.height || this.bird.getBounds().top <= 0){
            this.gameOver();
          }
    };

    // Pipes collion
    createColliders(){
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    // Player's game score. Increases after successfully pipe walkthrough
    createScore(){
        this.score = 0;
        this.bestScore = localStorage.getItem('bestScore');

        // Score setting
        this.scoreText = this.add.text(15, 15, `Score: ${this.score}`, {fontSize: '30px', fill: 'black'});
        this.add.text(15, 45, `Score: ${this.bestScore || 0}`, {fontSize: '18px', fill: 'black'});
    }

    // Pause Botton
    pauseBotton(){
        this.add.image(this.config.width - 20, this.config.height - 20, 'pause');
    }

    // Flap. Move up the bird
    flap(){
        this.bird.body.velocity.y = -this.flapVelocity;
    };

    // Increase score
    increaseScore(){
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`)
    };

    setBestScore(){
        const bestScoreText = localStorage.getItem('bestScore');
        const bestScoreNumber = bestScoreText && parseInt(bestScoreText, 10);


        if(!this.bestScore || this.score > bestScoreNumber){
            localStorage.setItem('bestScore', this.score);
        }
    }

    // Restart player position
    gameOver(){
        // this.bird.x = this.config.startPosition.x;
        // this.bird.y = this.config.startPosition.y;
        // this.bird.body.velocity.y = 0;

        // Freeze all objects
        this.physics.pause();

        
        this.setBestScore();

        // Change bird's color
        this.bird.setTint(0xe317c1);

        // Restart the game after N delay
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        });
    };

    // Pipes placing
    placePipe(uPipe, lPipe){
        const mostRightX = this.getMostRightPipe();
        let pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        let pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange); 

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
            this.placePipe(...pipesArray);

            // Increase player's score
            this.increaseScore();
          }
        }
    
        });
    
    };

    getMostRightPipe(){
        let mostRightX = 0;
      
        this.pipes.getChildren().forEach((pipe) => {
          mostRightX = Math.max(pipe.x, mostRightX);
        });
      
        return mostRightX;
    };

}

export default PlayScene;