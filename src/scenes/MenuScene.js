import Phaser from "phaser";
import BaseScene from "./BaseScene";


class MenuScene extends BaseScene{
    constructor(config){
        super('MenuScene', config);

        // Menu items
        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: null, text: 'Exit'},
        ];
    };

    // Scene Create
    create(){
        super.create();

        this.createMenu(this.menu, this.setupMenuEvents);
    };

    setupMenuEvents(menuItem){
        const textGameObject = menuItem.textGameObject;
    };

}

export default MenuScene;