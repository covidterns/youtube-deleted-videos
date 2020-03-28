// Creates new tabs and shows the missing videos.
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick(){
        alert(window.localStorage.getItem(JSON.stringify([url, "delete"])));
        alert(window.localStorage.getItem(JSON.stringify([url, "current"])));
        var list = JSON.parse(myStorage.getItem(delString));
        var newPage = window.open('');
        for (var i = 0; i < list.length; i++){
            newPage.document.writeln(`${url}: ${list[i]}`);
        }
    }
}, false)