

    setInterval(attackScript, 1000 / 4);
    setInterval(use_hp_or_mp, 1000 / 4);
    setInterval(loot, 1000 / 4);


function attackScript(){

	var attack_mode=true
	if(!attack_mode || character.rip || is_moving(character)) return;
    var target = get_targeted_monster()
    if (!target) getNewTarget()
    if (target) {
        if (!is_in_range(target)) moveCharactorHalfDistance(target);
        attackTarget(target)
    }
}
function getNewTarget() {
	target=get_nearest_monster({min_xp:100,max_att:120});
	if(target) change_target(target);
	else
	{
		set_message("No Monsters");
		return;
	}

}
function attackTarget(target) {
    if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}
}

function moveCharactorHalfDistance(target) {
    move(
        character.x + (target.x - character.x) / 2,
        character.y + (target.y - character.y) / 2
    );
    // Walk half the distance
}