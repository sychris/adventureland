writeToLog("loading default_config_everyone")
configs = {};

configs.is_combat = (character.ctype !== "merchant")

configs.move = {};
configs.move.fname = "Movement Mode"
configs.move.max = 2

configs.sell = {}
configs.sell.enabled = false
configs.sell.items = new Map()
configs.sell.interval = 1000

configs.sell.items.set('test_orb', 0)
configs.sell.items.set('hpamulet', 0)
configs.sell.items.set('wand', 0)
configs.sell.items.set('stinger', 0)
configs.sell.items.set('hpbelt', 0)
configs.sell.items.set('cclaw', 0)
configs.sell.items.set('epyjamas', 0)

configs.skills = {}

configs.autoLoot = {};
configs.autoLoot.enabled = true // this is not checked yet
configs.autoLoot.interval = 200

configs.party = {};
configs.party.leader = "loots"

configs.autocraft = {}
configs.autocraft.enabled = false
configs.autocraft.item = ""
configs.autocraft.interval = 100

configs.hpMp = {}
configs.hpMp.enabled = true
configs.hpMp.interval = 250

configs.hpMp.useHpot1 = {}
configs.hpMp.useHpot1.enabled = true
configs.hpMp.useHpot1.percent = 50

configs.hpMp.useHpot0 = {}
configs.hpMp.useHpot0.enabled = true
configs.hpMp.useHpot0.percent = 75

configs.hpMp.hpMeditate = {}
configs.hpMp.hpMeditate.Enabled = true
configs.hpMp.hpMeditate.percent = 90

configs.hpMp.useMpot1 = {}
configs.hpMp.useMpot1.enabled = true
configs.hpMp.useMpot1.percent = 50

configs.hpMp.useMpot0 = {}
configs.hpMp.useMpot0.enabled = true
configs.hpMp.useMpot0.percent = 75

configs.hpMp.mpMeditate = {}
configs.hpMp.mpMeditate.Enabled = true
configs.hpMp.mpMeditate.percent = 90


configs.pots = {}
configs.pots.current_potions = new Map();
configs.pots.allow_buying_use_pot_types = false //not yet implemented

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 1000,
  hpot0: 1000
}

configs.testing = false //this is for jest to run

if (character.ctype === "mage") {
  configs.skills.energize = {};
  configs.skills.energize.enabled = false;
  configs.skills.energize.target = "mrshoots"
  configs.skills.energize.interval = 1000;
  
}

if (character.ctype === "ranger") {
  configs.skills.threeShot = false
}

if (character.ctype === "priest") { //not really enough yet to warrant own file
  configs.heal = {};
  configs.heal.fname = "Heal Mode"
  
}

