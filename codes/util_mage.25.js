
function energize(){
    if(!configs.skills.energize.enabled || is_on_cooldown("energize") || character.mp == 0) return
    let target = get_player(configs.skills.energize.target)
    use_skill("energize",target)
    log("Energising: " + target.name)
}