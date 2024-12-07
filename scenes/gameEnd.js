import GunDesc from '../system/gunsDescryption.js'

class GameEnd extends Phaser.Scene {
    constructor() {
      super("GameEnd");
    }
    create(){
        let background = this.add.image(0, 0 ,'bgStart').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        var BigButnTextConfig={color:'#02132a',fontFamily: 'EurostileBold', fontSize: '25pt'};
        this.buttonVisitNerf = this.add.text(800, 365, "VISIT NERF", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{ console.log("lol")})
        .on('pointerout', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('GameEnd'); this.scene.start('Menu')})
        .on('pointerout', () => this.buttonGoBack.setStyle({ backgroundColor: '#09d1e1' }));
    }

    update() {
    }
}

export default GameEnd