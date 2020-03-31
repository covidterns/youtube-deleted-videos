/**
 * Grabs information from the current page and stores it locally.
 * @author: Jimmy Kwan
 */

var url = window.location.href;
var myStorage = window.localStorage;
var checkString = JSON.stringify([url, "current"]);
var delString = JSON.stringify([url, "delete"]);
console.log(myStorage.getItem(checkString));

if(myStorage.getItem(checkString) === null || myStorage.getItem(checkString) == ""){
    myStorage.setItem(checkString, JSON.stringify(returnPlaylist(url)));
} else {
    var current = returnPlaylist(url);
    var check = JSON.parse(myStorage.getItem(checkString));
    var temp = current;
    var delVid = [];
    if(!matching(current, check)){
        for(var i = 0; i < check.length; i++){
            if(!(current.includes(check[i]))){
                if(myStorage.getItem(delString) === null || myStorage.getItem(delString) == ""){
                    delVid.push(check[i]);
                } else {
                    delVid = JSON.parse(myStorage.getItem(delString));
                    delVid.push(check[i]);
                }
                myStorage.setItem(delString, JSON.stringify(delVid));
            }
        }
        myStorage.setItem(checkString, JSON.stringify(temp));
    }
}

// Grabs every title and store it into an array. Returns an array.
function returnPlaylist(currentURL){
    var vidArray = [];
    var videos = document.querySelectorAll("#video-title");
    for (var i = 0; i < videos.length; i++){
        if(videos[i].innerHTML.trim() != "[Private video]" &&
        videos[i].innerHTML.trim() != "[Deleted video]"){
            vidArray.push(videos[i].innerHTML.trim());
        }
    }
    return vidArray;
}

// Checks two arrays if they match in order and content. Returns boolean.
function matching(arr1, arr2){
    if(arr1.length !== arr2.length) return false;
    for(var i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
}

//gives chrome the information to display
chrome.runtime.sendMessage({
    url: window.location.href,
    myStorage: JSON.parse(myStorage.getItem(delString))
});

// Clears missing videos from local storage for current URL, Clears from HTML
chrome.runtime.onMessage.addListener(function(request){
    myStorage.removeItem(delString);
});