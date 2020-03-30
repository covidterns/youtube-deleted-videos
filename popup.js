// Creates new tabs and shows the missing videos.
document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage();
    var missing = document.getElementById('missing');
    var newPage;
    if (missing) {
        missing.addEventListener('click', function () {
            newPage = window.open("", "Missing Videos", "width=800,height=800");
            var anyVideos = false;
            Object.keys(bg.playlists).forEach(function (url) {
                if (bg.playlists[url] != null) {
                    newPage.document.writeln(`${url} : ${bg.playlists[url]}`);
                    anyVideos = true;
                }
            });
            if (!anyVideos) {
                newPage.document.writeln("No missing videos.");
            }
        });
    }

    var reset = document.getElementById('reset')
    if (reset) {
        reset.addEventListener('click', function () {
            chrome.tabs.query({ currentWindow: true, active: true },
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, 'hi');
                });
            if(newPage){
                newPage.close();
            }
        });
    }
}, false)