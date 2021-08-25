var ground2;
var trex ,trex_running;
var cloud, cloudImg
var cactise
var Cone,Ctwo,Cthree,Cfour,Cfive,Csix
var score
var cloudgroup,cactisegroup
var gamestate="alive"
var jared
var restart, restartImg
var over, overImg
var deadsound
var checksound
var jumpsound
function preload(){
trex_running=loadAnimation("trex1.png", "trex3.png", "trex4.png")
ground2=loadImage ("ground2.png")
cloudImg=loadImage("cloud.png")
Cone=loadImage("obstacle1.png")
Ctwo=loadImage("obstacle2.png")
Cthree=loadImage("obstacle3.png")
Cfour=loadImage("obstacle4.png")
Cfive=loadImage("obstacle5.png")
Csix=loadImage("obstacle6.png")
trex_collided=loadAnimation("trex_collided.png") 
restartImg=loadImage ("restart.png")
overImg=loadImage ("gameOver.png")
deadsound=loadSound("die.mp3")
checkpoint=loadSound("checkPoint.mp3")
jumpsound=loadSound("jump.mp3")

}

function setup(){
  createCanvas(600,200)
  score=0
  //create a trex sprite
 trex=createSprite (50,190,50,50)
 trex.scale=0.45
 trex.addAnimation ("running", trex_running)
 trex.addAnimation ("ded", trex_collided)
 //making the collision radus of trex seen
 // trex.debug=true 
  //resising the colider radeus
  trex.setCollider ("circle", 0,0,40,)
 ground=createSprite (200,180,400,5)
 fake=createSprite (200,190,400,5)
 //fake.shapeColor = "lightBlue"
 fake.visible=false
ground.addImage (ground2)
//var x = Math.round(random(300,500))
//console.log (x)
cloudgroup=new Group()
cactisegroup=new Group()

// create restart and game over icon
restart=createSprite(300,140)
restart.addImage (restartImg)
restart.scale = 0.5
over=createSprite(300,100)
over.addImage(overImg)
over.scale=0.5 
}


function draw(){
  background("LightCoral")
  textSize (20)
  fill ("LightGreen")
text("Score: "+score,400,50)

if (gamestate=="alive"){
  // making game over and restart icon invisablwe
  over.visible=false
  restart.visible=false
//moving the ground
ground.velocityX=-6-score*3/100
//incresing the score
score= score+Math.round(getFrameRate()/60)
//making the ground infinet
if (ground.x<0 ){
  ground.x=200
}
//dont jump if dead - stoping dubble jump 
if (keyDown ("space")&& trex.collide(fake)) {
  trex.velocityY=-10
  jumpsound.play()

  }

if (score%100==0){
checkpoint.play()
}


//Gravity Falls
trex.velocityY=trex.velocityY+0.5
//spawning cloud & cac
sky()
cac()

// is trex touching cac
if (trex.isTouching(cactisegroup)){
 gamestate="dead"
deadsound.play()
}


}

else if (gamestate=="dead"){
//stoping the ground
ground.velocityX=0
//frezing cloud and cac bc trex went bye bye
cactisegroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)
//objects dont kys
cloudgroup.setLifetimeEach (-24543) 
cactisegroup.setLifetimeEach (-3)
//making trex stop running when he go bye bye
trex.changeAnimation("ded")
//when ded dont jump into big cactise********dont fly whn dead
trex.velocityY=0
  // making game over and restart icon visable
  over.visible=true
  restart.visible=true
  //is restart button pressed?
  if (mousePressedOver(restart) ){
    reset()
  }
}



 
trex.collide (fake)


drawSprites()
}

function reset (){
  gamestate="alive"
  cloudgroup.destroyEach()
  cactisegroup.destroyEach()
  score=0
  trex.changeAnimation("running")

}



function sky (){
if (frameCount%100==0){
  cloud=createSprite (600,100,40,10)
  cloudgroup.add(cloud) 
  cloud.scale=0.6
  cloud.lifetime=300
  cloud.addImage(cloudImg)
  cloud.velocityX=-6-score*3/100
  cloud.y=Math.round(random(10,80))
  trex.depth=cloud.depth+1
}
}
function cac (){
  if (frameCount%60==0){
    cactise=createSprite(600,160,10,40)
    cactisegroup.add(cactise)
    cactise.velocityX=-6-score*3/100
    cactise.scale=0.5
    cactise.lifetime=120
    var dave = Math.round (random(1,6))
    switch(dave){
      case 1: cactise.addImage(Cone)
      break;
      case 2: cactise.addImage(Ctwo)
      break;
      case 3: cactise.addImage(Cthree)
      break;
      case 4: cactise.addImage(Cfour)
      break;
      case 5: cactise.addImage(Cfive)
      break;
      case 6: cactise.addImage(Csix)
      break;
      default: break

    }

  }
}