/*chrome.extension.onRequest.addListener(function (request, sender) {
  if (request == "show_page_action") {
    //chrome.pageAction.show(sender.tab.id);
	chrome.pageAction.show(' Here is my response!');
  }
});*/
chrome.runtime.onMessage.addListener(
	function(message,sender,sendResponse){
		if (message === 'close me'){
			chrome.tabs.remove(sender.tab.id);
		}else{
			sendResponse({'message':'the circle is now complete','senderTabId':sender.tab.id});
		}
});
