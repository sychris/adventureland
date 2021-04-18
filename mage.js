var attack_mode=true
var useHpPot=500
var useMpPot=500
var buy_hp = false; //Allow HP Pot Purchasing = true
var buy_mp = false; //Allow MP Pot Purchasing = true
var HpPotType = "hpot0"
var MpPotType = "mpot1"
var ReqUpToHp = 500
var ReqUpToMp = 500
var LookToBuyHpPotAt = 50
var LookToBuyMpPotAt = 50
var pots = new Object();
var pots_to_request = 
  {
    //ItemName, Count
    mpot0: 1000,
    hpot0: 1000
  }


load_code(10)
load_code(11)
load_code(12)
Init_configs();
configs.char = new Object();


configs.mode.inv_dump.enabled = true
configs.mode.inv_dump.interval = 3000
configs.mode.inv_dump.sendTo = "loots"
configs.mode.inv_dump.wList =  ["tracker","mpot0","hpot0","mpot1","hpot1","mpot2","hpot2"];
setInterval(inv_dump, configs.mode.inv_dump.interval)
map_key("O","snippet","toggle_mode(configs.mode.inv_dump)");


function update_configs(){
  configs.char = parent.character
}


function ck_a_wList(item,arr){
  var found = false;
  //log("checking wlist")
  for(i in arr){
    if(item.name == arr[i]){
      return true;
    } 
  }
  return found;
}
function ck_range(tar,range) {
  //log("checking range")
  if(tar !== null){ 
    if(Math.sqrt((character.real_x-tar.real_x)*
      (character.real_x-tar.real_x)+
      (character.real_y-tar.real_y)*
      (character.real_y-tar.real_y)) < range)
    {
   //log("fun ck_range true")
      return true;
    } else {
    //log("ck_range False")
      return false;
    }
  } else {
    //log("Atempting to ck_range something null")
  return false;
  }
}

function ck_range_by_name(name,range){
  var c = get_player(name)
  if(ck_range(c, range)){
      return true
  } else {
    return false
  }
}

function inv_dump(){
  if(configs.mode.inv_dump.enabled & ck_range_by_name(configs.mode.inv_dump.sendTo, 320)){
    send_gold(configs.mode.inv_dump.sendTo,99999999)
    //log(JSON.stringify(global.charactor))
    for(s in character.items){
      if(character.items[s] !== null){
        if(ck_a_wList(character.items[s],configs.mode.inv_dump.wList) != true){
          log("sending " + character.items[s] + " to " + configs.mode.inv_dump.sendTo)
          send_item(configs.mode.inv_dump.sendTo, s, 9999);
          break;
        }
      }
    }
  }
}


function getItemSlot(name) {
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name){
      return i;
    }
  }
  log("item not found")
  return -1;
}

function on_cm(n,d){
  log("cm from " + n + ": " + d)
  if(n == "loots"){
    if(d == "what_pots_do_you_need?"){
      request_pots(n)
    }
  }
}

function request_pots(n){
  log("requesting pots firing")
    var requests = {}
  for (pot in pots_to_request){
    log("checking " + pot + " for request")
    var pslot = character.items[getItemSlot(pot)]
    var needed = {}
    var count = 0
    //log(pslot.q + " pots found of the needed " + pots_to_request[pot])
    log("checking quantity from slot")
    if(pslot == undefined){
    needed.name = pot
    needed.q = pots_to_request[pot]
    log("pslot q tested undefigned")  
    
    } else if(pslot.q < pots_to_request[pot]){
    log("need pots")
      needed.name = pot
    needed.q = pots_to_request[pot] - pslot.q
    log("looks like we need " + JSON.stringify(needed))
    
    } else if(pslot.q >= pots_to_request[pot]){
    log("dont need pots")
    }else {
    log("something went wrong man")
    }
    
    if(needed.name !== undefined){
    
      log("requesting " + needed.pot + needed.keys )
      send_cm(n,needed)
    } 
    }
}


setInterval(function(){
  
  if(character.hp<useHpPot || character.mp<useMpPot) use_hp_or_mp();
  loot();

  if(!attack_mode || character.rip || is_moving(character)) return;

  var target=get_targeted_monster();
  if(!target)
  {
    target=get_nearest_monster({min_xp:100,max_att:120});
    if(target) change_target(target);
    else
    {
      set_message("No Monsters");
      return;
    }
  }
  
  if(!in_attack_range(target))
  {
    move(
      character.x+(target.x-character.x)/2,
      character.y+(target.y-character.y)/2
      );
    // Walk half the distance
  }
  else if(can_attack(target))
  {
    set_message("Attacking");
    attack(target);
  }

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
