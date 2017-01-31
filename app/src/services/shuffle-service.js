shuffleService.$inject = ['$http', 'apiUrl'];

export default function shuffleService($http, apiUrl) {
    return {
        getNewHand(){
            	return $http.get(`${apiUrl}`)
                .then(res=> res.data);
        }
    };
}
