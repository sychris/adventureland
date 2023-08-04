load_code(10)

configs.mode.attack.enabled = 1
configs.mode.attack.onlyAttack = "rat"

configs.mode.hpMp.enabled = true

configs.mode.inv_dump.enabled = true
configs.mode.inv_dump.interval = 3000

configs.mode.loot.enabled = false

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

var useHpPot = 4000
var useMpPot = 3000


configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 1000
}

setInterval(energize,2000)
setInterval(lootmode,configs.mode.loot.interval);
setInterval(inv_dump, configs.mode.inv_dump.interval)
setInterval(combat, 250)

map_key("O", "snippet", "toggle_mode(configs.mode.inv_dump)");
