window.playlists = {}
chrome.runtime.onMessage.addListener(function ( request, sender, sendResponse) {
    window.playlists[request.url] = request.myStorage;
});