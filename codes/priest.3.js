// priest
load_code(15) //load the file logger
writeToLog("starting the priest script")
//test area asdf


//Init
var configs = {};
configs.inv = {};
configs.inv.dump = {};
configs.mode = {};
configs.mode.heal = {};
configs.mode.attack = {};
configs.mode.move = {};
configs.party = {};
configs.pots = {};
configs.party.members = Object.keys(parent.party);

//Healz Configs
configs.mode.heal.enabled = 1
configs.mode.heal.interval = 250


//Attacker Configs
configs.mode.attack.enabled = 1
configs.mode.attack.interval = 250
map_key("Q", "snippet", "switch_move_mode();");

//Merc Configs


//Everyone Configs
configs.mode.move.enabled = 2
configs.mode.move.interval = 250
configs.mode.move.leader = "Sychris"

configs.pots.useHpPotAtPercentAtPercent = 50
configs.pots.useMpPotAtPercent = 50
configs.pots.useHpPotType = "hpot0"
configs.pots.useMpPotType = "mpot0"

configs.inv.dump.enabled = 1
configs.inv.dump.wList = [];


//intervals
setInterval(heal_mode, configs.mode.heal.interval);
setInterval(Attack_mode, configs.mode.attack.interval);
setInterval(movement_mode, configs.mode.move.interval);

//internal vals


//functions


function inv_dump() {
  if (enable_inv_dump) {
    send_gold(send_to, 99999999)
    writeTowriteToLog("invdumpung")
    //writeToLog(character.items)
    for (s in character.items) {
      //writeToLog("checking " + character.items[s])
      if (character.items[s] !== null) {
        //writeToLog(character.items[s])
        send_item(send_to, s, 9999);
        break;
      }
    }
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
        writeToLog("movement mode is not able to locate target")
      }
      break;
    default:
      writeToLog("bad configs.mode.move.enabled option")
  }
  
}

function heal_mode() {
  if (configs.mode.heal.enabled || check_idle()) {
    pot_and_loot();
    
    var na;
    //writeToLog(configs.party.members);
    for (na in configs.party.members) {
      //writeToLog(configs.party.members[na])
      if (configs.party.members[na] !== null) {
        
        p = get_player(configs.party.members[na]);
        if (p) {
          if (p.rip) {
            writeToLog(p.name + " is dead O.O")
          } else {
            //writeToLog(p.hp / p.max_hp)
            if (p.hp / p.max_hp < .75) {
              //writeToLog("healing " + p.name);
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
    target = getNearestMonster(); //min_xp:100,max_att:120
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

function switch_move_mode() {
  if (configs.mode.move.enabled <= 1) {
    configs.mode.move.enabled++
  } else {
    configs.mode.move.enabled = 0
  }
  writeToLog("movement mode set to " + configs.mode.move.enabled)
}