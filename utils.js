function lerp(A,B,t){
  return A+(B-A)*t;
}

function polysIntersect(poly1, poly2) {
  for(let i=0; i<poly1.length;i++) {
    for(let j=0; j<poly2.length;j++) {
      const touch=getIntersection(
        poly1[1],
        poly1[(i+1)%poly1.length],
        poly2[j],
        poly2[(j+1)%poly2.length]
      );
      if(touch){
        return true;
      }
    }
  }
}

function getIntersection(A,B,C,D){ 
  const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
  const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
  const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
  
  if(bottom!=0){
      const t=tTop/bottom;
      const u=uTop/bottom;
      if(t>=0 && t<=1 && u>=0 && u<=1){
          return {
              x:lerp(A.x,B.x,t),
              y:lerp(A.y,B.y,t),
              offset:t
          }
      }
  }

  return null;
}

function basicDraw(ctx){
  ctx.save();
  ctx.translate(this.x,this.y);
  ctx.rotate(-this.angle);

  ctx.beginPath();
  ctx.rect(
      -this.width/2,
      -this.height/2,
      this.width,
      this.height
  );
  ctx.fill();

  ctx.restore();
}

function getRGBA(value){
  const alpha=Math.abs(value);
  const R=value<0?0:255;
  const G=R;
  const B=value>0?0:255;
  return "rgba("+R+","+G+","+B+","+alpha+")";
}

function mutate(network, amount=1){
  network.levels.forEach(level => {
      for(let i=0; i<level.biases.length;i++){
          level.biases[i]=lerp(
              level.biases[i],
              Math.random()*2-1,
              amount
          )
      }
      for(let i=0; i<level.weights.length;i++){
          for(let j=0; j<level.weights[i].length;j++){
              level.weights[i][j]=lerp(
                  level.weights[i][j],
                  Math.random()*2-1,
                  amount
              )
          }
      }
  })
}

function randomizeFunction(maxNum=4){
  return Math.floor(Math.random()*maxNum);
}