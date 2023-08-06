//post init/intervals
log("loading post_init_merc")
setInterval(sellPrimals,1000)
setInterval(exchangeSlotZero, configs.exchangeItems.interval);
setInterval(moveToPlayer, 180000)
setInterval(upgrade_check, configs.upgrade.interval);
setInterval(luck_players, configs.luck.interval);
setInterval(top_up_pots, configs.give_pots.interval);
setInterval(regen_mp, regen_mp_Interval);
setInterval(buy_pots, configs.give_pots.interval);
setInterval(getPontyData, 50000)
setInterval(buyPontyItems, 1000)
setInterval(upgradeNPCItem, 1000)
setInterval(checkMerchents, configs.buyMercs.interval)
//setInterval(travelToPlayers, configs.travelToPlayers.interval)
setInterval(autoStand, configs.autoStand.interval)