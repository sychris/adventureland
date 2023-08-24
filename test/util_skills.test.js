global.configs = {}
configs.testing = true
const util_skills = require('../codes/util_skills.22.js');

describe("util_skills.energize", () => {
  beforeEach(() => {
    
    configs.skills = {energize: {}}
    configs.skills.energize.enabled = true
    configs.skills.energize.targets = ["mrshoots", "Name001", "loots"]
    
    global.character = {
      mp: 100
    };
    global.is_on_cooldown = jest.fn(() => false);
    global.writeToLog = jest.fn();
    global.use_skill = jest.fn();
    global.ck_range_by_name = jest.fn(() => true)
    global.get_player = jest.fn(name => {
      if (name === "mrshoots") {
        return {name: "mrshoots", mp: 50};
      } else if (name === "Name001") {
        return {name: "Name001", mp: 50};
      } else if (name === "loots") {
        return {name: "loots", mp: 25};
      }
    });
  });
  
  test("should return false if energize is not enabled", () => {
    global.configs.skills.energize.enabled = false;
    expect(util_skills.energize()).toBe(false);
  });
  
  test("should return false if there are no energize targets", () => {
    global.configs.skills.energize.targets = [];
    expect(util_skills.energize()).toBe(false);
  });
  
  test("should return false if all targets are out of range", () => {
    global.ck_range_by_name = jest.fn(() => false)
    expect(util_skills.energize()).toBe(false);
  })
  
  test("should return false if energize is on cooldown", () => {
    global.is_on_cooldown = jest.fn(name => name === "energize");
    expect(util_skills.energize()).toBe(false);
  });
  
  test("should return false if character mp is 0", () => {
    global.character.mp = 0;
    expect(util_skills.energize()).toBe(false);
  });
  
  test("should energize the target with lowest mp and return true", () => {
    expect(util_skills.energize()).toBe(true);
    expect(use_skill).toHaveBeenCalledWith("energize", {name: "loots", mp: 25});
  });
  
  test("should handle targets with equal mp values and energize the first one in the list", () => {
    global.configs.skills.energize.targets = ["mrshoots", "Name001"];
    expect(util_skills.energize()).toBe(true);
    expect(use_skill).toHaveBeenCalledWith("energize", {name: "mrshoots", mp: 50});
  });
});

describe("util_skills.threeShot", () => {
  beforeEach(() => {
    global.character.mp = 400
    global.character.level = 61
    configs.skills = {threeShot: {}}
    configs.skills.threeShot.enabled = true
    configs.attack = {}
    configs.attack.onlyAttack = ["crab", "bee", "hen"]
    
    global.parent = {
      entities: {
        1: {id: 1, type: "monster", mtype: "crab"},
        2: {id: 2, type: "monster", mtype: "hen"},
        3: {id: 3, type: "monster", mtype: "bee"},
        4: {id: 4, type: "monster", mtype: "bee"},
        5: {id: 5, type: "npc", mtype: "person"}
      }
    };
    
    global.use_skill = jest.fn()
    global.is_in_range = jest.fn(() => true)
    global.is_on_cooldown = jest.fn(() => false);
  })
  
  test("should return false if threeShot is not enabled", () => {
    configs.skills.threeShot.enabled = false
    expect(util_skills.threeShot()).toBe(false)
  })
  
  test("should return false if skill is on cooldown", () => {
    global.is_on_cooldown = jest.fn(() => true);
    expect(util_skills.threeShot()).toBe(false)
    expect(is_on_cooldown).toHaveBeenCalled()
  })
  
  test("test should fail if mp is less than 300", () => {
    character.mp = 200;
    expect(util_skills.threeShot()).toBe(false)
  })
  
  test("should return false if character is not lvl 60", () => {
    character.level = 10
    expect(util_skills.threeShot()).toBe(false)
  })
  test("should return false if there are not enough targets with onlyAttack config", () => {
    global.configs.attack.onlyAttack = ["crab"];
    expect(util_skills.threeShot()).toBe(false);
  });
  test("should use threeShot with a ranger on three targets", () => {
    global.configs.attack.onlyAttack = ["crab", "bee"];
    expect(util_skills.threeShot()).toBe(true);
    expect(use_skill).toHaveBeenCalledWith("3shot", [
      {"id": 1, "mtype": "crab", "type": "monster"},
      {"id": 3, "mtype": "bee", "type": "monster"},
      {"id": 4, "mtype": "bee", "type": "monster"}
    ]);
  });
  
  
})