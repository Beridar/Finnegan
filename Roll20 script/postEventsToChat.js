var newline = "|n";
var whisperTarget = "Beridar";

on("ready", function() {
    on("add:graphic", function(obj) {
        dealWithThisNewImage(obj);
    });
    on("change:graphic", function(obj, prev) {
        dealWithThisImageUpdate(obj, prev);
    })
});

function dealWithThisNewImage(image) {
	var message = "An image was added." + newline + 
		buildTheDataDumpAboutThisImage(image);
		
    sendAMessage(message, whisperTarget);
}

function dealWithThisImageUpdate(image, previousValues) {
	var detectedChanges = findAllTheChangesForThisChangedImage(image, previousValues);
	if (detectedChanges === "")
		return;
	
	var message = "An image changed" + newline +
		buildTheIdentifierForThisImage(image) + newline + 
		detectedChanges + newline
		;
		
	sendAMessage(message, whisperTarget);
}

function findAllTheChangesForThisChangedImage(image, previousValues) {
	return theChangedMessageForThisProperty(image, previousValues, "layer") +
		theChangedMessageForThisProperty(image, previousValues, "bar1_value") +
		theChangedMessageForThisProperty(image, previousValues, "bar1_max") +
		theChangedMessageForThisProperty(image, previousValues, "statusmarkers") +
		"";
}

function theChangedMessageForThisProperty(image, previousValues, property) {
	var previous = previousValues[property] || "<null>";
	var now = image.get(property) || "<null>";
	
	if (previous != now) {
		return property + ", [" + previous + "] => [" + now + "]; ";
	} else {
		return "";
	}
}

function sendAMessage(message, sendTo) {
    if (sendTo == null) {
        sendChat("API helper", message);
    } else {
        sendChat("API helper", "/w " + sendTo + " " + message);
    }
}

function buildTheIdentifierForThisImage(image) {
	return messageDetailAboutThisProperty(image, "_id") +
        messageDetailAboutThisProperty(image, "_type") +
        messageDetailAboutThisProperty(image, "_subtype") +
        messageDetailAboutThisProperty(image, "_pageid") +
        messageDetailAboutThisProperty(image, "name") +
        messageDetailAboutThisProperty(image, "represents") +
        messageDetailAboutThisProperty(image, "controlledby") +
        "";
}

function buildTheDataDumpAboutThisImage(image) {
    var message = messageDetailAboutThisProperty(image, "_id") +
        messageDetailAboutThisProperty(image, "_type") +
        messageDetailAboutThisProperty(image, "_subtype") +
        messageDetailAboutThisProperty(image, "_pageid") +
        messageDetailAboutThisProperty(image, "represents") +
        messageDetailAboutThisProperty(image, "layer") +
        messageDetailAboutThisProperty(image, "isdrawing") +
        messageDetailAboutThisProperty(image, "name") +
        messageDetailAboutThisProperty(image, "controlledby") +
        messageDetailAboutThisProperty(image, "bar1_value") +
        messageDetailAboutThisProperty(image, "bar1_max") +
        messageDetailAboutThisProperty(image, "statusmarkers") +
        "";
    
    return message;
}

function messageDetailAboutThisProperty(obj, property) {
    return property + " = " + obj.get(property) + newline;
}