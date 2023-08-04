//Init
load_code(10)

configs.mode.attack.enabled = 0
configs.mode.attack.onlyAttack = "crab"

configs.mode.hpMp.enabled = true

configs.mode.inv_dump.enabled = true
configs.mode.inv_dump.interval = 3000

configs.mode.loot.enabled = false

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

configs.skills.energize.enabled = true;
configs.skills.energize.target = "mrshoots"

var useHpPot = 4000
var useMpPot = 3000


configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 1000
}

setInterval(energize,configs.skills.energize.interval)
setInterval(lootmode,configs.mode.loot.interval);
setInterval(inv_dump, configs.mode.inv_dump.interval)
setInterval(combat, 250)

map_key("O", "snippet", "toggle_mode(configs.mode.inv_dump)");
