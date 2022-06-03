const carCanvas = document.getElementById("carCanvas");
width = 200
carCanvas.width = width;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;


const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(carCanvas.width/2, carCanvas.width*0.9,4);

const N = 100;
const NEURONLEVELNUM = 10;
const constantSpeed = 20;

const cars=generateAICars(N, NEURONLEVELNUM, constantSpeed);


let bestCar=cars[0];
// if(localStorage.getItem("bestBrain")){
//   bestCar.brain=JSON.parse(
//     localStorage.getItem("bestBrain"));
// }

console.log("get " + localStorage.getItem("bestBrain"))
if(localStorage.getItem("bestBrain")){
  console.log("mutate?")
  for(let i=0; i < cars.length; i++){
    cars[i].brain=JSON.parse(
      localStorage.getItem("bestBrain"));
      if(i!=0){
        // less 0.01 is the best value
        NeuralNetwork.mutate(cars[i].brain, 0.005);
      }
  }
}

// Test set 1
// const traffic=[
//   new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(1),-40,30,50, "DUMMY", 1),
//   // new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 1),
//   // new Car(road.getLaneCenter(2),-20,30,50, "DUMMY", 1),
//   // // new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
//   // new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
//   // // new Car(road.getLaneCenter(3),-200,30,50, "DUMMY", 2),
//   // new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
//   // new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
// ];

// Test set 2
// const traffic=[
//   new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(1),-300,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 3),
//   new Car(road.getLaneCenter(2),-400,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
//   new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
//   new Car(road.getLaneCenter(3),-500,30,50, "DUMMY", 2),
  // new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
  // new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
// ];

// Test set 3
const traffic=[
  new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(1),-300,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 3),
  new Car(road.getLaneCenter(2),-400,30,50, "DUMMY", 1),
  new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
  new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
  new Car(road.getLaneCenter(3),-500,30,50, "DUMMY", 2),
  new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
  new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
  // new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
  // new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
];

// Test set 4
// const traffic=[
//   new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(1),-300,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 3),
//   new Car(road.getLaneCenter(2),-400,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
//   new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
//   new Car(road.getLaneCenter(3),-500,30,50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
//   new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
// ];

// // Test set 5
// const traffic=[
//   new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(1),-300,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 3),
//   new Car(road.getLaneCenter(2),-400,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
//   new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
//   new Car(road.getLaneCenter(3),-500,30,50, "DUMMY", 2),
//   new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
//   new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(3),-700,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(0),-850,30,50,"DUMMY",2),

// ];

// const traffic=[
//   // new Car(road.getLaneCenter(1),-150,30,50, "DUMMY", 1),
//   // new Car(road.getLaneCenter(0),-150,30,50, "DUMMY", 1),
//   // // new Car(road.getLaneCenter(2),-200,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(4),-50,30,50, "DUMMY", 1),
//   // new Car(road.getLaneCenter(1),-40,30,50, "DUMMY", 1),
//   new Car(road.getLaneCenter(3),-300,30,50, "DUMMY", 1),
//   // new Car(road.getLaneCenter(2),-20,30,50, "DUMMY", 1),
//   // // new Car(road.getLaneCenter(3),-700,30,50, "DUMMY", 4),
//   new Car(road.getLaneCenter(1),-500,30,50, "DUMMY", 2),
//   // // new Car(road.getLaneCenter(3),-200,30,50, "DUMMY", 2),
//   // new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1),
//   new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
//   // new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
//   new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
// ];


// const traffic=generateDummyCars(10);

animate();

function save() {
  localStorage.setItem("bestBrain",
  JSON.stringify(bestCar.brain));
  console.log("SAVE " + JSON.stringify(bestCar.brain))

}

function discard(){
  localStorage.removeItem("bestBrain")
}

function generateAICars(N, neuronLevelNum, speed){
  const cars=[];
  const laneNumber=randomizeFunction(4);
  for(let i=1; i<=N; i++){
    const maxSpeed=randomizeFunction(10);

    cars.push(new Car(road.getLaneCenter(2),
    100,
    30,
    50, 
    "AI", 
    speed, 
    neuronLevelNum))
  }
  return cars;
}


function animate(time){
  for(let i=0; i< traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for(let i=0; i<cars.length;i++) {
    cars[i].update(road.borders, traffic);
  }

  bestCar = cars.find(
    c=>c.y==Math.min(
      ...cars.map(c=>c.y)
    )
  );

  carCanvas.height=window.innerHeight;
  networkCanvas.height=window.innerHeight;

  carCtx.save();
  carCtx.translate(0, -bestCar.y+carCanvas.height*0.7);
  
  road.draw(carCtx);
  for(let i=0; i<traffic.length;i++){
    traffic[i].draw(carCtx, "red");
  }

  // draw car semi-transparent
  carCtx.globalAlpha=0.2;
  for(let i=0; i<cars.length;i++) {
    cars[i].draw(carCtx, "gray");
  }

  carCtx.globalAlpha=1;
  bestCar.draw(carCtx, "blue", true)
  console.log("Y = " + bestCar.y)
  
  carCtx.restore();  

  networkCtx.lineDashOffset=-time/50;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate);
}


// function generateDummyCars(numberOfCar){
//   let result = [];
//   if(numberOfCar <= 1)
//     return [new Car(road.getLaneCenter(randomize(4)),-500,30,50, "DUMMY", constantSpeed)]

//   for(let i = 0; i < numberOfCar; i++) {
//     const car = new Car(road.getLaneCenter(randomize(4)),-500,30,50, "DUMMY", constantSpeed);
//     result.push(car);
//   }
//   return result;
// }