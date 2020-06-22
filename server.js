const express = require("express");
const app = express();
const axios = require("axios");
const discord = require("discord.js");
require("/app/runserver.js")
const roblox = require("noblox.js");
const { Client, RichEmbed } = require("discord.js");
let client = new Client();
let token = "NzIxNzUzNzI3NDU0Njc0OTU1.XuZH7Q.TykBOU_FfGPAM9f6a-D3TJSebSk";
let scriptID =
  "AKfycbzOddS8ehKCI2xEetaQzURsYLGE5vvcctQ2qY4OIbblsXydMqk" + "/exec";
let BOTID = 1;
client.login(token);

client.on("ready", () => {
  console.log("Ready");
});

 
/*INSERT GROUP ID AND COOKIE ABOVE*/
 
 





let prefix = ";";

function isCommand(command, message) {
  var command = command.toLowerCase();
  var content = message.content.toLowerCase();
  return content.startsWith(prefix + command);
}
client.on("message", message => {
  if (message.author.id != BOTID) {
    if (message.member != null) {
      const acceptedRoles = [
        "Moderator",
        "Administrator",
        "Developers",
        "Owner",
        "Bot"
      ];
      const getModRole = message.member.roles.find(role =>
        acceptedRoles.includes(role.name)
      );
      if (!getModRole) {
        console.log("No role found");
      } else if (getModRole) {
        const args = message.content.slice(prefix.length).split(" ");
        if (isCommand("Ban", message) && isNaN(args[1]) == false) {
          let reason = args.slice(2).join(" ");
          console.log("Banning player UserId " + args[1]);
          let embed = new discord.RichEmbed()
            .setColor("#ff1a1a")
            .addField("Banned player UserId " + args[1], "Reason: " + reason)
            .addField(
              "User banned by: " + message.member.user.tag,
              "User is banned"
            )
            .setFooter(`CenterBlox`, client.user.avatarURL);
          message.channel.send(embed);
          axios.post(
            "https://script.google.com/macros/s/" +
              scriptID +
              "?sheet=Global&key=" +
              args[1] +
              "&value=" +
              true +
              "&reason=" +
              reason +
              "&moderator=" +
              message.member.user.tag,
            {}
          );
        } else if (isCommand("Unban", message) && isNaN(args[1]) == false) {
          let embed = new discord.RichEmbed()
            .setColor("#ff1a1a")
            .addField(
              "Unbanned player UserId " + args[1],
              "User has been unbanned"
            )
            .addField(
              "User unbanned by: " + message.member.user.tag,
              "If this was a mistake please contact a HR."
            )
            .setFooter(`CenterBlox`, client.user.avatarURL);
          console.log("Unbanning player UserId " + args[1]);
          message.channel.send(embed);
          axios.post(
            "https://script.google.com/macros/s/" +
              scriptID +
              "?sheet=Global&key=" +
              args[1] +
              "&value=" +
              false +
              "&reason=Unbanned" +
              "&moderator=" +
              message.member.user.tag,
            {}
          );
        }
      }
    }
  }
});



client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "getuser") {
    let username = args[0];

    if (username) {
      roblox
        .getIdFromUsername(username)
        .then(id => {
          if (id) {
           
            roblox.getPlayerInfo(parseInt(id)).then(function(info) {
              let embed = new discord.RichEmbed()
                .setColor("#FFFFFF")

                .setThumbnail(
                  `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
                )

                // more information, please senpai? you haven't given me anything :(
                .addField("Username", info.username || "Unresolvable", true)
                .addField("User ID", id || "Unresolvable", true)
                .addField("Blurb", info.blurb || "Nothing", true)
                .addField("Status", info.status || "Nothing", true)
                .addField(
                  "Account Age",
                  `${info.age} days old` || "Unresolvable"
                )
                .addField("User Link", `https://roblox.com/users/${id}/profile`)
                .setFooter(`CenterBlox`, client.user.avatarURL);
              message.channel.send({ embed });
            });
          }
        })
        .catch(function(err) {
          message.channel.send("User not found");
        });
    } else {
      message.channel.send(
        "Please provide a valid username, e.g. ';getuser ROBLOX'."
      );
    }
  }
});

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "getid") {
    let username = args[0];

    if (username) {
      roblox.getIdFromUsername(username).then(id => {
        if (id) {
          roblox.getPlayerInfo(parseInt(id)).then(function(info) {
            let embed = new discord.RichEmbed()
              .setColor("#FFFFFF")

              .setThumbnail(
                `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
              )

              .addField("User ID", id || "Unresolvable", true)
              .setFooter(`CenterBlox`, client.user.avatarURL);
            message.channel.send({ embed });
          });
        } else console.log("Error");
      });
    } else {
      message.channel.send(
        "Please provide a valid username, e.g. ';getuser ROBLOX'."
      );
    }
  }
});

client.on("message", message => {
  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "link") {
    let username = args[0];
    message.channel.send("https://pastebin.com/edit/APPIDHERE");
  }
});

client.on("message", async message => {
  const filter = msg => msg.author.id == message.author.id;
  const options = {
    maxMatches: 1
  };
  if (message.content === "!color") {
    // request
    message.channel.send("What's your fav color?");

    // collector
    let collector = await message.channel.awaitMessages(filter, options);
    let answer = collector.first().content;

    // response
    await message.reply("your fav color is " + answer + "!");
  }
});

client.on("error", console.error);

client.on("message", async message => {
  const filter = msg => msg.author.id == message.author.id;
  const options = {
    maxMatches: 1
  };
  
  let args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "linkcounter")) {
    message.channel.send(
      "Awesome you made it! Since we use a API server to receive applications you need to have a key. Please name your key: example: Cafe counter Bot/Hotel Bot");
     

    let collector = await message.channel.awaitMessages(filter, options);
    let answer = collector.first().content;

    await message.channel.send(
      "Congrats! You have created a key to link the member counter!. Paste the key into the box that says KEYHERE. Your bot name is: " +
        answer
    );
    message.channel
      .createWebhook(
        answer,
        "https://tr.rbxcdn.com/e782939fc2f8ba0b69627497359b1b09/420/420/Decal/Png"
      )
      .then(webhook =>
        webhook
          .edit(
            answer,
            "https://tr.rbxcdn.com/e782939fc2f8ba0b69627497359b1b09/420/420/Decal/Png"
          )
          .then(wb => message.author.send(`KEY: ${wb.id}/${wb.token}`))

          .catch(console.error)
      )
      .catch(console.error);
    setTimeout(function() {
      message.channel.send(
        "Please check your dm's. We send you the key as a safety measure to prevent spammers(Also because it's a private key.)"
      );
    }, 3000); //time in milliseconds
  }
});


client.on("message", message => {
  if (message.content.startsWith(prefix + "setup")) {
    if (message.deletable) {
      message.delete();
    }
    message.channel.send("Thanks you for using CenterBlox We are now setting you up!")
    
.catch(console.error)
    
    function myFunc(arg) {
  message.channel.send("Alright! Everything looks good on our end. Lets get you setup. First run ;linkcounter to proceed.")
}

setTimeout(myFunc, 5000, 'funky');
    message.channel.send("Getting things ready...")
    
  }
});




client.on('message', message => {
  if (message.content.startsWith(prefix + "kick")) {
       
     
        if(message.channel.type === 'DM') {
          
            message.channel.send('This command can use only in guide');
            return;
        };

       
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('You have no permissions to do that');
            return;
        };

  
        let mentionMember = message.mentions.members.first();
        
        if(!mentionMember) {
            message.channel.send('pls mention member witch you need to kick');
            return;
        }

        //Get the highest role of user for compare
        let authorHighestRole = message.member.highestRole.position;
        let mentionHighestRole = mentionMember.highestRole.position;

        //If mention user have same or higher role, so show this error msg
        if(mentionHighestRole >= authorHighestRole) {
            message.channel.send('You can`t kick members with equal or higher position');
            return;
        };

        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.kickable) {
            message.channel.send('I have no permissions to kick this user');
            return
        };

        //If all steps are completed successfully try kick this user
        mentionMember.kick()
            .then(() => console.log(`Kicked ${mentionMember.displayName}`))
            .catch(console.error);
    
    }
}
)

client.on('message', msg => {    //This runs when a message is sent.
const args = msg.content.slice(prefix.length).split(' ');  //Get the arguments
const command = args.shift().toLowerCase();  //Making the command non case-sensitive


if (command === prefix + 'suggest'){   //if command is suggest
const channel = msg.guild.channels.find(ch => ch.name === 'suggestions');  //finds the channel named suggestions 

channel.send('Suggestion:\n ' + args.join(' ')) 

  //Sends the arguments
}     //Closes the if (command === 'suggest'){ 
});   //Closes the client.on('message',msg => {


// WELL THIS IS THE END HUH? NOTE TO SELF: DON'T STOP CENTERBLOX AND BEAT MYCENTER



let GROUP_ID = 5323388
let GOAL = 1000
let count = 391
let wid = "721759588457906278"
let wtoken = "kQcsLo0WlZ-tgB7ZabU8StQy_891Aed6dQpN1fKlTFxir79RErtsmtd7pT7f-i4p0R_8"

let webhook = new discord.WebhookClient(wid, wtoken)
async function updateCount() {
    let response = await axios.get(`https://groups.roblox.com/v1/groups/${GROUP_ID}/`)
    let response_count = response.data.memberCount 
    console.log("got request")
    if (count < response_count) {
        console.log(response_count, count) 
     const embed = new discord.RichEmbed()
.setTitle("New Group Member")
.setDescription(`${response.data.name} | We are at ${response_count} members. Only ${GOAL - response_count} members to go till ${GOAL}!`)
.setFooter("Powered by CenterBlox. © CenterBlox 2020")
webhook.send(embed)
      console.log("Sent")
  if (count == 0) {
            count = response_count
            return;
        }
        count = response_count
    }
}

setInterval(() => {

  updateCount()
}, 9000);









var groupId = 5323388 
var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_4A4B69FCE34245BCC9012E44F0F1034B2326FF2896B4722F7B0FAACDA233DFD364EC40054B9C56EBCE9C5EAD32AE2311DF4E34EAA5B58408B8618B34214DCDE4845646EA2B1C13B011ABAA81E07440146A9BCC7E7F97F7200B8423B7DA871C8617A54F138C52984409AEA51CF61E22DCAF0A83708C64B664FC000CAB91CDF67B87638DDBE4CEC41948F4386358EA39C03EE98F966F1F4458C6D6E333C502B54AAA5CA19A84F5A9D2E6B1C381111BFFC6013623581BA4E3A25E4FD7F1BE297B209D40349B938BD69EE4A30E55B25E1E9282F80A95AFB1CB58665B8660002DBC5079B61DCECE3C5E7CE065B6B1A38071BF76F2C944A0E82A0F4675DD705663E699751BFB0407FD8DD95F083C8F259A1CBFF65D2936D578CB1CACE8D4805F946B78FDB6482C467E5C495097B4BD7E2519EFE16AB909" // << Put your account cookie inside of the quotes
 

 
 

const rbx = require("noblox.js");

 
app.use(express.static("public"));
 
async function startApp() {
  await rbx.cookieLogin(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();
 
app.get("/ranker", (req, res) => {
    var User = req.param("userid");
    var Rank = req.param("rank");
 
    rbx.setRank(groupId, parseInt(User), parseInt(Rank));
    res.json("Ranked!");
});
 
