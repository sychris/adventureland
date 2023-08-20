path = "C:/Users/Sychris/AppData/Roaming/Adventure Land/autosync5168369757061120/adventureland/codes/Test2.51.js"
delete require.cache[require.resolve(path)]
let test = require(path);

//show_json(test)
log(test)
log(test.sum(1, 2))
log(test.sub(1, 2))