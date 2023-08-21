load_code(15) //load the file logger
writeToLog("#10 Init script")

//----------------------------------const----------------------------------
const Hpots = ["hpot0", "hpot1", "hpot2"]
const Mpots = ["mpot0", "mpot1", "mpot2"]
const myToons = ["Sychris", "mrshoots", "Normon", "loots", "Name001"];


//----------------------------------gui----------------------------------
writeToLog("loading gui addons")

//log filter
load_code(11)
//dps meter
load_code(12)
//party_share
load_code(13)

load_code(16)

//load_code(14)

add_top_button("electron_dev_tools", "DEV", function () {
  parent.electron_dev_tools();
})

//----------------------------------configs load_code(3x)----------------------------------
//config_everyone
writeToLog("loading configs")


load_code(31) //default_config_everyone

//load_code 32 == "default_configs_combat" 33 == default_config_merc
configs.is_combat ? load_code(32) : load_code(33)

if (character.ctype == "ranger") load_code(34)
if (character.ctype == "mage") load_code(35)
if (character.ctype == "priest") { //not really enough yet to warrant own file
  configs.heal = {};
  configs.heal.fname = "Heal Mode"
  
}


//----------------------------------utils load_code(2x)----------------------------------
writeToLog("loading utils")

load_code(20) //util everyone
load_code(22) //util_skills
//load_code 21 == util_combat
if (configs.is_combat) load_code(21)

//load_code 24 == util_merchant
if (character.ctype == "merchant") load_code(24)


writeToLog("Initialization complete")


//----------------------------------other routines----------------------------------

function on_destroy() // called just before the CODE is destroyed
{
  met.on_destroy();     //dps_meters
  //uiCon.on_destroy(); //ui configs
  
  clear_drawings();
  clear_buttons();
  
}