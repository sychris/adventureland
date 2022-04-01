log("loading default_config_merc")

configs.mode.give_pots = new Object();
configs.mode.give_pots.fname = "Give Potions Mode"
configs.mode.give_pots.donate_pots_to = ["Sychris","mrshoots","Normon"]
configs.mode.give_pots.enabled = 0
configs.mode.give_pots.invetval = 1000

configs.mode.sell.enabled = true

configs.mode.exchangeItems = new Object;
configs.mode.exchangeItems.enabled = true
configs.mode.exchangeItems.interval = 2000

configs.mode.giveOutPots = new Object;
configs.mode.giveOutPots.enabled = true
configs.mode.giveOutPots.interval = 10000

configs.mode.regen = new Object();
configs.mode.regen.enable = true
configs.mode.regen.to_percent = 80

configs.mode.buyPonty = new Object;
configs.mode.buyPonty.itemsList = []


configs.mode.luck = new Object();
configs.mode.luck.enabled = 1
configs.mode.luck.interval = 1000
configs.mode.luck.fname = "Luck Mode"
configs.mode.luck.lastLuck = Date.now()

configs.mode.upgrade = new Object();
configs.mode.upgrade.fname = "Upgrade Mode"
configs.mode.upgrade.enabled = 0
configs.mode.upgrade.interval = 1000

configs.mode.buyPots = new Object();
configs.mode.buyPots.enabled = 1

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
    staff: 6,
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
    warmscarf: 6,
    t2bow: 7,
    pmace: 7,
    basher: 7,
    harmor: 5,
    hgloves: 5,
    wingedboots: 7,
    wattire: 7,
    wbreeches: 7,
    wcap: 8,
    wgloves: 7,
    stinger: 7,
    wshoes: 7,
    quiver: 7,
    merry: 6,
    tshirt0: 6,
    tshirt1: 6,
    handofmidas: 3,
    pmaceofthedead: 5,
    hbow: 7,
    frankypants: 5,
    vboots: 4
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
    vitring: 3,
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

