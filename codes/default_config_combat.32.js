log("loading default_config_combat")

configs.attack = {};
configs.attack.fname = "Attack Mode"
configs.attack.onlyAttack = null
configs.attack.enabled = 1
configs.attack.interval = 250
configs.attack.allowMoveForAttack = false

configs.inv_dump = {};
configs.inv_dump.fname = "Inventory Dump Mode"
configs.inv_dump.enabled = false
configs.inv_dump.interval = 1000
configs.inv_dump.sendTo = "loots"
configs.inv_dump.wList = ["tracker", "mpot0", "hpot0", "mpot1", "hpot1", "mpot2", "hpot2"];
