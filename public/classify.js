$.get('/question', function(response) {
  $('img').attr('src', '/data/' + response.image);
  $('form input[name=id]').val(response.id);
});