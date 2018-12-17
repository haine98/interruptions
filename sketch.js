var boolDoRefresh;
var size = 40;
var gridSpacing = 12; 
var lineLength = 20;
var angleList = [];
var startAngle = 0;
 
//Things to consider while creating "gaps":
//how many gaps?
//how large are the gaps?
//which row/col are the gaps located?
 
var gapList = [];
 
function setup(){
  createCanvas(720,720);
  boolDoRefresh = true;
  var slant = random(0,1);
  var isVertical = random(0,1);
  for (var i = 0; i &lt; width + lineLength; i += gridSpacing){
    for (var j = 0; j &lt; height + lineLength; j += gridSpacing){
    if (isVertical &lt; 0.5){
      append(angleList, random(-1*PI, PI)); //angle of line horizontal
    }
    else{
      append(angleList, random(-1*PI, PI) + (PI)); //angle of line vertical
    }
  }
  }
  createGaps();
}
 
function createGaps(){
  var gridSlots = sq(round(((width + lineLength + 1)/gridSpacing)))
  var numGap = int(random(3,15));
  for (var k = 0; k < numGap; k += 1){
    gapList = append(gapList, int(random(1, gridSlots)));
    gapSize = int(random(10,80));
    for (var m = 1; m < gapSize; m += 1){
      chance = random(0,1);
      if (random(0,1) < 0.8){
        if (chance < 0.4){
          append(gapList, gapList[m-1] + 1);
        }
        else{
          append(gapList, gapList[m-1] - 1);
        }
      }
      else{
        if (chance < 0.6){
          append(gapList, gapList[m-1] + 59);
        }
        else{
          append(gapList, gapList[m-1] - 59);
        }
      }
      for (var n = 0; n < gapList.length; n += 1){
        angleList[gapList[n]] = 1000;
      }
    }
    gapList = [];
  }
}
 
function draw(){
  if (boolDoRefresh){
    for (var i = lineLength; i &lt; width - lineLength; i += gridSpacing){
      for (var j = lineLength; j &lt; height - lineLength; j += gridSpacing){
        strokeWeight(1);
        //ellipse(i,j, 5,5);
        var angle = angleList[startAngle];
        if (angle &lt; 999){
          //I gave each line their own little "squares" on a grid of W x H
          //Each grid consists of two lines, one line is a reflection of the other line
          //Both lines start at the center of their "squares"
          //Thus, the two lines together look like one line
          line(i, j , i+(lineLength/2)*cos(angle), j+(lineLength/2)*sin(angle));
          line(i, j , i+(lineLength/2)*cos(angle+PI), j+(lineLength/2)*sin(angle+PI));
        }
        startAngle += 1;
      }
    }
  }
  boolDoRefresh = false;
}
 
function mousePressed(){
  boolDoRefresh = true;
  angleList = [];
  startAngle = 0;
  gapList = [];
  setup();
}
