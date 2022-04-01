//main
load_code(10)
load_code(11)
load_code(12)
Init_configs();
configs.char = new Object();

//Everyone Configs

configs.mode.move.enabled = 1
configs.mode.move.interval = 250
configs.mode.move.leader = "Sychris"

configs.pots.useHpPotAtPercent = 50
configs.pots.useMpPotAtPercent = 50
configs.pots.useHpPotType = "hpot0"
configs.pots.useMpPotType = "mpot0"



//Healz Configs

configs.mode.heal.enabled = 0
configs.mode.heal.interval = 250


//Attacker Configs

configs.mode.attack.enabled = 1
configs.mode.attack.interval = 250

configs.mode.inv_dump.enabled = 1
configs.mode.inv_dump.interval = 3000
configs.mode.inv_dump.sendTo = "loots"
configs.mode.inv_dump.wList = ["tracker", "mpot0", "hpot0", "mpot1", "hpot1", "mpot2", "hpot2"];

//Merc Configs
configs.mode.stall = new Object();
configs.mode.stall.enabled = 0
configs.mode.stall.interval = 100

configs.mode.luck.enabled = 0
configs.mode.luck.interval = 1000

configs.mode.givePots.enabled = 0
configs.mode.givePots.invetval = 1000

configs.mode.upgrade.enabled = 0
configs.mode.upgrade.interval = 1000
configs.mode.upgrade.max_level = 8; //Max level it will stop upgrading items at if enabled
configs.mode.upgrade.upgradeWhitelist = {
   //ItemName, Max Level
   pyjamas: configs.mode.upgrade.max_level,
   bunnyears: configs.mode.upgrade.max_level,
   bow: 7,
   carrotsword: configs.mode.upgrade.max_level,
   cclaw: 7,
   firestaff: 7,
   fireblade: 7,
   slimestaff: 6,
   sshield: 7,
   shield: 7,
   shoes: 6,
   staff: 7,
   gloves: 7,
   coat: 7,
   helmet: 7,
   pants: 7,
   gloves1: 7,
   coat1: 7,
   helmet1: 7,
   pants1: 7,
   shoes1: 7,
   harbringer: 5,
   oozingterror: 5,
   bataxe: 7,
   spear: 7,
   xmaspants: 7,
   xmassweater: 7,
   xmashat: 7,
   xmasshoes: 7,
   mittens: 7,
   ornamentstaff: 7,
   candycanesword: 7,
   warmscarf: 7,
   t2bow: 7,
   pmace: 7,
   basher: 7,
   harmor: 5,
   hgloves: 5,
   wingedboots: 7,
   wattire: 7,
   wbreeches: 7,
   wcap: 7,
   wgloves: 7,
   wshoes: 7
};

configs.mode.upgrade.combineWhitelist = {
   //ItemName, Max Level
   wbook0: 3,
   lostearring: 2,
   strearring: 3,
   intearring: 3,
   dexearring: 3,
   hpbelt: 3,
   ringsj: 3,
   strring: 3,
   intring: 3,
   dexring: 3,
   vitring: 3,
   dexamulet: 3,
   intamulet: 3,
   stramulet: 3,
   vitearring: 3,
   hpamulet: 2,
   dexbelt: 3,
   intbelt: 3,
   strbelt: 3
}


var pots_to_request = {
   //ItemName, Count
   mpot0: 1000,
   hpot0: 1000
}

//intervals
setInterval(heal_mode, configs.mode.heal.interval);
setInterval(Attack_mode, configs.mode.attack.interval);
setInterval(movement_mode, configs.mode.move.interval);
setInterval(luck_players, configs.mode.luck.interval);
setInterval(upgrade_mode, configs.mode.upgrade.interval);
setInterval(top_up_pots, configs.mode.givePots.invetval)
setInterval(inv_dump, configs.mode.inv_dump.interval)
setInterval(idle_stall, configs.mode.stall.interval)

//Keymaps
//map_key("","snippet","toggle_mode(configs.mode.)");
map_key("H", "snippet", "toggle_mode(configs.mode.heal)");
map_key("Q", "snippet", "toggle_mode(configs.mode.move)");
map_key("U", "snippet", "toggle_mode(configs.mode.upgrade)");
map_key("T", "snippet", "toggle_mode(configs.mode.attack)");
map_key("O", "snippet", "toggle_mode(configs.mode.inv_dump)");
map_key("L", "snippet", "toggle_mode(configs.mode.luck)");


set_skillbar("1", "2", "H", "Q", "U", "T", "O", "L");
//internal vals
/*
on_cm(sender,msg){
  switch msg{
    case "config plz":
      update_configs();
      send_cm(sender,configs)
      break;
    default:
      log("unknown cm recived from ", + sender)
  }
}
*/
//functions
function update_configs() {
   configs.char = parent.character


}

function send_info(recepiant) {
   send_cm(recepiant, configs)
}


function idle_stall() {
   if (parent.character.moving) {
      parent.socket.emit("merchant", {
         close: 41
      });
   } else {
      parent.socket.emit("merchant", {
         open: 41
      });
   }
}

function upgrade_mode() {
   if (configs.mode.upgrade.enabled) {
      if (parent != null && parent.socket != null) {
         upgrade();
         compound_items();
      }
   }
}

function inv_dump() {
   if (configs.mode.inv_dump.enabled) {
      send_gold(configs.mode.inv_dump.sendTo, 99999999)
      log("invdumpung")
         //log(character.items)
      for (s in character.items) {
         //log("checking " + character.items[s])
         if (character.items[s] !== null) {
            if (ck_a_wList(character.items[s], configs.mode.inv_dump.wList) != true) {

               //log(character.items[s])
               send_item(configs.mode.inv_dump.sendTo, s, 9999);
               break;
            }
         }
      }
   }
}

function on_cm(n, d) {
   log("cm from " + n + ": " + d)
   if (n == "loots") {
      if (d == "what_pots_do_you_need?") {
         request_pots(n)
      }
   }
}


function request_pots(n) {
   log("requesting pots firing")
   var requests = {}
   for (pot in pots_to_request) {
      log("checking " + pot + " for request")
      var pslot = character.items[getItemSlot(pot)]
      var needed = {}
      var count = 0
         //log(pslot.q + " pots found of the needed " + pots_to_request[pot])
      log("checking quantity from slot")
      if (pslot == undefined) {
         needed.name = pot
         needed.q = pots_to_request[pot]
         log("pslot q tested undefigned")

      } else if (pslot.q < pots_to_request[pot]) {
         log("need pots")
         needed.name = pot
         needed.q = pots_to_request[pot] - pslot.q
         log("looks like we need " + JSON.stringify(needed))

      } else if (pslot.q >= pots_to_request[pot]) {
         log("dont need pots")
      } else {
         log("something went wrong man")
      }

      if (needed.name !== undefined) {

         log("requesting " + needed.pot + needed.keys)
         send_cm(n, needed)
      }
   }
}



function ck_a_wList(item, arr) {
   var found = false;
   //log("checking wlist")
   for (i in arr) {
      if (item.name == arr[i]) {
         return true;
      }
   }
   return found;
}

function top_up_pots() {
   if (configs.mode.givePots.enabled) {
      log("firing fun top_up_pots")
      send_cm(donate_pots_to, "what_pots_do_you_need?")
         /*
  var x;
  for(x in donate_pots_to){
    p = get_player(donate_pots_to[x]);
    if(p !== null && p !== undefined){
      log(donate_pots_to[x])
      log(p.name)
      log(p.inventory)
      if(p.inventory.hpot0.q < 50){
        send_item(p.name, getItemSlot("mpot0"), getDifference(p.inventory.mpot0.q, 200))


        }
      }
    }*/
   }
}

function movement_mode() {
   switch (configs.mode.move.enabled) {
      case 0:
         return;
         break;
      case 1:
         var target = get_targeted_monster();
         if (!in_attack_range(target)) {
            move(
               character.x + (target.x - character.x) / 2,
               character.y + (target.y - character.y) / 2
            );
            // Walk half the distance
         }
         break;
      case 2:
         var target = get_player(configs.mode.move.leader);
         if (target) { //make sure target is targetable
            if (
               target.x - character.x > 10 || target.y - character.y > 10 ||
               target.x - character.x < -10 || target.y - character.y < -10
            ) {
               move(character.x + (target.x - character.x) / 2, character.y + (target.y - character.y) / 2);
            }
         } else {
            log("movement mode is not able to locate target")
         }
         break;
      default:
         log("bad configs.mode.move.enabled option")
   }

}

function heal_mode() {
   if (configs.mode.heal.enabled || check_idle()) {
      pot_and_loot();

      var na;
      //log(configs.party.members);
      for (na in configs.party.members) {
         //log(configs.party.members[na])
         if (configs.party.members[na] !== null) {

            p = get_player(configs.party.members[na]);
            if (p) {
               if (p.rip) {
                  log(p.name + " is dead O.O")
               } else {
                  //log(p.hp / p.max_hp)
                  if (p.hp / p.max_hp < .75) {
                     //log("healing " + p.name);
                     heal(p);
                  }
               }
            }
         }
      }
   }
}

function Attack_mode() {
   if (!configs.mode.attack.enabled || character.rip || is_moving(character)) return;

   var target = get_targeted_monster();
   if (!target || !in_attack_range(target)) {
      target = get_nearest_monster(); //min_xp:100,max_att:120
      if (target) change_target(target);
      else {
         set_message("No Monsters");
         return;
      }
   }

   if (can_attack(target)) {
      set_message("Attacking");
      attack(target);
   }
}

function pot_and_loot() {
   var uhp = configs.pots.useHpPotAtPercent / 100
   var ump = configs.pots.useMpPotAtPercent / 100
   if (character.hp / character.max_hp < uhp || character.mp / character.max_mp < ump) {
      use_hp_or_mp();
   }
   loot();

}

function check_idle() {
   if (character.rip || is_moving(character)) {
      return false
   } else {
      return true
   }
}



function toggle_mode(mode) {
   var max = 1
   if (mode.max) {
      max = mode.max;
   }

   if (mode.enabled == max) {
      mode.enabled = 0;
   } else {
      mode.enabled += 1;
   }

   log(mode.fname + " has changed to " + mode.enabled)
}

function get_grade(item) {
   return parent.G.items[item.name].grades;
}

// Returns the item slot and the item given the slot to start from and a filter.
function find_item(filter) {
   for (let i = 0; i < character.items.length; i++) {
      let item = character.items[i];

      if (item && filter(item))
         return [i, character.items[i]];
   }

   return [-1, null];
}

function send_item_by_name(player, item, quantity) {
   send_item(player, getItemSlot(item), quantity)
}

function getItemQuantity(name) {
   var count = -1
   log("looking for item")
   for (var i = 0; i < character.items.length; i++) {
      if (character.items[i] && character.items[i].name == name) {
         log("item found in slot " + i)

      }
   }
   log("item not found")
   return count;
}

function getItemSlot(name) {
   log("looking for item")
   for (var i = 0; i < character.items.length; i++) {
      if (character.items[i] && character.items[i].name == name) {
         log("item found in slot " + i)
         return i;
      }
   }
   log("item not found")
   return -1;
}


function luck_players() {
   if (configs.mode.luck.enable == true) {
      //searches everyone nearby
      for (id in parent.entities) {
         var current = parent.entities[id];
         //makes sure its a player
         if (current && current.type == "character" && !current.npc && current.ctype != "merchant") {
            //determines if they already have a mluck boost
            if (current.s.mluck) {
               //checks to see if the boost is from you
               if (current.s.mluck.f && current.s.mluck.f != character.name) {
                  //boosts them if they are in range
                  if (ck_range(current, 320)) {
                     luck(current);
                     log("relucking " + current.name)
                  }
               }
            } else {
               //if they dont already have a boost then boost them
               if (ck_range(current, 320)) {
                  luck(current);
                  log("lucking " + current.name)
               }
            }
         }
      }
   }
}


var lastluck = new Date(0);

function luck(target) {
   // Luck only if not on cd (cd is .1sec).
   if ((new Date() - lastluck > 100)) {
      //log("emiting mluck")
      parent.socket.emit("skill", {
         name: "mluck",
         id: target.id
      });
      set_message(target.name);
      lastluck = new Date();
   }
}

function ck_range(tar, range) {
   //log("checking range")
   if (Math.sqrt((character.real_x - tar.real_x) *
         (character.real_x - tar.real_x) +
         (character.real_y - tar.real_y) *
         (character.real_y - tar.real_y)) < range) {
      //log("fun ck_range true")
      return true;
   } else {
      //log("ck_range False")
      return false;
   }
}

function upgrade() {
   for (let i = 0; i < character.items.length; i++) {
      let c = character.items[i];

      if (c) {
         var level = configs.mode.upgrade.upgradeWhitelist[c.name];
         if (level && c.level < level) {
            let grades = get_grade(c);
            let scrollname;
            if (c.level < grades[0])
               scrollname = 'scroll0';
            else if (c.level < grades[1])
               scrollname = 'scroll1';
            else
               scrollname = 'scroll2';

            let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
            if (!scroll) {
               parent.buy(scrollname);
               return;
            }

            log("upgrading")
            parent.socket.emit('upgrade', {
               item_num: i,
               scroll_num: scroll_slot,
               offering_num: null,
               clevel: c.level
            });
            return;
         }
      }
   }
}


function compound_items() {
   let to_compound = character.items.reduce((collection, item, index) => {
      if (item && configs.mode.upgrade.combineWhitelist[item.name] != null && item.level < configs.mode.upgrade.combineWhitelist[item.name]) {
         let key = item.name + item.level;
         !collection.has(key) ? collection.set(key, [item.level, item_grade(item), index]) : collection.get(key).push(index);
      }
      return collection;
   }, new Map());

   for (var c of to_compound.values()) {
      let scroll_name = "cscroll" + c[1];

      for (let i = 2; i + 2 < c.length; i += 3) {
         let [scroll, _] = find_item(i => i.name == scroll_name);
         if (scroll == -1) {
            parent.buy(scroll_name);
            return;
         }
         log("compounding")
            //game_log(scroll_name);
            //game_log(c[i]);
            //game_log(c[i+1]);
            //game_log(c[i+2]);
         parent.socket.emit('compound', {
            items: [c[i], c[i + 1], c[i + 2]],
            scroll_num: scroll,
            offering_num: null,
            clevel: c[0]
         });
         return;
      }
   }
}