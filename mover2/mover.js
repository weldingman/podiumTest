class Mover{

  constructor(pos, brain, getPassFitness, targetDist){
    this.wheelSize = 50;
    this.circumference = PI * this.wheelSize;
    this.axle = p5.Vector.fromAngle(this.axleAngle);
    this.axleAngle = 0;
    this.speed = p5.Vector.fromAngle(this.axleAngle + HALF_PI);
    this.pos = pos;
    this.bodyAngle = 0;
    this.fixedAngle = 0;
    this.bodyH = false;
    this.bodyWidth = 10;
    this.bodyHeight = 20;

    this.lifeTime = 600;


    this.targetNum = 0;
    this.leaveTarget = false;

    this.fitness = 0;
    this.score = 0;
    this.getPassFitness = getPassFitness;
    this.startDist = 0;
    this.currentTarget = null;
    this.targetCounter = 0;

    if(brain){
      this.brain = brain.copy();
    }
    else{
      this.brain = new NeuralNetwork(5, 16, 2);
    }
  }

  getTargetIndex(){
    return this.targetNum;
  }

//   mutateFun(x) {
//   if (random(1) < 0.1) {
//     var offset = randomGaussian() * 0.5;
//     // var offset = random(-0.1, 0.1);
//     var newx = x + offset;
//     return newx;
//   } else {
//     return x;
//   }
// }

  mutate(){
    this.brain.mutate(0.1);
  }

  think(target, target2, totalTargets){
  // think(instructionA, instructionB, reward){

    let dist = this.getDist(target);
    // let dist = this.getDist(createVector(0,0));
    let angle2 = target2.angleBetween(target);
    // // let targetVec = p5.Vector.sub(target2, target);
    // // let targetPath = p5.Vector.fromAngle(targetVec.heading());
    // // targetPath.setMag(this.bodyWidth * 10);
    // // let angle = targetPath.angleBetween(this.pos);

    var distAhead = 100;
    var tempTar =  p5.Vector.fromAngle(angle2);
    tempTar.setMag(distAhead);
    tempTar.add(this.pos);

    var distC = tempTar.dist(target);

    var distO = p5.Vector.sub(target, this.pos);
    var xDist = sqrt((distAhead * distAhead) - (distO.y * distO.y));


    var axleLS = p5.Vector.fromAngle(this.axle.heading() + this.bodyAngle);
    axleLS.setMag(this.bodyWidth * 6);

    var axleRS = p5.Vector.fromAngle(this.axle.heading() + PI + this.bodyAngle);
    axleRS.setMag(this.bodyWidth * 6);

    var axleLS2 = p5.Vector.fromAngle(this.axle.heading() + this.bodyAngle);
    axleLS2.setMag(this.bodyWidth * 3);

    var axleRS2 = p5.Vector.fromAngle(this.axle.heading() + PI + this.bodyAngle);
    axleRS2.setMag(this.bodyWidth * 3);

    var axleUS = p5.Vector.fromAngle(this.axle.heading() + this.bodyAngle + HALF_PI);
    // axleUS.setMag(this.bodyHeight);
    axleUS.setMag(this.bodyHeight / 2);

    var axleDS = p5.Vector.fromAngle(this.axle.heading() + PI + this.bodyAngle + HALF_PI);
    // axleDS.setMag(this.bodyHeight);
    axleDS.setMag(this.bodyHeight / 2);

    var LU = p5.Vector.add(axleLS, axleUS);
    LU.add(this.pos);

    var LU2 = p5.Vector.add(axleLS2, axleDS);
    LU2.add(this.pos);

    var LD = p5.Vector.add(axleLS, axleDS);
    LD.add(this.pos);

    var RU = p5.Vector.add(axleRS, axleUS);
    RU.add(this.pos);

    var RU2 = p5.Vector.add(axleRS2, axleDS);
    RU2.add(this.pos);

    var RD = p5.Vector.add(axleRS, axleDS);
    RD.add(this.pos);


    // if(this.startDist == 0){
    //   this.startDist = dist;
    //   this.currentTarget = target;
    // }
    // if(this.currentTarget != target){
    //   this.startDist = dist;
    //   this.currentTarget = target;
    // }



    // let inputs = [target.x, target.y, dist];
    let v3 = p5.Vector.sub(target, this.pos);
    var v3Angle = v3.heading();

    // strokeWeight(0);
    // stroke(255,255,0);
    // textSize(10);
    // text(round(degrees(v3Angle)), this.pos.x, this.pos.y);
    // text(round(degrees(this.axleAngle)), this.pos.x, this.pos.y + 20);

    // let inputs = [this.axleAngle, v3Angle, target.x - this.pos.x, target.y - this.pos.y];
    // let inputs = [target.x - this.pos.x, target.y - this.pos.y, target2.x - this.pos.x, target2.y - this.pos.y, target3.x - this.pos.x, target3.y - this.pos.y];
    // let inputs = [degrees(v3Angle), degrees(this.axleAngle), target.x - this.pos.x, target.y - this.pos.y];
    // , RU2.dist(target), LU2.dist(target)
    let inputs = [degrees(v3Angle), degrees(this.axleAngle), RU.dist(tempTar), LU.dist(tempTar), abs(target.y - this.pos.y)];
    // let inputs = [instructionA, instructionB];
    let output = this.brain.predict(inputs);
    this.updateAxle((output[0] * 100 - 50) * 0.0001, (output[1] * 100 - 50) * 0.0001);

    //line(RU.x, RU.y, tempTar.x, tempTar.y);
    //line(LU.x, LU.y, tempTar.x, tempTar.y);

    if(this.getPassFitness){
      // text(round(RU.dist(target)), this.pos.x - 10, this.pos.y);
      // text(round(LU.dist(target)), this.pos.x + 10, this.pos.y);
      // text(this.lifeTime, this.pos.x + 10, this.pos.y + 10);
      // line(RU.x, RU.y, tempTar.x, tempTar.y);
      // line(LU.x, LU.y, tempTar.x, tempTar.y);

      //line(RU2.x, RU2.y, target.x, target.y);
      //line(LU2.x, LU2.y, target.x, target.y);
      // line(RU.x, RU.y, target2.x, target2.y);
      // line(LU.x, LU.y, target2.x, target2.y);
	  //stroke(255,0,0);
	  //text('alfa', this.pos.x, this.pos.y);
    }

    // text(round(output[1] * 100) - 50, this.pos.x + 10, this.pos.y + 10);

    if(dist <= 10){
      if(!this.leaveTarget){
        this.targetNum += 1;
      }
      this.leaveTarget = true;
      fill(255,0,0,100);
      ellipse(this.pos.x, this.pos.y, 10, 10);

    }
    else if(this.leaveTarget){
      this.leaveTarget = false;
      // this.targetNum += 1;
      this.lifeTime += 100 + this.targetNum * 5;
    }
    // if(this.targetNum > totalTargets - 2){
    //   this.targetNum = 0;
    // }

    if(this.targetNum > 0){
      text(this.targetNum, this.pos.x, this.pos.y);
    }

    this.lifeTime -= 1 + (dist * 0.005);
    // this.lifeTime -= 1 + ((abs(target.y - this.pos.y)) * 0.02) + dist * 0.001;
    // this.lifeTime -= 1;
    // text(round(target.y - this.pos.y), this.pos.x, this.pos.y);
    this.score += 1 + (this.targetNum * 2);
    // if(this.getPassFitness){
    //   text(round(this.startDist - dist), this.pos.x, this.pos.y);
    // }
    // stroke(255);
    // strokeWeight(1);
    // fill(255);
    // textSize(10);



    if(this.lifeTime <= 0){
      // console.log("false");
      return false;

    }
    return true;
  }

  updateAxle(motorSpeedL, motorSpeedR){

    // strokeWeight(1);
    var baseCirumference = PI * this.bodyWidth / 2 * this.bodyWidth / 2;

    var travelDistR = motorSpeedR * this.circumference;
    var travelDistL = motorSpeedL * this.circumference * -1;

    var rotR = travelDistR * TWO_PI / baseCirumference;
    var rotL = travelDistL * TWO_PI / baseCirumference;

    this.axleAngle += rotR + rotL;

    this.axle = p5.Vector.fromAngle(this.axleAngle);

    this.speed = p5.Vector.fromAngle(this.axleAngle + HALF_PI);
    this.speed.setMag(((motorSpeedL * this.circumference) + (motorSpeedR * this.circumference)));
    this.pos.add(this.speed);

    var axleL = p5.Vector.fromAngle(this.axleAngle);
    axleL.setMag(this.bodyHeight - (this.bodyHeight * 0.3));

    var axleR = p5.Vector.fromAngle(this.axleAngle + PI);
    axleR.setMag(this.bodyHeight - (this.bodyHeight * 0.3));

    var temp3 = axleL.copy();
    temp3.setMag(this.bodyWidth);
    var temp4 = axleR.copy();
    temp4.setMag(this.bodyWidth);

 }

  show(){
    var test = p5.Vector.fromAngle(this.axle.heading());
    test.setMag(150);
    if(this.bodyH){
      this.holdBody();
    }
    this.drawBody();
}

show2(axleL, temp3, axleR, temp4){
  //stroke(255);
  fill(0,0,255,10);
  //line(this.pos.x + axleL.x,this.pos.y + axleL.y, this.pos.x + temp3.x, this.pos.y + temp3.y);
  //line(this.pos.x + axleR.x,this.pos.y + axleR.y, this.pos.x + temp4.x, this.pos.y + temp4.y);
  ellipse(this.pos.x, this.pos.y, this.bodyWidth * 2, this.bodyWidth * 2);
  //
  // strokeWeight(1);
  // stroke(255,255,0);
  // textSize(10);
}

 drawBody(){
   stroke(255);
   strokeWeight(1);
    var axleLS = p5.Vector.fromAngle(this.axle.heading() + this.bodyAngle);
    axleLS.setMag(this.bodyWidth);

    var axleRS = p5.Vector.fromAngle(this.axle.heading() + PI + this.bodyAngle);
    axleRS.setMag(this.bodyWidth);

    var axleUS = p5.Vector.fromAngle(this.axle.heading() + this.bodyAngle + HALF_PI);
    axleUS.setMag(this.bodyHeight);

    var axleDS = p5.Vector.fromAngle(this.axle.heading() + PI + this.bodyAngle + HALF_PI);
    axleDS.setMag(this.bodyHeight);

    var LU = p5.Vector.add(axleLS, axleUS);
    var LD = p5.Vector.add(axleLS, axleDS);

    var RU = p5.Vector.add(axleRS, axleUS);
    var RD = p5.Vector.add(axleRS, axleDS);

    line(this.pos.x + LU.x,this.pos.y + LU.y, this.pos.x + LD.x,this.pos.y + LD.y);

    // ellipse(this.pos.x + LU.x,this.pos.y + LU.y, 10, 10);
    // ellipse(this.pos.x + LU.x,this.pos.y + LU.y, 10, 10);
    line(this.pos.x + RU.x,this.pos.y + RU.y, this.pos.x + RD.x,this.pos.y + RD.y);

    line(this.pos.x + LU.x,this.pos.y + LU.y, this.pos.x + RU.x,this.pos.y + RU.y);
    line(this.pos.x + LD.x,this.pos.y + LD.y, this.pos.x + RD.x,this.pos.y + RD.y);


    noFill();
    ellipse(this.pos.x + axleUS.x, this.pos.y + axleUS.y, 4, 4);
  }

  rotateBody(angle){
    if(!this.bodyH){
      this.bodyAngle += angle;
    }

  }

  holdBody(){
    this.bodyAngle = -this.axle.heading() + this.fixedAngle;
  }

  changeFixedAngle(angle){
    this.fixedAngle = angle;
  }

  setBody(){
    this.fixedAngle = this.axle.heading() + this.bodyAngle;
    this.bodyH = true;
    return this.axle.heading() + this.bodyAngle;
  }

  releaseBody(){
    this.bodyH = false;
  }

  getDist(target){
    return this.pos.dist(target);
  }

}
