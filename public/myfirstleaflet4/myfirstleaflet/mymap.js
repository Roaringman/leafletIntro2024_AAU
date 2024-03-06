// create the OSM layer
var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    'Map data © \
              <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
});

var ortho = L.tileLayer.wms("https://www.wms.nrw.de/geobasis/wms_nw_dop?", {
  layers: "nw_dop_rgb",
});

// create the map with the layer
var mymap = L.map("map", {
  center: [50.938056, 6.956944],
  zoom: 13,
  layers: [osm, ortho],
});

// add the scale bar
L.control.scale().addTo(mymap);
