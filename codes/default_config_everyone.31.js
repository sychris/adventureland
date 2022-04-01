

log("loading default_config_everyone")
configs = new Object();

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
configs.is_combat = (character.ctype == "merchant") ? false : true

configs.ctype = character.ctype;

configs.mode = new Object();
configs.mode.move = new Object();
configs.mode.move.fname = "Movement Mode"
configs.mode.move.max = 2

configs.mode.sell = new Object()
configs.mode.sell.enabled = false
configs.mode.sell.items = new Map()
configs.mode.sell.interval = 1000

configs.mode.hpMp = new Object()
configs.mode.hpMp.enabled = true
configs.mode.hpMp.interval = 250

configs.mode.skills = new Object()

configs.mode.loot = new Object;
configs.mode.loot.interval = 200

configs.party = new Object();
configs.party.leader = "Sychris"


configs.skills = new Object()

configs.pots = new Object()
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
