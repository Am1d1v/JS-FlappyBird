import Phaser from "phaser";


class BaseScene extends Phaser.Scene{
    constructor(key, config){
        super(key);
        this.config = config;
        this.fontSize = 30;
        this.lineHeight = 45;
        this.fontOptions = {fontSize: `${this.fontSize}px`, fill: '#000'}
        this.screenCenter = [config.width * 0.5, config.height * 0.5];
    };

    // Scene Create
    create(){
    
        // Set Image origin to the scene
        this.add.image(0, 0, 'sky').setOrigin(0);
        
    };

    // Menu
    createMenu(menu, setupmenuEvents){
        let lastMenuPositionY = 0;

        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
            menuItem.textGameObject = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
            lastMenuPositionY += this.lineHeight;

            setupmenuEvents(menuItem);
        });
    };

    
    
};

export default BaseScene;