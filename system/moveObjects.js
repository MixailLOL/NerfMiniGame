import spawnWall from '../walls/spawnWall.js'

function moveObjects(scene, player){
    let destroyNames = [];
    for (let index = 0; index < scene.children.list.length; index++) {
        let object = scene.children.list[index];
        if(object.name.indexOf('wall')>=0){
            let tpToX = object.x - window.innerWidth;
            if(tpToX <= 0 ){
                destroyNames.push(object.name);
                continue
            }
            let tpToY = object.y;  
            object.x = tpToX;
            object.y = tpToY;
        }

        if(object.x < -window.innerWidth*3){
            object.destroy();
        }
    }

    let mLenght = destroyNames.length;
    if(destroyNames.length){
        for(let index = 0; index < mLenght; index++){
            let name = destroyNames.pop();
            for (let index2 = 0; index2 < scene.children.list.length; index2++) {
                let object = scene.children.list[index2];
                if(object.name == name){
                    object.destroy();
                }
            }
        } 
    } 

    for (let index = 0; index < scene.children.list.length; index++) {
        let object = scene.children.list[index];
        if(object.name.includes('Background')){
            if(object.x - window.innerWidth == -window.innerWidth){
                let newBG = scene.bgList[Math.floor(Math.random() * scene.bgList.length)];
                if(newBG[0] != scene.currentBG[0]){
                    let portalB = scene.add.image(window.innerWidth*3, window.innerHeight*2 ,'portalBack').setName("bgObjectPortalB");
                    portalB.displayWidth = window.innerWidth*0.2;
                    portalB.displayHeight = window.innerHeight;
                    portalB.setOrigin(0, 0);
                    portalB.depth = -3;    
                    let portalF = scene.add.image(window.innerWidth*3+portalB.displayWidth*0.2, window.innerHeight*2 ,'portalFront').setName("bgObjectPortalB");
                    portalF.displayWidth = window.innerWidth*0.1;
                    portalF.displayHeight = window.innerHeight;
                    portalF.setOrigin(0, 0);
                    portalF.depth = 1;    
                }
                scene.currentBG = newBG;
                let background = scene.add.image(window.innerWidth*3, window.innerHeight*2 ,''+scene.currentBG[0]).setName("Background"+scene.wallId);
                background.displayWidth = window.innerWidth*3;
                background.displayHeight = window.innerHeight;
                background.setOrigin(0, 0);
                background.depth = -4;
                spawnWall(scene, 2*window.innerHeight, 3*window.innerHeight, scene.player.sprite.displayWidth, scene.player.sprite);
            }
            let tpToX = object.x - window.innerWidth;  
            object.x = tpToX;     
        }

        if(object.name.includes('bgObject')){
            object.x -= window.innerWidth;
            if(object.x <= 0-object.innerWidth){
                object.destroy();  
            }
        }
    }

    let elemCount = Phaser.Math.RND.integerInRange(1, 3);
    for(let i =0; i<= elemCount; i++){
        let sprites = scene.currentBG[1];
        let spriteType = sprites[Math.floor(Math.random()*sprites.length)];
        let cloud = scene.physics.add.sprite(window.innerWidth*3, window.innerHeight*2+Phaser.Math.RND.integerInRange(0, window.innerHeight/2), ''+scene.currentBG[0]+spriteType).setBounce(0);
        cloud.setName("bgObject"+spriteType);
        let displayObjW = (window.innerWidth*0.1)/cloud.displayWidth;
        let scale =  parseFloat((Math.random() * (5 - 0.01) + 0.5).toFixed(2));
        let cloudSpeed = Phaser.Math.RND.integerInRange(-player.speed[0], -player.speed[0]/10);
        cloudSpeed /=scale;
        cloud.setVelocity(cloudSpeed, 0);
        cloud.scale = displayObjW*scale;    
        cloud.depth = -2;
    }
    
}

export default moveObjects