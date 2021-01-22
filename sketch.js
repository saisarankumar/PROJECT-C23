//create variables to stroe sprites
var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
//to shorter the names
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	//load images
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	//create the canvas
	createCanvas(800, 700);
	//positions are centre of the sprites
	rectMode(CENTER);

	//create sprite for package
	packageSprite=createSprite(width/2, 80, 10,10);
	//add image for package sprite
	packageSprite.addImage(packageIMG);
	//scale for package sprite
	packageSprite.scale=0.2;

	//create sprite for helicopter
	helicopterSprite=createSprite(width/2, 200, 10,10);
	//add image for helicopter
	helicopterSprite.addImage(helicopterIMG)
	//scale the helicopter
	helicopterSprite.scale=0.6

	//create sprite for ground
	groundSprite=createSprite(width/2, height-35, width,10);
	//colour the ground
	groundSprite.shapeColor=color(255);

	//create the engine
	engine = Engine.create();
	world = engine.world;

	//create body for package
	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);
	
	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	//set position for box 
 	boxPosition=width/2-100
 	boxY=610;

	//create the container sprites and bodies
 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxRightBody);

	//run the engine
	Engine.run(engine);
  
}


function draw() {
  //positions are at center
  rectMode(CENTER);
  //clear the screen
  background(0);
 
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;

  //create controls for helicopter and package
  if(keyDown("left")){
	helicopterSprite.velocityX = -3;
	//Body.setVelocity(packageBody, {x:-3, y:0});
	Body.translate(packageBody, {x: -3, y: 0});
	//Body.setStatic(packageBody, false);
  }

  if(keyWentUp("left")){
    helicopterSprite.velocityX = 0;
  }
  
  if(keyDown("right")){
	helicopterSprite.velocityX = 3;
	//Body.setVelocity(packageBody, {x:3, y:0});	
	Body.translate(packageBody, {x: 3, y: 0});
	//Body.setStatic(packageBody, false);
  }

  if(keyWentUp("right")){
    helicopterSprite.velocityX = 0;
  }

  if(keyDown("down")){
	Matter.Body.setStatic(packageBody, false);
  }

  console.log(packageSprite.y);

  //display sprites
  drawSprites(); 
}