class ViewRange extends Phaser.Scene {
    constructor() {
      super("ViewRange");
    }
    create(){
        this.gun;
        this.guns = ['gunCommander', 'gunShockwave', 'gunEcho', 'gunVolt'];
        let nextGun = 0;
        var BigButnTextConfig={color:'#02132a',fontFamily: 'EurostileBold', fontSize: '25pt'};
        this.viewNextGun(nextGun);

        let background = this.add.image(0, 0 ,'viewRangeBg').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(310, 40, "swipe left and right to view the range!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '20pt'}).setOrigin(0, 0);
        this.arrowRight = this.add.image(716, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ nextGun = (nextGun+1)%this.guns.length; this.viewNextGun(nextGun)});
        this.arrowLeft = this.add.image(42, 172, "arrow").setInteractive().setOrigin(0, 0)
        .on('pointerdown', ()=>{ nextGun = (nextGun-1)%this.guns.length;this.viewNextGun(nextGun)});
        this.arrowLeft.flipX = true;

        this.buttonVisitNerf = this.add.text(800, 365, "VISIT NERF", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(1, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{ console.log("gyjkg")})
        .on('pointerout', () => this.buttonVisitNerf.setStyle({ backgroundColor: '#09d1e1' }));

        this.buttonGoBack = this.add.text(0, 365, "GO BACK", BigButnTextConfig).setInteractive()
        .setStyle({ backgroundColor: '#09d1e1'})
        .setOrigin(0, 0)
        .setPadding(50, 10)
        .on('pointerover', () => this.buttonGoBack.setStyle({ backgroundColor: '#f47921' }))
        .on('pointerdown', ()=>{  this.scene.stop('ViewRange'); this.scene.start('Menu')})
        .on('pointerout', () => this.buttonGoBack.setStyle({ backgroundColor: '#09d1e1' }));
    }

    viewNextGun(nextGun){
        if(this.gun != undefined){
            this.gun.destroy();
        }
        this.gun = this.add.image(265, 225, ''+this.guns[Math.abs(nextGun)]).setInteractive().setOrigin(0.5, 0.5);
    }
}

export default ViewRange