// Creates new tabs and shows the missing videos.
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick(){
        alert(JSON.parse(delStorage.getItem(url)));
        var list = JSON.parse(delStorage.getItem(url));
        var newPage = window.open('');
        for (var i = 0; i < list.length; i++){
            newPage.document.writeln(`${url}: ${list[i]}`);
        }
    }
}, false)