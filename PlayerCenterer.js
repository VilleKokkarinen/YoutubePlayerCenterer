function waitFor(condition, callback) {
			if(!condition()) {
				window.setTimeout(waitFor.bind(null, condition, callback), 75);
			} else {
				callback();
			}
		}

var players = [];
var booli = false;


var interval = null;

 interval = setInterval(()=>{
	var players = document.getElementsByTagName("ytd-watch-flexy")	
	if(players != null)
		if(players[0] != null)
			if(players[0].className =="style-scope ytd-page-manager hide-skeleton"){
				booli = true;
			}
},500)


 waitFor(()=> booli == true, () => {
clearInterval(interval)

chrome.storage.onChanged.addListener(function (changes, namespace) {
	  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		  
		  update(newValue);
	  }
	});

	var update = function(amount){
		var players = document.getElementsByTagName("ytd-watch-flexy")
		if(amount != null){
			players[0]['style']['paddingLeft'] = amount+"vw";
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