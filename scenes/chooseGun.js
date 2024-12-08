import GunDesc from '../system/gunsDescryption.js'

class ChooseGun extends Phaser.Scene {
    constructor() {
      super("ChooseGun");
    }
    create(){
        this.isAboutToSwipe = 0;
        this.gun;
        this.guns = ['gunCommander', 'gunShockwave', 'gunEcho', 'gunVolt'];
        this.nextGun = 0;
        var BigButnTextConfig={color:'#02132a',fontFamily: 'EuroStileBold', fontSize: '25pt'};
        let background = this.add.image(0, 0 ,'bgStart').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        //let beams = this.add.image(295, 235 ,'beams').setName("beams").setOrigin(0.5, 0.5);

        this.swipeDescription = this.add.text(275, 40, "choose your blaster then shoot the targets!", {color:'#ffffff',fontFamily: 'EuroStileOblique', fontSize: '20pt'}).setOrigin(0, 0);
        this.arrowRight = this.add.image(716, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun+1)%this.guns.length; this.viewNextGun(this.nextGun)});
        this.arrowLeft = this.add.image(42, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun-1)%this.guns.length;this.viewNextGun(this.nextGun)});
        this.arrowLeft.flipX = true;

        this.playGame = this.add.text(800, 365, "PLAY GAME", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(22, 10)
        .on('pointerover', () => this.playGame.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{ this.scene.stop('ChooseGun'); this.scene.start('GamePlay', {gun:this.guns[Math.abs(this.nextGun)]})})
        .on('pointerout', () => this.playGame.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(43, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('ChooseGun'); this.scene.start('Menu')})
        .on('pointerout', () => this.buttonGoBack.setStyle({ backgroundColor: '#09d1e1' }));

        let shadow = '<div style="border: 5px solid #09d1e1;zIndex:0;width: 305px; height: 47px; background-color: #000000; opacity:0.7"; id="shadow" "></div>'
        let domElement3 = this.add.dom(0,0).createFromHTML(shadow).setOrigin(0, 0).setPosition(242, 365);
        this.viewNextGun(this.nextGun);
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
        this.gun = this.add.image(400, 200, this.guns[Math.abs(nextGun)]+'Big').setOrigin(0.5, 0.5);
        let gunName = this.guns[Math.abs(nextGun)];
        let title = '<div style="color:white"; zIndex:10>'+GunDesc[gunName][0]+'</div>'
        this.gunTitle = this.add.dom(0,0).createFromHTML(title).setOrigin(0.5, 0.5).setPosition(400, 392);
    }
}

export default ChooseGun