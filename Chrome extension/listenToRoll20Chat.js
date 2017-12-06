chatUIClass = ".textchatcontainer";
chatMessageHistoryContainer = ".content";
chatMessageClass = ".message";
chatMessageFromClass = ".by";

function ChatListener() {
    return new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                var chatMessage = $(addedNode);
                if (!chatMessage.is(chatMessageClass)) {
                    return;
                }
/*    var messages = $(".message");
    messages.each(function () {
    	console.dir(this);
    	var text = this
        	.children()
        	.filter(function () { return this.nodeType == 3; })
            [0].nodeValue;
        console.dir(text);
    });*/
				
				var messageFrom = chatMessage.find(chatMessageFromClass).text() || "";
				if (messageFrom.includes("API helper")) {
					console.log(chatMessage.html());
				}
            });
        });
    });
}

var config = {attributes: false, childList: true, characterData: false};

var chatListener = ChatListener();

var htmlBody = $("body")[0];
var chatLoadedObserver = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        var chatSelector = $(chatUIClass).find(chatMessageHistoryContainer);
        if (chatSelector.length > 0) {
            chatListener.observe(chatSelector[0], config);

            chrome.runtime.sendMessage({roll20ChatFound: true}, function (response) {
              if (response.registered) {
                console.log("Roll20 Chat found.");
              }
            });

            observer.disconnect();
        }
    })
});

chatLoadedObserver.observe(htmlBody, config);