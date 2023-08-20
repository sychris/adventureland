const util_everyone = require('../codes/util_everyone.20.js')
//import('../codes/util_everyone.20.js')

test("test ck_a_wList", () => {
  expect(util_everyone("apple", ["apple", "bannana"])).toBe(true)
});