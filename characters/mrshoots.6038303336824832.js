load_code(10)

configs.hpMp.enabled = true

configs.attack.enabled = 1
configs.attack.allowMoveForAttack = false
configs.attack.onlyAttack = null//"crab"
configs.attack.preferedTarget = null

configs.sell.enabled = true
configs.sell.items.set('stinger', 0)

configs.inv_dump.enabled = true
configs.inv_dump.interval = 1000 //overiding 3000

configs.autoLoot.enabled = true

configs.skills.threeShot = true

configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 8000,
  mpot1: 8000,
  hpot1: 500
}


var minMpPercentForThreeShot = 25


load_code(40)



