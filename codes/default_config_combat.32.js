writeToLog("loading default_config_combat")

configs.attack = {};
configs.attack.enabled = 1
configs.attack.fname = "Attack Mode"
configs.attack.onlyAttack = undefined //null to disable can be string or list
configs.attack.interval = 100
configs.attack.allowMoveForAttack = false

configs.inv_dump = {};
configs.inv_dump.fname = "Inventory Dump Mode"
configs.inv_dump.enabled = true
configs.inv_dump.interval = 1000
configs.inv_dump.sendTo = "loots"
configs.inv_dump.wList = ["tracker", "mpot0", "hpot0", "mpot1", "hpot1", "mpot2", "hpot2"];

