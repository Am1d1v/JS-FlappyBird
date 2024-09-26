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
        
    }
}

export default PauseScene;