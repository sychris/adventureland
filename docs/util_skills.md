## util_skills.22.js

### Functions

#### `threeShot()`

```javascript
function threeShot() {
  
  let targets = [];
  if (!configs.skills.threeShot.enabled) return false
  if (is_on_cooldown("3shot")) return false;
  if (character.mp < 300) return false
  if (character.level < 60) return false
  
  for (let id in parent.entities) {
    if (configs.attack.onlyAttack && !configs.attack.onlyAttack.includes(parent.entities[id].mtype)) continue
    
    if (parent.entities[id].type !== "monster") continue
    if (!is_in_range(parent.entities[id], "3shot")) continue
    if (targets.length >= 3) continue
    
    targets.push(parent.entities[id]);
  }
  
  if (targets.length < 2) return false
  //writeToLog("firing 3shot at " + targets.length + " Targets")
  use_skill("3shot", targets);
  return true;
  
}
```

##### Description

This function is used to perform the "3-shot" skill. It checks if the skill is enabled, if the skill is not on cooldown, if the character has enough MP, and if the character is at least level 60. It then iterates through the entities in the game and looks for monsters that are in range of the skill. It saves up to 3 valid targets and uses the "3shot" skill on them if there are at least 2 targets.

##### Returns

- `true` if the skill was successfully used
- `false` if the skill was not used

#### `energize()`

```javascript
function energize() {
  if (!configs.skills.energize.enabled) return false
  if (!configs.skills.energize.targets) return false
  if (is_on_cooldown("energize")) return false
  if (character.mp === 0) return false
  let targets = configs.skills.energize.targets.filter((t) =>
    ck_range_by_name(t, 320) === true
  )
  if (targets.length === 0) return false
  targets.sort(function (a, b) {
    return get_player(a).mp - get_player(b).mp
  });
  
  let target = get_player(targets[0])
  writeToLog("Energising: " + target.name)
  use_skill("energize", target)
  return true
  
}
```

##### Description

This function is used to perform the "energize" skill. It checks if the skill is enabled, if there are targets specified for the skill, if the skill is not on cooldown, and if the character has MP. It then filters the targets based on proximity and sorts them based on their MP. It selects the target with the lowest MP and uses the "energize" skill on them.

##### Returns

- `true` if the skill was successfully used
- `false` if the skill was not used

#### Module Exports

- `energize`: A function to perform the "energize" skill.
- `threeShot`: A function to perform the "3-shot" skill.