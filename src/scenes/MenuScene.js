import Phaser from "phaser";


class MenuScene extends Phaser.Scene{
    constructor(config){
        super('MenuScene');
        this.config = config;
    };

    // Scene Preload. Loading assets
    preload(){
        // Load sky background image
        this.load.image('sky', 'assets/sky.png');
    };

    // Scene Create
    create(){
        this.createBackground();
        
        // Launch Play Scene
        setTimeout(() => {
            this.scene.start('PlayScene')
        }, 1500);
    };

    // Set Image origin to the scene
    createBackground(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    };
}

export default MenuScene;