//post init/intervals
writeToLog("loading post_init_everyone")
setInterval(partyCall, 30000);
setInterval(autoLoot, configs.autoLoot.interval);
setInterval(autoSell, configs.sell.interval);
setInterval(setmsg, 1000);
setInterval(autoCraft, configs.autocraft.interval);

//if merchant load post_init_merc else combat
(character.ctype == "merchant") ? load_code(44) : load_code(41)

