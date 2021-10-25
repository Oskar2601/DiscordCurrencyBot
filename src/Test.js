const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.DISCORDJS_BOT_TOKEN;


var prefix = ".";
var line = 0;


client.login(TOKEN);

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.id == client.user.id) return;

  if(msg.content.toLowerCase() == "sos capos") {
    msg.channel.send("sos capos");
  }


  function useEmbeds(title, desc) {
    msg.channel.send({
        embed: {
        color: 16776960,
        title: title,
        description: desc,
        footer: {
          text: "© Copyright stuff"
        }
      }
    });
  }


  function errorEmbed(ID) {
    error_color = 0xFF0000;
    error_title= "Error";
    if (ID == 1) {
          msg.channel.send({
          embed: {
          color: error_color,
          title: error_title,
          description: "You don't have permissions to execute this command."
        }
      });
    } else if (ID == 2) {
          msg.channel.send({
            embed: {
            color: error_color,
            title: error_title,
            description: "You have provided improper arguments."
        }
      });
    } else if (ID == 3) {
          msg.channel.send({
            embed: {
            color: error_color,
            title: error_title,
            description: "This command has failed to execute."
        }
      });
    }
  }


  function find(personID, Add, cashAdd) {
    fs.readFile('jsonfile.json',  handleRead);
    line = 0;
    function handleRead(err, data) {
      if (err) throw err;
      var recArray = JSON.parse(data);
      var found = false;
      var cashFound = 0;
      for(i = 1; i <= recArray[0].pplAmount; i++)
      {
        if(recArray[i].id == personID)
        {
          recArray[i].cash  += cashAdd;
          var dataSend = JSON.stringify(recArray, null, 2)

          if(Add == true)
          {
            if(cashAdd < 0) {
              fs.writeFile('jsonfile.json', dataSend, (err) => { msg.channel.send(`Deducted ${cashAdd} from user. They now have ${recArray[i].cash} Coins!`); });
            }
            else
            {
              if(cashAdd > 0) {
                fs.writeFile('jsonfile.json', dataSend, (err) => { msg.channel.send(`Added ${cashAdd} to user. They now have ${recArray[i].cash} Coins!`); });
              }
            }
          }


          found = true;
          line = i;
          return 1;
        }
      }
      if(!found)
      {
        console.log("Person not found. Maybe make a new profile?");
        fs.readFile('jsonfile.json', (err, data) => {
            if (err) throw err;
            let recArray = JSON.parse(data);
            let dataArray = {id: 0, cash: 750, testCoins: 0, "Inventory": [{"Slot1": 0,"Amount1": 0,"Slot2": 0,"Amount2": 0,"Slot3": 0,"Amount3": 0,"Slot4": 0,"Amount4": 0,"Slot5": 0,"Amount5": 0,"Slot6": 0,"Amount6": 0,"Slot7": 0,"Amount7": 0,"Slot8": 0,"Amount8": 0,"Slot9": 0,"Amount9": 0,"Slot10": 0,"Amount10": 0}]};
            dataArray.id = msg.author.id;
            dataArray.cash += cashAdd;
            recArray.push(dataArray)
            recArray[0].pplAmount += 1;
            var dataSend = JSON.stringify(recArray, null, 2)
            fs.writeFile('jsonfile.json', dataSend, (err) => { msg.channel.send("> You now have 750 Coins!"); });
            for(i = 1; i <= recArray[0].pplAmount; i++)
            {
              if(recArray[i].id == personID)
              {
                found = true;
                line = i;
                return 1;
              }
            }
        });
      }
      found = false;
    }
    return line;
  }


  function getCash(userID,Add,Item) {
    let foundItem = false;
    let val = 0;
    fs.readFile('jsonfile.json', handleRead);
    line = 0;
    function handleRead(err, data) {
      if (err) throw err;
      let recArray = JSON.parse(data);
      var found = false;
      var cashFound = 0;
      for(i = 1; i <= recArray[0].pplAmount - 1; i++)
      {
        if(userID == recArray[i].id)
        {
          foundItem = true;

        }
      }
    }
  }


  if(msg.content.toLowerCase().startsWith(prefix + "give ")) {
    if(msg.author.id == 668237848947982356 || 770426477132251176)
    {
      var money = msg.content.substring(
        msg.content.lastIndexOf(" ") + 1,
        msg.content.length
      );
      console.log(money);
      find(msg.mentions.members.first().id, true, parseInt(money))
    }
  }

  if (msg.content.toLowerCase().startsWith(prefix + "ban ")) {
    if (msg.guild == null) return;
    let User = msg.guild.member(msg.mentions.users.first());
    if(msg.mentions.members.size > 0) {
      if(msg.mentions.users.first().id == "668237848947982356") { useEmbeds("No.", "No. He's my creator <3"); return; }
    }
    if (!msg.member.hasPermission("BAN_MEMBERS")) return errorEmbed(1);
    if (!User) return errorEmbed(2);
    if (User.hasPermission("BAN_MEMBERS")) return errorEmbed(1);
    let banReasonunfil = msg.content.substring(prefix.length + 26, msg.content.length);
    let banReason = msg.content.substring(prefix.length + 26, msg.content.length);
    if (!banReason) {
      banReason = msg.member.user.tag + " || BANNED || Reason: None";
    }
    else
    {
      banReason = msg.member.user.tag + " || BANNED || Reason: " + banReasonunfil;
    }


    User.ban(banReason).catch(console.error);
    useEmbeds("Banned. ", msg.mentions.users.first().tag + " was banned by " + msg.member.user.tag + " for " + banReasonunfil + ".");
  }


  //
  //  KICK
  //
  if(msg.content.toLowerCase().startsWith(prefix + "kick ")) {
    if (msg.guild == null) return;
    let User = msg.guild.member(msg.mentions.users.first());
    if(msg.mentions.members.size > 0) {
      if(msg.mentions.users.first().id == "668237848947982356") { useEmbeds("No.", "No. He's my creator <3"); return; }
    }
    if (!msg.member.hasPermission("KICK_MEMBERS")) return errorEmbed(1);
    if (!User) return errorEmbed(2);
    if (User.hasPermission("KICK_MEMBERS"));
    let kickReasonunfil = msg.content.substring(prefix.length + 27, msg.content.length);
    let kickReason = msg.content.substring(prefix.length + 27, msg.content.length);
    if (!kickReason) {
      kickReason = msg.member.user.tag + " || KICKED || Reason: None";
    }
    else
    {
      kickReason = msg.member.user.tag + " || KICKED || Reason: " + kickReasonunfil;
    }

    User.kick(kickReason).catch(console.error);
    useEmbeds("Kicked. ", msg.mentions.users.first().tag + " was kicked by " + msg.member.user.tag + " for " + kickReasonunfil + ".");
  }


  if(msg.content.toLowerCase() == prefix + "start" && find(msg.author.id, false, 0) > 0) {
    msg.channel.send("> You now have 750 Coins!");
  }

  //if(msg.content.toLowerCase() == prefix + "jsonstart" && find(msg.author.id, false, 0) > 0) {
  //  msg.channel.send("> You now have 750 Coins!");
  //}
});
