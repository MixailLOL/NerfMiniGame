class Menu extends Phaser.Scene {
    constructor() {
      super("Menu");
    }
    create(){
        var textConfig={fontSize:'20px',color:'#00ff00',fontFamily: 'Arial'};
        this.button = this.add.text(this.game.config.width/2, this.game.config.height/2, "ИГРАТЬ", textConfig).setInteractive();
        this.button.on('pointerdown', ()=>{  this.scene.stop('Menu'); this.scene.start('GamePlay')});    
        this.button.setOrigin(0.5, 0.5);

        this.button = this.add.text(this.game.config.width/2, this.game.config.height/1.8, "Ачивки", textConfig).setInteractive();
        this.button.on('pointerdown', ()=>{  this.scene.stop('Menu'); this.scene.start('Splash', {achiv: true})});    
        this.button.setOrigin(0.5, 0.5);
    }
}

export default Menu