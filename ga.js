

function nextGeneration(){
  calculateFitness();
  console.log("new generation");

  for (var i = 0; i < TOTAL; i++) {
    m[i] = pickOne();
  }

  savedMovers = [];
}

function pickOne(){

  var index = 0;
  var r = random(1);


  while(r > 0){
    // console.log(index);
    r = r - savedMovers[index].fitness;
    index++;
  }
  index--;
  // console.log(savedMovers);
  // let rMover = random(savedMovers);
  let rMover = savedMovers[index];

  // let child = new Mover(createVector(random(100, width - 100), random(100, height - 100)), rMover.brain, rMover.getPassFitness, rMover.startDist);
  let child = new Mover(createVector(500,500), rMover.brain, rMover.getPassFitness, rMover.startDist);
  // console.log(child);
  child.mutate();

  return child;
}

function calculateFitness(){
  let sum = 0;
  let countToShow = 10;
  for(let mover of savedMovers){
    sum += mover.score;
  }
  let avg = sum / savedMovers.length
  for(let mover of savedMovers){
    mover.fitness = mover.score / sum;
    if (mover.score > avg) {
      if(random() < 0.02){
        mover.getPassFitness = true;
        countToShow--;
      }
    }
    else{
      mover.getPassFitness = false;
    }
  }


}
