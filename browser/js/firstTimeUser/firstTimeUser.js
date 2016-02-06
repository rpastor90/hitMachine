app.config(function ($stateProvider) {
    $stateProvider.state('firstTimeUser', {
        url: '/firstTimeUser',
        templateUrl: 'js/firstTimeUser/firstTimeUser.html',
        controller: 'FirstTimeUserCtrl',
        data : { authenticate: true },
        resolve: {
            animals: function (AnimalFactory) {
                return AnimalFactory.fetchAnimals();
            },
            user: function (UserFactory) {
                return UserFactory.getUser();
            }
        }
    });
});

app.factory('FirstTimeUserFactory', function ($http, $state) {
    var FirstTimeUserFactory = {};
    FirstTimeUserFactory.update = function (user) {
        console.log("this is the update info for the user", user)
        return $http.put('/api/users/' + user._id, user)
        .then(function (updatedUser) {
            return updatedUser;
        })
        .then(function() {
            $state.go('crib');
        });
    };
    return FirstTimeUserFactory;
});

app.controller('FirstTimeUserCtrl', function ($scope, $state, FirstTimeUserFactory, animals, user, AuthService) {
    $scope.user = user;

    $scope.logout = function() {
        AuthService.logout()
        .then(function() {
            $state.go('home');
        });
    };

    // var species = ['Panda', 'Rhino', 'bulbasaur'];

    $scope.update = FirstTimeUserFactory.update;
    $scope.animals = animals;
    $scope.onDisplay = 0;
    $scope.user.animal = $scope.animals[$scope.onDisplay]
    // $scope.user.animal.species = species[0];

    $scope.nextAnimal = function () {
        if ($scope.onDisplay >= 2) $scope.onDisplay = 0;
        else $scope.onDisplay++;
        $scope.user.animal = $scope.animals[$scope.onDisplay]
    };
});
