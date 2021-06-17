const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = "NzU0MDYzMzAxODc2MzgzNzg0.X1vSLA.EopDFEziUC-Trr4FGlMETwL2zrc";


var prefix = ".";
var returnInfo = 0;

client.login(TOKEN);

function Find(personID) {
  fs.readFile('Allowed-Users.json',  handleRead);
  returnInfo = 0;
  function handleRead(err, data) {
    if (err) { throw err; return; }
    var recArray = JSON.parse(data);
    var found = false;
    for(i = 1; i <= recArray[0].pplAmount; i++)
    {
      if(recArray[i].id == personID)
      {
        returnInfo = 2;

        found = true;
        return 1;
      }
    }
  }
  return returnInfo;
}

function FindOrMake(personID) {
  fs.readFile('Allowed-Users.json',  handleRead);
  returnInfo = 0;
  function handleRead(err, data) {
    if (err) { throw err; return; }
    var recArray = JSON.parse(data);
    var found = false;
    for(i = 1; i <= recArray[0].pplAmount; i++)
    {
      if(recArray[i].id == personID)
      {
        returnInfo = 2;

        found = true;
        return 1;
      }
    }
    if(!found)
    {
      console.log("Person not found. Making a new profile");
      fs.readFile('Allowed-Users.json', (err, data) => {
        returnInfo = 0;
        if (err) { throw err; return 0; }
        let recArray = JSON.parse(data);
        let dataArray = {id: 0, banned: 0};
        dataArray.id = msg.author.id;
        recArray.push(dataArray)
        recArray[0].pplAmount += 1;
        var dataSend = JSON.stringify(recArray, null, 2)
        fs.writeFile('Allowed-Users.json', dataSend, (err) => { msg.channel.send("> New profile created"); });
        for(i = 1; i <= recArray[0].pplAmount; i++)
        {
          if(recArray[i].id == personID)
          {
            found = true;
            returnInfo = 1;
            return 1;
          }
        }
      });
    }
    found = false;
  }
  return returnInfo;
}


client.on('message', msg => {
  if(msg.author.id == client.user.id) return;
  // if(!message.channel.type === 'dm') { msg.channel.send("You can only ") }

  if(msg.content.toLowerCase() == prefix + "getstarted") {
    var val = FindOrMake(msg.author.id);

    if(val == 0) {
      msg.channel.send("There was an error")
      return;
    }
    else
    {
      if(val == 1) {
        msg.channel.send("New account created. Welcome!")
      }
      else
      {
        if(val == 2) {
          msg.channel.send("Account already exists lol.");
        }
      }
    }
  }

  //
  // Anything bellow here requires the user id of the wuthor to be in "Allowed-Users".
  //



});
