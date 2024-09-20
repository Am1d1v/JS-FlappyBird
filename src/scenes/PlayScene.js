import Phaser from "phaser";


class PlayScene extends Phaser.Scene{
    constructor(config){
        super('PlayScene');

        this.config = config;
        this.bird = null;
    }

    preload(){
        // Load sky background image
        this.load.image('sky', 'assets/sky.png');

        // Load Bird image
        this.load.image('bird', 'assets/bird.png');
    }

    create(){
        // Add Image to the Scene
        this.add.image(0, 0, 'sky').setOrigin(0);

        // Add Bird sprite
        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);

        // Bird's gravity
        this.bird.body.gravity.y = 300;
    }

    update(){

    }
}

export default PlayScene;