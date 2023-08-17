function travelToPlayers(name = configs.travelToPlayers.targetPlayerName, pos = null, forceTravel = false) {
  if (!configs.travelToPlayers.enabled) {
    return "travelToPlayers disabled";
  }
  
  if (configs.travelToPlayers.lastPickupTime == null) {
    // Ensure a wait after starting code before running off
    // This prevents distractions while working on code
    configs.travelToPlayers.lastPickupTime = Date.now();
    return "initialized";
  }
  
  if (!forceTravel) {
    if (Date.now() < configs.travelToPlayers.lastPickupTime + configs.travelToPlayers.delay) {
      return "not ready";
    }
  }
  
  if (!pos) {
    send_cm(name, "pos_for_transport");
    return "sending cm for transport_pos";
  }
  
  if (character.map !== configs.travelToPlayers.idle.map) {
    return "not on idle map";
  }
  
  configs.travelToPlayers.lastPickupTime = Date.now();
  smart_move(pos).then(waitAndUseTown);
}