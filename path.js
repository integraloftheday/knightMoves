var MovesCode=" size= 5000; \n steps=5000; \n function knightMoves(x,y){ \n \t upright=[x+1,y+2]; \n \t upleft=[x-1,y+2]; \n \t rightup=[x+2,y+1]; \n \t rightdown=[x+2,y-1]; \n \t downright=[x+1,y-2]; \n \t downleft=[x-1,y-2]; \n \t leftdown=[x-2,y-1]; \n \t leftup=[x-2,y+1]; \n \t return([upright,upleft,rightup,rightdown,downright,downleft,leftdown,leftup]); }";
var size=100;
var steps=100;
var C; 
var x;
var y;
var value;

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

function knightMoves2(x,y){
  var dagsteps=4;
  var moves=[];
  for(i=0;i<dagsteps;i++){
    moves.push([x+i,y+i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x-i,y-i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x-i,y+i]);
  }
  for(i=0;i<dagsteps;i++){
    moves.push([x+i,y-i]);
  }
  return(moves);
}
// BASE FUNCTION FOR 2048

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

}


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
function pathAlterations(){

}

function run(size,steps){
eval(MovesCode);
var path=[]
var pathx=[]
var pathy=[]
C=Sprial(xCord,yCord,size,0);
C[0]=[0,0,1,true];
var L=[0,0]; 
var NewL;
var I;
var Steps=0;
pathAlterations();
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


/*var trace1 = {
  x: x,
  y: y,
  mode: 'markers'
};

var data = [ trace1];

var layout = {};

Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});*/
