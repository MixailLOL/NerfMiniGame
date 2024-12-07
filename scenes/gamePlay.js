class GamePlay extends Phaser.Scene {
    constructor() {
      super("GamePlay");
    }
    create(){

        let background = this.add.image(0, 0 ,'bg').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(275, 30, "tap the targets to shoot as many as you can within the time limit!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '20pt'}).setOrigin(0, 0);
    }

    update() {

    }
}

export default GamePlay