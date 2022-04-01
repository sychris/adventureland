//Merc
log("Starting merc script")

//test area
//send_item("Sychris", getItemSlot("mpot0"), 2)

//todo:
//convert configs.mode.upgrade.upgradeWhitelist to a map
//convert configs.mode.upgrade.combineWhitelist to a map
// convert pots_to_buy to a map

load_code(10)
load_code(13) //temperarly here insted of init while i test and dessign
//Configs

var enable_buying_pots = 1
var pots_to_buy = {
  //ItemName, Count
  mpot0: 8000,
  mpot1: 8000,
  hpot0: 5000
}


configs.mode.exchangeItems.enabled = false
configs.mode.give_pots.enabled = 0
configs.mode.upgrade.enable = 1
configs.mode.luck.enabled = 1
configs.mode.sell.enabled = true

configs.mode.regen.to_percent = 80




configs.mode.sell.items.set('test_orb', 0)
configs.mode.sell.items.set('hpamulet', 0)
configs.mode.sell.items.set('wand', 0)
configs.mode.sell.items.set('stinger', 0)
configs.mode.sell.items.set('hpbelt', 0)
configs.mode.sell.items.set('cclaw', 0)




//intervals


var regen_mp_Interval = 1000

//setInterval(sellPrimals,1000)
setInterval(exchangeSlotZero, configs.mode.exchangeItems.interval);
setInterval(moveToPlayer, 180000)
setInterval(sellmode, configs.mode.sell.interval);
setInterval(upgrade_check, configs.mode.upgrade.interval);
setInterval(luck_players, configs.mode.luck.interval);
setInterval(top_up_pots, configs.mode.give_pots.interval);
setInterval(regen_mp, regen_mp_Interval);
setInterval(buy_pots, configs.mode.give_pots.interval);
//setInterval(getPontyData,50000)
//setInterval(buyPontyItems,1000)

function exchangeSlotZero() {
  if(configs.mode.exchangeItems.enabled)   exchange(0)
}

function npcInRange(npcName) {
  map = parent.G.maps[character.map]
  for (npc of map.npcs) {
    if (npcName == npc.id) {
      var pos = {}
      pos.x = npc.position[0]
      pos.y = npc.position[1]
      pos.map = character.map
      if (simple_distance(character, pos) < 400) return true
    }
  }
  return false
}

function sellPrimals() {
  if (parent.character.slots.trade3 == null) {
    log("no more offerings")
    if (slot = getItemSlot("offering") == -1) parent.buy("offering")
    
    slot = getItemSlot("offering")
    if (slot != -1) {
      trade(getItemSlot("offering"), 3, 32904000, quantity) // where trade_slot is 1 to 16 - example, trade(0,4,1000) 
      //                      puts the first item in inventory to the 4th trade slot for 1000 gold [27/10/16]
    }
  }
}

function moveToPlayer() {
  smart_move("Sychris")
  goHome = async () => {
    if (await this.wait(60)) {
      use_skill("use_town")
    }
  }
}

wait = (seconds) =>
  new Promise(resolve =>
    setTimeout(() => resolve(true), seconds * 1000)
  );

function getPontyData() {
  
  var stuffToBuy = ["seashell", "merry", "quiver", "ringsj", "intring", "wattire", "staff", "tshirt0", "tshirt1", "wbook0", "intearring", "dexearring"]
  
  parent.socket.once("secondhands", (pontyData) => {
    for (item of pontyData) {
      if (stuffToBuy.includes(item.name)) {
        configs.mode.buyPonty.itemsList.push(item.rid)
        log("found " + item.name + " from Ponty")
      }
    }
    //show_json(pontyData)
  })
  parent.socket.emit("secondhands")
}

function buyPontyItems() {
  if (configs.mode.buyPonty.itemsList) {
    while (buy = configs.mode.buyPonty.itemsList.pop()) {
      parent.socket.emit("sbuy", {"rid": buy});}
  }
}



function send_item_by_name(player, item, quantity) {
  send_item(player, getItemSlot(item), quantity)
}


function buy_pots() {
  //log(pots_to_buy)
  for (pot in pots_to_buy) {
    //log(pot)
    var current_pots = character.items[getItemSlot(pot)]
    var buy_count = 0
    if (current_pots == undefined) buy_count = pots_to_buy[pot]
    else if (current_pots.q < pots_to_buy[pot]) buy_count = pots_to_buy[pot] - current_pots.q
    else if (current_pots.q < 1) buy_count = pots_to_buy[pot]
    //log(current_pots.q)
    if (buy_count > 0) {
      log("buying " + buy_count + " " + pot)
      parent.buy(pot, buy_count)
    }
  }
}
//The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
/*
var test = new map()
test.set("asdf",0)
test.set("jkl",1000)

log(test.size) //== 2
test.delete(asdf) //removes asdf size now == 1

log(test.get("jkl"))          //logs 1000
log(test.get("doesentExist")) //atempts to log undefigned
log(test.has("jkl"))          //logs true
log(test.has("doesentExist")) //logs false

ways to iterate
for (const [key, value] of myMap) {
  log(key + ' = ' + value)
}

for (const key of myMap.keys()) {
  log(key)
}

for (const value of myMap.values()) {
  log(value)
}

myMap.forEach(function(value, key) {
  log(key + ' = ' + value)
})
*/