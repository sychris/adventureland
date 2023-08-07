load_code(10)

configs.hpMp.enabled = true
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



load_code(40)



