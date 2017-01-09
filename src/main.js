import angular from 'angular';
import './scss/main.scss';
import components from './components';
import services from './services';
import uiRouter from 'angular-ui-router';
import routes from './routes'; 
// import defaultRoute from 'angular-ui-router-default';
import 'angular-ui-router/release/stateEvents';


const app = angular.module('myApp', [components, services, uiRouter]);

app.value('apiUrl', 'https://deckofcardsapi.com/api/deck/new/draw/?count=52');

app.config(routes);

//route debugger
app.run(function($rootScope) {
    $rootScope.$on('$stateChangeError', console.log.bind(console));
});

