import AchivList from '../system/achivList.js'

class Achivments extends Phaser.Scene {
    constructor() {
      super("Achivments");
    }
    create(){
        /*let background = this.add.image( window.innerWidth*0.5, window.innerHeight*0.5 ,'AchivmentsBG').setName("AchivmentsBG");
        background.displayWidth = window.innerWidth;
        background.displayHeight = window.innerHeight;
        background.setOrigin(0.5, 0.5);*/

        var textConfig={fontSize:'20px',color:'#00ff00',fontFamily: 'Arial'};
        this.button = this.add.text(window.innerWidth*0.8, window.innerHeight*0.8, "Назад", textConfig).setInteractive();
        this.button.on('pointerdown', ()=>{  this.scene.stop('Achivments'); this.scene.start('Menu')});    
        this.button.setOrigin(0.5, 0.5);

        let count = 0;
        AchivList.forEach((item) => {
            //1 30 4 30 4 30 1
            let achiv = this.add.image(0, 0 ,'Achivm'+item).setName("Achivm"+item);
            achiv.setOrigin(0, 0);
            achiv.x = (window.innerWidth*0.01 + window.innerWidth*0.04*(count%3)+ window.innerWidth*0.3*(count%3));
            achiv.y = window.innerHeight*0.2+(achiv.displayHeight*Math.floor(count/3));
            console.log("name= ",item, achiv.x, achiv.y, count%3, Math.floor(count/3));
            count += 1;
        });    
    }
}

export default Achivments