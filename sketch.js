/**
 * Olivia Gauthier
 * IGME-102: Project 2 Health Visualization, 11/15/23
 * Create a program that visualizes US adult health data based on JSON data files
 */

"use strict"; //catch some common coding errors

/* Global variables */
let display;
let numFormat = {};
let censusTract = [];
let visLegend;

function preload() {
   visLegend = loadImage("media/Vis Legend.png");
}

/**
 * setup :
 */
function setup() {
   createCanvas(800, 500);
   textSize(7);

   format();
   loadJSON("media/nyPlacesHealthTracts (1).json", readTracts);
   loadJSON("media/gaPlacesHealthTracts (2).json", readTracts);

   display = new UIManager();

   image(visLegend, 30, 100);
}

function radio1Clicked() {
   background("pink");
   let localArray = [];
   image(visLegend, 20, 25);


   if (display.radio1.value() == "Monroe, NY") {
      localArray = censusTract.filter(tract => { return tract.state == "NY" });
      textSize(20);
      text("Monroe", 20, 20)
      textSize(7);
   } else if (display.radio1.value() == "Fulton, GA") {
      localArray = censusTract.filter(tract => { return tract.state == "GA" });
      textSize(20);
      text("Fulton", 20, 20)
      textSize(7);
   } else {
      localArray = censusTract;
      console.log("no")
   } 

   if (display.radio3.value() == "For GINI coefficient < .33") {
      localArray = localArray.filter(tract => { return tract.gini < .33 });
   } else if (display.radio3.value() == "For >30% non-white tracts") { 
      localArray = localArray.filter(tract => { return tract.white / tract.population > .30 });
   } else {
      localArray = localArray;
   }

   localArray.forEach(item => {
      if (display.radio2.value() == "Map median asthma, high blood pressure, & whiteness") {
         item.display();
         if (display.radio4.value() == "Details") {
            item.displayText1();
         }
      } else if (display.radio2.value() == "Map GINI coefficient, no health insurance, & median income") {
         item.display2();
         if (display.radio4.value() == "Details") {
            item.displayText2();
         }
      }
   });
}

function format() {
   numFormat.num = Intl.NumberFormat();
   numFormat.pct = Intl.NumberFormat("us-EN", { style: 'percent' });
   numFormat.cur = new Intl.NumberFormat("us-EN", { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function readTracts(fileStrings) {
   //console.log("got", fileStrings);
   let temp;

   for (let line of fileStrings) {
      temp = new Census(line);
      censusTract.push(temp);
   }

   background("pink");
}

