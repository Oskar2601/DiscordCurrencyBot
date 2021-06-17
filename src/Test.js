const fs = require('fs');

var text = "aye";

// Object - Table
var dataArray = {id: 0, cash: 750, "Inventory": [{"Slot1": 0,"Amount1": 0,"Slot2": 0,"Amount2": 0,"Slot3": 0,"Amount3": 0,"Slot4": 0,"Amount4": 0,"Slot5": 0,"Amount5": 0,"Slot6": 0,"Amount6": 0,"Slot7": 0,"Amount7": 0,"Slot8": 0,"Amount8": 0,"Slot9": 0,"Amount9": 0,"Slot10": 0,"Amount10": 0}]};


// WORKS !!!!!!!!!!!!!!
/*
fs.readFile('jsonfile.json', (err, data) => {
    if (err) throw err;
    let recArray = JSON.parse(data);
    recArray.push(dataArray)
    recArray[0].pplAmount += 1;
    var dataSend = JSON.stringify(recArray, null, 2)
    fs.writeFile('jsonfile.json', dataSend, (err) => { console.log("JSON data is saved."); });
});
*/
/*
fs.readFile('jsonfile.json', (err, data) => {
    if (err) throw err;
    let recArray = JSON.parse(data);
    console.log(recArray[1].name);
});
*/

function find(personID) {
  fs.readFile('jsonfile.json', handleRead);

  function handleRead(err, data) {
    if (err) throw err;
    let recArray = JSON.parse(data);
    recArray[0].pplAmount;
    var found = false;
    var cashFound = 0;
    for(i = 1; i <= recArray[0].pplAmount; i++)
    {
      if(recArray[i].id == personID)
      {
        console.log("Found At: " + i);
        found = true;
        cashFound = recArray[i].cash;
        console.log(cashFound);
        return 1;
      }
    }
    if(!found)
    {
      console.log("Person not found. Maybe make a new profile?");
      return 0;
    }
    found = false;
  }
  if(true)
  {

  }
}



console.log(find(0));
