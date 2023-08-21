function threeShot() {
  
  let targets = [];
  if (is_on_cooldown("3shot")) return false;
  if (character.mp >= 300 && parent.character.level >= 60) {
    for (let id in parent.entities) {
      
      if (configs.attack.onlyAttack) {
        if (parent.entities[id].mtype !== configs.attack.onlyAttack) continue
      }
      if (parent.entities[id].type !== "monster") continue
      if (!is_in_range(parent.entities[id], "3shot")) continue
      if (targets.length >= 3) continue
      
      targets.push(parent.entities[id]);
    }
    // Use 3-Shot with a Ranger on 3 targets
    if (targets.length > 2) {
      writeToLog("firing 3shot at " + targets.length + " Targets")
      use_skill("3shot", targets);
      return true;
    }
  } else {
    return false
  }
}

function energize() {
  if (!configs.skills.energize.enabled) return
  if (!configs.skills.energize.target) return
  if (is_on_cooldown("energize")) return
  if (character.mp == 0) return
  if (!ck_range_by_name(configs.skills.energize.target, 320)) return
  let target = get_player(configs.skills.energize.target)
  use_skill("energize", target)
  writeToLog("Energising: " + target.name)
}

function combat_mage() {
  standardAttack()
}
