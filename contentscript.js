

$( document ).ready(function() {
    console.log( "ready!" );
	$('#edit-field-primary-location-und-0-value').val('none');
	//$('#edit-field-topic-office-term-und').val('852536');
	console.log($.url().param('dnkffdate'));
	console.log($.url().param('dnkfftitle'));
	console.log($.url().param('dnkffsubject'));
	if ($.url().param('dnkffsubject') != null){
		var myFields = $.url().param('dnkffdate') + '\t' + $.url().param('dnkfftitle') + '\t' + $.url().param('dnkffsubject');
		populateFields(myFields);
	};
	
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                request.greeting);
	populateFields(request.greeting)
	
    if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"});
  });

  
  
function populateFields(greeting){
	console.log('populateFields:' + greeting);
	var reqs=greeting.split('\t');
	var myTime = reqs[0];
	var myTitle = reqs[1];
	var mySummary = reqs[2];
	$('#edit-title').val(myTitle);
	$('#edit-body-und-0-summary').val(mySummary);
	$('#cke_contents_edit-body-und-0-value body').html(mySummary);
	$('iframe').contents().find('body').html(mySummary);
	$('#edit-publish-date-datepicker-popup-0').val(myTime);
	
	$('html, body').animate({ 
   		scrollTop: $(document).height()-$(window).height()}, 
   		000
	);
	if ($.url().param('dnkffURL') != null){
		console.log('I has dnkffURL');
		var htmlstr = '<div id="copyPasta" style="position:fixed;width:700px;height:50px;z-index:9999999;background-color:#e0ffff;top:200px;left:300px;padding:20px;font-size:20px;">' + $.url().param('dnkffURL') + '</div>';
		$('body').append(htmlstr);
		
		chrome.storage.sync.set({'robots': 'WASSSAAAAPPP'}, function() {
			// Notify that we saved.
			console.log('Settings saved, unless:'+chrome.runtime.lastError);
		});
	} else {
		console.log('I cannots find dnkffURL');
	};
	console.log('I should log sth. either way');
	$('#edit-field-download-files-und-0 > .launcher').trigger('click');  
}


//********************
/*MutationObserver = window.WebKitMutationObserver;
//************************** trying to click that final button- but I don't think it's working because in an iFrame=> cross-scripting block from local machine.  Schade.

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		if (mutation.addedNodes){ 
			for(var i=0; i<mutation.addedNodes.length; i++) {
				// do things to your newly added nodes here
				try{
					var myNode = mutation.addedNodes[i];
					console.log(myNode.getAttribute('id'));
					if (myNode.getAttribute('id')==='mediaBrowser'){
						console.log('I have found: ' + myNode.getAttribute('id'));
						$('#mediaBrowser').load(function(){
							console.log('media browser loaded'+$('#mediaBrowser').attr('class'));
							//var firstFrame = window.parent.frames[0].document;
							//console.log('edit upload :: ' + $('#edit-upload,firstFrame').attr('id'));
							//$('#mediaBrowser').contents().find('#edit-upload').click();
							console.log('and furthermore:'+$('#mediaBrowser').contents().find('#edit-upload').attr('id'));
							console.log('and even furthermore:'+$('#mediaBrowser').contents().find('#edit-upload').attr('class'));
							$('#mediaBrowser').contents().find('#edit-upload').click();
							$('#mediaBrowser').contents().find('#edit-upload').trigger('click');
							$('#mediaBrowser').contents().find('#edit-upload').trigger('mouseup');
							$('#mediaBrowser').contents().find('#edit-upload').mouseup();
							$(document.elementFromPoint(630,400)).click();
							$(document.elementFromPoint(630,400)).trigger('click');
							$(document.elementFromPoint(630,400)).trigger('mouseup');
							$(document.elementFromPoint(630,400)).mouseup();
							var e = jQuery.event('keydown');
							e.which=9;
							$("document").trigger(e); 
							$("document").trigger(e); 
							$("document").trigger(e); 
							$("document").trigger(e); 
							$("document").trigger(e); 
							e.which=13;
							$("document").trigger(e); 
						});
						
						//var uploadBtn = $('#mediaBrowser').find('#edit-upload');
						//console.log('even better, I have found: ' + uploadBtn.getAttribute('id'));
					};
				}catch(ex){
					
					console.log(ex.message);
				}
			}
		}
	})
})

observer.observe(document.body, {
    childList: true
  , subtree: true
  , attributes: false
  , characterData: false
})

function attachIframeObserver(){}

*/







