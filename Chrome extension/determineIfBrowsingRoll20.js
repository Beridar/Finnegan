chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.roll20ChatFound) {
      chrome.pageAction.show(sender.tab.id);
      sendResponse({registered: true});
    }
  });