(function(module) {
  var rulesController = {};

  rulesController.reveal = function() {
    $('.page').not('#rules-page').hide();
    $('#rules-page').fadeIn();
    $('.link a').css({color:'white'});
    $('#rules-link').css({color:'grey'});
  };

  module.rulesController = rulesController;
})(window);
