import GunDesc from '../system/gunsDescryption.js'

class ChooseGun extends Phaser.Scene {
    constructor() {
      super("ChooseGun");
    }
    create(){
        this.isAboutToSwipe;
        this.gun;
        this.guns = ['gunCommander', 'gunShockwave', 'gunEcho', 'gunVolt'];
        this.nextGun = 0;
        var BigButnTextConfig={color:'#02132a',fontFamily: 'EurostileBold', fontSize: '25pt'};
        this.viewNextGun(this.nextGun);

        let background = this.add.image(0, 0 ,'bgStart').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(275, 40, "choose your blaster then shoot the targets!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '20pt'}).setOrigin(0, 0);
        this.arrowRight = this.add.image(716, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun+1)%this.guns.length; this.viewNextGun(this.nextGun)});
        this.arrowLeft = this.add.image(42, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun-1)%this.guns.length;this.viewNextGun(this.nextGun)});
        this.arrowLeft.flipX = true;

        this.playGame = this.add.text(800, 365, "PLAY GAME", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.playGame.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{ this.scene.stop('ChooseGun'); this.scene.start('GamePlay')})
        .on('pointerout', () => this.playGame.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('ChooseGun'); this.scene.start('Menu')})
        .on('pointerout', () => this.buttonGoBack.setStyle({ backgroundColor: '#09d1e1' }));
    }

    update() {
        if (this.input.activePointer.isDown) {
            if(this.input.activePointer.velocity.x > 100){
                this.isAboutToSwipe = 1;
            }
            if(this.input.activePointer.velocity.x < -100){
                this.isAboutToSwipe = -1;
            }
        }
        if(!this.input.activePointer.isDown && this.isAboutToSwipe!=0){
            this.nextGun = (this.nextGun+this.isAboutToSwipe)%this.guns.length
            this.viewNextGun(this.nextGun)
            this.isAboutToSwipe = 0;
        }
    }


    viewNextGun(nextGun){
        if(this.gun != undefined){
            this.gun.destroy();
            this.gunTitle.destroy();
        }
        this.gun = this.add.image(400, 200, this.guns[Math.abs(nextGun)]+'Big').setInteractive().setOrigin(0.5, 0.5);

        var titleTextConfig={color:'#ffffff',fontFamily: 'Eurostile', fontSize: '27pt'};
        let gunName = this.guns[Math.abs(nextGun)];
        this.gunTitle = this.add.text(395, 389, GunDesc[gunName][0], titleTextConfig)
        .setOrigin(0.5, 0.5)
        .setPadding(50, 10)
    }
}

export default ChooseGun