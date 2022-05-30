$(document).ready(function() {
	chrome.storage.sync.get("amount", function(v){	
		try{
			var element = document.getElementById("input");
			
			if(element != null)
				element.value = v.amount
			else{
				console.log("no input loaded");
				
				setTimeout(()=>{
					
					$("#YPCButton").on("click", function(){		
						var amount = document.getElementById("input").value;		
						chrome.storage.sync.set({ "amount": amount }, function(){
						});
					})
					
					var element = document.getElementById("input");
			
					if(element != null)
						element.value = v.amount
					else{
						console.log("no input loaded");
						

					}
							
					
				},500)
			}
		}catch(err){
			var element = document.getElementById("input");
				if(element != null)
				element.value = 15;
		
				chrome.storage.sync.set({ "amount": 15 }, function(){
			});
		}		
	});
	
	
	$("#YPCButton").on("click", function(){		
		var amount = document.getElementById("input").value;		
		chrome.storage.sync.set({ "amount": amount }, function(){
		});
	})
});