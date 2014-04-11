jQuery.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
            method: matchParams[0].match(validLabels) ? 
                        matchParams[0].split(':')[0] : 'attr',
            property: matchParams.shift().replace(validLabels,'')
        },
        regexFlags = 'ig',
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
    return regex.test(jQuery(elem)[attr.method](attr.property));
}

$( document ).ready(function() {
    console.log( "DNKFF at the ready:");
	console.log( "DNKFF referring URL:" + document.referrer );
	for (var valuePair in $.url().param()){
		try {
			console.log('PARAM:'+valuePair + ' : ' + $.url().param(valuePair));
			switch(valuePair) {
				case 'dnkfftitle':
					$('#edit-title').val($.url().param(valuePair));
				break;
				
				case 'dnkffsubject':
					$('#edit-body-und-0-summary').val($.url().param(valuePair));
					$('#cke_contents_edit-body-und-0-value body').html($.url().param(valuePair));
					$('iframe').contents().find('body').html($.url().param(valuePair));
				break;
				
				case 'dnkffdate':
					$('#edit-publish-date-datepicker-popup-0').val($.url().param(valuePair));
				break;
				
				case 'dnkffofficespecific':
					var myTopic
					for (var osTopic in $.url().param(valuePair).split(':')){
						myTopic = $.url().param(valuePair).split(':')[osTopic]; 
						$('#edit-field-topic-office-term-und option[value=' + myTopic + ']').attr('selected','selected');
						console.log(valuePair + ' : osTopic : '+osTopic + ' : ' + myTopic)
					}
				break;
				
				case 'dnkffURL':
					$('#edit-field-primary-location-und-0-value').val('none');
					$('html, body').animate({ 
						scrollTop: $(document).height()-$(window).height()}, 
						000
					);
					var htmlstr = '<div id="copyPasta" style="position:fixed;width:700px;height:50px;z-index:9999999;background-color:#e0ffff;top:200px;left:300px;padding:20px;font-size:20px;">' + $.url().param('dnkffURL') + '</div>';
					$('body').append(htmlstr);
					$('#edit-field-download-files-und-0 > .launcher').trigger('click'); 
				break;	
				
				case 'dnkffautopublish':
					switch($.url().param('dnkffautopublish')){
						case 'true':
							$('#edit-submit').trigger('click');
						break;
						case 'workflow1':
							$(':regex(href,immediate\%20publish)').first().each(function(){
								console.log('workflow1 link:' + $(this).attr('href'));
								window.location.replace('https://cms.doe.gov' + $(this).attr('href') + '?dnkffautopublish=workflow2')
							});
						break;
						case 'workflow2':
							console.log('workflow2:');
							$('#edit-submit').trigger('click');
						break;
					}
				break;
				
			}
		} catch(err) {
			console.log(err);
		}
	}
	if($.url(document.referrer).param("dnkffautopublish") ==='true' && document.referrer != ''){
		$(':regex(href,workflow)').first().each(function(){
			console.log('link:' + $(this).attr('href'));
			window.location.replace('https://cms.doe.gov' + $(this).attr('href') + '?dnkffautopublish=workflow1')
		});
	} 
	if($.url(document.referrer).param("dnkffautopublish") ==='workflow2' && document.referrer != ''){

		chrome.runtime.sendMessage('close me',function(response){
			console.log('dnkffautopublish sendMessage response:'+response.message+' sender tab id: ' + response.senderTabId);
		});
		
	} 

});

//I *think this is chaff now..
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
	$('#edit-field-primary-location-und-0-value').val('none');
	$('#edit-title').val(myTitle);
	$('#edit-body-und-0-summary').val(mySummary);
	$('#cke_contents_edit-body-und-0-value body').html(mySummary);
	$('iframe').contents().find('body').html(mySummary);
	$('#edit-publish-date-datepicker-popup-0').val(myTime);
	
	$('html, body').animate({ 
		scrollTop: $(document).height()-$(window).height()}, 
		000
	);
	var htmlstr = '<div id="copyPasta" style="position:fixed;width:700px;height:50px;z-index:9999999;background-color:#e0ffff;top:200px;left:300px;padding:20px;font-size:20px;">' + $.url().param('dnkffURL') + '</div>';
	$('body').append(htmlstr);
	$('#edit-field-download-files-und-0 > .launcher').trigger('click'); 

}






