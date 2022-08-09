// Constants

// Required NPM Modules
const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');

const targetFile = fs.createWriteStream('pain.csv')

// Coordinate Boundary Variables - Note that the upperleft-most point is xMin, zMin; with x growing right and z growing down.
const xMax = 37;
const xMin = -750;
const zMax = -416;
const zMin = -1075;


// CSV Formatter Args
const formatter = csv.format({
  delimeter: ',',
  rowDelimeter: '\n',
  headers: false,
  writeHeaders: false
});
formatter.pipe(targetFile);

// f(x, y) = x^3 + xy^2 + y^2   // Function to plug in the variables
// u = (-125)i + (230)j         // Probable vector modifying the starting or ending value - TDB

const fishify = (x, y) => ((x ** 3) + (x * (y ** 2)) + (y ** 2));   // Above function
const vectorOffset = ([x, y]) => [x - 125, y + 230];                // Offsets an X, Y pair by the vector values <-125, 230>


// Useless vars that are just for fun ending stats
var totalCount = 0;
var rowsCount = 0;


let currentRow = [];    // I don't want to create a memory leak

// Looping through our coordinate space, C
// Note that i and j are ONLY typical looping variables and are NOT related to the vector from above
for (let i = xMin; i <= xMax; i++) {
  currentRow = [];
  for (let j = zMin; j <= zMax; j++) {
    currentRow.push(fishify(i, j));
    totalCount++;
  }
  formatter.write(currentRow);
  rowsCount++;
}

console.log(`Writing Complete.\nWrote ${rowsCount} rows and a total of ${totalCount} enteries`);