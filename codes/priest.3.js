// priest
log("starting the priest script")
//test area asdf


//Init
var configs = {};
configs.ctype = character.ctype;
configs.inv = {};
configs.inv.dump = {};
configs.mode = {};
configs.heal = {};
configs.attack = {};
configs.move = {};
configs.party = {};
configs.pots = {};
configs.party.members = Object.keys(parent.party);

//Healz Configs
configs.heal.enabled = 1
configs.heal.interval = 250


//Attacker Configs
configs.attack.enabled = 1
configs.attack.interval = 250
map_key("Q", "snippet", "switch_move_mode();");

//Merc Configs


//Everyone Configs
configs.move.enabled = 2
configs.move.interval = 250
configs.move.leader = "Sychris"

configs.pots.useHpPotAtPercentAtPercent = 50
configs.pots.useMpPotAtPercent = 50
configs.pots.useHpPotType = "hpot0"
configs.pots.useMpPotType = "mpot0"

configs.inv.dump.enabled = 1
configs.inv.dump.wList = [];


//intervals
setInterval(heal_mode, configs.heal.interval);
setInterval(Attack_mode, configs.attack.interval);
setInterval(movement_mode, configs.move.interval);

//internal vals


//functions


function inv_dump() {
  if (enable_inv_dump) {
    send_gold(send_to, 99999999)
    log("invdumpung")
    //log(character.items)
    for (s in character.items) {
      //log("checking " + character.items[s])
      if (character.items[s] !== null) {
        //log(character.items[s])
        send_item(send_to, s, 9999);
        break;
      }
    }
  }
}


function movement_mode() {
  switch (configs.move.enabled) {
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
      var target = get_player(configs.move.leader);
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
      log("bad configs.move.enabled option")
  }
  
}

function heal_mode() {
  if (configs.heal.enabled || check_idle()) {
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
  if (!configs.attack.enabled || character.rip || is_moving(character)) return;
  
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

function switch_move_mode() {
  if (configs.move.enabled <= 1) {
    configs.move.enabled++
  } else {
    configs.move.enabled = 0
  }
  log("movement mode set to " + configs.move.enabled)
}