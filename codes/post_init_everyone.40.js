//post init/intervals
log("loading post_init_everyone")
setInterval(partyCall, 30000);
setInterval(autoLoot, configs.autoLoot.interval);
setInterval(autoSell, configs.sell.interval);
setInterval(setmsg, 1000);

//if merchant load post_init_merc else combat
(character.ctype == "merchant") ? load_code(44) : load_code(41)
