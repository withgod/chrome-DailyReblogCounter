var latestId    = 0;
var cursor      = 0;
var counter     = 0;
var currentDate = '';
var nextFlag    = true;

function doRequest() {
    $.get('http://' + localStorage['tumblr_id'] + '.tumblr.com/api/read/json?num=50&cursor=' + cursor, function(data) {
            $.each(data['posts'], function(i, val) {
                    var postDate  = DateFormatter.format(new Date(val['date']), "Ymd")
                    var postId    = val['id'];
                    //console.dir([val, postDate, currentDate, currentDate > postDate, cursor]);
                    if (currentDate == postDate) {
                        counter++;
                    }
                    if (postId == latestId || currentDate > postDate) {
                        nextFlag = false;
                        return false;
                    }
                    latestId = postId;
                    chrome.browserAction.setBadgeText({text : String(counter)});
                });
            cursor++;
            if (nextFlag)
                doRequest();
        }, 'jsonp');
}

function doCount() {
    if (localStorage['tumblr_id']) {
        currentDate = DateFormatter.format(new Date(), "Ymd");
        nextFlag = true;
        cursor   = 0;
        counter  = 0;
        chrome.browserAction.setBadgeText({text : '0'});
        doRequest();
    } else {
        chrome.browserAction.setBadgeText({text : '?'});
        chrome.browserAction.setTitle({title: 'set valid tumblr id. set option page'});
    }
    setTimeout("doCount()", 1000 * 60 * 10) // every 10 min
}
