//Merc
log("Starting merc script")
load_code(10)
//test area
//send_item("Sychris", getItemSlot("mpot0"), 2)

//this shows trade history
//show_json(parent.socket.emit('trade_history'))

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
configs.travelToPlayers.enabled = false
configs.autoStand.enabled = true

configs.travelToPlayers.targetPlayerName = "Sychris"

configs.upgradeNPCItem.item = "staff"
configs.upgradeNPCItem.enabled = true

configs.buyPonty.enabled = false

configs.buyMercs.enabled = true
configs.buyMercs.maxToSpend = 1000000

configs.regen.to_percent = 80

configs.sell.items.set('test_orb', 0)
configs.sell.items.set('hpamulet', 0)
configs.sell.items.set('wand', 0)
configs.sell.items.set('stinger', 0)
configs.sell.items.set('hpbelt', 0)
configs.sell.items.set('cclaw', 0)

var regen_mp_Interval = 1000

//this is where all the intervals etc are
load_code(40)









