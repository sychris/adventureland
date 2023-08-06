load_code(10)

configs.hpMp.enabled = true

configs.attack.enabled = 1
configs.attack.allowMoveForAttack = false
configs.attack.onlyAttack = "crab"
configs.attack.preferedTarget = "squigtoad"

configs.sell.enabled = false
configs.sell.items.set('stinger', 0)

configs.inv_dump.enabled = true
configs.inv_dump.interval = 1000 //overiding 3000

configs.loot.enabled = true

configs.skills.threeShot = true

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 8000,
  mpot1: 8000,
  hpot1: 500
}

var minMpPercentForThreeShot = 25

var hpPotPercent = 99
var hpMeditate = 90
var mpPotPercent = 50
var mpMeditate = 100

setInterval(lootmode, configs.loot.interval);
setInterval(sellmode, configs.sell.interval);
setInterval(checkHpMp, configs.hpMp.interval); // Loops every 1/10 seconds.
setInterval(combat, configs.attack.interval); // Loops every 1/4 seconds.
setInterval(inv_dump, configs.inv_dump.interval)
map_key("O", "snippet", "toggle_mode(configs.inv_dump)");

function on_party_request(name) // called by the inviter's name - request = someone requesting to join your existing party
{
  
  accept_party_request(name);
  
}

function combat() {
  
  //game_log("tick")
  //is combat mode is off character is dead or moving than pass combat for now
  if (!configs.attack.enabled || character.rip || is_moving(character)) return;
  if (character.ctype == "ranger") combatRanger()
}

// not yet functioning
function getTarget() {
  const entities = []
  for (const id in parent.entities) {
    const entity = parent.entities[id]
    if (!entity.mtype) continue // Not a monster
    //if (parent.entities[id].type == "monster" && is_in_range(parent.entities[id], "3shot") && targets.length < 3) {
    //        targets.push(parent.entities[id]);
    //}
    // TODO: Add filters to exclude entities you don't want
    
    entities.push(entities)
  }
  
  // TODO: add more priority checks
  entities.sort((a, b) => {
    // Example: Prioritize those targeting you
    if (a.target == character.id && b.target !== character.id) return -1
    if (b.target == character.id && a.target !== character.id) return 1
    
    // Example: Prioritize lower hp entities
    if (a.hp !== b.hp) return a.hp - b.hp
    
    // No difference in priority
    return 0
  })
  
  if (entities.length > 0) return entities[0]
}

function standardAttack() {
  var target = get_targeted_monster();
  if (!target) {
    if (configs.attack.onlyAttack) {
      target = get_nearest_monster({type: configs.attack.onlyAttack});
    } else {
      target = get_nearest_monster()
    }
    if (target) change_target(target);
    else {
      set_message("No Monsters");
      return false;
    }
  }
  
  
  if (!is_in_range(target) && configs.attack.allowMoveForAttack) {
    move(
      character.x + (target.x - character.x) / 2,
      character.y + (target.y - character.y) / 2
    );
    // Walk half the distance
  } else if (can_attack(target)) {
    set_message("Attacking");
    attack(target);
    return true
  } else if (!is_in_range(target)) change_target(null);
  
}