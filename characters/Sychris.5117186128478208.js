//Init
load_code(10)


configs.hpMp.useHpot1 = {enabled: true, percent: 50}
configs.hpMp.useHpot0 = {enabled: true, percent: 75}
configs.hpMp.hpMeditate = {enabled: true, percent: 90}

configs.hpMp.useMpot1 = {enabled: true, percent: 50}
configs.hpMp.useMpot0 = {enabled: true, percent: 75}
configs.hpMp.mpMeditate = {enabled: true, percent: 90}

configs.attack.enabled = 1
configs.attack.onlyAttack = ["crab", "hen", "rooster", "spider", "cutebee"] //null to disable can be string or list

configs.hpMp.enabled = true

configs.sell.enabled = true

configs.inv_dump.enabled = true
configs.inv_dump.interval = 3000

configs.autoLoot.enabled = true

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

configs.skills.energize.enabled = true;
configs.skills.energize.targets = ["mrshoots", "Name001", "loots"]

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 5000,
  mpot1: 5000,
  hpot1: 5000,
}

//this is where all the intervals etc are
load_code(40)


map_key("O", "snippet", "toggle_mode(configs.inv_dump)");
