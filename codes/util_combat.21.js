function inv_dump() {
  //writeToLog("invdumping")
  if (configs.inv_dump.enabled & ck_range_by_name(configs.inv_dump.sendTo, 320)) {
    send_gold(configs.inv_dump.sendTo, 99999999)
    for (var s = 0; s < character.items.length; s++) {
      if (character.items[s] !== null) {
        if (ck_a_wList(character.items[s], configs.inv_dump.wList) != true) {
          //this needs json stringifyed
          writeToLog("sending " + character.items[s] + " to " + configs.inv_dump.sendTo)
          send_item(configs.inv_dump.sendTo, s, 9999);
          break;
        }
      }
    }
  }
}

function request_pots(name) {
  let requests = {}
  for (const potion in configs.pots.pots_to_request) {
  
    let needed = {}
    needed.type = "pots"
  
    if (getItemSlot(potion) == -1) {
      needed.name = potion
      needed.q = configs.pots.pots_to_request[potion]
    
    } else {
      let currentCount = getItemQuantity(potion)
      if (currentCount < configs.pots.pots_to_request[potion]) {
        needed.name = potion
        needed.q = configs.pots.pots_to_request[potion] - currentCount
        writeToLog("looks like we need " + JSON.stringify(needed))
      }
    }
    
    if (needed.name) {
      writeToLog("requesting " + needed.pot + needed.keys)
      send_cm(name, needed)
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
  if (name != "loots") writeToLog("cm from unknown sender!!: " + name + "data: " + JSON.stringify(data))
  if (data == "what_pots_do_you_need?") request_pots(name)
  if (data == "pos_for_transport") sendPOS(name)
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
  var min_d = 999, target = null;
  
  if (!args) args = {};
  if (args && args.target && args.target.name) args.target = args.target.name;
  if (args && args.type == "monster") writeToLog("get_nearest_monster: you used monster.type, which is always 'monster', use monster.mtype instead");
  if (args && args.mtype) writeToLog("get_nearest_monster: you used 'mtype', you should use 'type'");
  
  for (id in parent.entities) {
    var current = parent.entities[id];
    if (current.type != "monster" || !current.visible || current.dead) continue;
    if (args.type) {
      if (Array.isArray(args.type)) {
        if (!args.type.includes(current.mtype)) continue;
      } else if (typeof args.type === 'string' || args.type instanceof String) {
        if (current.mtype != args.type) continue;
      }
    }
    if (args.min_xp && current.xp < args.min_xp) continue;
    if (args.max_att && current.attack > args.max_att) continue;
    if (args.target && current.target != args.target) continue;
    if (args.no_target && current.target && current.target != character.name) continue;
    if (args.path_check && !can_move_to(current)) continue;
    var c_dist = parent.distance(character, current);
    if (c_dist < min_d) min_d = c_dist, target = current;
  }
  return target;
}
