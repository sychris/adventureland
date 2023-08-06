load_code(10)

configs.hpMp.enabled = true

configs.attack.enabled = 1
configs.attack.allowMoveForAttack = false
configs.attack.onlyAttack = "crab"
configs.attack.preferedTarget = "squigtoad"

configs.sell.enabled = false
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

var hpPotPercent = 99
var hpMeditate = 90
var mpPotPercent = 50
var mpMeditate = 100



load_code(40)
setInterval(checkHpMp, configs.hpMp.interval); // Loops every 1/10 seconds.
setInterval(combat, configs.attack.interval); // Loops every 1/4 seconds.
setInterval(inv_dump, configs.inv_dump.interval)
map_key("O", "snippet", "toggle_mode(configs.inv_dump)");

