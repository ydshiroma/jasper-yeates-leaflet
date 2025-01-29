// same as 3 but loads in json differently
// this doesn't work because require doesn't work in the browser!

window.onload = function () {
  var basemap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  const data = require("yeates_map_data_1.geojson");

  var geojson = L.geoJSON(data);

  console.log("geojson: ");
  console.log(geojson);
  console.log("data: ");
  console.log(data);

  var map = L.map("my-map").fitBounds(geojson.getBounds());

  basemap.addTo(map);

  // L.geoJSON(data, {
  //     style: function(feature) {
  //         switch (feature.properties.Affiliation_controlled) {
  //             case 'British': return {color: "#ff0000"};
  //             case 'American': return {color: "#0000ff"};
  //         }
  //     }
  // }).addTo(map);

  let yeatesRoute = {
    type: "LineString",
    coordinates: [
      [-76.305833, 40.037222],
      [-76.77535508, 40.21278954],
      [-77.20028457, 40.20273096],
      [-80.0096864, 40.44099955],
    ],
  };

  L.geoJSON(yeatesRoute, {
    style: function () {
      return {
        color: "green",
        dashArray: "5,10",
      };
    },
  }).addTo(map);

  // iterates through points and adds only those with a specific affiliation
  // use this to set custom markers
  // for (let i = 0; i < data.features.length; i++) {
  //     console.log("data object: ")
  //     console.log(data.features[i]);

  //     if (data.features[i].properties.Affiliation_controlled == "British") {
  //         console.log("British detected");
  //         L.geoJSON(data.features[i]).addTo(map);
  //     }
  // }

  // adds points with popups
  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<b>" +
          feature.properties.Title +
          "</b>" +
          "<p>" +
          feature.properties.Explanatory_text +
          "</p>"
      );
    },
  }).addTo(map);
};

/*
wishlist:
draw line between points showing Yeates' journey
change marker color to show Delaware, British, American locations
change base map to something historic, or more historic-looking
integrate data from Indigenous mapping project

put in Observable
*/
