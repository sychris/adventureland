log("loading default_config_merc")

configs.mode.give_pots = new Object();
configs.mode.give_pots.fname = "Give Potions Mode"
configs.mode.give_pots.donate_pots_to = myToons
configs.mode.give_pots.enabled = true
configs.mode.give_pots.interval = 5000



configs.mode.sell.enabled = true

configs.mode.exchangeItems = false

configs.mode.exchangeItems = new Object;
configs.mode.exchangeItems.enabled = true
configs.mode.exchangeItems.interval = 2000

configs.mode.upgradeNPCItem = new Object
configs.mode.upgradeNPCItem.item = "staff"

configs.mode.buyPonty = new Object;
configs.mode.buyPonty.enabled = false
configs.mode.buyPonty.itemsList = []

configs.mode.buyMercs = new Object;
configs.mode.buyMercs.enabled = true
configs.mode.buyMercs.maxToSpend = 1000000
configs.mode.buyMercs.currentSpent = 0
configs.mode.buyMercs.interval = 10000

configs.mode.regen = new Object();
configs.mode.regen.enable = true
configs.mode.regen.to_percent = 80

configs.mode.luck = new Object();

configs.mode.luck.enabled = true
configs.mode.luck.interval = 1000
configs.mode.luck.fname = "Luck Mode"
configs.mode.luck.lastLuck = Date.now()

configs.mode.upgrade = new Object();
configs.mode.upgrade.fname = "Upgrade Mode"
configs.mode.upgrade.enabled = 0
configs.mode.upgrade.interval = 300

configs.mode.buyPots = new Object();
configs.mode.buyPots.enabled = true
configs.mode.buyPots.pots_to_buy = {}

configs.mode.upgrade.upgradeWhitelist =
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
    staff: 9,
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
  };

  configs.mode.upgrade.combineWhitelist =
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

