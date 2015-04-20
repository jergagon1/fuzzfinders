$(document).ready(function(){


  var content;
  function initialize() {
    var mapOptions = {
      zoom: 13
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        var marker = new google.maps.Marker({
          map: map,
          position: pos,
          icon: '/images/fuzzfinders_favicon.png',
          draggable: true
        });
        var infoWindow = new google.maps.InfoWindow({
          // map: map,
          // position: pos,
          content: content,
        });

        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.open(map, marker)
        });
         google.maps.event.addListener(marker, 'dragend', function(){
            lat = this.getPosition().lat();
            lng = this.getPosition().lng();
            infoWindow.setContent(content);
            infoWindow.open(map, marker)
        });
        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }

  var reportMap;
  function initializeReport() {
    var lat = $('#lat').text()
    var lng = $('#lng').text()
    var reportMapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(lat, lng)
    };
  reportMap = new google.maps.Map(document.getElementById('report-map'),
      reportMapOptions);
  }

  google.maps.event.addDomListener(window, 'load', initializeReport);




  google.maps.event.addDomListener(window, 'load', initialize);

  $(".set-location-form").on("submit", function(event){
    // event.preventDefault();
    // console.log("button clicked");
    var link = $(this).attr("action");
    // console.log(content);
    $.ajax({
      url: link,
      type: "put",
      dataType: "JSON",
      data: JSON.stringify({ lat: lat, lng: lng }),
      contentType: "application/json"
    })
    .done(function(response){
      console.log("response");
    })
  });

});
