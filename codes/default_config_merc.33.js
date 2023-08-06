log("loading default_config_merc")

configs.give_pots = {};
configs.give_pots.fname = "Give Potions Mode"
configs.give_pots.donate_pots_to = myToons
configs.give_pots.enabled = true
configs.give_pots.interval = 5000

configs.travelToPlayers = {}
configs.travelToPlayers.enabled = false
configs.travelToPlayers.interval = 900000 //900,000 is 15 min
configs.travelToPlayers.targetPlayerName = "Sychris"
configs.travelToPlayers.state = "init"
configs.travelToPlayers.idle = {}
configs.travelToPlayers.idle.map = "main"
configs.travelToPlayers.idle.pos = ""
configs.travelToPlayers.lastPickupTime = null

configs.autostall = {}
configs.autostall.enabled = true
configs.autostall.interval = 500

configs.sell.enabled = true

configs.exchangeItems = false

configs.exchangeItems = {};
configs.exchangeItems.enabled = true
configs.exchangeItems.interval = 2000

configs.upgradeNPCItem = {}
configs.upgradeNPCItem.item = "staff"

configs.buyPonty = {};
configs.buyPonty.enabled = false
configs.buyPonty.itemsList = []

configs.buyMercs = {};
configs.buyMercs.enabled = true
configs.buyMercs.maxToSpend = 1000000
configs.buyMercs.currentSpent = 0
configs.buyMercs.interval = 10000

configs.regen = {};
configs.regen.enable = true
configs.regen.to_percent = 80

configs.luck = {};

configs.luck.enabled = true
configs.luck.interval = 1000
configs.luck.fname = "Luck Mode"
configs.luck.lastLuck = Date.now()

configs.upgrade = {};
configs.upgrade.fname = "Upgrade Mode"
configs.upgrade.enabled = 0
configs.upgrade.interval = 300

configs.buyPots = {};
configs.buyPots.enabled = true
configs.buyPots.pots_to_buy = {}


configs.upgrade.upgradeWhitelist =
  {
    //ItemName, Max Level
    pyjamas: 7,
    bunnyears: 7,
    bow: 7,
    carrotsword: 7,
    cclaw: 7,
    firestaff: 7,
    fireblade: 7,
    slimestaff: 8,
    sshield: 7,
    shield: 7,
    shoes: 7,
    staff: 8,
    sword: 7,
    gloves: 7,
    coat: 7,
    helmet: 7,
    pants: 7,
    gloves1: 7,
    coat1: 7,
    helmet1: 7,
    pants1: 7,
    shoes1: 7,
    harbringer: 5,
    oozingterror: 5,
    bataxe: 7,
    spear: 7,
    xmaspants: 7,
    xmassweater: 7,
    xmashat: 7,
    xmasshoes: 7,
    mittens: 7,
    ornamentstaff: 7,
    candycanesword: 7,
    warmscarf: 7,
    t2bow: 7,
    pmace: 7,
    basher: 7,
    harmor: 5,
    hgloves: 5,
    wingedboots: 7,
    wattire: 8,
    wbreeches: 7,
    wcap: 8,
    wgloves: 7,
    stinger: 7,
    wshoes: 8,
    quiver: 8,
    merry: 6,
    tshirt0: 7,
    tshirt1: 7,
    handofmidas: 3,
    pmaceofthedead: 6,
    hbow: 7,
    frankypants: 6,
    vboots: 4,
    ecape: 5,
    eslippers: 6,
    eears: 5,
    pouchbow: 8,
    tshirt2: 3,
  };

configs.upgrade.combineWhitelist =
  {
    //ItemName, Max Level
    wbook0: 3,
    lostearring: 2,
    strearring: 3,
    intearring: 3,
    dexearring: 3,
    hpbelt: 4,
    ringsj: 3,
    strring: 3,
    intring: 3,
    dexring: 3,
    vitring: 2,//these are used for amulets of armor and resistence at lvl 2
    dexamulet: 3,
    intamulet: 3,
    stramulet: 3,
    vitearring: 3,
    hpamulet: 4,
    dexbelt: 3,
    intbelt: 3,
    strbelt: 3,
    orbg: 2
  }

