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


    // $stateProvider.state({
    //     name: 'stores',
    //     url: '/stores',
    //     abstract: true,
    //     default: '.all',
    //     component: 'stores',
    //     resolve: {
    //             stores: ['storeService', stores => {
    //                 return stores.getAll();
    //         }]
    //     } 
    // });

    // $stateProvider.state({
    //     name: 'stores.all',
    //     url: '/all',
    //     component: 'allStores'
    // });

    // $stateProvider.state({
    //     name: 'stores.add',
    //     url: '/add',
    //     component: 'addNewStore'
    // });

    // $stateProvider.state({
    //     name: 'store',
    //     url: '/store/{id}',
    //     abstract: true,
    //     default: '.pets',
    //     resolve: {
    //         store: ['storeService', '$transition$', (Store, t) => {
    //             return Store.get(t.params().id);
    //         }],
    //         pets: ['store', a => a.pets]
    //     },
    //     component: 'store' 
    // });

    // $stateProvider.state({
    //     name: 'store.pets',
    //     url: '/pets',
    //     component: 'viewPets'
    // });

    // $stateProvider.state({
    //     name: 'store.addPet',
    //     url: '/add',
    //     component: 'addPet'
    // });

    $urlRouterProvider.otherwise('/');
}
