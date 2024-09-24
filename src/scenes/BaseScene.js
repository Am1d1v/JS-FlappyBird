import Phaser from "phaser";


class BaseScene extends Phaser.Scene{
    constructor(key, config){
        super(key);
        this.config = config;
        this.screenCenter = [config.width * 0.5, config.height * 0.5];
    };

    // Scene Create
    create(){
    
        // Set Image origin to the scene
        this.add.image(0, 0, 'sky').setOrigin(0);
        
    };

    // Menu
    createMenu(menu){
        menu.forEach(menuItem => {
            const menuPosition = [...this.screenCenter];
            this.add.text(...menuPosition, menuItem.text, {fontSize: '30px', fill: '#000'})
        });
    };

    
    
};

export default BaseScene;