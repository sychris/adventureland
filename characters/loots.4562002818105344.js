//Merc
log("Starting merc script")
load_code(10)
//test area
load_code(15)
writeToLog("this is a test 2")

//this shows trade history
//show_json(parent.socket.emit('trade_history'))

//this shows crafting chance and grace value
//parent.upgrade(26, locate_item("scroll0"), null, true, true).then(e=>show_json(e));

//todo:
//convert configs.upgrade.upgradeWhitelist to a map
//convert configs.upgrade.combineWhitelist to a map
// convert pots_to_buy to a map
//auto open and close stall based on movement


configs.buyPots.enabled = true
configs.buyPots.pots_to_buy = {
  //ItemName, Count
  mpot0: 8000,
  mpot1: 8000,
  hpot0: 5000
}

//currently exchanges item in slot 0 with nearby npc
configs.exchangeItems.enabled = false
configs.give_pots.enabled = true
configs.upgrade.enable = true
configs.luck.enabled = true
configs.sell.enabled = true
configs.travelToPlayers.enabled = true
configs.autoStand.enabled = true
configs.autocraft.enabled = false
configs.buyPonty.enabled = true
configs.buyMercs.enabled = true

configs.travelToPlayers.targetPlayerName = "Sychris"

configs.autocraft.item = "basketofeggs"

configs.upgradeNPCItem.item = "staff"
configs.upgradeNPCItem.enabled = false

configs.buyMercs.maxToSpend = 1000000

configs.regen.to_percent = 80

configs.sell.items.set('test_orb', 0)
configs.sell.items.set('hpamulet', 0)
configs.sell.items.set('wand', 0)
configs.sell.items.set('stinger', 0)
configs.sell.items.set('hpbelt', 0)
configs.sell.items.set('cclaw', 0)

configs.buyPonty.itemsList = [
  "dexamulet",
  "stramulet",
  "intamulet",
  "intring",
  "intearring",
  "dexring",
  "dexearring"
]

var regen_mp_Interval = 1000

//this is where all the intervals etc are
load_code(40)









