app.config(function ($stateProvider) {

    $stateProvider.state('welcome', {
        url: '/welcome',
        controller: function(user, $state) {
            console.log('this is the welcome state,', user)
            // check if animal's species is set instead of user.fitbit/jawbone
            if (user.animal.species) {
                // switch firstTimeUser to crib once crib state is set up
                $state.go('crib');
            } else {
                $state.go('firstTimeUser');
            }
        },
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
                .then(function (user) {
                    return user;
                });
            }
        }
    });

});