jest.resetModules();
global.configs = {}
configs.testing = true
const util_everyone = require('../codes/util_everyone.20.js')
//import('../codes/util_everyone.20.js')


test("test ck_range", () => {
  global.character = {};
  character.real_x = 1
  character.real_y = 1
  let target = {}
  expect(util_everyone.ck_range(target, 5000)).toBe(false)
  target.real_x = 100
  target.real_y = 100
  expect(util_everyone.ck_range(target, 500)).toBe(true)
  expect(util_everyone.ck_range(target, 50)).toBe(false)
})

test("ck_range_by_name", () => {
  let target = {}
  target.real_x = 100
  target.real_y = 100
  global.character = {};
  character.real_x = 1
  character.real_y = 1
  
  //if null should always be out of range
  global.get_player = jest.fn(() => null)
  expect(util_everyone.ck_range(target, 50)).toBe(false)
  
  //with target we check ranges
  global.get_player = jest.fn(() => target)
  expect(util_everyone.ck_range_by_name("c_test", 500)).toBe(true)
  expect(util_everyone.ck_range(target, 50)).toBe(false)
  expect(get_player).toHaveBeenCalled();
  expect(get_player).toHaveBeenCalledTimes(1);
  expect(get_player).toHaveBeenCalledWith("c_test");
})




