 $('form').submit(function (evt) {
    var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    var animal = $searchField.val();
    var info = {
        tags: animal,
        format: "json"
      };

    var dataFunction = function(data) {
      var photoHTML = '';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
      } else {
        photoHTML = "<p>No photos found that match: " + animal + ".</p>"
      }
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");//ReEnables Search and Submit after successful return.
    }

    evt.preventDefault();//Prevent default on Submit click.
    $searchField.prop("disabled",true);////Disables search and submitButton while Searching
    $submitButton.attr("disabled", true).val("searching....");//Disables search and submitButton while Searching

    $('#photos').html('');//Set to add info to Div tag


    $.getJSON(flickerAPI, info, dataFunction); // end getJSON

  }); // end click
