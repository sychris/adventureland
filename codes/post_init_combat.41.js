//post init/intervals
setInterval(inv_dump, configs.inv_dump.interval)
setInterval(checkHpMp, configs.hpMp.interval); // Loops every 1/10 seconds.
if (character.ctype === "mage") {
  setInterval(combat, configs.attack.interval)
  setInterval(energize, configs.skills.energize.interval)
}

if (character.ctype === "ranger") {
  setInterval(combat, configs.attack.interval);
}


map_key("O", "snippet", "toggle_mode(configs.inv_dump)");