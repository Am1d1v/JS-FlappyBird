import BaseScene from "./BaseScene";


class PauseScene extends BaseScene{
    constructor(config){
        super('PauseScene', config);

        // Menu items
        this.menu = [
            {scene: 'PlayScene', text: 'Continue'},
            {scene: 'MenuScene', text: 'Exit'},
        ];
    };

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
            if(menuItem.scene && menuItem.text === 'Continue'){
                // Resume the game
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            } else {
                // Exit to Main Menu
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene)
            }
        });
    };

    
}

export default PauseScene;