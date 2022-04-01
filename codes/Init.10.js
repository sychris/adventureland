log("#10 Init script")

//----------------------------------const----------------------------------
const Hpots = ["hpot0","hpot1","hpot2"]
const Mpots = ["mpot0","mpot1","mpot2"]
const myToons = ["Sychris","mrshoots","Normon","loots"];

//----------------------------------gui----------------------------------
log("loading gui addons")
//dps meter
load_code(11)
//log filter
load_code(12)
//party_share
load_code(13)

add_top_button("electron_dev_tools", "DEV", function() { parent.electron_dev_tools(); })

//----------------------------------configs load_code(3x)----------------------------------
//config_everyone
log("loading configs")
//load_code 31 == default_config_everyone
load_code(31)



//load_code 32 == "default_configs_combat" 33 == default_config_merc
configs.is_combat ? load_code(32) : load_code(33)

//load_code 34 == "default_configs_ranger"
if (character.ctype == "ranger")  load_code(34)
if (character.ctype == "priest") {
  configs.mode.heal = new Object();
  configs.mode.heal.fname = "Heal Mode"

}


//----------------------------------utils load_code(2x)----------------------------------
log("loading utils")
//load_code 21 == util_everyone
load_code(20)
//load_code 21 == util_combat
if(configs.is_combat) load_code(21)
//load_code 23 == util ranger
if (character.ctype == "ranger")  load_code(23)
//load_code 24 == util merchant
if (character.ctype == "merchant")  load_code(24)

log("Initilization compleate")



//----------------------------------other routines----------------------------------

//load_code 30 == party code
load_code(30)