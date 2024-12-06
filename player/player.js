import moveObjects from '../system/moveObjects.js'


var Player = new Phaser.Class({
        initialize:
        function Player (scene, x, y)
        {
            this.game = scene;
            this.sprite = scene.physics.add.sprite(x, y, "player", { shape: this.game.shapes }).setCollideWorldBounds().setBounce(0);
            this.sprite.setName("PlayerSprite");
            let sprWH = this.sprite.displayWidth/this.sprite.displayHeight;
            let sprHW = this.sprite.displayHeight/this.sprite.displayWidth;
            let procScale = Math.min(window.innerWidth, window.innerHeight)*0.15;
            if(this.sprite.displayWidth <= this.sprite.displayHeight){
                this.sprite.displayWidth = procScale;    
                this.sprite.displayHeight = procScale*(sprHW);
            }else{
                this.sprite.displayHeight = procScale;    
                this.sprite.displayWidth = procScale*(sprWH);    
            }
            this.game.pSpriteWH = [this.sprite.displayWidth, this.sprite.displayHeight];
            this.tail_n;
            this.alive = true;
            this.speed = [procScale*3, 0];
            this.baseSpeed = procScale*3;
            this.maxSpeed = this.speed[0]*1.5;
            this.acceleration = this.speed[0]*0.04;
            this.k = [0,0];
            this.score = 0;
            this.aimX = 0;
            this.game.anims.create({
                key: 'up',
                frames: this.game.anims.generateFrameNames('player', {start: 1, end: 10}),
                frameRate: 16,
                repeat: -1
            });
            this.game.anims.create({
                key: 'idle',
                frames: this.game.anims.generateFrameNames('player', {start: 11, end: 20}),
                frameRate: 8,
                repeat: -1
            });
            this.sprite.play('idle');
            this.checkTail();
        },

        moveWalls: function(){
            moveObjects(this.game, this);
            this.tail_n =  Math.floor(this.sprite.x/(window.innerWidth)) + (Math.floor(this.sprite.y/window.innerHeight))*this.game.worldTailsAmout;
            this.calculateX(1);
        },

        update: function (time)
        {
            this.move();
            this.checkTail();
        },

        checkWall: function ()
        {
            let x = this.sprite.x - this.sprite.displayWidth/2;
            if(this.aimX == undefined || x > this.aimX){
                this.calculateX();                

                if(this.aimX != undefined){
                    this.game.hud.list[0].setText(""+this.score);
                    this.score+=1;
                    this.speed[0] += this.baseSpeed*0.001;
                }
            }
        },


        calculateX: function (ret)
        {
            let aimScore;
            let aimX;
            if(ret){
                aimScore = this.score-1;    
                //console.log("from return wall");
            }
            else{
                aimScore = this.score;    
            }
            this.game.children.list.forEach(function(item, index, array){
                //console.log(item); // десятого реально нет ! (?)
                if(item.name == "wallTop"+aimScore || item.name == "wallBot"+aimScore){
                    aimX = item.x + item.displayWidth/2;
                }
            })
            this.aimX = aimX;
        },

        move: function ()
        {
            this.sprite.setVelocity(this.speed[0],this.speed[1]);
        },

        up: function (){
            this.game.firstPress?this.game.firstPress:this.game.firstPress=true;
            if( this.speed[1] >= -this.maxSpeed){
                this.speed[1] -=this.k[0];
                this.k[0] += this.acceleration;
            }
            this.k[1] = 0;
            if(!this.sprite.anims.currentAnim){
                    this.sprite.play('up');    
            }else{
                if(this.sprite.anims.currentAnim.key != 'up'){
                    this.sprite.play('up');    
                }   
            }
        },     

        down: function (){
            if(this.speed[1] <= this.maxSpeed){
                this.speed[1] += this.k[1];
                this.k[1] += this.acceleration;
            }
            this.k[0] = 0;
            if(!this.sprite.anims.currentAnim){
                    this.sprite.play('idle');    
            }else{
                if(this.sprite.anims.currentAnim.key != 'idle'){
                    this.sprite.play('idle');    
                }   
            }
            //console.log(this.sprite.x, this.sprite.y);
        },

        checkTail: function(){
            this.tail_n =  Math.floor(this.sprite.x/(window.innerWidth)) + (Math.floor(this.sprite.y/window.innerHeight))*this.game.worldTailsAmout;
            switch(this.tail_n){
                case 6:
                case 7:
                case 5:
                case 10:
                case 12:
                case 16:
                case 17:
                case 15:
                    this.sprite.x = window.innerWidth+this.sprite.x%window.innerWidth;
                    this.sprite.y = 2*window.innerHeight+this.sprite.y%window.innerHeight;
                    this.moveWalls();    
                    break
                default:
                    this.checkWall();
                    break
            }
        },

    });

export default Player