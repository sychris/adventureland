writeToLog("loading default_config_combat")

configs.attack = {};
configs.attack.fname = "Attack Mode"
configs.attack.onlyAttack = undefined //null to disable can be string or list
configs.attack.enabled = 1
configs.attack.interval = 250
configs.attack.allowMoveForAttack = false

configs.inv_dump = {};
configs.inv_dump.fname = "Inventory Dump Mode"
configs.inv_dump.enabled = true
configs.inv_dump.interval = 1000
configs.inv_dump.sendTo = "loots"
configs.inv_dump.wList = ["tracker", "mpot0", "hpot0", "mpot1", "hpot1", "mpot2", "hpot2"];

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 8000,
  mpot1: 8000,
  hpot1: 8000,
}
