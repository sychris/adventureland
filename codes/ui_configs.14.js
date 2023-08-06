// atempt at a configuration window
log("loading ui_configs")

class ui_configs {
  constructor(args) {
    
    this.init();
  }
  
  init() {
    parent.$("#bottomrightcorner").prepend(
      $('<div id = "configs"><\div>').css({
        width: "auto",
        height: "auto",
        background: "black",
        fontSize: "16px",
        border: "1px solid white",
        padding: "5px",
      }).append(
        $('<div id="one"><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></div>').css({}))
    );
  }
  
  find_id(array, id) {
    for (let i = 0; i < array.length; i++)
      if (array[i][0] === id)
        return i;
    return -1;
  }
  
  on_destroy() {
    parent.$('#bottomrightcorner').find('#configs').remove();
    
  }
}

var uiCon = new ui_configs({});
