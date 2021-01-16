class Track{
  constructor(len, step, pos){

    this.pos = pos;
    this.milestones = [];
    this.yStep = 0;
    this.dir = true;
    this.end = 1;
    this.counter = len;
    this.counterBack = 0;
    this.posLim = createVector(0,0);

    // for (var i = 0; i < len; i++) {
    //   var temp = this.end;
    //   console.log(temp);
    //   console.log(i);
    //   var temp2 = i - temp;
    //   console.log(temp2);
    //   var temp3 = temp - temp2;
    //   // if(this.dir){
    //   //   this.milestones[i] = createVector(pos.x + i * step, pos.y + this.yStep * step);
    //   // }
    //   // else{
    //     this.milestones[i] = createVector(pos.x + temp3 * step, pos.y + this.yStep * step);
    //   // }
    //
    //   if(i >= round(width - 100 / step)){
    //     this.end = i;
    //     this.dir = !this.dir;
    //     this.yStep += 1;
    //   }
    //
    // }

    while(this.counter > 0){
      if((this.posLim.x * step) + pos.x >= width - 50 || (this.posLim.x * step) + pos.x <= 50){
        this.posLim.y += 1;
        this.end *= -1;
      }
      this.milestones[this.counterBack] = createVector((this.posLim.x * step) + pos.x, pos.y + (this.posLim.y * step));
      // console.log(this.posLim.x);

      this.posLim.x += this.end;
      this.counterBack += 1;
      this.counter -= 1;
    }
  }
  show(){
    fill(255,255,0);
    noStroke();

    for (var i = 0; i < 100; i++) {
      ellipse(this.milestones[i].x, this.milestones[i].y, 3, 3);
    }
  }

  getPos(index){
    return (this.milestones[index]);
  }
}
