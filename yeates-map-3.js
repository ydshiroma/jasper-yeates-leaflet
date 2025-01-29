window.onload = function () {
  // create basemap from OpenStreetMap
  var basemap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  $.getJSON("yeates_map_data_1.geojson", function (data) {
    var geojson = L.geoJSON(data);

    console.log("geojson: ");
    console.log(geojson);
    console.log("data: ");
    console.log(data);

    // center map on points in dataset
    var map = L.map("my-map").fitBounds(geojson.getBounds());

    // add basemap
    basemap.addTo(map);

    // L.geoJSON(data, {
    //     style: function(feature) {
    //         switch (feature.properties.Affiliation_controlled) {
    //             case 'British': return {color: "#ff0000"};
    //             case 'American': return {color: "#0000ff"};
    //         }
    //     }
    // }).addTo(map);

    // draw lines showing frequent Yeates correspondence
    let yeatesCorrespondence = [
      {
        type: "LineString",
        coordinates: [
          [-75.15000272, 39.94906152],
          [-80.0096864, 40.44099955],
        ],
      },
      {
        type: "LineString",
        coordinates: [
          [-81.8690584, 40.27392223],
          [-80.0096864, 40.44099955],
        ],
      },
    ];

    for (let i = 0; i < yeatesCorrespondence.length; i++) {
      console.log("for loop runs");
      L.geoJSON(yeatesCorrespondence[i], {
        style: function () {
          return {
            color: "red",
          };
        },
      }).addTo(map);
    }

    let yeatesRoute = {
      type: "LineString",
      coordinates: [
        [-76.305833, 40.037222],
        [-76.77535508, 40.21278954],
        [-77.20028457, 40.20273096],
        [-77.52075119, 40.05259454],
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

    // add some points? approximate route around Lake Erie?
    let detroitRoute = {
      type: "LineString",
      coordinates: [
        [-81.8690584, 40.27392223],
        [-83.04797034, 42.32757691]
      ],
    };

    L.geoJSON(detroitRoute, {
      style: function () {
        return {
          color: "purple",
          dashArray: "5,10",
        };
      },
    }).addTo(map);

    const delawareIcon = L.icon({
      iconUrl: "icons/delaware.png",
      iconSize: [30, 30],
    });

    const americanIcon = L.icon({
      iconUrl: "icons/american.png",
      iconSize: [30, 30],
    });

    const britishIcon = L.icon({
      iconUrl: "icons/british.png",
      iconSize: [30, 30],
    });

    const moravianIcon = L.icon({
      iconUrl: "icons/moravian.png",
      iconSize: [30, 30],
    });

    // use for circle markers
    const geojsonMarkerOptions = {
      radius: 8,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };

    // iterates through points, adds custom marker (based on Affiliation_controlled) and popup
    for (let i = 0; i < data.features.length; i++) {
      // console.log("data object: ");
      // console.log(data.features[i]);

      switch(data.features[i].properties.Affiliation_controlled) {
        case "Delaware":
          iconStyle = delawareIcon;
          break;
        case "American":
          iconStyle = americanIcon;
          break;
        case "Moravian":
          iconStyle = moravianIcon;
          break;
        case "British":
          iconStyle = britishIcon;
          break;
        default:
          iconStyle = false;
          break;
      }

      // create popup text
      function onEachFeature(feature, layer) {
        let subtitle = "";
        if (feature.properties.Subtitle) {
          subtitle = "<br>(" + feature.properties.Subtitle + ")";
        }
          layer.bindPopup(
            "<b>" +
              feature.properties.Title +
              "</b>" +
              subtitle +
              "<p>" +
              feature.properties.Explanatory_text +
              "</p>"
          );
        }

      L.geoJSON(data.features[i], {
        pointToLayer: function (feature, latlng) {
          // return styled icon if style is specified; if not, use default
          return iconStyle ? L.marker(latlng, { icon: iconStyle }) : L.marker(latlng);
        },
        onEachFeature: onEachFeature,
      }).addTo(map);
    }
  });
};

/*
wishlist:
better route to Detroit
some kind of visual thing indicating direction of travel/correspondence
change base map to something historic, or more historic-looking
integrate data from Indigenous mapping project

update geojson from current version of spreadsheet- need to add Shippensburg etc

put in Observable

*/
