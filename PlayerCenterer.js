function waitFor(condition, callback) {
	if(!condition()) {
		window.setTimeout(waitFor.bind(null, condition, callback), 75);
	} else {
		callback();
	}
}

function getPlayer(){
	/*
	var players = document.getElementsByTagName("ytd-watch-flexy")

	if(players != null && players.length > 0)
		if(players[0] != null)
			if(players[0].className =="style-scope ytd-page-manager hide-skeleton"){
				return players[0];
			}
			*/
	
	// youtube changed the layout, so we need to find the correct player 
	var player = document.getElementById("columns")

	if(player != null && player.className == "style-scope ytd-watch-grid"){
		return player;
	}

	if(player != null && player.className == "style-scope ytd-watch-flexy"){
		return player;
	}

	return null;
}

function getPlayerTheater(){
	var players = document.getElementById("player-full-bleed-container")
	if(players != null)
	return players
}

var players = [];
var booli = false;
var currentamount = null;

var CinemaOrFullScreen = {
	aInternal: 1000,
	aListener: function(val) {},
	set value(val) {
	this.aInternal = val;
	this.aListener(val);
	},
	get value() {
	return this.aInternal;
	},
	registerListener: function(listener) {
	this.aListener = listener;
	}
}

var interval = null;

interval = setInterval(()=>{
	var player = getPlayer()
	if(player != null){
		setTimeout(() => {
			booli = true;
		},500);
	}
},500)

function AddModeListeners(){
	var ModeButton = document.getElementsByClassName("ytp-size-button")[0]
	var FSButton = document.getElementsByClassName("ytp-fullscreen-button")[0]
	
	
	ModeButton.addEventListener("click", function() {
		var cinemamode = false;
		
		var player = getPlayer()
	
		if(ModeButton.getAttribute("data-title-no-tooltip") != "Theater mode"){
			cinemamode = true;
		}	
	
		if(cinemamode){
			player['style']['paddingLeft'] = currentamount+"vw";

			CinemaOrFullScreen.value = false;
		}else{
			player['style']['paddingLeft'] = 0+"vw";

			CinemaOrFullScreen.value = true;
		}
	
		setTimeout(() => {
			AddModeListeners();
		}, 1000);
	
	});
	
	FSButton.addEventListener("click", function() {
		var fsmode = false;
		var player = getPlayer()
	
		if(FSButton.getAttribute("data-title-no-tooltip") != "Full screen"){
			fsmode = true;
		}	
	
		if(fsmode){
			player['style']['paddingLeft'] = currentamount+"vw";
		}else{
			player['style']['paddingLeft'] = 0+"vw";
			CinemaOrFullScreen.value = true;
		}

		setTimeout(() => {
			AddModeListeners();
		}, 1000);

	});
}

waitFor(()=> booli == true, () => {
	clearInterval(interval)
	AddModeListeners();


	var theaterPlayer = getPlayerTheater()

	if(theaterPlayer != null)
		if(theaterPlayer.clientHeight > 1){
			CinemaOrFullScreen.value = true;
		}
		else{
			CinemaOrFullScreen.value = false;
		}

	chrome.storage.onChanged.addListener(function (changes, namespace) {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		update(newValue);
	}
	});

	var update = function(amount){
		var player = getPlayer()
		if(amount != null){
			currentamount = amount;

			if(CinemaOrFullScreen.value == false){
				player['style']['paddingLeft'] = amount+"vw";
			}

			var secondary = document.getElementById('secondary');
			if(secondary != null){
				secondary.style.setProperty('width', '18vw');
			}
		}
	}


	getAllStorageSyncData().then(items => {
	var amount = items.amount;
	update(amount)
	});


	function getAllStorageSyncData() {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get(null, (items) => {
		if (chrome.runtime.lastError) {
			return reject(chrome.runtime.lastError);
		}
		resolve(items);
		});
	});
	}
});