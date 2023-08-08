function energize() {
  if (!configs.skills.energize.enabled) return
  if (!configs.skills.energize.target)return
  if (is_on_cooldown("energize"))return
  if (character.mp == 0) return
  if (!ck_range_by_name(configs.skills.energize.target,320)) return
  let target = get_player(configs.skills.energize.target)
  use_skill("energize", target)
  log("Energising: " + target.name)
}


function combat() {
  //log("firing attack mode")

  loot();
  
  if (!configs.attack.enabled || character.rip || is_moving(character)) return;
  
  var target = null//get_targeted_monster();
  if (!target) {
    if (configs.attack.onlyAttack) {
      target = getNearestMonster({type: configs.attack.onlyAttack});
    } else {
      target = getNearestMonster()
    }
    if (target) change_target(target);
    else {
      set_message("No Monsters");
      return;
    }
  }
  
  var walk_to_mob = false
  if (!in_attack_range(target) && walk_to_mob == true) {
    move(
      character.x + (target.x - character.x) / 2,
      character.y + (target.y - character.y) / 2
    );
    // Walk half the distance
  } else if (can_attack(target)) {
    set_message("Attacking");
    attack(target);
  }
}
