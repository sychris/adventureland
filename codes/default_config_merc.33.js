log("loading default_config_merc")
configs.mode.give_pots = new Object();
configs.mode.give_pots.fname = "Give Potions Mode"
configs.mode.give_pots.donate_pots_to = ["Sychris","mrshoots","Normon"]
configs.mode.give_pots.enabled = 0
configs.mode.give_pots.invetval = 1000

configs.mode.sell.enabled = true

configs.mode.regen = new Object();
configs.mode.regen.enable = true
configs.mode.regen.to_percent = 80

configs.mode.luck = new Object();
configs.mode.luck.fname = "Luck Mode"

configs.mode.upgrade = new Object();
configs.mode.upgrade.fname = "Upgrade Mode"
configs.mode.upgrade.enabled = 0
configs.mode.upgrade.interval = 1000
configs.mode.upgrade.max_level = 8; //Max level it will stop upgrading items at if enabled

configs.mode.upgrade.upgradeWhitelist =
  {
    //ItemName, Max Level
    pyjamas: upgradeMaxLevel,
    bunnyears: upgradeMaxLevel,
    bow: 7,
    carrotsword: upgradeMaxLevel,
    cclaw: 7,
    firestaff: 7,
    fireblade: 7,
    slimestaff: 7,
    sshield: 7,
    shield: 7,
    shoes: 7,
    staff: 7,
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
    wattire: 7,
    wbreeches: 7,
    wcap: 7,
    wgloves: 7,
	stinger: 7,
    wshoes: 7,
	quiver: 7
  };

  configs.mode.upgrade.combineWhitelist =
  {
    //ItemName, Max Level
    wbook0: 3,
    lostearring: 2,
    strearring: 3,
    intearring: 3,
    dexearring: 3,
    hpbelt: 3,
    ringsj: 3,
    strring: 3,
    intring: 3,
    dexring: 3,
    vitring: 3,
    dexamulet: 3,
    intamulet: 3,
    stramulet: 3,
    vitearring: 3,
    hpamulet: 2,
    dexbelt: 3,
    intbelt: 3,
    strbelt: 3
  }

