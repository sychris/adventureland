// atempt at a configuration window

class ui_configs{
	constructor(args){

		this.init();
	}
	init(){
		parent.$("#bottomrightcorner").prepend(
			$('<div id = "configs"><\div>').css({
				width: "auto",
				height: "auto",
				background: "black",
				fontSize: "16px",
				border: "1px solid white",
				padding: "5px",
			}).append(
				$('<div id="one"></div>').css({
					//<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
				}))

		);
	}
	on_destroy(){
		parent.$('#bottomrightcorner').find('#configs').remove();
		//parent.socket.removeListener('hit', parent.socket._callbacks.$hit[this.hit_listener]);
		//parent.socket.removeListener('game_log', parent.socket._callbacks.$game_log[this.log_listener]);
	}
}
var uiCon = new ui_configs({});
function on_destroy(){
	clear_drawings();
	uiCon.on_destroy();
}