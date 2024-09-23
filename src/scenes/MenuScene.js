import Phaser from "phaser";


class MenuScene extends Phaser.Scene{


    // Scene Preload. Loading assets
    preload(){
        // Load sky background image
        this.load.image('sky', 'assets/sky.png');
    };

    // Scene Create
    create(){
        this.createBackground();
    };

    // Set Image origin to the scene
    createBackground(){
        this.add.image(0, 0, 'sky').setOrigin(0);
    };
}

export default MenuScene;