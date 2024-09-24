import Phaser from "phaser";
import BaseScene from "./BaseScene";


class MenuScene extends BaseScene{
    constructor(config){
        super('MenuScene', config);
    };

    // Scene Create
    create(){
        super.create();
        
        // Launch Play Scene
        setTimeout(() => {
            this.scene.start('PlayScene')
        }, 1500);
    };

}

export default MenuScene;