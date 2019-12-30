// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps
$(function () {
  var map = L.map('map', {
    center: [48.7656061, 11.4240384],
    minZoom: 2,
    zoom: 5,
    zoomControl: false,
  });

  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a', 'b', 'c']
  }).addTo(map);

  //if (!$('p.toproject').length) {
  var ProjectButton = L.Control.extend({
    onAdd: function () {
      var container = L.DomUtil.create('div', 'leaflet-bar'),
        button = L.DomUtil.create('a', '', container);
      button.href = "/";
      button.innerHTML = 'Домой';
      button.style.width = 'auto';
      button.style.padding = '0 4px';
      return container;
    }
  });
  map.addControl(new ProjectButton({ position: 'topleft' }));
  //}
  L.control.zoom({ position: 'topleft' }).addTo(map);
  var myURL = jQuery('script[src$="leaf-demo.js"]').attr('src').replace('leaf-demo.js', '');

  var myIcon = L.icon({
    iconUrl: myURL + 'images/pin24.png',
    iconRetinaUrl: myURL + 'images/pin48.png',
    iconSize: [29, 24],
    iconAnchor: [9, 21],
    popupAnchor: [0, -14]
  });

  var markerClusters = L.markerClusterGroup();

  for (var i = 0; i < markers.length; ++i) {
    var popup_text = '';
    for (var j = 0; j < markers[i].pano.length; ++j) {
      popup_text = popup_text +
        //'<br/><a href="http://www.mot63.com/' + markers[i].panos[j].link +'" target="_new">' + markers[i].panos[j].name + '</a>'  ;
        '<li><a href="http://www.mot63.com/' + markers[i].pano[j].link + '" target="_new">' + markers[i].pano[j].name + '</a>';
    }
    if (markers[i].pano.length > 7) {
      var popup =
        //'<br/>' + markers[i].city +
        //'<br/><b>country:</b> ' + markers[i].country +
        //'<br/><iframe src="http://www.mot63.com/flash/Wien/Tourweaver_Project10.html" width="90%" height="90%" align="center" scrolling="no">'
        //'<br/><a href="http://www.mot63.com/' + markers[i].link +'" target="_new">link</a>' 
        markers[i].name +
        '<br/>' + '<ul class="ul2col">' + popup_text + '</ul>'
        ;
      //  marker.bindTooltip("my tooltip text").openTooltip();
    }
    else {
      var popup =
        //'<br/>' + markers[i].city +
        //'<br/><b>country:</b> ' + markers[i].country +
        //'<br/><iframe src="http://www.mot63.com/flash/Wien/Tourweaver_Project10.html" width="90%" height="90%" align="center" scrolling="no">'
        //'<br/><a href="http://www.mot63.com/' + markers[i].link +'" target="_new">link</a>' 
        markers[i].name +
        '<br/>' + '<ul>' + popup_text + '</ul>'
        ;
      //  marker.bindTooltip("my tooltip text").openTooltip();
    }


    var m = L.marker([markers[i].lat, markers[i].lon], { icon: myIcon })
      .bindPopup(popup);

    markerClusters.addLayer(m);
    //..ююm.addTo(map);


  }

  map.addLayer(markerClusters);
});