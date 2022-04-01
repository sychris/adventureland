function inv_dump() {
  //log("invdumping")
  if (configs.mode.inv_dump.enabled & ck_range_by_name(configs.mode.inv_dump.sendTo, 320)) {
    send_gold(configs.mode.inv_dump.sendTo, 99999999)
    for (var s = 0; s < character.items.length; s++) {
      if (character.items[s] !== null) {
        if (ck_a_wList(character.items[s], configs.mode.inv_dump.wList) != true) {
          //this needs json stringifyed
          log("sending " + character.items[s] + " to " + configs.mode.inv_dump.sendTo)
          send_item(configs.mode.inv_dump.sendTo, s, 9999);
          break;
        }
      }
    }
  }
}

function request_pots(n) {
  var requests = {}
  for (const pot in configs.pots.pots_to_request) {
    log("checking " + pot + " for request")
    var pslot = character.items[getItemSlot(pot)]
    var needed = {}
    var count = 0

    if (!pslot) {
      needed.name = pot
      needed.q = configs.pots.pots_to_request[pot]

    } else if (pslot.q < configs.pots.pots_to_request[pot]) {
      needed.name = pot
      needed.q = configs.pots.pots_to_request[pot] - pslot.q
      log("looks like we need " + JSON.stringify(needed))
    } 

    if (needed.name) {
      log("requesting " + needed.pot + needed.keys)
      send_cm(n, needed)
    } 
  }
}


function on_cm(n, d) {
  log("cm from " + n + ": " + d)
  if (n == "loots" && d == "what_pots_do_you_need?") request_pots(n)
}

