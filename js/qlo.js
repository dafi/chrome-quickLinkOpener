/**
 * Author: davide ficano
 */

if  (typeof (qlo) == 'undefined') {
    var qlo = {};
}

(function() {
    this.getFilteredLinks = function(doc, hostname, filters) {
        var re = [];

        for (var i = 0; i < filters.length; i++) {
            re.push(new RegExp(filters[i]));
        }

        var urls = [];
        var n = doc.querySelectorAll('a');
        for (var i = 0; i < n.length; i++) {
            var link = n[i];
            var href = link.getAttribute('href');
            
            for (var r = 0; r < re.length; r++) {
                if (re[r].test(href)) {
                    urls.push(href);
                    break;
                }
            }
        }
        return urls;
    }

    function loadFilters() {
        var url = localStorage['filtersUrl'];
        console.log(url);
        if (url) {
            var httpReq = new XMLHttpRequest();
            httpReq.open("GET", url, false);
            httpReq.send(null);
            console.log('----' + httpReq.responseText);
            return JSON.parse(httpReq.responseText);
        } else {
            return [];
        }
    }

    this.openFilteredLinks = function() {
        chrome.tabs.getSelected(null, function(tab) {
            var filters = loadFilters();

            chrome.tabs.sendRequest(tab.id, {method: "filteredLinks", filters: filters}, function(response) {
                // If user swicthes window while tabs are created
                // some tabs are created on new current window
                chrome.windows.getCurrent(function(window) {
                    var urls = response.urls;
                    for (var i = 0; i < urls.length; i++) {
                        chrome.tabs.create({url: urls[i], windowId: window.id});
                    }
                });
            });
        });
    }
}).apply(qlo);
