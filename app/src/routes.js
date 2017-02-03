routes.$inject = ['$stateProvider', '$urlRouterProvider']; 

export default function routes($stateProvider, $urlRouterProvider) {
    
    $stateProvider.state({
        name: 'home',
        url: '/',
        data: { public: true },
        component: 'home' 
    });

    $stateProvider.state({
        name: 'play',
        url: '/play',
        data: { public: true },
        component: 'play' 
    });

    $stateProvider.state({
        name: 'rules',
        url: '/rules',
        data: { public: true },
        component: 'rules' 
    });

    $stateProvider.state({
        name: 'settings',
        url: '/settings',
        data: { public: true },
        component: 'settings' 
    });

    $stateProvider.state({
        name: 'about',
        url: '/about',
        data: { public: true },
        component: 'about' 
    });

    $urlRouterProvider.otherwise('/');
}
