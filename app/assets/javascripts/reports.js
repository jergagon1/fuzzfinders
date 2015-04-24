var posted = false;
var filter = "all";
var radius = "5";
var petFilter = "All";
$(document).ready(function(){
  var dispatcher = new WebSocketRails($('#amber-alert').data('uri'), true)
  function send(message) {
    dispatcher.trigger('amber_alert', message);
  }
  dispatcher.bind('amber_alert', function(data) {
    if ( posted === false) {
      posted = true;
      document.querySelector('#alert-message').innerHTML += "<p>" + data + "</p>";
    }    
  })
  var content;
  function initialize() {
    var mapOptions = {
      zoom: 9
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

    var reportMapOptions = {
      zoom: 9,
      center: new google.maps.LatLng(lat, lng)
    };

    reportMap = new google.maps.Map(document.getElementById('report-map'), reportMapOptions);

    var currentMarker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: reportMap,
      title: "Your Report Location",
    })
    if (radius === "5") {
      var places = $('#report-map').data().nearbyReports[0];
      var photoUrls = $('#report-map').data().photoUrls[0];
      var tags = $('#report-map').data().tags[0];
    } else if (radius === "10") {
      var places = $('#report-map').data().nearbyReports[1];
      var photoUrls = $('#report-map').data().photoUrls[1];
    var tags = $('#report-map').data().tags[1];
    } else if (radius === "25") {
      var places = $('#report-map').data().nearbyReports[2];
      var photoUrls = $('#report-map').data().photoUrls[2];
      var tags = $('#report-map').data().tags[2];
    };

    for (var i = 0; i < places.length; i++) {
      placeMarker(places[i],photoUrls[i],tags[i], filter, petFilter);
    };
  };

  google.maps.event.addDomListener(window, 'load', initializeReport);
  google.maps.event.addDomListener(window, 'load', initialize);

  $(".set-location-form").on("submit", function(event){
    event.preventDefault();
    var link = $(this).attr("action");
    $.ajax({
      url: link,
      type: "put",
      dataType: "JSON",
      data: JSON.stringify({ lat: lat, lng: lng }),
      contentType: "application/json"
    })
    .done(function(response){
          send("New " + response.report_type + " pet report! <a href='" + this.url +"'>"+ response.pet_name+"</a>" );
      });
  });

  $('#all').on("click", function(event){
    event.preventDefault();
    filter = "all";
    initializeReport();
  });
  $('#lost').on("click", function(event){
    event.preventDefault();
    filter = "lost";
    initializeReport();
  });
  $('#found').on("click", function(event){
    event.preventDefault();
    filter = "found";
    initializeReport();
  });
  $('#radius').change(function() {
    radius = $('#radius').val();
    if (radius === "5") {
      $('#5').show();
      $('#10').hide();
      $('#25').hide();
    } else if (radius === "10"){
      $('#5').hide();
      $('#10').show();
      $('#25').hide();
    } else if (radius === "25"){
      $('#5').hide();
      $('#10').hide();
      $('#25').show();
    };
    initializeReport();
  });
  $('#animal_type').change(function() {
    petFilter = $('#animal_type').val();
    if (petFilter === "All") {
      $('.Dog').show()
      $('.Cat').show()
      $('.Reptile').show()
      $('.Bird').show()
      $('.Rodent').show()
      $('.Other').show()
    } else if (petFilter === "Dog") {
      $('.Dog').show()
      $('.Cat').hide()
      $('.Reptile').hide()
      $('.Bird').hide()
      $('.Rodent').hide()
      $('.Other').hide()
    }else if (petFilter === "Cat") {
      $('.Dog').hide()
      $('.Cat').show()
      $('.Reptile').hide()
      $('.Bird').hide()
      $('.Rodent').hide()
      $('.Other').hide()
    }else if (petFilter === "Reptile") {
      $('.Dog').hide()
      $('.Cat').hide()
      $('.Reptile').show()
      $('.Bird').hide()
      $('.Rodent').hide()
      $('.Other').hide()
    }else if (petFilter === "Bird") {
      $('.Dog').hide()
      $('.Cat').hide()
      $('.Reptile').hide()
      $('.Bird').show()
      $('.Rodent').hide()
      $('.Other').hide()
    }else if (petFilter === "Rodent") {
      $('.Dog').hide()
      $('.Cat').hide()
      $('.Reptile').hide()
      $('.Bird').hide()
      $('.Rodent').show()
      $('.Other').hide()
    }else if (petFilter === "Other") {
      $('.Dog').hide()
      $('.Cat').hide()
      $('.Reptile').hide()
      $('.Bird').hide()
      $('.Rodent').hide()
      $('.Other').show()
    }
    initializeReport();
  });

    function placeMarker(place, photoUrl, tags, filter, petFilter) {
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

      if ((mid != $('#report-map').data().id) && (mtype === filter || filter === "all") && (manimal === petFilter || petFilter === "All")) {
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
        });
      };
    };
  })