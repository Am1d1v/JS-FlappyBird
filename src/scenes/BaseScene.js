import Phaser from "phaser";


class BaseScene extends Phaser.Scene{
    constructor(key, config){
        super(key);
        this.config = config;
    };

    // Scene Create
    create(){
    
        // Set Image origin to the scene
        this.add.image(0, 0, 'sky').setOrigin(0);
        
    };

    
    
}

export default BaseScene;