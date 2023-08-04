//Merc
log("Starting merc script")

//test area
//send_item("Sychris", getItemSlot("mpot0"), 2)

//todo:
//convert configs.mode.upgrade.upgradeWhitelist to a map
//convert configs.mode.upgrade.combineWhitelist to a map
// convert pots_to_buy to a map

load_code(10)


configs.mode.buyPots.enabled = true
configs.mode.buyPots.pots_to_buy = {
  //ItemName, Count
  mpot0: 8000,
  mpot1: 8000,
  hpot0: 5000
}

//currently exchanges item in slot 0 with nearby npc
configs.mode.exchangeItems.enabled = false
configs.mode.give_pots.enabled = true
configs.mode.upgrade.enable = true
configs.mode.luck.enabled = true
configs.mode.sell.enabled = true

configs.mode.upgradeNPCItem.item = "staff"
configs.mode.upgradeNPCItem.enabled = false


configs.mode.buyPonty.enabled = false

configs.mode.buyMercs.enabled = true
configs.mode.buyMercs.maxToSpend = 1000000



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
setInterval(getPontyData,50000)
setInterval(buyPontyItems,1000)
setInterval(upgradeNPCItem, 1000)
setInterval(checkMerchents, configs.mode.buyMercs.interval) //dis somehow brokens

function exchangeSlotZero() {
  if(configs.mode.exchangeItems.enabled)   exchange(0)
}

function upgradeNPCItem(){
  if(!configs.mode.upgradeNPCItem.enabled) return
  if(getItemSlot(configs.mode.upgradeNPCItem.item)== -1){
    parent.buy(configs.mode.upgradeNPCItem.item,1)
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

function checkMerchents(){

  if(configs.mode.buyMercs.currentSpent > configs.mode.buyMercs.maxToSpend)return
  if(!configs.mode.buyMercs.enabled)return
  for (id in parent.entities){
    var current = parent.entities[id];
    //makes sure its a player
    if (current && current.type == "character" && !current.npc && current.ctype == "merchant"){
      //log(current.name)
      if(!ck_range(current,400)) {
        for (let slot in current.slots) {

          if (current.slots[slot] == null) continue //slot empty
          if (!current.slots[slot].rid == null) continue  //not a trade item
          if (!current.slots[slot].b == null) continue     //not for sell
          log(current.slots[slot])
          let pontyBuyPrice = Math.floor(G.items[current.slots[slot].name].g * 0.6) //ponty buy price
          if (current.slots[slot].price <= pontyBuyPrice && configs.mode.buy.items.includes(current.slots[slot].name)) {
            configs.mode.buyMercs.currentSpent += current.slots[slot].price
            parent.trade_buy(current.slots[slot], current.id, current.slots[slot].rid, current.slots[slot].q || 1)
          } else if (current.slots[slot].price <= pontyBuyPrice) {
            let n = current.slots[slot].name
            let q = current.slots[slot].q //quantity
            parent.trade_buy(current.slots[slot], current.id, current.slots[slot].rid, current.slots[slot].q || 1)
            configs.mode.buyMercs.currentSpent += current.slots[slot].price
            getItemSlot(n)
            parent.sell(getItemSlot(n), q)
            //and resell
          }
        }
      }
    }
  }
}
function getItemValue(itemName){
  return G.items[itemName].g
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
  if(!configs.mode.buyPonty.enabled || !npcInRange("secondhands")) return

  parent.socket.once("secondhands", (pontyData) => {
    for (item of pontyData) {
      if (configs.mode.buy.items.includes(item.name)) {
        configs.mode.buyPonty.itemsList.push(item.rid)
        log("found " + item.name + " from Ponty")
      }
    }
    //show_json(pontyData)
  })
  parent.socket.emit("secondhands")
  buyPontyItems()
}

function buyPontyItems() {
  if(!configs.mode.buyPonty.enabled || !npcInRange("secondhands")) return
  if (configs.mode.buyPonty.itemsList) {
    while (buy = configs.mode.buyPonty.itemsList.pop()) {
      parent.socket.emit("sbuy", {"rid": buy});}
  }
}





