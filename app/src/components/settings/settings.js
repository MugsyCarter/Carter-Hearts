import template from './settings.html';

export default {
    template,
    controller
};

function controller() {
    this.easyMode = ()=>{
        localStorage.setItem('easy', true);
        localStorage.setItem('hard', false);
        console.log('easymode');
    };
    
    this.hardMode = ()=>{
        localStorage.setItem('hard', true);
        localStorage.setItem('easy', false);
        console.log('hardmode');
    };

    this.deadly = false;
};