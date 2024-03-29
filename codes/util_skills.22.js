function threeShot() {
  
  let targets = [];
  if (!configs.skills.threeShot.enabled) return false
  if (is_on_cooldown("3shot")) return false;
  if (character.mp < 300) return false
  if (character.level < 60) return false
  
  for (let id in parent.entities) {
    if (configs.attack.onlyAttack && !configs.attack.onlyAttack.includes(parent.entities[id].mtype)) continue
    
    if (parent.entities[id].type !== "monster") continue
    if (!is_in_range(parent.entities[id], "3shot")) continue
    if (targets.length >= 3) continue
    
    targets.push(parent.entities[id]);
  }
  
  if (targets.length < 2) return false
  //writeToLog("firing 3shot at " + targets.length + " Targets")
  use_skill("3shot", targets);
  return true;
  
}

function energize() {
  if (!configs.skills.energize.enabled) return false
  if (!configs.skills.energize.targets) return false
  if (is_on_cooldown("energize")) return false
  if (character.mp === 0) return false
  let targets = configs.skills.energize.targets.filter((t) =>
    ck_range_by_name(t, 320) === true
  )
  if (targets.length === 0) return false
  targets.sort(function (a, b) {
    return get_player(a).mp - get_player(b).mp
  });
  
  let target = get_player(targets[0])
  writeToLog("Energising: " + target.name)
  use_skill("energize", target)
  return true
  
}

if (configs.testing) {
  module.exports.energize = energize
  module.exports.threeShot = threeShot
  
}