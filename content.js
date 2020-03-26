/**
 * Grabs information from the current page and stores it locally.
 * @author: Jimmy Kwan
 */

const url = window.location.href;
var myStorage = window.localStorage;
var delStorage = window.localStorage;

if(myStorage.getItem(url) === null || myStorage.getItem(url) == []){
    myStorage.setItem(url, returnPlaylist(url));
} else {
    var current = returnPlaylist(url);
    var check = myStorage.getItem(url);
    console.log(check);
    console.log(current);
    delVid = [];
    if(!matching(current, check)){
        console.log(check.length);
        for(var i = 0; i < check.length; i++){
            if(!(current.includes(check[i]))){
                if(delStorage.getItem(url) === null || delStorage.getItem(url) == []){
                    delVid.push(check[i]);
                } else {
                    delVid = delStorage.getItem(url);
                }
                delStorage.setItem(url, delVid);
            }
        }
        myStorage.setItem(url,current);
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

// Clears missing videos from local storage for current URL, Clears from HTML
var reset = document.getElementById('reset');
if(reset){
    reset.addEventListener('click',  function(){
        alert("works");
        delStorage.setItem(url, []);
    });
}