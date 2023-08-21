//post init/intervals
setInterval(inv_dump, configs.inv_dump.interval)

if (character.ctype === "mage") {
  setInterval(combat, configs.attack.interval)
  setInterval(energize, configs.skills.energize.interval)
}

if (character.ctype === "ranger") {
  setInterval(combat, configs.attack.interval);
}

if (character.ctype === "warrior") {
  setInterval(combat, configs.attack.interval);
}

map_key("O", "snippet", "toggle_mode(configs.inv_dump)");