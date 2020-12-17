// create DOM element for the marker
var el = document.createElement('div');
el.id = 'marker';
el.className = grade === "F" ? "red" : "green"
 
// create the marker
new mapboxgl.Marker(el)
.setLngLat(monument)
.setPopup(popup) // sets a popup on this marker
.addTo(map);