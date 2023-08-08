log("loading util_merc")
//-----------------------------item_filtering---------------------------------
//todo this should be for everyone?
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


//-----------------------------------upgrading/compounding---------------------------------------
//todo exclude current sell list
function upgrade_check() {
  if (configs.upgrade.enable) {
    //log("firing upgrade_check")
    if (parent != null && parent.socket != null && npcInRange("newupgrade")) {
      upgrade();
      compound_items();
    }
  }
}

function upgrade() {
  if (parent.character.q.upgrade) return;
  for (let i = 0; i < character.items.length; i++) {
    let itemSlot = character.items[i];
    //slot not null and item not in sell list
    if (itemSlot && !configs.sell.items.has(itemSlot.name)) {
      var level = configs.upgrade.upgradeWhitelist[itemSlot.name];
      //log("attempting upgrade on " + itemSlot.name + " level: " + level)
      if (level && itemSlot.level < level) {
        let grades = get_grade(itemSlot);
        let scrollname;
        if (itemSlot.level < grades[0])
          scrollname = 'scroll0';
        else if (itemSlot.level < grades[1])
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
          clevel: itemSlot.level
        });
        return;
      }
    }
  }
}

function compound_items() {
  if (parent.character.q.compound) return;
  let to_compound = character.items.reduce((collection, item, index) => {
    if (item && configs.upgrade.combineWhitelist[item.name] != null && !configs.sell.items.has(item.name) &&item.level < configs.upgrade.combineWhitelist[item.name]) {
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
//todo rename to indicate either merc only or add logic and merge for everyone
function on_cm(name, d) {
  log("cm from " + name + ": " + JSON.stringify(d))
  let slot;
  if (myToons.includes(name)) {
    //if we have pots
    
    //log("sending " + name + " " + d.q + " " + d.name)
    slot = getItemSlot(d.name)
    //dont sent if item not found
    if (slot != -1) send_item(name, getItemSlot(d.name), d.q)
  }
}

//-----------------------------Luck---------------------------------
function luck_players() {
  if (configs.luck.enabled == true) {
    for (let id in parent.entities) {
      let current = parent.entities[id];
      if (current && current.type == "character" && !current.npc && current.ctype != "merchant") {
        if (current.s.mluck && !current.s.mluck.strong && current.s.mluck.f != character.name && ck_range(current, 320)) {
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

//todo integrate in to luck players
//todo get rid of manual time checking and use cooldown check
function luck(target) {
  // Luck only if not on cd (cd is .1sec).
  if ((Date.now() - configs.luck.lastLuck > 100)) {
    parent.socket.emit("skill", {
      name: "mluck",
      id: target.id
    });
    set_message(target.name);
    configs.luck.lastLuck = Date.now();
  }
}

//-----------------------------on_magiport---------------------------------
function on_magiport(name) {
  if (myToons.includes(name)) accept_magiport(name)
}

//-----------------------------regen mp---------------------------------
//todo move this to everyones utils mages can use this for giving mana without pots
//this is used on the merc as he is non combat and theres no real need to blow potions to speed up
//only real thing mp is used for is luck and upgrade spells
function regen_mp() {
  if (configs.regen.enable) {
    if (is_on_cooldown("regen_mp")) return
    let mp_percent = character.mp / character.max_mp
    mp_percent = mp_percent * 100
    //log(mp_percent)
    if (mp_percent < configs.regen.to_percent) {
      //log("regening")
      use_skill("regen_mp")
    }
  }
}

//-----------------------------top up pots---------------------------------
//todo rename this so its name indicates its for merc
function top_up_pots() {
  if (configs.give_pots.enabled === true) {
    for (let ppl in configs.give_pots.donate_pots_to) {
      //log("looking for " + configs.give_pots.donate_pots_to[ppl])
      let tempCharacter = get_player(configs.give_pots.donate_pots_to[ppl]);
      
      //first tempCharacter check is to make sure its not null
      if (tempCharacter && tempCharacter.name !== character.name && ck_range(tempCharacter, 320)) {
        log("sent top up query to " + tempCharacter.name)
        send_cm(tempCharacter.name, "what_pots_do_you_need?")
      }
    }
  }
}

//-----------------------------------buy_pots---------------------------------------
//todo add range check
function buy_pots() {
  //log(pots_to_buy)
  if (configs.buyPots.enabled === true)
    for (let pot in configs.buyPots.pots_to_buy) {
      //log(pot)
      let current_pots = character.items[getItemSlot(pot)];
      let buy_count = 0;
      if (current_pots == undefined) buy_count = configs.buyPots.pots_to_buy[pot]
      else if (current_pots.q < configs.buyPots.pots_to_buy[pot]) buy_count = configs.buyPots.pots_to_buy[pot] - current_pots.q
      else if (current_pots.q < 1) buy_count = configs.buyPots.pots_to_buy[pot]
      //log(current_pots.q)
      if (buy_count > 0) {
        log("buying " + buy_count + " " + pot)
        parent.buy(pot, buy_count)
      }
    }
}

//-----------------------------------send_item_by_name()---------------------------------------
//todo this should be in everyone_util but by other classes are doing this already duplicate?
function send_item_by_name(player, item, quantity) {
  send_item(player, getItemSlot(item), quantity)
}

//-----------------------------------travelToPlayers---------------------------------------
//possible states:
//  init //script just started
//  moving to player
//  awaiting items
//  moving to idle
//  idling

//would be great is we could check inventory status
function travelToPlayers() {
  log("util_merc.travelToPlayers not yet implemented")
  if (configs.travelToPlayers.lastPickupTime == null) {
    if (character.map == configs.travelToPlayers.idle.map) {
      //start pickup
    } else {
      //log("on unknown map")
    }
  } else {
    //check if its time to pick up items
  }
}
//check if configs.travelToPlayers.targetPlayerName is on map
//if configs.travelToPlayers.targetPlayerName is on map

//-----------------------------------autoStand---------------------------------------
function autoStand(){
  if(character.moving == true){
    if(character.stand !== false){
      close_stand()
    }
  }else{
    if(!character.stand !== false){
      open_stand()
    }
  }
}

//-----------------------------------sell primals---------------------------------------

function sellPrimals() {
  if (parent.character.slots.trade3 == null) {
    log("no more offerings")
    if (getItemSlot("offering") == -1) parent.buy("offering")
    
    let slot = getItemSlot("offering")
    if (slot != -1) {
      //safty check that primal ess price has not changed
      if(getItemValue("offering") == 27420000) {
        trade(getItemSlot("offering"), 3, 32904000, quantity)
      }else log("price of primal offerings has changed!!!!")
    }
  }
}

//-----------------------------------buyPontyItems---------------------------------------



function buyPontyItems() {
  if (!configs.buyPonty.enabled || !npcInRange("secondhands")) return
  // Set up the handler
  let itemsBought = 0
  parent.socket.once("secondhands", function(data) {
    for(let d of data) {
      if (configs.buyPonty.itemsList.includes(d.name)) {
        game_log(`BUY ${d.name}!`)
        // We want this item based on our list
        parent.socket.emit("sbuy", { "rid": d.rid })
      } else {
        //game_log(`DON'T BUY ${d.name}!`)
      }
    }
  });
  
  // Attempt to buy stuff
  parent.socket.emit("secondhands");
}


//-----------------------------------checkMerchents---------------------------------------

function checkMerchents() {
  
  if (configs.buyMercs.currentSpent > configs.buyMercs.maxToSpend) return
  if (!configs.buyMercs.enabled) return
  for (id in parent.entities) {
    var current = parent.entities[id];
    //makes sure its a player
    if (current && current.type == "character" && !current.npc && current.ctype == "merchant") {
      //log(current.name)
      if (!ck_range(current, 400)) {
        for (let slot in current.slots) {
          
          if (current.slots[slot] == null) continue //slot empty
          if (!current.slots[slot].rid == null) continue  //not a trade item
          if (!current.slots[slot].b == null) continue     //not for sell
          //log(current.slots[slot])
          let pontyBuyPrice = Math.floor(G.items[current.slots[slot].name].g * 0.6) //ponty buy price
          if (current.slots[slot].price <= pontyBuyPrice && configs.buy.items.includes(current.slots[slot].name)) {
            configs.buyMercs.currentSpent += current.slots[slot].price
            parent.trade_buy(current.slots[slot], current.id, current.slots[slot].rid, current.slots[slot].q || 1)
          } else if (current.slots[slot].price <= pontyBuyPrice) {
            let n = current.slots[slot].name
            let q = current.slots[slot].q //quantity
            parent.trade_buy(current.slots[slot], current.id, current.slots[slot].rid, current.slots[slot].q || 1)
            configs.buyMercs.currentSpent += current.slots[slot].price
            getItemSlot(n)
            parent.sell(getItemSlot(n), q)
            //and resell
          }
        }
      }
    }
  }
}

//-----------------------------------upgradeNPCItem---------------------------------------
function upgradeNPCItem() {
  if (!configs.upgradeNPCItem.enabled) return
  if (getItemSlot(configs.upgradeNPCItem.item) == -1) {
    parent.buy(configs.upgradeNPCItem.item, 1)
  }
  
}

