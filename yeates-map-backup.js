window.onload = function () {
    var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

    $.getJSON("yeates_map_data_1.geojson", function(data) {

        var geojson = L.geoJSON(data);

        console.log("geojson: ");
        console.log(geojson);
        console.log("data: ");
        console.log(data);

        var map = L.map('my-map').fitBounds(geojson.getBounds());

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
            "type": "LineString",
            "coordinates": [
              [
                -76.305833,
                40.037222
              ],
              [
                -76.77535508,
                40.21278954
              ],
              [
                -77.20028457,
                40.20273096
              ],
              [
                -77.52075119,
                40.05259454
              ],
              [
                -80.0096864,
                40.44099955
              ]
            ]
          };

          // frequent correspondence from: Philadelphia, Coshocton
          // fill in actual coordinates
        let yeatesCorrespondence = [{
            "type": "LineString",
            "coordinates": [
              [
                -75.15000272,
                39.94906152
              ], 
              [
                -80.0096864,
                40.44099955
              ]
            ]
        }, {
            "type": "LineString",
            "coordinates": [
              [
                -81.8690584,
                40.27392223
              ], 
              [
                -80.0096864,
                40.44099955
              ]
            ]
        }];

        for (let i = 0; i < yeatesCorrespondence.length; i++) {
          console.log("for loop runs");
          L.geoJSON(yeatesCorrespondence[i],
            {style: function(){
              return { 
                  color: 'red'
              }
            }}
          ).addTo(map);
        }

        L.geoJSON(yeatesRoute,
            {style: function(){
                return { 
                    color: 'green',
                    dashArray: '5,10'
                }
              }}
        ).addTo(map);

        const delawareIcon = {
          iconUrl: 'delaware.png',
          iconSize: [50,50]
        };

        const delawareIcon2 = L.icon({
          iconUrl: 'delaware.png',
          iconSize: [50,50]
      });

        

        // iterates through points and adds only those with a specific affiliation
        // use this to set custom markers
        for (let i = 0; i < data.features.length; i++) {
            console.log("data object: ")
            console.log(data.features[i]);

            if (data.features[i].properties.Affiliation_controlled == "Delaware") {
                console.log("Delaware location");
                pointData = L.geoJSON(data.features[i]);
                console.log("point data: ");
                console.log(pointData);
                L.geoJSON(data.features[i], {icon: delawareIcon2}).addTo(map);
            }
        }

        // adds points with popups
        // L.geoJSON(data, {
        //     onEachFeature: function (feature, layer) {
        //       layer.bindPopup('<b>' + feature.properties.Title + '</b>' + '<p>' + feature.properties.Explanatory_text + '</p>');
        //     }
        //   }).addTo(map);

  });

};

/*
wishlist:
change marker color to show Delaware, British, American locations
change base map to something historic, or more historic-looking
integrate data from Indigenous mapping project

update geojson from current version of spreadsheet- need to add Shippensburg etc

put in Observable
*/