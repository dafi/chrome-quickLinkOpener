chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "filteredLinks") {
        var urls = qlo.getFilteredLinks(document, window.location.hostname, request.filters);
        sendResponse({urls: urls});
    } else {
        sendResponse({});
    }
});
