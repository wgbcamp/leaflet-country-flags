proj4.defs("EPSG:8857", "+proj=eqearth +datum=WGS84 +units=m +no_defs");

// var eqEarth = new L.Proj.CRS("EPSG:8857",
//     "+proj=eqearth +datum=WGS84 +units=m +no_defs",
//     {
//         resolutions: [8192, 4096, 2048, 1024, 512, 256, 128], // customize to your zoom level
//         origin: [-20037508.342789244, 20037508.342789244]     // approximate origin
//     }
// );

var imageHeight = 1464;
var imageWidth = 3326;

var map = L.map('map', {
    crs: L.CRS.Simple,
    center: [imageHeight / 2, imageWidth / 2],
    zoom: 0
});

map.setView([0, 0], 2);

const bounds = [[0, 0], [300, 600]];

// L.imageOverlay('/assets/maps/noBorders.png').addTo(map);

const afghanistanCoords = {
  lon: 66.0,
  lat: 33.0
};

const projection = d3.geoEqualEarth()
  .fitSize([imageWidth, imageHeight], {type: "Sphere"}); // Fit full world to image

const [x, y] = projection([afghanistanCoords.lon, afghanistanCoords.lat]);

L.marker([0, 0], {
  icon: L.icon({
    iconUrl: '/assets/flags/afghanistan.png',
    iconSize: [32, 20], // adjust as needed
    iconAnchor: [16, 10] // center the icon
  })
}).addTo(map);


// L.imageOverlay('/flags')

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);



var geoJson;

var loadGeoJson = async () => {
  var getData = await fetch('/data/originalGeojson.json');
  geoJson = await getData.json();
  console.log(geoJson);
  L.geoJson(geoJson, {
    style: function(feature) {
        return {
            color: "rgb(72, 153, 210)",
            fillColor: "rgb(72, 153, 210)",
            weight: 1,
            fillOpacity: 1
        };

    }
  }).addTo(map);
}

// loadGeoJson();