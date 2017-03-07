$.get('/question', function(response) {
  var forms = $('.forms'),
      labels = response.labels,
      id = response.id,
      image = response.image;
  // Set image
  $('img').attr('src', '/data/' + image);
  // Clone form
  for (var i = 0; i < labels.length; i++) {
      $('form').clone().appendTo(forms);
  }
  // Set values
  $('form').each(function(i, e) {
      $(e).find('input[name=id]').val(id);
      $(e).find('input[name=choice]').val(labels[0]);
      $(e).find('input[type=submit]').val(labels[labels[1] ? 1 : 0];
  });
});
