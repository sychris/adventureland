log("loading_utils_everyone")

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

//----------------------------------range----------------------------------

function ck_range(tar, range) {
  //log("checking range")
  if (tar !== null) {
    return Math.sqrt((character.real_x - tar.real_x) * (character.real_x - tar.real_x) +
      (character.real_y - tar.real_y) * (character.real_y - tar.real_y)) < range;
  }
}


function ck_range_by_name(name, range) {
  let c = get_player(name)
  if (ck_range(c, range)) {
    return true
  } else {
    return false
  }
}


function npcInRange(npcName) {
  
  let map = parent.G.maps[character.map]
  for (let npc of map.npcs) {
    if (npcName == npc.id) {
      let pos = {}
      pos.x = npc.position[0]
      pos.y = npc.position[1]
      pos.map = character.map
      if (simple_distance(character, pos) < 400) return true
    }
  }
  return false
}

//----------------------------------loot----------------------------------
function autoLoot() {
  loot();
}

//----------------------------------HP Mp----------------------------------
function getHpPercent() {
  return character.hp / character.max_hp * 100
}

function getMpPercent() {
  return character.mp / character.max_mp * 100
}

//----------------------------------items----------------------------------
function getItemSlot(name) {
  for (let i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name) {
      return i;
    }
  }
  log("item not found: " + name)
  return -1;
}

function autoCraft(){
  if(!configs.autocraft.enabled)return
  if(configs.autocraft.item == "")return
  auto_craft(configs.autocraft.item)
}

function getItemQuantity(name) {
  let count = 0
  //log("looking for item")
  for (let i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name) {
      //basicly if item does not have q property than its quantity is 1 else q property
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      let tq = (character.items[i].q === undefined) ? 1 : character.items[i].q
      count = count + tq
    }
  }
  return count;
}

function autoSell() {
  if (!configs.sell.enabled) return
  for (let item in character.items) {
    if (character.items[item] && configs.sell.items.has(character.items[item].name)) {
      if (configs.sell.items.get(character.items[item].name) == character.items[item].level) {
        if (npcInRange("secondhands")) {
          game_log("sellable item found in slot " + item)
          parent.sell(item, 1)
        } else {
          //log("ponty out of range")
        }
      }
    }
  }
}

function exchangeSlotZero() {
  if (configs.exchangeItems.enabled) exchange(0)
}

function getItemValue(itemName) {
  return G.items[itemName].g
}

function get_grade(item) {
  return parent.G.items[item.name].grades;
}

//----------------------------------potions----------------------------------
function updatePotions() {
  for (let pot in Hpots) {
    configs.pots.current_potions.set(Hpots[pot], getItemQuantity(Hpots[pot]))
  }
  for (let pot in Mpots) {
    configs.pots.current_potions.set(Mpots[pot], getItemQuantity(Mpots[pot]))
  }
}

function checkHpMp() {
  if (!configs.hpMp.enabled == true) return
  if (is_on_cooldown("use_hp")) return
  getHpPercent() < getMpPercent() ? restoreHp() : restoreMp()
}

function restoreHp() {
  updatePotions()
  if (configs.hpMp.useHpot1.enabled = true && getHpPercent() < configs.hpMp.useHpot1.percent && getItemSlot("hpot1") != -1) {
    equip(getItemSlot("hpot1"))
  } else if (configs.hpMp.useHpot0.enabled = true && getHpPercent() < configs.hpMp.useHpot0.percent && getItemSlot("hpot0") != -1) {
    equip(getItemSlot("hpot0"))
  } else if (configs.hpMp.hpMeditate.enabled = true && getHpPercent() < configs.hpMp.hpMeditate.percent) {
    use_skill("regen_hp")
  }
}

function restoreMp() {
  if (configs.hpMp.useMpot1.enabled = true && getMpPercent() < configs.hpMp.useMpot1.percent && getItemSlot("mpot1") != -1) {
    equip(getItemSlot("mpot1"))
    log("using mpot1")
    log(getItemSlot("mpot0"))
  } else if (configs.hpMp.useMpot0.enabled = true && getMpPercent() < configs.hpMp.useMpot0.percent && getItemSlot("mpot0") != -1) {
    equip(getItemSlot("mpot0"))
    log("using mpot0 from slot: " + getItemSlot("mpot0"))
    
  } else if (configs.hpMp.mpMeditate.enabled = true && getMpPercent() < configs.hpMp.mpMeditate.percent) {
    use_skill("regen_mp")
    log("using regen_mp")
  }
}

//-----------------------------------setmgs-------------------------------------


function setmsg() {
  set_message(character.cc);
}

//-----------------------------------movement---------------------------------------


function moveToPlayer() {
  smart_move("Sychris")
  goHome = async () => {
    if (await this.wait(60)) {
      use_skill("use_town")
    }
  }
}

//-----------------------------------party---------------------------------------


function partyCall() {
  if (configs.party.leader == character.name) {
    myToons.forEach(function (name) {
      if (!parent.party.hasOwnProperty(name) && get_player(name) != null && character.name != name) {
        log("Sending Invite to: " + name);
        send_party_invite(name);
      }
    });
  }
}

//todo one of these are redundant?
function on_party_request(name) // called by the inviter's name - request = someone requesting to join your existing party
{
  
  if (configs.party.leader == name) {
    accept_party_request(name);
  }
}

function on_party_invite(name) // called by the inviter's name - request = someone requesting to join your existing party
{
  if (configs.party.leader == name) {
    accept_party_invite(name);
  }
}


wait = (seconds) =>
  new Promise(resolve =>
    setTimeout(() => resolve(true), seconds * 1000)
  );