function waitFor(condition, callback) {
			if(!condition()) {
				window.setTimeout(waitFor.bind(null, condition, callback), 75);
			} else {
				callback();
			}
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
	var players = document.getElementsByTagName("ytd-watch-flexy")	
	if(players != null)
		if(players[0] != null)
			if(players[0].className =="style-scope ytd-page-manager hide-skeleton"){
				booli = true;
			}
},500)
  function AddModeListeners(){
	var ModeButton = document.getElementsByClassName("ytp-size-button")[0]
	var FSButton = document.getElementsByClassName("ytp-fullscreen-button")[0]
	
	
	ModeButton.addEventListener("click", function() {
		var cinemamode = false;
		
		var players = document.getElementsByTagName("ytd-watch-flexy")
	
		if(ModeButton.getAttribute("data-title-no-tooltip") != "Cinema mode"){
			cinemamode = true;
		}	
	
		if(cinemamode){
			players[0]['style']['paddingLeft'] = currentamount+"vw";
			players[0]['style']['display'] = "block";
			CinemaOrFullScreen.value = false;
		}else{
			players[0]['style']['paddingLeft'] = 0+"vw";
			players[0]['style']['display'] = "";
			CinemaOrFullScreen.value = true;
		}

		console.log("clicked modebutton" + cinemamode)
	
		setTimeout(() => {
			AddModeListeners();
		}, 1000);
	
	});
	
	FSButton.addEventListener("click", function() {
		var fsmode = false;
		var players = document.getElementsByTagName("ytd-watch-flexy")
	
		if(FSButton.getAttribute("data-title-no-tooltip") != "Full screen"){
			fsmode = true;
		}	
	
		if(fsmode){
			players[0]['style']['display'] = "block";
			players[0]['style']['paddingLeft'] = currentamount+"vw";
		}else{
			players[0]['style']['display'] = "";
			players[0]['style']['paddingLeft'] = 0+"vw";
			CinemaOrFullScreen.value = true;
		}

		console.log("clicked fsbutton" + fsmode)
		setTimeout(() => {
			AddModeListeners();
		}, 1000);

	});
  }

waitFor(()=> booli == true, () => {
clearInterval(interval)
AddModeListeners();


var players = document.getElementsByTagName("ytd-watch-flexy")	
	if(players != null)
		if(players[0] != null)
			if(players[0].className =="style-scope ytd-page-manager hide-skeleton"
			&& ( players[0].hasAttribute("theater") == true || players[0].hasAttribute("fullscreen") == true )
			){
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
		var players = document.getElementsByTagName("ytd-watch-flexy")
		if(amount != null){
			currentamount = amount;

			if(CinemaOrFullScreen.value == false){
				players[0]['style']['display'] = "block";
				players[0]['style']['paddingLeft'] = amount+"vw";
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