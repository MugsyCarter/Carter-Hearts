(function(module) {
  var playController = {};

  playController.reveal = function() {
    $('.page').not('#play-page').hide();
    $('#play-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#play-link').css({color:'grey'});
  };

  module.playController = playController;
})(window);
