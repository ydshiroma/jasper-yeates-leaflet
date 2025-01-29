window.onload = function () {
  var basemap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  console.log("test");

  async function fetchGeoJson() {
    const response = await fetch("yeates_map_data_1.geojson");
    const data = await response.json();
    return data;
  }

  var geojson = fetchGeoJson();

  console.log(geojson);

//   $.getJSON("yeates_map_data_1.geojson", function (data) {
//     var geojson = L.geoJson(data, {
//       onEachFeature: function (feature, layer) {
//         layer.bindPopup(
//           "<b>" +
//             feature.properties.Title +
//             "</b>" +
//             "<p>" +
//             feature.properties.Explanatory_text +
//             "</p>"
//         );
//       },
//     });

    var map = L.map("my-map").fitBounds(geojson.getBounds());

    basemap.addTo(map);
    geojson.addTo(map);
//   });
};

/*
wishlist:
draw line between points showing Yeates' journey
change marker color to show Delaware, British, American locations
change base map to something historic, or more historic-looking
integrate data from Indigenous mapping project

markers:
stars on 13 colonies flag
Delaware nation logo
British flag
Moravian church logo
anything for Pluggy's Town or Logstown?
*/
