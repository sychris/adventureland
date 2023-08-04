//-----------------------------upgrade/compounding---------------------------------

//this is used in the upgrade stuff
// Returns the item slot and the item given the slot to start from and a filter.
function find_item(filter) {
  for (let i = 0; i < character.items.length; i++) {
    let item = character.items[i];
    
    if (item && filter(item))
      return [i, character.items[i]];
  }
  
  return [-1, null];
}

function upgrade_check() {
  if (configs.mode.upgrade.enable) {
    //log("firing upgrade_check")
    if (parent != null && parent.socket != null && npcInRange("newupgrade")) {
      upgrade();
      compound_items();
    }
  }
}

function upgrade() {
  if(parent.character.q.upgrade) return;
  for (let i = 0; i < character.items.length; i++) {
    let c = character.items[i];
    
    if (c) {
      var level = configs.mode.upgrade.upgradeWhitelist[c.name];
      //log("attempting upgrade on " + c.name + " level: " + level)
      if (level && c.level < level) {
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
        if (character.mp > 200) use_skill("massproductionpp")
        else if (character.mp > 20) use_skill("massproduction")
        
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
  if(parent.character.q.compound) return;
  let to_compound = character.items.reduce((collection, item, index) => {
    if (item && configs.mode.upgrade.combineWhitelist[item.name] != null && item.level < configs.mode.upgrade.combineWhitelist[item.name]) {
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
      if (character.mp > 200) use_skill("massproductionpp")
      else if (character.mp > 20) use_skill("massproduction")

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
//-----------------------------on_cm---------------------------------
function on_cm(name, d) {
  log("cm from " + name + ": " + JSON.stringify(d))
  //log(JSON.stringify(d))
  //todo place character names in config to handle this
  if (myToons.includes(name)) {
    //if we have pots
    
    //log("sending " + name + " " + d.q + " " + d.name)
    slot = getItemSlot(d.name)
    //dont sent if item not found
    if(slot != -1) send_item(name, getItemSlot(d.name), d.q)
  }
}
//-----------------------------Luck---------------------------------
function luck_players() {
  if (configs.mode.luck.enabled == true) {
    //searches everyone nearby
    for (id in parent.entities) {
      var current = parent.entities[id];
      //makes sure its a player
      if (current && current.type == "character" && !current.npc && current.ctype != "merchant") {
        //current.s.mluck determines if they already have a mluck boost
        //current.s.mluck.f != character.name determins if you cast it
        //ck_range(current, 320) returns true if player is in range 320
        if (current.s.mluck && current.s.mluck.f != character.name && ck_range(current, 320)) {
          luck(current);
          log("relucking " + current.name)
          
        } else if (!current.s.mluck && ck_range(current, 320)) {
          luck(current);
          log("lucking " + current.name)
        }
      }
    }
  }
}

function luck(target) {
  // Luck only if not on cd (cd is .1sec).
  if ((Date.now() - configs.mode.luck.lastLuck > 100)) {
    //log("emiting mluck")
    parent.socket.emit("skill", {
      name: "mluck",
      id: target.id
    });
    set_message(target.name);
    configs.mode.luck.lastLuck = Date.now();
  }
}

//-----------------------------on_magiport---------------------------------
function on_magiport(name) {
  if(myToons.includes(name)) accept_magiport(name)
}

//-----------------------------regen mp---------------------------------
//this is used on the merc as he is non combat and theres no real need to blow potions to speed up
//only real thing mp is used for is luck and upgrade spells

function regen_mp() {
  if(configs.mode.regen.enable){
    if (is_on_cooldown("regen_mp")) return
    var mp_percent = character.mp / character.max_mp
    mp_percent = mp_percent * 100
    //log(mp_percent)
    if (mp_percent < configs.mode.regen.to_percent) {
      //log("regening")
      use_skill("regen_mp")
    }
  }
}

//-----------------------------top up pots---------------------------------
function top_up_pots() {
  if (configs.mode.give_pots.enabled == true) {
    for (ppl in configs.mode.give_pots.donate_pots_to) {
      //log("looking for " + configs.mode.give_pots.donate_pots_to[ppl])
      var charac = get_player(configs.mode.give_pots.donate_pots_to[ppl])
      if (ck_range(charac, 320)) {
        log("sent top up query to " + charac.name)
        send_cm(charac.name, "what_pots_do_you_need?")
      }
    }
  }
}
