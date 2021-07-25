//declaring global variables
var mario, marioAnimation, ground, groundImg, sunImg, coinsGroup, cloudsGroup, marioCollidedImg
var enemyGroup, gameOver, gameOverImg, restart, restartImg, backgroundImg
var coinImg, cloudImg, coinSound
var PLAY=1
var END=0
var gameState=PLAY
var scene
var obstacle1Img,obstacle2Img,obstacle3Img

function preload(){
    marioAnimation=loadAnimation("Capture1.png","Capture3.png","Capture4.png")
    backgroundImg=loadImage("backg2.jpg")
    gameOverImg=loadImage("gameOver.png")
    restartImg=loadImage("restart.png")
    marioCollidedImg=loadImage("mariodead.png")
    coinImg=loadImage("coin.png")
    coinSound=loadSound("Mario-coin-sound.mp3")
    cloudImg=loadImage("cloudImg2.png")
    sunImg=loadImage("sunImg2.png")
    obstacle1Img=loadImage("obstacle1.png")
    obstacle2Img=loadImage("obstacle2.png")
    obstacle3Img=loadImage("obstacle3.png")
    
}
    
function setup(){
    createCanvas(1000,600)

    scene=createSprite(900,300,width,height-100)
    scene.addImage(backgroundImg)
    scene.scale=3.7
    //scene.x=scene.width/2
    sun=createSprite(900,100,20,height-100)
    sun.addImage(sunImg)
    sun.scale=0.4

    mario=createSprite(100,550,20,40)
    mario.addAnimation("Capture", marioAnimation)
    mario.scale=0.8

    ground=createSprite(0,560,1200,10)
    ground.x=ground.width/2
    ground.visible=false

    gameOver=createSprite(500,300,10,10)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5

    restart=createSprite(500,300,10,10)
    restart.addImage(restartImg)
    restart.scale=0.5

    coinsGroup=new Group()
    cloudsGroup=new Group()
}

function draw(){
    background("lightblue")
    if(gameState===PLAY){
        if(keyDown("space") && mario.y>=140){
            mario.velocityY=-14
        }
        scene.velocityX=-2

        ground.velocityX=-2
        //adding gravity to the mario
        mario.velocityY=mario.velocityY+0.8
        //making the infinite ground
        if(ground.x<0){
            ground.x=ground.width/2
        }
        if(scene.x<250){
            scene.x=500
        }
        
        gameOver.visible=false
        restart.visible=false

        if(coinsGroup.isTouching(mario)){
            coinSound.play()
        }
        spawnCoins()
        spawnClouds()
    }
    mario.collide(ground)

    drawSprites()
}

function spawnCoins(){
   if(frameCount%100===0){
       var coin=createSprite(900,300,10,10)
       coin.addImage(coinImg)
       coin.scale=0.2
       coin.velocityX=-4
       coin.y=Math.round(random(100,200))
       coinsGroup.add(coin)

   }
}

function spawnClouds(){
    if(frameCount%160===0){
        var cloud=createSprite(600,100,30,10)
        cloud.addImage(cloudImg)
        cloud.velocityX=-2
        cloud.scale=0.5
        cloud.y=Math.round(random(50,200))
        cloud.x=Math.round(random(350,800))
        cloud.lifetime=200
        cloudsGroup.add(cloud)
    }
}

