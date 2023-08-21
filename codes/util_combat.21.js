function combat() {
  if (!configs.attack.enabled) return
  if (character.rip) return
  if (is_moving(character)) return;
  
  if (configs.autoLoot.enabled) loot();
  
  if (character.ctype === "ranger") combatRanger()
  if (character.ctype === "mage") combat_mage()
  
  if (character.ctype === "warrior") combat_warior()
  
}

function combat_warior() {

}

function combatRanger() {
  if (configs.skills.threeShot && threeShot()) return
  standardAttack()
  //the return is here just so that any future stuff wont break
}

function threeShot() {
  
  let targets = [];
  if (is_on_cooldown("3shot")) return false;
  if (character.mp >= 300 && parent.character.level >= 60) {
    for (let id in parent.entities) {
      
      if (configs.attack.onlyAttack) {
        if (parent.entities[id].mtype !== configs.attack.onlyAttack) continue
      }
      if (parent.entities[id].type !== "monster") continue
      if (!is_in_range(parent.entities[id], "3shot")) continue
      if (targets.length >= 3) continue
      
      targets.push(parent.entities[id]);
    }
    // Use 3-Shot with a Ranger on 3 targets
    if (targets.length > 2) {
      writeToLog("firing 3shot at " + targets.length + " Targets")
      use_skill("3shot", targets);
      return true;
    }
  } else {
    return false
  }
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
    if (a.target === character.id && b.target !== character.id) return -1
    if (b.target === character.id && a.target !== character.id) return 1
    
    // Example: Prioritize lower hp entities
    if (a.hp !== b.hp) return a.hp - b.hp
    
    // No difference in priority
    return 0
  })
  
  if (entities.length > 0) return entities[0]
}


function energize() {
  if (!configs.skills.energize.enabled) return
  if (!configs.skills.energize.target) return
  if (is_on_cooldown("energize")) return
  if (character.mp == 0) return
  if (!ck_range_by_name(configs.skills.energize.target, 320)) return
  let target = get_player(configs.skills.energize.target)
  use_skill("energize", target)
  writeToLog("Energising: " + target.name)
}

function combat_mage() {
  standardAttack()
}


function standardAttack() {
  let target = get_targeted_monster();
  if (!target) {
    if (configs.attack.onlyAttack) {
      target = getNearestMonster({type: configs.attack.onlyAttack});
    } else {
      target = getNearestMonster()
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

function inv_dump() {
  if (configs.inv_dump.enabled && ck_range_by_name(configs.inv_dump.sendTo, 320)) {
    send_gold(configs.inv_dump.sendTo, 99999999);
    
    for (let s = 0; s < character.items.length; s++) {
      const currentItem = character.items[s];
      
      if (currentItem == null) continue
      if (configs.inv_dump.wList.includes(currentItem.name)) continue
      
      writeToLog(`Sending ${JSON.stringify(currentItem)} to ${configs.inv_dump.sendTo}`);
      send_item(configs.inv_dump.sendTo, s, 9999);
      break;
    }
  }
  
}


function request_pots(name) {
  for (const potion in configs.pots.pots_to_request) {
    const needed = {
      type: "pots",
    };
    
    const currentSlot = getItemSlot(potion);
    const currentCount = currentSlot === -1 ? 0 : getItemQuantity(potion);
    
    if (currentSlot === -1 || currentCount < configs.pots.pots_to_request[potion]) {
      needed.name = potion;
      needed.q = configs.pots.pots_to_request[potion] - currentCount;
      
      writeToLog("Looks like we need " + needed.q + " " + needed.name);
      
      send_cm(name, needed);
    }
  }
}


function getMyPOS() {
  let pos = {}
  pos.x = character.x
  pos.y = character.y
  pos.map = character.map
  return pos
}

function sendPOS(name) {
  let posCM = getMyPOS()
  posCM.type = "transport_pos"
  writeToLog(JSON.stringify(posCM))
  send_cm(name, posCM).then((msg) => writeToLog(msg))
}

function on_cm(name, data) {
  writeToLog("cm from " + name + ": " + data)
  if (name !== "loots") writeToLog("cm from unknown sender!!: " + name + "data: " + JSON.stringify(data))
  if (data === "what_pots_do_you_need?") request_pots(name)
  if (data === "pos_for_transport") sendPOS(name)
}

//-----------------------------------targeting---------------------------------------

function getNearestMonster(args) {
  //args:
  // max_att: max attack
  // min_xp: min XP
  // target: Only return monsters that target this "name" or player object
  // no_target: Only pick monsters that don't have any target
  // path_check: Checks if the character can move to the target
  // type: Type of the monsters, for example "goo", can be referenced from `show_json(G.monsters)` [08/02/17]
  
  let min_d = 999, target = null;
  
  if (!args) args = {
    mtype: false,
    path_check: false,
    no_target: false,
  };
  if (args && args.target && args.target.name) args.target = args.target.name;
  if (args && args.type === "monster") writeToLog("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
  if (args && args.mtype) writeToLog("get_nearest_monster: you used 'mtype', you should use 'type'");
  
  for (let id in parent.entities) {
    let current = parent.entities[id];
    
    if (current.type !== "monster" || !current.visible || current.dead) continue;
    if (args.min_xp && current.xp < args.min_xp) continue;
    if (args.max_att && current.attack > args.max_att) continue;
    if (args.target && current.target !== args.target) continue;
    if (args.no_target && current.target && current.target !== character.name) continue;
    if (args.path_check && !can_move_to(current)) continue;
    
    if (args.type) {
      if (Array.isArray(args.type)) {
        if (!args.type.includes(current.mtype)) continue;
      } else if (typeof args.type === 'string' || args.type instanceof String) {
        if (current.mtype !== args.type) continue;
      }
    }
    
    let c_dist = parent.distance(character, current);
    if (c_dist < min_d) {
      min_d = c_dist
      target = current
    }
  }
  return target;
}
