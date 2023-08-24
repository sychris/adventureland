jest.resetModules();
global.configs = {}
configs.testing = true
const util_everyone = require('../codes/util_everyone.20.js')
//import('../codes/util_everyone.20.js')

describe("ck_range", () => {
  beforeEach(() => {
    global.character = {
      real_x: 1,
      real_y: 1
    };
    
  })
  
  test("ck_range should return false when the target is null", () => {
    let target = null;
    expect(util_everyone.ck_range(target, 5000)).toBe(false);
  });
  
  test("ck_range should return true when the target is within range", () => {
    const target = {
      real_x: 100,
      real_y: 100
    };
    expect(util_everyone.ck_range(target, 500)).toBe(true);
  });
  
  test("ck_range should return false when the target is out of range", () => {
    const target = {
      real_x: 100,
      real_y: 100
    };
    expect(util_everyone.ck_range(target, 50)).toBe(false);
  });
})


//-----------------------------------ck_range_by_name---------------------------------------
describe("ck_range_by_name", () => {
  beforeEach(() => {
    global.character = {
      real_x: 1,
      real_y: 1
    };
  })
  
  test("ck_range_by_name should return false when the target is null", () => {
    let target = null;
    global.get_player = jest.fn(() => target);
    expect(util_everyone.ck_range_by_name("c_test", 50)).toBe(false);
    expect(get_player).toHaveBeenCalled();
    expect(get_player).toHaveBeenCalledTimes(1);
    expect(get_player).toHaveBeenCalledWith("c_test");
  });
  
  test("ck_range_by_name should return true when the target is within range", () => {
    let target = {
      real_x: 100,
      real_y: 100
    };
    global.get_player = jest.fn(() => target);
    expect(util_everyone.ck_range_by_name("c_test", 500)).toBe(true);
    expect(get_player).toHaveBeenCalled();
    expect(get_player).toHaveBeenCalledTimes(1);
    expect(get_player).toHaveBeenCalledWith("c_test");
  });
  test("ck_range_by_name should return false when the target is out of range", () => {
    let target = {
      real_x: 100,
      real_y: 100
    };
    global.get_player = jest.fn(() => target);
    expect(util_everyone.ck_range_by_name("c_test", 50)).toBe(false);
    expect(get_player).toHaveBeenCalled();
    expect(get_player).toHaveBeenCalledTimes(1);
    expect(get_player).toHaveBeenCalledWith("c_test");
    
  });
})


//-----------------------------------npcInRange---------------------------------------
describe("npcInRange", () => {
  beforeEach(() => {
    global.character = {
      real_x: 100,
      real_y: 100,
      map: "main",
    };
    global.simple_distance = jest.fn(() => 200);
    global.parent = {
      G: {
        maps: {
          main: {
            npcs: [
              {
                id: "npc1",
                position: [150, 150]
              },
              {
                id: "npc2",
                position: [200, 200]
              },
              {
                id: "npc3",
                position: [250, 250]
              }
            ]
          }
        }
      }
    };
  });
  
  test("should return true if the given NPC is within 400 distance from the character", () => {
    expect(util_everyone.npcInRange("npc1")).toBe(true);
  });
  
  test("should return false if the given NPC is not within 400 distance from the character", () => {
    global.simple_distance = jest.fn(() => 400);
    expect(util_everyone.npcInRange("npc2")).toBe(false);
  });
  
  test("should return false if the given NPC does not exist in the current map", () => {
    expect(util_everyone.npcInRange("npc4")).toBe(false);
  });
});


//-----------------------------------autoLoot---------------------------------------

describe("autoLoot", () => {
  beforeEach(() => {
    global.loot = jest.fn(() => "looted");
    configs.autoLoot = {}
  })
  test("autoLoot should call loot if enabled", () => {
    configs.autoLoot.enabled = true
    util_everyone.autoLoot()
    expect(loot).toHaveBeenCalled();
    expect(loot).toHaveBeenCalledTimes(1);
  });
  test("autoLoot should not call loot if disabled", () => {
    configs.autoLoot.enabled = false
    util_everyone.autoLoot()
    expect(loot).not.toHaveBeenCalled()
  })
})

//-----------------------------------searchForComputer---------------------------------------
describe("searchForComputer", () => {
  global.character = {}
  
  test("searchForComputer should return true if computer is found in the inventory", () => {
    global.character.items = [
      {name: "potion"},
      {name: "sword"},
      {name: "computer"},
      {name: "shield"}
    ]
    expect(util_everyone.searchForComputer()).toBe(true);
  });
  test("searchForComputer should return true if supercomputer is found in the inventory", () => {
    global.character.items = [
      {name: "potion"},
      {name: "sword"},
      {name: "supercomputer"},
      {name: "shield"}
    ]
    expect(util_everyone.searchForComputer()).toBe(true);
  });
  test("searchForComputer should return false if computer or supercomputer is not found in the inventory", () => {
    global.character.items = [
      {name: "potion"},
      {name: "sword"},
      {name: "shield"},
      {name: "armor"}
    ]
    expect(util_everyone.searchForComputer()).toBe(false);
  })
})

