function combatRanger(){
	if(configs.skills.threeShot && threeShot()) return 
	if(standardAttack())return
}

function threeShot() {

    var targets = [];
    if (is_on_cooldown("3shot")) return false;
    if (character.mp >= 300 && parent.character.level >= 60) {
        for (id in parent.entities){
            if (parent.entities[id].mtype == configs.mode.attack.onlyAttack && parent.entities[id].type == "monster" && is_in_range(parent.entities[id], "3shot") && targets.length < 3) {
                targets.push(parent.entities[id]);
            }
        }
        // Use 3-Shot with a Ranger on 3 targets
        if (targets.length > 2) {
            game_log("fireing 3shot")
            use_skill("3shot", targets);
            return true;
        }
    } else {
        return false
    }
}