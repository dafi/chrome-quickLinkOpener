if (typeof(options) == 'undefined') {
    var options = {};
}

(function() {
    var filtersUrlWidget;

    this.init = function() {
        filtersUrlWidget = document.getElementById('filtersUrl');
        var filtersUrl = window.localStorage['filtersUrl'];
        filtersUrlWidget.value = filtersUrl ? filtersUrl : '';
        filtersUrlWidget.focus();
    }

    this.save = function() {
        var filtersUrl = filtersUrlWidget.value.replace(/^\s+/, '').replace(/\s+$/, '');

        if (filtersUrl) {
            window.localStorage['filtersUrl'] = filtersUrl;

            window.close();
        }
    }
}).apply(options);