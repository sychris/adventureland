//this is not meant to be the script you actually run.
//instead you copy this to the characters personal file and modify default configs.
log("Starting script")
load_code(10)


configs.attack.enabled = true
configs.attack.allowMoveForAttack = true
configs.attack.onlyAttack = null//"crab"
configs.attack.preferedTarget = null

configs.sell.enabled = true


configs.inv_dump.enabled = true
configs.inv_dump.interval = 1000 //overiding 3000

configs.autoLoot.enabled = true

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 8000,
  mpot1: 8000,
  hpot1: 500
}

//this is where all the intervals etc are
load_code(40)