//Merc
log("Starting merc script")
//test area
//send_item("Sychris", getItemSlot("mpot0"), 2)
load_code(11)
load_code(12)


//Configs
var enable_upgrading = 1
var enable_buying_pots = 1
var pots_to_buy = 
  {
    //ItemName, Count
    mpot0: 5000,
    hpot0: 5000
  }
    
    
    

var top_up_pots_enable = true
var luck_boost_enable = true
var regen_enable = true
var regen_to_percent = 80
var donate_pots_to = ["Sychris","mrshoots","Normon"]


var top_up_pots_at = 500
var top_up_pots_to = 1000

var upgradeMaxLevel = 8; //Max level it will stop upgrading items at if enabled
var upgradeWhitelist = 
  {
    //ItemName, Max Level
    pyjamas: upgradeMaxLevel,
    bunnyears: upgradeMaxLevel,
    bow: 7,
    carrotsword: upgradeMaxLevel,
    cclaw: 7,
    firestaff: 7,
    fireblade: 7,
    slimestaff: 6,
    sshield: 7,
    shield: 7,
    shoes: 6,
    staff: 7,
    gloves: 7,
    coat: 7,
    helmet: 7,
    pants: 7,
    gloves1: 7,
    coat1: 7,
    helmet1: 7,
    pants1: 7,
    shoes1: 7,
    harbringer: 5,
    oozingterror: 5,
    bataxe: 7,
    spear: 7,
    xmaspants: 7,
    xmassweater: 7,
    xmashat: 7,
    xmasshoes: 7,
    mittens: 7,
    ornamentstaff: 7,
    candycanesword: 7,
    warmscarf: 7,
    t2bow: 7,
    pmace: 7,
    basher: 7,
    harmor: 5,
    hgloves: 5,
    wingedboots: 7,
    wattire: 7,
    wbreeches: 7,
    wcap: 7,
    wgloves: 7,
  stinger: 7,
    wshoes: 7
  };

var combineWhitelist = 
  {
    //ItemName, Max Level
    wbook0: 3,
    lostearring: 2,
    strearring: 3,
    intearring: 3,
    dexearring: 3,
    hpbelt: 3,
    ringsj: 3,
    strring: 3,
    intring: 3,
    dexring: 3,
    vitring: 3,
    dexamulet: 3,
    intamulet: 3,
    stramulet: 3,
    vitearring: 3,
    hpamulet: 2,
    dexbelt: 3,
    intbelt: 3,
    strbelt: 3
  }






//intervals
var luck_players_interval = 1000
var top_up_pots_Interval = 10000
var regen_mp_Interval = 7000

setInterval(upgrade_check, 750);
setInterval(luck_players, luck_players_interval);
setInterval(top_up_pots, top_up_pots_Interval);
setInterval(regen_mp, regen_mp_Interval);
setInterval(buy_pots, top_up_pots_Interval);

function regen_mp(){
  var mp_percent = character.mp/character.max_mp
  mp_percent  = mp_percent * 100
  //log(mp_percent)
  if (mp_percent < regen_to_percent){
  log("regening")
  use_skill("regen_mp")
  }
}

function upgrade_check() {
  if(enable_upgrading){
    if(parent != null && parent.socket != null)
    {
      upgrade();
      compound_items();
    }
  }
}

//Internal vals


//Functions
function on_cm(n,d){
  log("cm from " + n + ": " + d)
  log(JSON.stringify(d))
  if(n == "Sychris" || "Normon" || "mrshoots"){
    //if we have pots  
    
  log("atempting to send " + d.q + d.item)
    send_item(n, getItemSlot(d.name), d.q)
    
  }
}
//send_cm("Sychris","hello")


function top_up_pots(){
  if(top_up_pots_enable == true){
    //log("firing fun top_up_pots")
  
  for (ppl in donate_pots_to){
    //log("looking for " + donate_pots_to[ppl])
    var charac = get_player(donate_pots_to[ppl])
    if(ck_range(charac, 320)){
    log("sent top up to query" + charac.name)
      send_cm(charac.name,"what_pots_do_you_need?")
    } 
  }
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

function send_item_by_name(player,item,quantity){
  send_item(player, getItemSlot(item), quantity)
}

function getItemQuantity(name) {
  var count = -1
  log("looking for item")
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name){
      log("item found in slot " + i) 
      
    }
  }
  log("item not found")
  return count;
}

function getItemSlot(name) {
  //log("looking for item")
  for (var i = 0; i < character.items.length; i++) {
    if (character.items[i] && character.items[i].name == name){
      //log("item found in slot " + i) 
      return i;
    }
  }
  log("item not found")
  return -1;
}


function luck_players(){
  if(luck_boost_enable == true){
    //log("fireing fun luck_players")
    //parent.socket.emit("merchant", {close:41});
    //searches everyone nearby
    for(id in parent.entities)
    {
      var current = parent.entities[id];
      //makes sure its a player
      if(current && current.type == "character" && !current.npc && current.ctype != "merchant")
      {
        //determines if they already have a mluck boost
        if(current.s.mluck)
        {
          //checks to see if the boost is from you
          if(current.s.mluck.f && current.s.mluck.f != character.name)
          {
            //boosts them if they are in range
            if(ck_range(current, 320))
            {
              luck(current);
              log("relucking " + current.name)
            }
          }
        }
        else {
          //if they dont already have a boost then boost them
          if(ck_range(current, 320))
          {
            luck(current);
            log("lucking " + current.name)
          }
        }
      } 
    }
  }
}



var lastluck = new Date(0);
function luck(target){
  // Luck only if not on cd (cd is .1sec).
  if((new Date() - lastluck > 100)){
    //log("emiting mluck")
    parent.socket.emit("skill", {name: "mluck", id: target.id});
    set_message(target.name);
    lastluck = new Date();
  }
}

function ck_range(tar,range) {
  //log("checking range")
  if(tar !== null){ 
    if(Math.sqrt((character.real_x-tar.real_x)*
      (character.real_x-tar.real_x)+
      (character.real_y-tar.real_y)*
      (character.real_y-tar.real_y)) < range)
    {
    
      return true;
    } else {
    
      return false;
    }
  } else {
    //hits on null
  return false;
  }
}

function upgrade() {
  for (let i = 0; i < character.items.length; i++) 
  {
    let c = character.items[i];

    if (c) {
      var level = upgradeWhitelist[c.name];
      if(level && c.level < level)
      {
        let grades = get_grade(c);
        let scrollname;
        if (c.level < grades[0])
          scrollname = 'scroll0';
        else if (c.level < grades[1])
          scrollname = 'scroll1';
        else
          scrollname = 'scroll2';

        let [scroll_slot, scroll] = find_item(i => i.name == scrollname);
        if (!scroll) {
          parent.buy(scrollname);
        return;
        }
        
        log("upgrading")
        parent.socket.emit('upgrade', {
        item_num: i,
        scroll_num: scroll_slot,
        offering_num: null,
        clevel: c.level
        });
        return;
      }
      }
    }
}

function compound_items() {
  let to_compound = character.items.reduce((collection, item, index) => {
    if (item && combineWhitelist[item.name] != null && item.level < combineWhitelist[item.name]) {
      let key = item.name + item.level;
      !collection.has(key) ? collection.set(key, [item.level, item_grade(item), index]) : collection.get(key).push(index);
    }
    return collection;
  }, new Map());

  for (var c of to_compound.values()) {
    let scroll_name = "cscroll" + c[1];

    for (let i = 2; i + 2 < c.length; i += 3) {
      let [scroll, _] = find_item(i => i.name == scroll_name);
      if (scroll == -1) {
        parent.buy(scroll_name);
        return;
      }
    log("compounding")
    //game_log(scroll_name);
    //game_log(c[i]);
    //game_log(c[i+1]);
    //game_log(c[i+2]);
      parent.socket.emit('compound', {
        items: [c[i], c[i + 1], c[i + 2]],
        scroll_num: scroll,
        offering_num: null,
        clevel: c[0]
      });
    return;
    }
  }
}

function get_grade(item) {
  return parent.G.items[item.name].grades;
}

// Returns the item slot and the item given the slot to start from and a filter.
function find_item(filter) {
  for (let i = 0; i < character.items.length; i++) {
    let item = character.items[i];

    if (item && filter(item))
      return [i, character.items[i]];
  }

  return [-1, null];
}

function buy_pots() {
  //log(pots_to_buy)
  for (pot in pots_to_buy){
  //log(pot)
  var current_pots = character.items[getItemSlot(pot)]
  var buy_count = 0
    if(current_pots == undefined) {
    buy_count = pots_to_buy[pot] 
  } else if(current_pots.q < pots_to_buy[pot]){
    buy_count = pots_to_buy[pot] - current_pots.q
  } else if(current_pots.q < 1){
    buy_count = pots_to_buy[pot]
  }
  //log(current_pots.q)
  if(buy_count > 0){
    log("buying " + buy_count + " " + pot)
    buy(pot,buy_count)  
  }
  }
}

