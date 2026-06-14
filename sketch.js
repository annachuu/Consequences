// CTCH 204 - Final Project
// Title:  Consequences
// Name:   Anna Chu
// Date:   Mar. 30, 2026

/*
  Interactive Objects
  
  Harmful:
    - "GENERATE" button (playdoh)
    - "EXPLAIN" button (playdoh)
    - "CREATE" button (playdoh)
  
  Saving:
    - "DO IT YOURSELF" button (playdoh)
*/

/*
  Stages of Scene:
    1. vibrant living
    2. slowly losing colour
    3. muted
    4. dry, dead, lost of life

*/


// Global Varibles
let stage = 1;           // Stage 1(vibrant) - 4(dead)
let started = false;
let ended = false;
let dustX = [];
let dustY = [];
let dust_speed = [];
let dust_count = 40;




function setup() 
{
  createCanvas(800, 600);
  noStroke();
  
  // initializing dust particles
  for (let i = 0; i < dust_count; i++)
  {
    dustX[i] = random(width);
    dustY[i] = random(400, 600);
    dust_speed[i] = random(0.2, 1.0);
  }
}


function draw() 
{  
  // START: click to begin screen
  if (!started)
  {
    background(0);            //!!! change later
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("Click to begin!", width/2, height/2);
    return;
  }
  
  // END: ending screen with restart
  if (ended)
  {
    background(20);            //!!! change later
    fill(255);
    textAlign(CENTER);
    
    textSize(40);
    text("The world is no more.", width/2, height/2 - 80)
    
    textSize(22);
    text("The environment has been destroyed by the careless actions\nand the unethical use of generative AI.", width/2, height/2 - 20);
    
    textSize(18);
    text("Every choice has consequences.", width/2, height/2 + 40);
    
    textSize(20);
    text("Click to restart", width/2, height/2 + 120);
    
    textSize(14);
    text("(There is no restart in life.)", width/2, height/2 + 150);
    
    return;
  }
  
  // different stage, different colour
  // Reference: https://p5js.org/reference/p5/map/
  let t = map(stage, 1, 4, 0, 1)
  
  function fade(c1, c2)
  {
    // Colour Lerp Reference: https://p5js.org/reference/p5/lerpColor/
    return lerpColor(c1, c2, t)
  }
  
  
  // initializing Vibrant colours
  let skyV = color(180, 230, 255);
  let sunV = color(255, 245, 160);
  let sunglowV = color(255, 250, 200, 150);
  
  let mountainV = color(150, 200, 180);
  let cliffV = color(237, 208, 154);
  
  let waterfallV = color(120, 200, 255);
  let waterfallGlowV = color(255, 255, 255, 120);
  
  let mistV = color(255, 255, 255, 80);
  
  let bg_leavesV = color(190, 240, 120);
  let mg_leavesV = color(80, 200, 110);
  let fg_leavesV = color(30, 120, 70);
  
  let bg_trunkV = color(160, 120, 80);
  let mg_trunkV = color(120, 85, 60);
  let fg_trunkV = color(80, 55, 40);
  
  let fgGrassV = color(50, 120, 60);
  
  
  // initializing Dead colours
  let skyD = color(80, 80, 90);
  let sunD = color(120, 120, 120);
  let sunglowD = color(100, 100, 100, 50);
  
  let mountainD = color(90, 100, 95);
  let cliffD = color(120, 110, 100);
  
  let waterfallD = color(60, 60, 60);
  let waterfallGlowD = color(80, 80, 80, 50);
  
  let mistD = color(120, 120, 120, 40);
  
  let bg_leavesD = color(80, 80, 80);
  let mg_leavesD = color(60, 60, 60);
  let fg_leavesD = color(40, 40, 40);
  
  let bg_trunkD = color(70, 60, 50);
  let mg_trunkD = color(60, 50, 40);
  let fg_trunkD = color(50, 40, 30);
  
  let fgGrassD = color(40, 50, 40);
  
  
  // initializing Colours in one variable each
  let skyC = fade(skyV, skyD);
  let sunC = fade(sunV, sunD);
  let sunglowC = fade(sunglowV, sunglowD);
  
  let mountainC = fade(mountainV, mountainD);
  let cliffC = fade(cliffV, cliffD);
  
  let waterfallC = fade(waterfallV, waterfallD);
  let waterfallGlowC = fade(waterfallGlowV, waterfallGlowD);
  
  let mistC = fade(mistV, mistD);
  
  let bg_leavesC = fade(bg_leavesV, bg_leavesD);
  let mg_leavesC = fade(mg_leavesV, mg_leavesD);
  let fg_leavesC = fade(fg_leavesV, fg_leavesD);
  
  let bg_trunkC = fade(bg_trunkV, bg_trunkD);
  let mg_trunkC = fade(mg_trunkV, mg_trunkD);
  let fg_trunkC = fade(fg_trunkV, fg_trunkD);
  
  let fgGrassC = fade(fgGrassV, fgGrassD);
  
  // calling functions to draw
  sky(skyC);
  sun(sunC, sunglowC);
  mountains(mountainC);
  mist(mistC);
  cliff(cliffC);
  waterfall(waterfallC, waterfallGlowC);
  allTrees(bg_leavesC, mg_leavesC, fg_leavesC, bg_trunkC, mg_trunkC, fg_trunkC);
  foreground(fgGrassC);
  
  // dust called at the very end
  if (stage === 4)
  {
    dust();
  }
}



// User Input Functions
function mousePressed()
{
  if(!started)
  {
    started = true;    
    return;
  }
  
  if (ended)
  {
    stage = 1;
    ended = false;
    return;
  }
}

function keyPressed()
{
  // console reference when testing
  console.log(key);
  if (!started || ended)
  {
    return;
  }
    
  // if harming keys are pressed, then increase the stage
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW || keyCode === DOWN_ARROW)
  {
    if (stage < 4)
    {
      stage++;
    }
    else
    {
      ended = true;
    }
  }
  
  // if non-harming key is pressed, then stages revert
  if (keyCode === UP_ARROW)
  {
    stage--;
    if (stage < 1)
    {
      stage = 1;
    }
  }
}




// Scene Functions
// function to create the background
function sky(c)
{
  background(c);
}

// function to create the sun variations
function sun(c, glow)
{
  let sun_scale = map(stage, 1, 4, 1.0, 0.0);
  
  if (sun_scale <= 0.01)
  {
    return;
  }
  
  // scaling glow and core of sun size depending on stage
  let glow_size = 350 * sun_scale;
  let core_size = 240 * sun_scale;
  
  fill(glow);
  ellipse(width * 0.72, height * 0.25, glow_size, glow_size);
  
  fill(c);
  ellipse(width * 0.72, height * 0.25, core_size, core_size);
}

// function to create the background mountains
function mountains(c)
{
  // vertex reference: https://p5js.org/reference/p5/vertex/
  
  fill(c);
  
  // first mountain
  beginShape();
    vertex(0, 330);
    vertex(0, 100)
    vertex(120, 200);
    vertex(260, 170);
    vertex(380, 250);
    vertex(450, 330);
  endShape(CLOSE);
  
  // second mountain
  beginShape();
    vertex(350, 380);
    vertex(480, 240);
    vertex(650, 260);
    vertex(800, 380);
  endShape(CLOSE);
  
}

// function to create water mists
function mist(c)
{
  let shrink = map(stage, 1, 4, 1.0, 0.0);          // shrinking width

  fill(c);
  ellipse(width/2, 350, 700 * shrink, 70 * shrink);
  ellipse(width/2, 420, 750 * shrink, 80 * shrink);
  ellipse(width/2, 480, 800 * shrink, 90 * shrink);
}

// function to create cliff the waterfall comes from
function cliff(c)
{
  fill(c);
  
  // mountain where waterfall comes from
   beginShape();
    vertex(0, 370)
    vertex(100, 300)
    vertex(370, 200);
    vertex(480, 210);
    vertex(650, 320);
    vertex(850, 270);
    vertex(800, 380);
  endShape(CLOSE);
}

// function to create the waterfall and the river
function waterfall(c, glow)
{
  // reference: https://p5js.org/reference/p5/rect/
  //            rounded corners
  
  // mapping shrinking and fading with stages
  let shrink = map(stage, 1, 4, 1.0, 0.0);          // shrinking width
  let fade = map(stage, 1, 4, 1.0, 0.0);          // fading opacity
  let streakFade = map(stage, 1, 3, 1.0, 0.0);      // streak effects gone by stage 3
  let w = 50 * shrink;
  
  // stage 3, there will be a ditch and puddles
  if (stage === 3)
  {
    ditch();
    puddles();
    return;
  }
  
  // stage 4, there will be no more water left, just a ditch
  if (stage === 4)
  {
    ditch();
    return;
  }
  
  // mist behind
  fill(red(glow), green(glow), blue(glow), 120 * fade);
  ellipse(width/2, 330, 300 * shrink, 240);
  
  fill(c);
  ellipse(width/2, 510, 300 * shrink, 60);
  
  // ripple effect rings
  noFill();
  stroke(red(glow), green(glow), blue(glow), 120 * fade);
  strokeWeight(2);
  ellipse(width / 2, 510, 260 * shrink, 50);
  ellipse(width / 2, 510, 220 * shrink, 40);
  ellipse(width / 2, 510, 180 * shrink, 30)
  
  // water
  noStroke();
  fill(c);
  rect(width/2 - w, 220, w * 2, 300, 50 * shrink);
  
  // waterfall effect streaks
  stroke(255, 255, 255, 60 * streakFade);
  strokeWeight(10 * shrink);
  
  // streak position (maintain within waterfall)
  stroke(255, 255, 255, 60 * streakFade);
  strokeWeight(10 * shrink);
  
  // initializing local variables
  let h = 50;
  let leftX = width / 2 - w * 0.66;
  let midX = width / 2;
  let rightX = width / 2 + w * 0.56;

  // left streaks
  line(leftX, 250, leftX, 250 + h);
  line(leftX, 350, leftX, 350 + h);
  line(leftX, 430, leftX, 430 + h);
  
  // middle streaks
  line(midX, 260, midX, 260 + h);
  line(midX, 360, midX, 360 + h);
  line(midX, 470, midX, 470 + h);
  
  // right streaks
  line(rightX, 250, rightX, 250 + h);
  line(rightX, 335, rightX, 335 + h);
  line(rightX, 400, rightX, 400 + h);
 
  // more streaks for water effect
  stroke(255, 255, 255, 40 * streakFade);
  strokeWeight(2 * shrink);
  line(width/2 - w * 0.9, 260, width/2 - w * 0.5, 275);
  line(width/2 - w * 0.6, 320, width/2 - w * 0.2, 335);
  line(width/2 + w * 0.2, 350, width/2 + w * 0.6, 365);
  line(width/2 - w * 0.3, 400, width/2 + w * 0.1, 415);
  line(width/2 - w * 0.8, 440, width/2 + w * 0.1, 480);
  
  noStroke();
}

// function to create a ditch when little to no water left in stream
function ditch()
{
  noStroke();
  
  // main ditch
  fill(80, 70, 60);
  rect(0, 370, width, 250);
  
  // deeper center
  fill(60, 50, 40);
  ellipse(width * 0.20, 410, 200, 60);
  rect(0, 395, width, 300, 40);
  
  // uneveness
  fill(70, 60, 50);
  ellipse(width * 0.20, 460, 200, 60);
  ellipse(width * 0.80, 480, 200, 60);
  ellipse(width * 0.70, 500, 200, 60);
}

// function to create puddles within the ditch when appears
function puddles()
{
 noStroke();
  
  fill(120, 140, 160, 120);
  ellipse(130, 450, 230, 100);
  ellipse(width/2 - 80, 500, 200, 100);
  ellipse(width/2 + 50, 520, 45, 15);
  ellipse(width/2 + 140, 450, 150, 80);
}

// function to call the tree function and alter based on colours
function allTrees(bg_leavesC, mg_leavesC, fg_leavesC, bg_trunkC, mg_trunkC, fg_trunkC)
{
  // background
  tree(100, 200, bg_leavesC, bg_trunkC, 1.0);
  tree(200, 300, bg_leavesC, bg_trunkC, 0.8);
  
  // midground
  tree(620, 0, mg_leavesC, mg_trunkC, 1.3)
  
  // foreground
  tree(800, 80, fg_leavesC, fg_trunkC, 1.6);
  tree(40, 370, fg_leavesC, fg_trunkC, 0.7);
}

// function to create all tree shapes including leaves, trunk, and scaling them
function tree(x, topY, leavesC, trunkC, scaleFactor)
{
  fill(trunkC);
  rect(x - 12 * scaleFactor, topY, 24 * scaleFactor, height - topY);
  
  // losing leafs throuhg stages
  // note:  stage 1 = 1.0 full leaves
  //        stage 4 = 0.0 no leaves
  let leaf_loss = map(stage, 1, 4, 1.0, 0.0);
  
  // before stage 4, there will be leaves on trees
  if (stage < 4)
  {
    // blobs of leaves
    fill(leavesC);
    
    // bottom
    if (leaf_loss > 0.25)
    {
      ellipse(x, topY + 100 * scaleFactor, 150 * scaleFactor, 190 * scaleFactor);
    }
    
    // top
    if (leaf_loss > 0.45)
    {
      ellipse(x, topY - 20 * scaleFactor, 120 * scaleFactor, 160 * scaleFactor);
    }

    // middle left
    if (leaf_loss > 0.65)
    {
      ellipse(x - 30 * scaleFactor, topY + 40 * scaleFactor, 140 * scaleFactor, 180 * scaleFactor);
    }
    
    // middle right
    if (leaf_loss > 0.80)
    {  
      ellipse(x + 25 * scaleFactor, topY + 60 * scaleFactor, 130 * scaleFactor, 170 * scaleFactor);
    }
  
  
    // !!! texture
    fill(0, 0, 0, 60);

    if (leaf_loss > 0.30)
    {
        ellipse(x - 15 * scaleFactor, topY + 85 * scaleFactor, 6 * scaleFactor);
    }

    if (leaf_loss > 0.40)
    {
        ellipse(x + 5 * scaleFactor, topY + 150 * scaleFactor, 6 * scaleFactor);
    }

    if (leaf_loss > 0.55)
    {
        ellipse(x + 10 * scaleFactor, topY - 35 * scaleFactor, 6 * scaleFactor);
    }

    if (leaf_loss > 0.70)
    {
      ellipse(x - 65 * scaleFactor, topY + 20 * scaleFactor, 6 * scaleFactor);
    }

    if (leaf_loss > 0.85)
    {
      ellipse(x + 40 * scaleFactor, topY + 55 * scaleFactor, 6 * scaleFactor);
    }


    // !! larger texture
    fill (0, 0, 0, 60);

    if (leaf_loss > 0.35)      // bottom
    {
      push();
        translate(x - 50 * scaleFactor, topY + 110 * scaleFactor);
        rotate(PI / 4);
        ellipse(0, 0, 24 * scaleFactor, 14 * scaleFactor);
      pop();
    }

    if (leaf_loss > 0.55)    // top
    {
      push();
        translate(x - 75 * scaleFactor, topY + 5 * scaleFactor);
        rotate(PI / 4);
        ellipse(0, 0, 22 * scaleFactor, 12 * scaleFactor);
      pop();
    }

    if (leaf_loss > 0.75)    // mid
    {
      push();
        translate(x + 70 * scaleFactor, topY + 55 * scaleFactor);
        rotate(PI / -4);
        ellipse(0, 0, 22 * scaleFactor, 12 * scaleFactor);
      pop();
    }
  }
  
  
  // colours of branches
  let b_color = trunkC;
  
  
  // calling branches function to create branches
  branch(x - 10 * scaleFactor, topY + 40 * scaleFactor, 60 * scaleFactor, -1, b_color);
  branch(x + 10 * scaleFactor, topY + 140 * scaleFactor, 75 * scaleFactor, +1, b_color);
}

function branch(x, y, size, direction, c)
{
  // scaling reference:     https://p5js.org/reference/p5/scale/
  // translating reference  https://p5js.org/reference/p5/translate/
  
  push();
    translate(x, y);      // to translate origin to branch base (trunk) which that becomes the new 0,0
    scale(direction, 1);  // scalling horizontally with direction
                          // note: direction 1 is normal
                          //       direction -1 is flipped

    fill(c);
    noStroke();

    beginShape();
      // to base
      vertex(0, 0);
  
      // shape with bumps
      vertex(size * 0.25, -size * 0.1);
      vertex(size * 0.45, -size * 0.25);
      vertex(size * 0.65, -size * 0.15);
      vertex(size * 0.9, -size * 0.3);
      vertex(size * 0.35, size * 0.1);
      vertex(0, size * 0.05);
    endShape(CLOSE);
  pop()
}

// function to create the foreground grass
function foreground(c)
{
  // beziervertex reference: https://p5js.org/reference/p5/bezierVertex/
  let dryC = color(70, 50, 30);
  let finalC;
  
  // if at stage 4, then have foreground grass turn dry
  if (stage === 4)
  {
    finalC = dryC;
  }
  else
  {
    finalC = c;
  }
  
  fill(finalC);  // final colour depending on stages
  
  // map reference: https://p5js.org/reference/p5/map/
  let sag = map(stage, 1, 4, 0, 40);    // grass sags down as the stages increase
  
  beginShape();
    vertex(0, 550 + sag);
    // (x2, y2, x3, y3, x4, y4, x5, y5, x6, y6)
    bezierVertex(50, 520 + sag, 150, 560 + sag, 200, 550 + sag);
    bezierVertex(300, 530 + sag, 380, 500 + sag, 440, 540 + sag);
    bezierVertex(470, 560 + sag, 500, 560 + sag, 520, 540 + sag);
    bezierVertex(590, 490 + sag, 700, 520 + sag, 800, 540 + sag);
    vertex(800, 600)
    vertex(0, 600);
  endShape(CLOSE);
}

// function to create dust effect at the very end showing nothing left
function dust()
{
  fill(200, 180, 150, 80);
  
  for (let i = 0; i < dust_count; i++)
  {
    ellipse(dustX[i], dustY[i], 6, 6);    // dust particles
    
    // let it move upwards
    dustY[i] -= dust_speed[i];
    
    if (dustY[i] < 350)      // resets when off screen
    {
      dustX[i] = random(width);
      dustY[i] = random(500, 600);
      dust_speed[i] = random(0.2, 1.0);
    }
  }
}

