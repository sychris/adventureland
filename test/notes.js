function toggle_mode(mode) {
  let max = 1
  if (mode.max) {
    max = mode.max;
  }
  if (mode.enabled == max) {
    mode.enabled = 0;
  } else {
    mode.enabled += 1;
  }
  writeToLog(mode.fname + " has changed to " + mode.enabled)
}


//Keymaps
//map_key("","snippet","toggle_mode(configs.mode.)");
map_key("H", "snippet", "toggle_mode(configs.mode.heal)");
map_key("Q", "snippet", "toggle_mode(configs.mode.move)");
map_key("U", "snippet", "toggle_mode(configs.mode.upgrade)");
map_key("T", "snippet", "toggle_mode(configs.mode.attack)");
map_key("O", "snippet", "toggle_mode(configs.mode.inv_dump)");
map_key("L", "snippet", "toggle_mode(configs.mode.luck)");
set_skillbar("1", "2", "H", "Q", "U", "T", "O", "L");

var action = null; // Local variable action

setInterval(function () {
  
  // Since we always set "flag" and action to the same value, if they mismatch, it must mean the game was refreshed
  if (get("flag") != action) {
    writeToLog("Variable action doesn't match the stored flag therefore the game was refreshed!");
    if (get("flag") == "crab") {
      writeToLog("Continuing the move to crabs!");
      action = "crab";
      smart_move("crab");
    } else if (get("flag") == "goo") {
      writeToLog("Continuing the move to goos!");
      action = "goo";
      smart_move("goo");
    }
    set("flag", action);
  } else if (smart.moving) {
    // Do nothing, we are moving!
  } else if (action == "goo") {
    // Arrived at goo's, back to crab's now
    action = "crab";
    smart_move("crab");
    set("flag", action);
  } else {
    // Either arrived at crab's, or this is our first action!
    action = "goo";
    smart_move("goo");
    set("flag", action);
  }
  
}, 100);