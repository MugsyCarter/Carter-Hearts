(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('.page').not('#home-page').hide();
    $('#home-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#home-link').css({color:'grey'});
    $('#pass-button').hide();
  };

  module.homeController = homeController;
})(window);
