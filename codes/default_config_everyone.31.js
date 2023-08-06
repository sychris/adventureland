log("loading default_config_everyone")
configs = {};

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
configs.is_combat = (character.ctype == "merchant") ? false : true

configs.ctype = character.ctype;

configs.mode = {};
configs.move = {};
configs.move.fname = "Movement Mode"
configs.move.max = 2

configs.sell = {}
configs.sell.enabled = false
configs.sell.items = new Map()
configs.sell.interval = 1000

configs.hpMp = {}
configs.hpMp.enabled = true
configs.hpMp.interval = 250

configs.skills = {}

configs.autoLoot = {};
configs.autoLoot.enabled = true // this is not checked yet
configs.autoLoot.interval = 200

configs.party = {};
configs.party.leader = "Sychris"


configs.skills = {}

configs.pots = {}
configs.pots.current_potions = new Map();
configs.pots.last_pot_used = new Date()
configs.pots.allow_buying_use_pot_types = false //not yet implemented
configs.pots.use_Hp_pot_at_percent = 50
configs.pots.use_Mp_pot_at_percent = 50
configs.pots.use_Hp_pot_type = "hpot0"
configs.pots.use_Mp_pot_type = "mpot0"
configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 1000,
  hpot0: 1000
}
