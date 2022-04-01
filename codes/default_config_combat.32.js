log("loading default_config_combat")

configs.mode.attack = new Object();
configs.mode.attack.fname = "Attack Mode"
configs.mode.attack.onlyAttack = null
configs.mode.attack.enabled = 1
configs.mode.attack.interval = 250
configs.mode.attack.allowMoveForAttack = false

configs.mode.inv_dump = new Object();
configs.mode.inv_dump.fname = "Inventory Dump Mode"
configs.mode.inv_dump.enabled = false
configs.mode.inv_dump.interval = 3000
configs.mode.inv_dump.sendTo = "loots"
configs.mode.inv_dump.wList = ["tracker", "mpot0", "hpot0", "mpot1", "hpot1", "mpot2", "hpot2"];
