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
    if (Math.sqrt((character.real_x - tar.real_x) * (character.real_x - tar.real_x) + 
      (character.real_y - tar.real_y) * (character.real_y - tar.real_y)) < range) {
      return true;
    } else {
      return false;
    }
  } else return false; //was null
}


function ck_range_by_name(name, range) {
    var c = get_player(name)
    if (ck_range(c, range)) {
      return true
    } else {
      return false
    }
}
//----------------------------------modes----------------------------------
function lootmode(){
  loot();
}
//----------------------------------HP Mp----------------------------------
function getHpPercent() {return character.hp / character.max_hp * 100}
function getMpPercent() {return character.mp / character.max_mp * 100}

 //----------------------------------items----------------------------------
function getItemSlot(name) {
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name) {
      return i;
    }
  }
  log("item not found")
  return -1;
}

function getItemQuantity(name) {
  var count = 0
  //log("looking for item")
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name){
      //basicly if item does not have q property than its quantity is 1 else q property
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
      var tq  = (character.items[i].q === undefined) ? 1 : character.items[i].q
      count = count + tq
    }
  }
  return count;
}
function sellmode(){
  if(!configs.mode.sell.enabled) return
  for (var item in character.items){
    if(character.items[item] && configs.mode.sell.items.has(character.items[item].name)){
      if(configs.mode.sell.items.get(character.items[item].name) ==  character.items[item].level){
        game_log("sellable item found in slot " + item)
        parent.sell(item,1)
      }
    }
  }
}


function get_grade(item) {
  return parent.G.items[item.name].grades;
}

//----------------------------------potions----------------------------------
function updatePotions(){
  for (let pot in Hpots){configs.pots.current_potions.set(Hpots[pot],getItemQuantity(Hpots[pot]))}
  for (let pot in Mpots){configs.pots.current_potions.set(Mpots[pot],getItemQuantity(Mpots[pot]))}
}
function getBiggestHPot(){
  updatePotions()
  for(let pot in Hpots){if (configs.pots.current_potions.get(Hpots[pot])>1) return Hpots[pot]}
  return "regen_hp"
}
function getBiggestMPot(){
  updatePotions()
  for(let pot in Mpots){if (configs.pots.current_potions.get(Mpots[pot])>1) return Mpots[pot]}
  return "regen_mp"
}

function checkHpMp(){
  if(!configs.mode.hpMp.enabled == true) return
  updatePotions()

  if(mssince(configs.pots.last_pot_used) < 1000) return
  var currentHpDown = character.max_hp - character.hp

  if(10 > getMpPercent())consume(getItemSlot(getBiggestMPot()))
  if(hpPotPercent > getHpPercent()) {
    use_skill("use_hp");
    configs.pots.last_pot_used = new Date()
  }
  else if(hpMeditate > getHpPercent()) {
    use_skill("regen_hp");
    configs.pots.last_pot_used = new Date()
  }
  else if(mpPotPercent > getMpPercent()) {
    use_skill("use_mp");
    configs.pots.last_pot_used = new Date()
  }
  else if(mpMeditate > getMpPercent()) {
    use_skill("regen_mp");
    configs.pots.last_pot_used = new Date()
  }
  
}
//-----------------------------------setmgs-------------------------------------
setInterval(setmsg,1000);
function setmsg(){
  set_message(character.cc);
}
