function energize() {
  if (!configs.skills.energize.enabled || is_on_cooldown("energize") || character.mp == 0) return
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
      target = get_nearest_monster({type: configs.attack.onlyAttack});
    } else {
      target = get_nearest_monster()
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
