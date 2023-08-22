writeToLog("loading default_config_merc")

configs.give_pots = {};
configs.give_pots.fname = "Give Potions Mode"
configs.give_pots.donate_pots_to = myToons
configs.give_pots.enabled = true
configs.give_pots.interval = 5000

configs.travelToPlayers = {}
configs.travelToPlayers.enabled = false
configs.travelToPlayers.interval = 10000
configs.travelToPlayers.delay = 300000 //900,000 is 15 min
configs.travelToPlayers.targetPlayerName = "Sychris"
configs.travelToPlayers.state = "init"
configs.travelToPlayers.idle = {}
configs.travelToPlayers.idle.map = "main"
configs.travelToPlayers.idle.x = -204
configs.travelToPlayers.idle.y = -78
configs.travelToPlayers.lastPickupTime = null

configs.autoStand = {}
configs.autoStand.enabled = true
configs.autoStand.interval = 500

configs.sell.enabled = true

configs.exchangeItems = false

configs.exchangeItems = {};
configs.exchangeItems.enabled = true
configs.exchangeItems.interval = 2000

configs.upgradeNPCItem = {}
configs.upgradeNPCItem.item = "staff"

configs.buyMercs = {};
configs.buyMercs.enabled = true
configs.buyMercs.maxToSpend = 1000000
configs.buyMercs.currentSpent = 0
configs.buyMercs.interval = 10000

configs.regen = {};
configs.regen.enable = true
configs.regen.to_percent = 80

configs.luck = {};
configs.luck.enabled = true
configs.luck.interval = 1000
configs.luck.fname = "Luck Mode"
configs.luck.lastLuck = Date.now()

configs.buyPots = {};
configs.buyPots.enabled = true
configs.buyPots.pots_to_buy = {}

