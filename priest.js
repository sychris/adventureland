// priest
log("starting the priest script")
//test area



//Configs

var heal_mode_enable = 1
var attack_mode_enable = 1
var movement_mode_enable = 2 // 0: none stay still, 1:moves in range of target, 2:tightly follows leader
var leader = "Sychris"
var useHpPot = 500
var useMpPot = 500
var party_names = Object.keys(parent.party);
var heal_mode_interval = 250
var attack_mode_interval = 250
var movement_mode_interval = 250

map_key("Q","snippet","switch_move_mode();");

//intervals
setInterval(heal_mode, heal_mode_interval);
setInterval(Attack_mode, attack_mode_interval);
setInterval(movement_mode, movement_mode_interval);

//internal vals



//functions

var enable_inv_dump = 0
var send_to = "loots"
setInterval(inv_dump,1000)
function inv_dump(){
  if(enable_inv_dump){
    send_gold(send_to,99999999)
    log("invdumpung")
    //log(character.items)
    for(s in character.items){
    //log("checking " + character.items[s])
      if(character.items[s] !== null){
      //log(character.items[s])
        send_item(send_to, s, 9999);
        break;
      }
    }
  }
}


function movement_mode(){
  switch(movement_mode_enable){
    case 0:
      return;
      break;
    case 1:
    var target=get_targeted_monster();
      if(!in_attack_range(target))
      {
        move(
        character.x+(target.x-character.x)/2,
        character.y+(target.y-character.y)/2
        );
    // Walk half the distance
  }
      break;
    case 2:
      var target=get_player(leader);
      if(target){ //make sure target is targetable
        if(
          target.x-character.x > 10 || target.y-character.y > 10 ||
          target.x-character.x < -10 || target.y-character.y < -10
          ){
          move(character.x+(target.x-character.x)/2,character.y+(target.y-character.y)/2);
        }
      }else{
        log("movement mode is not able to locate target")
      }
      break;
    default:
      log("bad movement_mode_enable option")
  }

}

function heal_mode(){
  if(heal_mode_enable || check_idle()){
    pot_and_loot();
    
    var na;
    //log(party_names);
    for (na in party_names){
      //log(party_names[na])
      if(party_names[na] !== null){
        
        p = get_player(party_names[na]);
        if(p){
          if(p.rip){
            log(p.name + " is dead O.O")
          }else{
            //log(p.hp / p.max_hp)
            if(p.hp / p.max_hp < .75){
              //log("healing " + p.name);
              heal(p);
            }
          }
        }
      }
    }
  }
}

function Attack_mode(){
  if(!attack_mode_enable || character.rip || is_moving(character)) return;

  var target=get_targeted_monster();
  if(!target || !in_attack_range(target))
  {
    target=get_nearest_monster(); //min_xp:100,max_att:120
    if(target) change_target(target);
    else
    {
      set_message("No Monsters");
      return;
    }
  }
 
  if(can_attack(target))
  {
    set_message("Attacking");
    attack(target);
  }
}

function pot_and_loot(){
  if(character.hp<useHpPot || character.mp<useMpPot) use_hp_or_mp();
  loot();

}

function check_idle(){
  if(character.rip || is_moving(character)){
    return false
  }else{
      return true
  }
}

function switch_move_mode(){
  if(movement_mode_enable <= 1){
    movement_mode_enable ++
  } else{
    movement_mode_enable = 0
  }
  log("movement mode set to " + movement_mode_enable)
}