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

        this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    };

    setupMenuEvents(menuItem){
        const textGameObject = menuItem.textGameObject;
        textGameObject.setInteractive();

        // Make menu text white on mouse hover
        textGameObject.on('pointerover', () => {
            textGameObject.setStyle({fill: '#fff'});
        });

        // Make menu text black on mouse out of text
        textGameObject.on('pointerout', () => {
            textGameObject.setStyle({fill: '#000'});
        });

        // Select Menu option on click & release pointer
        textGameObject.on('pointerup', () => {
            // Launch specific scene
            menuItem.scene && this.scene.start(menuItem.scene);
            
            // Exit game. Clear canvas
            if(menuItem.text === 'Exit'){
                this.game.destroy(true);
            }
        });
    };

}

export default MenuScene;