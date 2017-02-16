import template from './app.html';

export default {
    template,
    controller
};





function controller() {

    var xStart, yStart = 0;
 
    document.addEventListener('touchstart',function(e) {
        xStart = e.touches[0].screenX;
        yStart = e.touches[0].screenY;
    });
    
    document.addEventListener('touchmove',function(e) {
        var xMovement = Math.abs(e.touches[0].screenX - xStart);
        var yMovement = Math.abs(e.touches[0].screenY - yStart);
        if((yMovement * 3) > xMovement) {
            e.preventDefault();
        }
    });



    this.link = {
        home: true,
        play: false,
        rules: false,
        about: false,
        settings: false

    };

    this.clicked = (page)=>{
        if (this.link[page] === false){
            console.log('updating link');
            this.link = {
                home: false,
                play: false,
                rules: false,
                about: false,
                settings: false
            };
            this.link[page] = true;
        }
    };
};