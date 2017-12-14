chatUIClass = ".textchatcontainer";
chatMessageHistoryContainer = ".content";
chatMessageClass = ".message";
chatMessageFromClass = ".by";
foundTheWelcomeMessage = false;

function ChatListener() {
    return new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                var chatMessage = $(addedNode);
                if (!chatMessage.is(chatMessageClass)) {
                    return;
                }

				var messageFrom = chatMessage.find(chatMessageFromClass).text() || "";

				if (foundTheWelcomeMessage == false) {
					if (messageFrom.includes("Welcome to Roll20!"))
						foundTheWelcomeMessage = true;
				} else {
					if (messageFrom.includes("API helper")) {
						$.ajax({
							url: 'https://localhost:44392/api/values/1',
							type: 'PUT',
							data: {
								value: chatMessage.html()
							},
							success: function() {
							}
						});
					}
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