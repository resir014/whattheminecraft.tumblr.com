$('.photoset-grid').photosetGrid({
  highresLinks: true,
  rel: $('.photoset-grid').attr('data-id'),
  gutter: '5px',

  onComplete: function(){
    $('.photoset-grid').css({
      'visibility': 'visible'
    });
  }
});
