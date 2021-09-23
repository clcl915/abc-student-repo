window.addEventListener('keydown', function(e){
    if (e.keyCode == 38) {
        window.moveBy(0,-10);
    }
    if (e.keyCode == 40) {
        window.moveBy(0,10);
    }
});
