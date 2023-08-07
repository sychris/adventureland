//Init
load_code(10)


configs.hpMp.useMpot1.enabled = true
configs.hpMp.useMpot1.percent = 20
configs.hpMp.useMpot0.enabled = true
configs.hpMp.useMpot0.percent = 50
configs.hpMp.mpMeditate.Enabled = true
configs.hpMp.mpMeditate.percent = 90

configs.hpMp.useHpot1.enabled = true
configs.hpMp.useHpot1.percent = 20
configs.hpMp.useHpot0.enabled = true
configs.hpMp.useHpot0.percent = 50
configs.hpMp.hpMeditate.Enabled = true
configs.hpMp.hpMeditate.percent = 90

configs.attack.enabled = 1
configs.attack.onlyAttack = "crab"

configs.hpMp.enabled = true

configs.inv_dump.enabled = true
configs.inv_dump.interval = 3000

configs.autoLoot.enabled = true

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

configs.skills.energize.enabled = true;
configs.skills.energize.target = "mrshoots"

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 1000,
  mpot1: 5000
}

//this is where all the intervals etc are
load_code(40)


map_key("O", "snippet", "toggle_mode(configs.inv_dump)");
