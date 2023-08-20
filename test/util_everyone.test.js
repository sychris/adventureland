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




