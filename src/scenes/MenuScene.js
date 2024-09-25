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
            menuItem.scene === null ? alert('Exit') : console.log('Scene');
        });
    };

}

export default MenuScene;