// a sample list of JSON encoded data of places to visit in Liverpool, UK
// you can either make up a JSON list server side, or call it from a controller using JSONResult
var data = [
              { "Id": 1, "PlaceName": "Wrocław, PL", "GeoLong": "51.096192565744154", "GeoLat": "17.038186937570572", "Transport": "bus" },
              { "Id": 2, "PlaceName": "Warszawa, PL", "GeoLong": "52.16598278260749", "GeoLat": "20.96691370010376", "Transport": "plane" },
              { "Id": 3, "PlaceName": "Madrit, ES", "GeoLong": "40.47763939256442", "GeoLat": "-3.57454776763916", "Transport": "bus" },
              { "Id": 4, "PlaceName": "Oviedo, ES", "GeoLong": "43.3674110230068", "GeoLat": "-5.854393243789673", "Transport": "foot" }
];
function CountCenterLong() {
    // not exists so far...
}
// executing the "Initialize" method only when the complete document model has been loaded.
$(document).ready(function () {
    Initialize(0);
});

function UpdateCenter() {
    // also not helpful so far...
    var number = document.getElementById("pointIndex").value;
    Initialize(number);
}

// Where all the fun happens
function Initialize(index) {
    // Google has tweaked their interface somewhat - this tells the api to use that new UI
    google.maps.visualRefresh = true;

    var StartCenter = new google.maps.LatLng(data[index].GeoLong, data[index].GeoLat);

    // These are options that set initial zoom level, where the map is centered globally to start, and the type of map to show
    var mapOptions = {
        zoom: 5,
        center: StartCenter,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    };

    // This makes the div with id "map_canvas" a google map
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var point0 = new google.maps.LatLng(data[0].GeoLong, data[0].GeoLat);
    var point1;
    var lineStyle;
    // Using the JQuery "each" selector to iterate through the JSON list and drop marker pins
    $.each(data, function (i, item) {
        var marker = new google.maps.Marker({
            'position': new google.maps.LatLng(item.GeoLong, item.GeoLat),
            'map': map,
            'title': item.PlaceName
        });

        if (i = 0) {
            point0 = new google.maps.LatLng(item.GeoLong, item.GeoLat);

            switch (item.Transport) {
                case 'bus':
                    lineStyle = '#ff0000';
                    break;
                case 'plane':
                    lineStyle = '#0099ff';
                    break;
                case 'foot':
                    lineStyle = '#66ff33';
                    break;
                default:
                    lineStyle = '#ff0066';
                    break;
            }
        }
        else {
            point1 = new google.maps.LatLng(item.GeoLong, item.GeoLat);

            var points = [point0, point1];

            var polilinia = new google.maps.Polyline({
                map: map,
                path: points,
                strokeColor: lineStyle,
                strokeWeight: 3
            });

            switch (item.Transport) {
                case 'bus':
                    lineStyle = '#ff0000';
                    break;
                case 'plane':
                    lineStyle = '#0099ff';
                    break;
                case 'foot':
                    lineStyle = '#134d00'; //'#00ff00';
                    break;
                default:
                    lineStyle = '#ff9933';
                    break;
            }
            point0 = point1;
        }

        // Make the marker-pin blue!
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')

    })
}