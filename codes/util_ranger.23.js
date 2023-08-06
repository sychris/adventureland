
function combat() {
  
  //game_log("tick")
  //is combat mode is off character is dead or moving than pass combat for now
  if (!configs.attack.enabled || character.rip || is_moving(character)) return;
  if (character.ctype == "ranger") combatRanger()
}


function combatRanger() {
  if (configs.skills.threeShot && threeShot()) return
  if (standardAttack()) return
}

function threeShot() {
  
  var targets = [];
  if (is_on_cooldown("3shot")) return false;
  if (character.mp >= 300 && parent.character.level >= 60) {
    for (let id in parent.entities) {
      if (parent.entities[id].mtype == configs.attack.onlyAttack && parent.entities[id].type == "monster" && is_in_range(parent.entities[id], "3shot") && targets.length < 3) {
        targets.push(parent.entities[id]);
      }
    }
    // Use 3-Shot with a Ranger on 3 targets
    if (targets.length > 2) {
      game_log("fireing 3shot")
      use_skill("3shot", targets);
      return true;
    }
  } else {
    return false
  }
}


function standardAttack() {
  let target = get_targeted_monster();
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
