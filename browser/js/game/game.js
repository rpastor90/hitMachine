app.config(function ($stateProvider) {
  $stateProvider.state('game', {
    url: '/game',
    templateUrl: 'js/game/game.html',
    controller: 'GameCtrl',
    resolve: {
      user: function (UserFactory) {
        return UserFactory.getUser();
      }
    },
  });
})
.controller('GameCtrl', function ($scope, socket, user) {
  // Socket listeners
  // ================
  // socket.removeListener('connect');
  $scope.winBanner = false;

  socket.on('connect', function () {
    var room = 'room';

    // socket.emit('wantToJoinRoom', room)

    socket.emit('connection');
    socket.emit('captureUser', user)
    var leftChar = $('.left-char');
    var rightChar = $('.right-char');
    var gameContainer = $('.gameContainer');
    var width = screen.width/2;
    // var marg = ((screen.width - Number(gameContainer.css('width').slice(0, -2)))/2).toString() + "px";
    // console.log(marg);
    // console.log("width", gameContainer.css('width'))
    // gameContainer.css('marginLeft', marg);

    $('body').keydown(function (e) {
        if (e.keyCode === 37) {
          socket.emit('moveLeft');
        }
        if (e.keyCode === 39) {
          socket.emit('moveRight');
        }
    });

    // socket.on('getSomeUsers', function (users) {
    //   var user;
    //   console.log(users);
    //   for (var i = 0; i < users.length; i++) {
    //     if (users[i]) {
    //       user = users[i];
    //       break;
    //     }
    //   }
    //   leftChar.css('background-image', "url('" + user.animal.picture + "')");
    //   leftChar.css('height', user.animal.animateStyle.height);
    //   leftChar.css('width', user.animal.animateStyle.width);

    //   rightChar.css('background-image', "url('" + user.animal.picture + "')");
    //   rightChar.css('height', user.animal.animateStyle.height);
    //   rightChar.css('width', user.animal.animateStyle.width);
    //   rightChar.css('transform', 'scaleX(-1)');
    // })

    socket.on('toTheLeftToTheLeft', function () {
      var pos = gameContainer.css('left');
      var change = (+pos.slice(0, -2) - 5).toString() + "px";
      gameContainer.css('left', change);
      if (gameContainer.css('left') <= 0) {
        winBanner = true;
      }
    });
    socket.on('toTheRightToTheRight', function () {
      var pos = gameContainer.css('left');
      console.log(pos);
      var change = (+pos.slice(0, -2) + 5).toString() + "px";
      gameContainer.css('left', change);
      if (gameContainer.css('left') >= ) {
        winBanner = true;
      }
    });



  });
});
