var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    'Map data © \
          <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
});

var ortho = L.tileLayer.wms("https://www.wms.nrw.de/geobasis/wms_nw_dop?", {
  layers: "nw_dop_rgb",
});

//This function is asynchronous. Notice the async keyword in the function definition and the await keyword before the
let getData = async function () {
  const geodata = await fetch(
    "http://localhost:3000/myfirstleaflet7/myfirstleaflet/counties.geojson"
  );
  const counties = geodata.json();
  return counties;
};

const createMap = function () {
  var mymap = L.map("map", {
    center: [50.938056, 6.956944],
    zoom: 13,
    layers: [osm, ortho], // add it here
  });

  L.control.scale().addTo(mymap);

  //This function call is asynchronous - it returns a javascript promise.
  //We must wait for the information to be returned from the server before we can work with it.
  getData().then((countyData) => {
    let geojsonCountyData = L.geoJson(countyData, {
      style: { color: "#ff7800", weight: 5, opacity: 0.65 },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.GN);
      },
    });

    mymap.addLayer(geojsonCountyData);
  });
};
createMap();
