jest.resetModules();
const util_everyone = require('../refactoring/util_everyone.20.js')
//import('../codes/util_everyone.20.js')

test("test ck_a_wList", () => {
  expect(util_everyone.ck_a_wList("apple", ["apple", "bannana"])).toBe(true)
  expect(util_everyone.ck_a_wList("pickle", ["apple", "bannana"])).toBe(false)
});

test("test ck_range", () => {
  global.character = {};
  character.real_x = 1
  character.real_y = 1
  let target = {}
  target.real_x = 100
  target.real_y = 100
  expect(util_everyone.ck_range(target, 500)).toBe(true)
  expect(util_everyone.ck_range(target, 50)).toBe(false)
})




