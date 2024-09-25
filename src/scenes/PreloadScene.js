import Phaser from "phaser";

class PreloadScene extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    };

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

        // Load Back Button Image
        this.load.image('back', 'assets/back.png');
    };

    // Scene Create
    create(){
        this.scene.start('MenuScene');
    };

}

export default PreloadScene;