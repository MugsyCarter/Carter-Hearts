import template from './settings.html';

export default {
    template,
    controller
};

function controller() {
    this.mode = (difficulty)=>{
        localStorage.setItem('mode', difficulty);
        console.log('changed mode to ', difficulty);
    };
 
    this.deadly = false;
};