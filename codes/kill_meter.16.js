//////////////////////////////////////////////////////////////////////////////////////

let KILLS_DATA = {
  times: [],
  avg_time_to_kill: NaN,
  first_death_timestamp: null,
  last_death_timestamp: null,
  count_deaths: 0
};

let KILL_METER_MOB_MTYPE = 'crab';
let LAST_KILLS_COUNT = 10;
let LAST_KILLS_COUNTS_VARIANTS = [5, 10, 50, 100, 1000];

let USE_KILL_METER = true;
let KILL_METER_ADD_KILLBAR = true;
let KILL_METER_KILLBAR_USE_SYMBOLS = true;

let KILL_METER_KILLBAR_BASE_SYMBOL = '#';
let KILL_METER_KILLBAR_EMPTY_SYMBOL = '-';
if (KILL_METER_KILLBAR_USE_SYMBOLS) {
  KILL_METER_KILLBAR_BASE_SYMBOL = '|';
}

let KILL_METER_KILLBAR_SYMBOL_WIDTH = '10px';
let KILL_METER_KILLBAR_COLOR_MODE = 'color';
let KILL_METER_KILLBAR_DEFAULT_BAR_SIZE = 20;
let KILL_METER_KILLBAR_MAX_BAR_SIZE = 28;

if (USE_KILL_METER) {
  game.on('death', function (data) {
    let entity = get_entity(data.id);
    if (!entity || entity.mtype !== KILL_METER_MOB_MTYPE) return;
    
    if (KILLS_DATA.first_death_timestamp === null) {
      KILLS_DATA.first_death_timestamp = Date.now();
    } else {
      KILLS_DATA.times.push(((Date.now() - KILLS_DATA.last_death_timestamp) / 1000));
    }
    
    KILLS_DATA.last_death_timestamp = Date.now();
    ++KILLS_DATA.count_deaths;
    let avg_time_to_kill = (KILLS_DATA.last_death_timestamp - KILLS_DATA.first_death_timestamp) / 1000 / (KILLS_DATA.count_deaths - 1);
    KILLS_DATA.avg_time_to_kill = avg_time_to_kill;
    
    updateKillMeter();
  });
}

function initKillMeter() {
  let $ = parent.$;
  let brc = $('#bottomrightcorner');
  
  brc.find('#kill_meter').remove();
  
  if (!USE_KILL_METER) return;
  
  let kill_meter_container = $('<div id="kill_meter"></div>').css({
    fontSize: '28px',
    color: 'white',
    textAlign: 'center',
    display: 'table',
    overflow: 'hidden',
    marginBottom: '-3px',
    marginTop: '5px',
    width: "100%"
  });
  
  //vertical centering in css is fun
  let kill_meter = $('<div id="kill_meter_content"></div>')
    .css({
      //display: 'table-cell',
      verticalAlign: 'middle'
    })
    .html("")
    .appendTo(kill_meter_container);
  
  brc.children().first().after(kill_meter_container);
}

function resetKillMeter() {
  KILLS_DATA = {
    times: [],
    avg_time_to_kill: NaN,
    first_death_timestamp: null,
    last_death_timestamp: null,
    count_deaths: 0
  };
  
  updateKillMeter();
}

function changeKillMeterKillbarMode() {
  if (KILL_METER_KILLBAR_USE_SYMBOLS) {
    if (KILL_METER_KILLBAR_BASE_SYMBOL === "#") {
      KILL_METER_KILLBAR_BASE_SYMBOL = '|';
      
      KILL_METER_KILLBAR_COLOR_MODE = 'color';
    } else {
      KILL_METER_KILLBAR_BASE_SYMBOL = ' ';
      
      KILL_METER_KILLBAR_COLOR_MODE = 'background';
      KILL_METER_KILLBAR_USE_SYMBOLS = false;
    }
    
    KILL_METER_KILLBAR_SYMBOL_WIDTH = '5px';
    KILL_METER_KILLBAR_DEFAULT_BAR_SIZE = 40;
    KILL_METER_KILLBAR_MAX_BAR_SIZE = 56;
  } else {
    KILL_METER_KILLBAR_BASE_SYMBOL = '#';
    
    KILL_METER_KILLBAR_COLOR_MODE = 'color';
    KILL_METER_KILLBAR_SYMBOL_WIDTH = '10px';
    KILL_METER_KILLBAR_DEFAULT_BAR_SIZE = 20;
    KILL_METER_KILLBAR_MAX_BAR_SIZE = 28;
    
    KILL_METER_KILLBAR_USE_SYMBOLS = true;
    
  }
  
  updateKillMeter();
}

function changeLastKillsCount(count) {
  LAST_KILLS_COUNT = count;
  
  updateKillMeter();
}

function updateKillMeter() {
  let $ = parent.$;
  
  var killMeterString = `<table style="border-style: solid;" border="1px" bgcolor="black" align="right" cellpadding="1"><tr align="center"><td colspan="2">Kill meter for ${KILL_METER_MOB_MTYPE}</td><td><div id="kill_meter_reset_button" onclick="parent.code_eval(\`resetKillMeter()\`)">RESET (click)</div></td></tr><tr align="center"><td>Count</td><td>Avg time to kill</td><td>Kills per day</td></tr>`;
  
  let count_per_day = 24 * 3600 / KILLS_DATA['avg_time_to_kill'];
  
  killMeterString = killMeterString + '<tr align="center"><td>' + KILLS_DATA['times'].length + '</td><td>' + KILLS_DATA['avg_time_to_kill'].toFixed(3) + 's' + '</td><td>' + count_per_day.toFixed(3) + '</td></tr>';
  
  let last_kill_counts_variants_divs = [];
  for (let last_kill_counts_variant of LAST_KILLS_COUNTS_VARIANTS) {
    last_kill_counts_variants_divs.push(`<div onclick="parent.code_eval('changeLastKillsCount(${last_kill_counts_variant})')">${last_kill_counts_variant}</div>`);
  }
  
  killMeterString = killMeterString + '<tr align="center"><td colspan="3"><div style="height: 100%; display: flex; justify-content: space-around;">Last ' + last_kill_counts_variants_divs.join('|') + ' kills</div></td></tr>';
  
  let last_kills_times = KILLS_DATA['times'].slice(-LAST_KILLS_COUNT);
  let last_kills_count = last_kills_times.length;
  let last_avg_time_to_kill = last_kills_times.reduce((partialSum, a) => partialSum + a, 0) / last_kills_count;
  let last_count_per_day = 24 * 3600 / last_avg_time_to_kill;
  
  killMeterString = killMeterString + '<tr align="center"><td>' + last_kills_count + '</td><td>' + last_avg_time_to_kill.toFixed(3) + 's' + '</td><td>' + last_count_per_day.toFixed(3) + '</td></tr>';
  
  if (KILL_METER_ADD_KILLBAR) {
    let red_div = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: red; width: ${KILL_METER_KILLBAR_SYMBOL_WIDTH}; height: 24px;">`;
    let orange_div = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: orange; width: ${KILL_METER_KILLBAR_SYMBOL_WIDTH}; height: 24px;">`;
    let green_div = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: green; width: ${KILL_METER_KILLBAR_SYMBOL_WIDTH}; height: 24px;">`;
    let empty_div = `<div style="width: ${KILL_METER_KILLBAR_SYMBOL_WIDTH}; height: 24px;">`;
    
    let red_div_no_width = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: red; height: 24px;">`;
    let orange_div_no_width = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: orange; height: 24px;">`;
    let green_div_no_width = `<div style="${KILL_METER_KILLBAR_COLOR_MODE}: green; height: 24px;">`;
    let empty_div_no_width = '<div style="height: 24px;">';
    
    function wrapped_string(str, wrapper_div) {
      return wrapper_div + str + '</div>';
    }
    
    let ws = wrapped_string;
    
    function full_killbar(inner_length, outer_length, wrapper_div, wrapper_div_no_width) {
      return ws('[', wrapper_div_no_width) + ws(KILL_METER_KILLBAR_BASE_SYMBOL, wrapper_div).repeat(inner_length) + ws(']', wrapper_div_no_width) + ws(KILL_METER_KILLBAR_BASE_SYMBOL, wrapper_div).repeat(outer_length);
    }
    
    let killbar = full_killbar(0, 0, orange_div, orange_div_no_width);
    
    if (last_count_per_day) {
      if (last_count_per_day / count_per_day > 1.0 + 1 / KILL_METER_KILLBAR_DEFAULT_BAR_SIZE) {
        let last_symbols_count = Math.round(last_count_per_day / count_per_day * KILL_METER_KILLBAR_DEFAULT_BAR_SIZE);
        if (last_symbols_count > KILL_METER_KILLBAR_MAX_BAR_SIZE) {
          let bar_size = Math.round(KILL_METER_KILLBAR_DEFAULT_BAR_SIZE * KILL_METER_KILLBAR_MAX_BAR_SIZE / last_symbols_count);
          killbar = full_killbar(bar_size, KILL_METER_KILLBAR_MAX_BAR_SIZE - bar_size, green_div, green_div_no_width);
        } else {
          killbar = full_killbar(KILL_METER_KILLBAR_DEFAULT_BAR_SIZE, last_symbols_count - KILL_METER_KILLBAR_DEFAULT_BAR_SIZE, green_div, green_div_no_width);
        }
      } else if (last_count_per_day / count_per_day <= 1.0 - 1 / KILL_METER_KILLBAR_DEFAULT_BAR_SIZE) {
        let base_count = Math.round(last_count_per_day / count_per_day * KILL_METER_KILLBAR_DEFAULT_BAR_SIZE);
        killbar = ws('[', red_div_no_width) + ws(KILL_METER_KILLBAR_BASE_SYMBOL, red_div).repeat(base_count) + ws(KILL_METER_KILLBAR_EMPTY_SYMBOL, KILL_METER_KILLBAR_USE_SYMBOLS ? red_div : empty_div).repeat(KILL_METER_KILLBAR_DEFAULT_BAR_SIZE - base_count) + ws(']', KILL_METER_KILLBAR_USE_SYMBOLS ? red_div_no_width : empty_div_no_width);
      } else {
        killbar = full_killbar(KILL_METER_KILLBAR_DEFAULT_BAR_SIZE, 0, orange_div, orange_div_no_width);
      }
      
    }
    
    killMeterString = killMeterString + '<tr align="left"><td colspan="3"><div style="width: 100%" onclick="parent.code_eval(`changeKillMeterKillbarMode()`)"><div style="height: 100%; width:100%; display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-end;">' + killbar + '</div></div></td></tr>';
  }
  
  $('#' + "kill_meter_content").html(killMeterString);
}

initKillMeter();
if (USE_KILL_METER) {
  updateKillMeter();
}

//////////////////////////////////////////////////////////////////////////////////////