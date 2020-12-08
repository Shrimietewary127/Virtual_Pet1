//Create variables here
var happyDog,foodS=0, foodStock, database, dog
function preload()
{
  //load images here
  happyDog= loadImage("images/dogImg1.png");
  dogImg=loadImage("images/dogImg.png");
  //milkBottle= loadImage("images/milkBottle.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500, 500);

  dog= createSprite(200,200,20,20);
  dog.addImage(happyDog);
  dog.scale = 0.2;
  


  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  
  


  drawSprites();
  //add styles here
  
  textSize(20);
  fill('red');
  stroke('yellow');
  text("note: Press UP_ARROW to feed drago milk", 70,90);

  
  textSize(20);
  fill('black');
  stroke('yellow');
  text("food :"+foodS, 70,50);

  
}

function readStock(data){
foodS=data.val();

}

function writeStock(stockValue){
  

  if(stockValue<=0){
    stockValue=0;
  }
else{

  stockValue=stockValue-1;
}
database.ref('/').update({
Food:stockValue

});
}

function keyPressed(){

  if(keyCode===38){

    writeStock(foodS);
    
    dog.addImage(dogImg)

    

  }
}