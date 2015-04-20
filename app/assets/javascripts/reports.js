$(document).ready(function(){

  console.log(content);


  var content;

  function initialize() {
    var mapOptions = {
      zoom: 13
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);
        content = "" + pos +"";
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
            content = ""+[this.getPosition().lat(),this.getPosition().lng()]+"";
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

  google.maps.event.addDomListener(window, 'load', initialize);

  // $(".new_report").on("submit", function(event){
  //   event.preventDefault();
  //   console.log("button clicked");
  //   var formData = $(this).serialize();
  //   console.log(formData);
  //   formData += "&report%5Bcoords%5D=" + content
  //   // formData[]
  //   console.log(formData);
  //   var link = $(this).attr("action");
  //   // var data = {animal_type: [animal_type]}
  //   // console.log(data)
  //   $.ajax({
  //     url: link,
  //     type: "post",
  //     dataType: "JSON",
  //     data: formData
  //   })
  //   .done(function(response){

  //   })
  // });

});
