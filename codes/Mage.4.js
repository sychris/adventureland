load_code(10)

configs.attack.enabled = 1
configs.attack.onlyAttack = "rat"

configs.hpMp.enabled = true

configs.inv_dump.enabled = true
configs.inv_dump.interval = 3000

configs.loot.enabled = false

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

var useHpPot = 4000
var useMpPot = 3000


configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 1000
}

setInterval(energize, 2000)
setInterval(lootmode, configs.loot.interval);
setInterval(inv_dump, configs.inv_dump.interval)
setInterval(combat, 250)

map_key("O", "snippet", "toggle_mode(configs.inv_dump)");
