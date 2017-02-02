import template from './app.html';
import './app.scss';

export default {
    template,
    controller
};


function controller() {
    this.link = {
        home: true,
        play: false,
        rules: false,
        about: false

    };

    this.clicked = (page)=>{
        if (this.link[page] === false){
            console.log('updating link');
            this.link = {
                home: false,
                play: false,
                rules: false,
                about: false
            };
            this.link[page] = true;
        }
    };
};