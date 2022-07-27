(function ($) {

  const utm = location.search.replace('?', '&')
  const Messages = $('#form-status')

  $('#contactForm').on('submit', function (e) {
    e.preventDefault()

    const self = this
    const fields = $(this).serialize() + utm

    grecaptcha.ready(function() {
      grecaptcha.execute('6Lc_dIQcAAAAACdrGh92pg0PGtKZY1lOahpxhiYl', {action: 'submit'}).then(function(token) {
        console.log('token,', token)
        db_save({utm, fields: $(self).serialize()}, fields)
      });
    });
  })

  function db_save(data, fields) {
    $.ajax({
      url: '/lead',
      type: 'POST',
      dataType: '',
      data,
      beforeSend: function (xhr) {
        $(Messages).html('<p>Enviando...</p>')
      },
      success: function (data) {
        console.log('stored in db:', data)
        send_to_webhook(fields)
      }
    })
  }

  function send_to_webhook(data) {
    $.ajax({
      url: 'https://hooks.zapier.com/hooks/catch/9660140/b6wolz2/',
      dataType: 'json',
      data,
      beforeSend: function (xhr) {
        // $(Messages).html('<p>Enviando...</p>')
      },
      success: function (data) {
        console.log('response from webhook', data)
        $(Messages).html('<p>Enviado exitosamente.</p>')
        window.location.replace("/agradecimientos")
      }
    })
  }


})(jQuery)