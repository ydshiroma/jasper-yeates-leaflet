window.onload = function () {
    // var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	// 	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	// });

    // L.mapbox.accessToken = 'pk.eyJ1IjoieXNoaXJvbWEiLCJhIjoiY202ODF1MnZnMDhkNDJucHZuZnNnZmw3YiJ9.TS3sRDtZrfbK-WoqfvRPrQ'

    // var basemap = L.tileLayer('mapbox://styles/yshiroma/cm681wv3600se01s221n368e7', {
    //     attribution: '<a href="https://www.mapbox.com/tos/">Mapbox</a>'
    //   });

      var basemap = L.tileLayer('https://api.mapbox.com/styles/v1/ydshiroma/cm681wv3600se01s221n368e7/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXNoaXJvbWEiLCJhIjoiY202ODF1MnZnMDhkNDJucHZuZnNnZmw3YiJ9.TS3sRDtZrfbK-WoqfvRPrQ', {
        attribution: '<a href="https://www.mapbox.com/tos/">Mapbox</a>'
      });

    // mapboxgl.accessToken = 'pk.eyJ1IjoieXNoaXJvbWEiLCJhIjoiY202ODF1MnZnMDhkNDJucHZuZnNnZmw3YiJ9.TS3sRDtZrfbK-WoqfvRPrQ';
    // const basemap = new mapboxgl.Map({
    //     container: 'map',
    //     style: 'mapbox://styles/mapbox/streets-v9',
    //     projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    //     zoom: 1,
    //     center: [30, 15]
    // });

    $.getJSON("census.geojson", function(data) {

    var geojson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.Area_Name + '<p><b>2001 Population: </b>' + feature.properties.Pop_2001 + '</p');
      }
    });

    var map = L.map('my-map')
    // set bounds based on location of points
    .fitBounds(geojson.getBounds());
    // set bounds manually
//    .setView([0,30], 5);

    basemap.addTo(map);
    geojson.addTo(map);
  });

};