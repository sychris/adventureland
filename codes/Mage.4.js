load_code(10)

configs.mode.attack.enabled = 1
configs.mode.attack.onlyAttack = "rat"

configs.mode.hpMp.enabled = true

configs.mode.inv_dump.enabled = true
configs.mode.inv_dump.interval = 3000

configs.mode.loot.enabled = false

configs.pots.use_Hp_pot_type = "hpot1"
configs.pots.use_Mp_pot_type = "mpot1"

var useHpPot = 4000
var useMpPot = 3000

var useEnargize = true
configs.pots.pots_to_request = {
  //ItemName, Count
  mpot0: 8000,
  hpot0: 1000
}

setInterval(energize,2000)
setInterval(lootmode,configs.mode.loot.interval);
setInterval(inv_dump, configs.mode.inv_dump.interval)
setInterval(combat, 250)

map_key("O", "snippet", "toggle_mode(configs.mode.inv_dump)");

function energize(){
  if(!useEnargize) return

  let t = get_player("mrshoots")
  use_skill("energize",t)
}
function combat() {
  //log("firing attack mode")
  if (character.hp < useHpPot || character.mp < useMpPot) use_hp_or_mp();
  loot();

  if (!configs.mode.attack.enabled || character.rip || is_moving(character)) return;

  var target = null//get_targeted_monster();
  if (!target) {
    if(configs.mode.attack.onlyAttack){
      target = get_nearest_monster({type: configs.mode.attack.onlyAttack});
    }else{
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
    
    attack(target);
  }
}
