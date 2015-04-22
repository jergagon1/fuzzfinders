$(document).ready(function(){
  var dispatcher = new WebSocketRails($('#amber-alert').data('uri'), true)
  function send(message) {
    dispatcher.trigger('amber_alert', message);
  }
  dispatcher.bind('amber_alert', function(data) {
    console.log("in message function");
    document.querySelector('#alert-message').innerHTML += "<li>" + data + "</li>";
    })
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

         google.maps.event.addListener(marker, 'dragend', function(){
            lat = this.getPosition().lat();
            lng = this.getPosition().lng();
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
      position: new google.maps.LatLng(37.7848676, -122.3978871),
      content: content
    };
  }

  var reportMap;
  function initializeReport() {
    var lat = $('#report-map').data().lat
    var lng = $('#report-map').data().lng
    var id = $('#report-map').data().id
    var photoUrls = $('#report-map').data().photoUrls
    var tags = $('#report-map').data().tags

    var reportMapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(lat, lng)
    };

    reportMap = new google.maps.Map(document.getElementById('report-map'), reportMapOptions);

    var currentMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: reportMap,
      title: "Your Report Location",
    })

    var places = $('#report-map').data().nearbyReports;

    for (var i = 0; i < places.length; i++) {
      placeMarker(places[i],photoUrls[i],tags[i]);
    };
  };

  google.maps.event.addDomListener(window, 'load', initializeReport);
  google.maps.event.addDomListener(window, 'load', initialize);

  $(".set-location-form").on("submit", function(event){
    event.preventDefault();
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
        // Here we instantiate a new WebSocketRails instance
        send("new report!");
      });
  });
    function placeMarker(place, photoUrl, tags) {
      var mlat = place.lat;
      var mlng = place.lng;
      var mtype = place.report_type;
      var mname = place.pet_name;
      var manimal = place.animal_type;
      var mid = place.id;
      var muserid = place.user_id;
      var mtags = [];
      for (var i = 0; i < tags.length; i++) {
        mtags[i] = tags[i].name
      }
      if (mtype === "lost") {
            icon = '/images/fuzzfinders_favicon.png'
          } else if (mtype === "found") {
            icon = '/images/FuzzFinders_icon_blue.png'
          };

      if (mid != $('#report-map').data().id) {
        var newMarker = new google.maps.Marker({
          position: new google.maps.LatLng(mlat, mlng),
          map: reportMap,
          title: mname,
          icon: icon,
          animation: google.maps.Animation.DROP
        });
        newMarker.info = new google.maps.InfoWindow({
          content: "<div class='infobox'><a href='/users/"+muserid+"/reports/"+mid+"'><b>"+mname+"</b></a><br>"+manimal+"<br>"+mtags+"<br><img src='"+photoUrl+"' width='50' height='50'></div>"
        });
        google.maps.event.addListener(newMarker, "click", function(){
          newMarker.info.open(reportMap, newMarker)
        })
      };
    }
});
