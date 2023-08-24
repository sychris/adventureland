writeToLog("loading default_config_everyone")
configs = {};

configs.is_combat = (character.ctype !== "merchant")

configs.move = {};
configs.move.fname = "Movement Mode"
configs.move.max = 2

configs.sell = {enabled: false, interval: 1000}
configs.sell.items = new Map()

configs.skills = {}

configs.autoLoot = {enabled: true, interval: 200};

configs.party = {};
configs.party.leader = "loots"

configs.buyPonty = {enabled: false}
configs.upgrade = {enabled: false, interval: 300};
configs.upgrade.fname = "Upgrade Mode"

configs.autocraft = {enabled: false}
configs.autocraft.item = ""
configs.autocraft.interval = 100

configs.hpMp = {enabled: true, interval: 250}

configs.hpMp.useHpot1 = {enabled: true, percent: 50}
configs.hpMp.useHpot0 = {enabled: true, percent: 75}
configs.hpMp.hpMeditate = {enabled: true, percent: 90}

configs.hpMp.useMpot1 = {enabled: true, percent: 50}
configs.hpMp.useMpot0 = {enabled: true, percent: 75}
configs.hpMp.mpMeditate = {enabled: true, percent: 90}


configs.pots = {}
configs.pots.current_potions = new Map();
configs.pots.allow_buying_use_pot_types = false //not yet implemented

configs.testing = false //this is for jest to run

if (character.ctype === "mage") {
  configs.skills.energize = {enabled: false, interval: 1000};
  configs.skills.energize.targets = ["mrshoots"]
  
}

if (character.ctype === "ranger") {
  configs.skills.threeShot = {enabled: true}
}

if (character.ctype === "priest") { //not really enough yet to warrant own file
  configs.heal = {};
  configs.heal.fname = "Heal Mode"
  
}

