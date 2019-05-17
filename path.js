


//FIELD Generation
var UlamSprial=[]
function xCord(n){

  if(n==1){
    return(0);
  }
  else{
    return(Math.round(xCord(n-1)+Math.sin((Math.floor(Math.sqrt(4*(n-2)+1))%4)*(Math.PI/2))));
  }
}

function yCord(n){

  if(n==1){
    return(0);
  }
  else{
    return(Math.round(yCord(n-1)+Math.cos((Math.floor(Math.sqrt(4*(n-2)+1))%4)*(Math.PI/2))));
  }
}
function CordtoValue(x,y,Cords){ //index is value-1
  // /console.log("ran1");
  for(u=0;u<Cords.length;u++){
    //console.log("ran");
    if(Cords[u][0]==x && Cords[u][1]==y){
      return(Cords[u][2]-1);
    }
  }
}


function Sprial(xValue,yValue,MaxNumber,offset){
  Cords=[]
  for(i=1;i<=MaxNumber;i++){
    Cords.push([xValue(i),yValue(i),i+offset,false]);
  }
  return(Cords);
}

function knightMoves1(x,y){
  upright=[x+1,y+1];
  rightup=[x+2,y+2];
  more1=[x+3,y+3];

  upleft=[x-1,y+1];
  leftup=[x-2,y+2];
  more2=[x-3,y+3];

  downright=[x+1,y-1];
  rightdown=[x+2,y-2];
  more3=[x+3,y-3];

  downleft=[x-1,y-1];
  leftdown=[x-2,y-2];
  more4=[x-3,y-3];

  return([upright,upleft,rightup,rightdown,downright,downleft,leftdown,leftup,more1,more2,more3,more4]);

}

function knightMoves(x,y){
  var dagsteps=3;
  var moves=[]
  for(i=0;i<dagsteps;i++){
    moves.push([x+16*i,y+i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x-i,y-16*i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x-i,y+i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x+16*i,y-i]);
  }
  return(moves);
}
/* BASE FUNCTION FOR 2048
function knightMoves(x,y){
  upright=[x+1,y+2];
  upleft=[x-1,y+2];
  rightup=[x+2,y+1];
  rightdown=[x+2,y-1];
  downright=[x+1,y-2];
  downleft=[x-1,y-2];
  leftdown=[x-2,y-1];
  leftup=[x-2,y+1];
  return([upright,upleft,rightup,rightdown,downright,downleft,leftdown,leftup]);

}*/
function knightLowestandTrue(x,y,cords,moves){
  var lowestnumber=100000000000000;
  var lowestmove=[];
  for(q=0;q<moves.length;q++){ // i index was conflicting with something
    //console.log("testing");
    index=CordtoValue(moves[q][0],moves[q][1],cords);
  //  console.log("index")
  //  console.log(index);
  //  console.log("cordsIndex");
  //  console.log(cords[index][3]);
    if(index+1<lowestnumber && cords[index][3]==false){
      //console.log("q "+String(q));
      //console.log([cords[index][0],cords[index][1]]);
      lowestnumber= index;
      lowestmove=[cords[index][0],cords[index][1]];
    }

  }

  return(lowestmove);
}
function run(size,steps){
var path=[]
var pathx=[]
var pathy=[]
var C=Sprial(xCord,yCord,size,0);
C[0]=[0,0,1,true];
var L=[0,0];
var NewL;
var I;
var Steps=0;
while(Steps<steps){
  NewL=knightLowestandTrue(L[0],L[1],C,knightMoves(L[0],L[1]));
  /*if(NewL=false){
    break;
  }*/
  I=CordtoValue(NewL[0],NewL[1],C);
  //console.log(I+1);
  path.push(I+1);
  pathx.push(L[0]);
  pathy.push(L[1]);
  //console.log(L);
  try{
    C[I][3]=true;}
  catch(err){
    break;
  }
    L=NewL;
    Steps++;
}
return([path,pathx,pathy]);
}

var dataC=run(10000,75000);
console.log(dataC[0].slice(0,20));
var x = dataC[1];
var y = dataC[2];
var value=dataC[0];
/*var trace1 = {
  x: x,
  y: y,
  mode: 'markers'
};

var data = [ trace1];

var layout = {};

Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});*/
