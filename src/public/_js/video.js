(function($) {
  var parent = $('#parent-id'),
      videoIframe = document.createElement('iframe');
  videoIframe.width = "100%"
  videoIframe.height = "350px"
  videoIframe.src = "https://www.youtube.com/embed/zxcGVxBMAWM?rel=0&showinfo=0&controls=1&autoplay=1"
  videoIframe.frameBorder = 0
  videoIframe.allowFullscreen = true
  videoIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  $(parent).find('img').on('click', function() {
      $(this).css('display', 'none')
      $(parent).find('#dis-vid').append(videoIframe)
  })
})(jQuery)
