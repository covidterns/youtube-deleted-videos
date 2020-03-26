document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('button').addEventListener('click', onclick, false)
    function onclick(){
        alert(delStorage.getItem(url));
        var list = delStorage.getItem(url);
        var newPage = window.open('');
        for (var i = 0; i < list.length; i++){
            newPage.document.writeln(`${url}: ${list[i]}`);
        }
    }
}, false)