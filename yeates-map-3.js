window.onload = function () {
  // create basemap from OpenStreetMap
  const basemap = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  });

  $.getJSON("yeates_map_data_3.geojson", function (data) {
    // center map on points in dataset
    const geojson = L.geoJSON(data);
    const map = L.map("my-map").fitBounds(geojson.getBounds());

    // add basemap
    basemap.addTo(map);

    // load in data from Indigenous mapping project
    // TODO: hide this
    const api_key = "INSERT_KEY_HERE";
    const api_url_test = "https://native-land.ca/api/index.php?maps=territories&name=lenape&key=" + api_key;
    const api_url = "https://native-land.ca/api/index.php?maps=territories&name=lenape,shawnee,wyandot-anderdon,cherokee,mohican,munsee-lenape,haudenosauneega-confederacy,oneida,onondaga,cayuga,onondowaga-seneca,tuscarora-3,kiikaapoi-kickapoo,peoria,mohawk,anishinabek-%e1%90%8a%e1%93%82%e1%94%91%e1%93%88%e1%90%af%e1%92%83&key=" + api_key;

    fetch(api_url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);

        L.geoJSON(data, {
          style: function(feature) {
            return {color: feature.properties.color, fillOpacity: .3};
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup("<b>" + feature.properties.Name + "</b>" + 
              "<p>Read more about this territory on <a href='" + feature.properties.description + "' target='_blank'>Native Land Digital.</a></p>");
          },
          // weight: 0,
          stroke: false
        }).addTo(map);
      })
      .catch(error => {
        console.error('Error: ', error);
      });

    // create custom icons for different Indigenous nations, groups of settlers
    const delawareIcon = L.icon({
      iconUrl: "icons/delaware.png",
      iconSize: [35, 35],
    });

    const shawneeIcon = L.icon({
      iconUrl: "icons/shawnee.png",
      iconSize: [35, 35],
    });

    const kickapooIcon = L.icon({
      iconUrl: "icons/kickapoo-new.png",
      iconSize: [50, 50],
    });

    const wyandotIcon = L.icon({
      iconUrl: "icons/wyandot-new.png",
      iconSize: [75, 50],
    });

    const americanIcon = L.icon({
      iconUrl: "icons/american-new.png",
      iconSize: [27.8, 18.5],
    });

    const britishIcon = L.icon({
      iconUrl: "icons/british-new.png",
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
      zIndex: 999,
    };

    // create pane for circle markers
    map.createPane("circleMarkers");
    map.getPane("circleMarkers").style.zIndex = 999;

    // iterate through points, add custom marker and popup
    for (let i = 0; i < data.features.length; i++) {
      // console.log("data object: ");
      // console.log(data.features[i]);

      // set correct icon based on Affiliation_controlled field
      switch(data.features[i].properties.Affiliation_controlled) {
        case "Delaware":
          iconStyle = delawareIcon;
          break;
        case "Shawnee":
          iconStyle = shawneeIcon;
          break;
        case "American":
          iconStyle = americanIcon;
          break;
        case "Kickapoo":
          iconStyle = kickapooIcon;
          break;
        case "Wyandot":
          iconStyle = wyandotIcon;
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

      // add marker and popup to map
      L.geoJSON(data.features[i], {
        pointToLayer: function (feature, latlng) {
          // return styled icon if style is specified; if not, use default
          return iconStyle ? L.marker(latlng, { icon: iconStyle }) : L.marker(latlng);
          // return iconStyle ? L.marker(latlng, { icon: iconStyle }) : L.circleMarker(latlng, geojsonMarkerOptions, {interactive: true, pane: "circleMarkers"}).bringToFront();
        },
        onEachFeature: onEachFeature,
      }).addTo(map);
    }

      // draw lines showing frequent Yeates correspondence
      let yeatesCorrespondenceCoshocton = {
        type: "LineString",
        coordinates: [
          [-75.15000272, 39.94906152],
          [-80.0096864, 40.44099955],
        ],
      }
  
      let yeatesCorrespondencePhiladelphia = {
        type: "LineString",
        coordinates: [
          [-81.8690584, 40.27392223],
          [-80.0096864, 40.44099955],
        ],
      }
  
      L.geoJSON(yeatesCorrespondenceCoshocton, {
        style: function () {
          return {
            color: "red",
            dashArray: "5,10",
          };
        },
      }).addTo(map);
  
      L.geoJSON(yeatesCorrespondencePhiladelphia, {
        style: function () {
          return {
            color: "blue",
            dashArray: "5,10",
          };
        },
      }).addTo(map);

      // draw lines showing journeys taken by Yeates, White Eyes, and Wilson
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
            // dashArray: "5,10",
          };
        },
      }).addTo(map);
  
      // add some points? approximate route around Lake Erie?
      let detroitRoute = {
        type: "LineString",
        coordinates: [
          [-81.8690584, 40.27392223],
          [-83.1504667, 42.19580586],
          [-83.04797034, 42.32757691]
        ],
      };
  
      L.geoJSON(detroitRoute, {
        style: function () {
          return {
            color: "purple",
            // dashArray: "5,10",
          };
        },
      }).addTo(map);
  });
};

/*
wishlist:
better route to Detroit
some kind of visual thing indicating direction of travel/correspondence
change base map to something historic, or more historic-looking

put in Observable

https://native-land.ca/api/index.php?maps=territories&name=lenape
https://native-land.ca/api/index.php?maps=territories&name=shawnee
https://native-land.ca/api/index.php?maps=territories&name=wyandot-anderdon
https://native-land.ca/api/index.php?maps=territories&name=cherokee
https://native-land.ca/api/index.php?maps=territories&name=mohican
https://native-land.ca/api/index.php?maps=territories&name=munsee-lenape

https://native-land.ca/api/index.php?maps=territories&name=haudenosauneega-confederacy
https://native-land.ca/api/index.php?maps=territories&name=oneida
https://native-land.ca/api/index.php?maps=territories&name=onondaga
https://native-land.ca/api/index.php?maps=territories&name=cayuga
https://native-land.ca/api/index.php?maps=territories&name=onondowaga-seneca
https://native-land.ca/api/index.php?maps=territories&name=tuscarora-3

kiikaapoi-kickapoo
peoria
mohawk
anishinabek-ᐊᓂᔑᓈᐯᒃ


territory for Chippewa/Ojibwe = anishinabek

https://native-land.ca/api/index.php?maps=languages&name=nakota,lakota&key=your_api_key

*/
