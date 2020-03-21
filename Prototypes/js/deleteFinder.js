/**
 Locates and updates any deleted videos in a playlist
*/
function findDeletedVideos() {
    
    try {

        // select all of the videos in the playlist
        let videos = document.querySelectorAll("a.ytd-playlist-video-renderer");

        if (videos) {
        
            // filter out videos that are not titled "Deleted video"
            let deletedVideos = Array.from(videos).filter(hasDeletion);

            // get a map of ids to elements
            let videoIds = getVideoIds(deletedVideos);

            // update the [Deleted video] title
            updateTitles(videoIds, deletedVideos);
            
        } else {
            console.log("No deleted videos found in this playlist");
        }

    } catch (error) {
        console.error("Error retrieving deleted videos from playlist", error);
    }
}

/** 
 Filters non-deleted videos out of an array of video DOM elements
*/
function hasDeletion(value, index, array) {

    let title = value.innerText;

    if (!title) {
        return false;
    }

    // this will break if youtube changes conventions
    return (title.toLowerCase() == "[deleted video]");
}

/**
 Returns an array of video ids
 @param videoElements - an array of video DOM elements
*/
function getVideoIds(videoElements) {
    
    var videoIds = videoElements.map((video) => video.search);

    videoIds = videoIds.map((url) => url.substring(url.indexOf("=") + 1, url.indexOf("&")));

    return videoIds;
}

/**
 Updates the titles of deleted videos displayed on the DOM
 @param videoIds - an array of unique video ids
 @param deletedVideos - an array of video DOM elements
*/
function updateTitles(videoIds, deletedVideos) {

/*
    If the server can take the array of unique video ids and return
    a response of objects such as {index, title}, this will be easy
*/

/*

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "your-server-url");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    
        if (this.status == 200 && this.readyState === XMLHttpRequest.DONE) {
        
            // update video title

        }

    };
    xhr.send(JSON.stringify(videoIds)); 

*/  

    for (var i = 0; i < deletedVideos.length; i++) {

        var videoTitle = deletedVideos[i].querySelector("#video-title");
        
        if (!videoTitle) {
            videoTitle = deletedVideos[i].getElementsByTagName("font")[0];
        }

        videoTitle.innerText = "Recovered Title Goes Here";
        videoTitle.style.backgroundColor = "#ceb7e0";
        
    }
    
}

// not applicable when used in snippet
//window.addEventListener("load", findDeletedVideos);

// use this line for snippets
findDeletedVideos();