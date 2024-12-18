import GunDesc from '../system/gunsDescryption.js'

class ViewRange extends Phaser.Scene {
    constructor() {
      super("ViewRange");
    }
    create(){
        this.isAboutToSwipe = 0;
        this.gun;
        this.guns = ['gunCommander', 'gunShockwave', 'gunEcho', 'gunVolt'];
        this.nextGun = 0;
        var BigButnTextConfig={color:'#02132a',fontFamily: 'EuroStileBold', fontSize: '25pt'};
        this.viewNextGun(this.nextGun);

        let background = this.add.image(0, 0 ,'viewRangeBg').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(310, 36, "SWIPE LEFT AND RIGHT TO VIEW THE RANGE!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '15.7pt'}).setOrigin(0, 0);
        this.arrowRight = this.add.image(716, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerover', () =>{this.arrowRightO.setVisible(true)});
        this.arrowLeft = this.add.image(42, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerover', () =>{this.arrowLeftO.setVisible(true)});
        this.arrowLeft.flipX = true;

        this.arrowRightO = this.add.image(716, 172, "arrowO").setInteractive().setOrigin(0, 0).setVisible(false)
        .on('pointerout', () => {this.arrowRightO.setVisible(false)})
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun+1)%this.guns.length; this.viewNextGun(this.nextGun)});
        this.arrowLeftO = this.add.image(42, 172, "arrowO").setInteractive().setOrigin(0, 0).setVisible(false)
        .on('pointerdown', ()=>{ this.nextGun = (this.nextGun-1)%this.guns.length;this.viewNextGun(this.nextGun)})
        .on('pointerout', () => {this.arrowLeftO.setVisible(false)});
        this.arrowLeftO.flipX = true;

        this.buttonVisitNerf = this.add.text(800, 365, "VISIT NERF", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(29, 10)
        .on('pointerover', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{ console.log("gyjkg")})
        .on('pointerout', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(45, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('ViewRange'); this.scene.start('Menu')})
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
            this.gunDescryptionText.destroy();
        }
        this.gun = this.add.image(265, 195, ''+this.guns[Math.abs(nextGun)]).setInteractive().setOrigin(0.5, 0.5);

        var titleTextConfig={color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '28pt'};
        var descTextConfig={color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '14.5pt'};
        let gunName = this.guns[Math.abs(nextGun)];
        this.gunTitle = this.add.text(576, 135, GunDesc[gunName][0], titleTextConfig)
        .setOrigin(0.5, 0.5)
        .setPadding(50, 10)
        this.gunDescryptionText = this.add.text(576, 265, GunDesc[gunName][1], descTextConfig)
        .setOrigin(0.5, 0.5)
        .setPadding(50, 10)
    }
}

export default ViewRange