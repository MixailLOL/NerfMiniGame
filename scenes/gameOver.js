class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }
    create(){
        this.lastSec = -1;
        this.timerEvent = this.time.addEvent({ delay: 1000, repeat: 2 });
        let background = this.add.image( window.innerWidth*0.5, window.innerHeight*0.5 ,'objWhite').setName("GameOverBG");
        background.displayWidth = window.innerWidth*0.8;
        background.displayHeight = window.innerHeight*0.8;
        background.setOrigin(0.5, 0.5);

        /*let choiseBatton = this.add.image(window.innerWidth/2, window.innerHeight/2, "a").setInteractive();
        choiseBatton.displayWidth = window.innerWidth/2;
        choiseBatton.displayHeight = window.innerHeight/5;
        choiseBatton.on('pointerdown', ()=>{
            //this.scene.restart('GamePlay'); 
            this.scene.start('GamePlay'); 
            this.scene.sleep('GameOver');
        });*/

        var textConfig={fontSize:'20px',color:'#00ff00',fontFamily: 'Arial'};
        this.button = this.add.text(window.innerWidth*0.5, window.innerHeight*0.5, "Рестарт", textConfig).setInteractive();
        this.button.on('pointerdown', ()=>{  this.scene.start('GamePlay');this.scene.sleep('GameOver');});    
        this.button.setOrigin(0.5, 0.5);

        this.button = this.add.text(window.innerWidth*0.5, window.innerHeight*0.6, "Меню", textConfig).setInteractive();
        this.button.on('pointerdown', ()=>{ this.scene.start('Menu');this.scene.stop('GamePlay');});    
        this.button.setOrigin(0.5, 0.5);

        var textConfig={fontSize:'60px',color:'#ff0000',fontFamily: 'Arial'};
        this.timerText = this.add.text( window.innerWidth*0.5, window.innerHeight*0.3,"-1", textConfig).setName("timerRestartText");
    }
    update (time)
    {
        this.timeCheck(this.timerEvent.repeatCount);
    }

    timeCheck (time){
        if(this.lastSec != time){
            this.timerText.setText(""+time);    
        }
        
        if(time == 0){
            this.time.removeEvent(this.timerEvent);
            this.scene.start('GamePlay');
            this.scene.sleep('GameOver');
        }
        this.lastSec = time;
    }
}


export default GameOver