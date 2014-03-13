$( document ).ready(function() {
	$('#quickFormText').focus();


	$(document).bind('keypress', function(e) {
		if(e.keyCode==13){
			var myText = "yo for REAL";
			myText = $('#quickFormText').val();
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id,
				 {greeting: myText},
				 function(response) {
					console.log(response.farewell);
				});
			});
		};
	});


	$('#fillDatForm').click(function(){
		var myText = "yo for REAL";
		myText = $('#quickFormText').val();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id,
			 {greeting: myText},
		 	function(response) {
				console.log(response.farewell);
			});
		});
	});
});

function fillDatForm(){
	var myText = "yo for REAL";
	myText = $('#quickFormText').val();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id,
		 {greeting: myText},
		 function(response) {
			console.log(response.farewell);
		});
	});
};