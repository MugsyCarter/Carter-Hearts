(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.page').not('#about-page').hide();
    $('#about-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#about-link').css({color:'grey'});
  };

  module.aboutController = aboutController;
})(window);
