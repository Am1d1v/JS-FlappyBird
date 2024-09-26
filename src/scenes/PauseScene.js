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
    }

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
            console.log('Pause');
        });
    };

    
}

export default PauseScene;