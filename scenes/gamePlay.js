class GamePlay extends Phaser.Scene {
    constructor() {
      super("GamePlay");
    }

    init(data)
    {
        console.log('init', data);
        this.gun = data.gun;
    }

    create(){
        this.claimedPoints = 0;
        this.targets ={}
        this.iniTime = Math.floor(this.game.loop.time/1000);
        this.time = 0;
        let background = this.add.image(0, 0 ,'bg').setName("Background").setOrigin(0, 0);
        background.depth = -3;
        let logo = this.add.image(28, 23 ,'logoSmall').setName("logo").setOrigin(0, 0);
        logo = -3;
        this.swipeDescription = this.add.text(275, 24, "TAP THE TARGETS TO SHOOT AS MANY\nAS YOU CAN WITHIN THE TIME LIMIT!", {color:'#ffffff',fontFamily: 'EurostileOblique', fontSize: '15pt',textShadow: '0 0 6px rgb(0, 0, 0)'}).setOrigin(0, 0);
        this.timeText = this.add.text(640, 24, "TIME:", {color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '14pt',textShadow: '0 0 6px rgb(0, 0, 0)'}).setOrigin(0, 0);
        this.scoreText = this.add.text(640, 44, "SCORE:", {color:'#09d1e1',fontFamily: 'EurostileOblique', fontSize: '20pt',textShadow: '0 0 5px rgb(0, 0, 0)'}).setOrigin(0, 0);
    }

    update(delta) {
        this.time = this.iniTime+20-Math.floor(delta/1000);
        this.updateTime();
    }

    updateTime(){
         this.timeText.setText('TIME:'+this.time+' SECS');
         this.scoreText.setText('SCORE:'+this.claimedPoints);
         if(this.time==0){
            this.scene.stop('GamePlay'); 
            this.scene.start('GameEnd', { score: this.claimedPoints, gun: this.gun});

         }
         this.spawnTarget();
         for(let i in this.targets){
            this.targets[i][0].scale *=0.995;
            this.targets[i][1].setStyle({ fontSize: this.targets[i][1].style.fontSize.split(''+this.targets[i][1].style.fontSize.slice(-2))[0]*0.995+'pt'})
            if(this.targets[i][0].scale <= 0.5){
                this.targets[i][1].destroy();
                this.targets[i][0].destroy();
                delete this.targets[i]
            }
         }
    }

    spawnTarget(){
        let targetPosW = Phaser.Math.Between(80, 720);
        let targetPosH = Phaser.Math.Between(110, 340);
        if(Phaser.Math.Between(1,20+Reflect.ownKeys(this.targets).length*15) == 1){
            let points = Phaser.Math.Between(1,20)*10;
            let name = points+'target'+Phaser.Math.Between(1,99999);
            if(points>100){
                this.target = this.add.image(targetPosW,targetPosH,'targetBig').setOrigin(0.5,0.5).setScale(Phaser.Math.Between(1.0, 1.3))
                .setInteractive()
                .setName(name)
                .on('pointerdown', ()=>{this.claimedPoints += Number((name.split('target'))[0]);this.targets[name][1].destroy();this.targets[name][0].destroy();delete this.targets[name]});
                this.targetText = this.add.text(targetPosW,targetPosH, ''+points, {color:'#ffffff',fontFamily: 'EuroStileOblique', fontSize: '17.36pt'})
                .setOrigin(0.5, 0.5);
            }else{
                this.target = this.add.image(targetPosW,targetPosH,'targetSmall').setOrigin(0.5,0.5).setScale(Phaser.Math.Between(1.0, 1.3))
                .setInteractive()
                .setName(name)
                .on('pointerdown', ()=>{this.claimedPoints += Number((name.split('target'))[0]);this.targets[name][1].destroy();this.targets[name][0].destroy();delete this.targets[name]});
                this.targetText = this.add.text(targetPosW,targetPosH, ''+points, {color:'#ffffff',fontFamily: 'EuroStileOblique', fontSize: '17.36pt'})
                .setOrigin(0.5, 0.5);
            }
            this.targets[this.target.name] = [this.target,this.targetText];    
        }
    }
}

export default GamePlay