// a sample list of JSON encoded data of places to visit in Liverpool, UK
// you can either make up a JSON list server side, or call it from a controller using JSONResult
var data = [
              //{ "Id": 1, "PlaceName": "Wrocław, PL", "GeoLong": "51.096192565744154", "GeoLat": "17.038186937570572", "Transport": "bus" },
              //{ "Id": 2, "PlaceName": "Warszawa, PL", "GeoLong": "52.16598278260749", "GeoLat": "20.96691370010376", "Transport": "plane" },
              //{ "Id": 3, "PlaceName": "Madrit, ES", "GeoLong": "40.47763939256442", "GeoLat": "-3.57454776763916", "Transport": "bus" },
              //{ "Id": 4, "PlaceName": "Oviedo, ES", "GeoLong": "43.3674110230068", "GeoLat": "-5.854393243789673", "Transport": "foot" }
];
function CountCenterLong() {
    // not exists so far...
}
// executing the "Initialize" method only when the complete document model has been loaded.
$(document).ready(function () {
    //getAjaxCd();
    //retrieveData();
    Initialize(0);
});

function UpdateCenter( ) {
    // also not helpful so far...
    var number = document.getElementById("pointIndex").value;
    Initialize(number);
}

//function getAjaxCd() {
//    var jqxhr = $.ajax('/forTesting/GetJson')
//        .done(function (data) {
//            var parsedDate = JSON.parse(JSON.stringify(data.Time));// dateTimeReviver);
//            alert("success: " + parsedDate);
//        })
//        .fail(function () {
//            alert("error");
//        })
//        .always(function () {
//            alert("complete");
//        });
//};

function retrieveData() {
    getAjax2();
    //getAjaxData(0);
}

function getAjax2() {
    $.ajax({
        method: "GET",
        url: '/forTesting/GetJson',
        //data: { name: "John", location: "Boston" }
        success: function (data) {
            var parsedDate = JSON.parse(JSON.stringify(data.Time), dateTimeReviver);
            alert(parsedDate); // Now we have a proper Date object
        },
        fail: function () {
            alert("Fail...");
        }
  //.done(function (msg) {
  //    alert("Data Saved: " + msg);
    });
    /*
    $.ajax({
        type: "GET",
        cache: false,
        url: '/forTesting/GetJson',
        success: function (data) {
            var parsedDate = JSON.parse(JSON.stringify(data.Time), dateTimeReviver);
            alert(parsedDate); // Now we have a proper Date object
        }
        
    });*/
}

function getAjaxData(id) {
    var data = { id: id };
    $.get('/forTesting/GetJson',// + id, // url
        data, // parameters for action
        function (response) { // success callback
            // response has teh same properties as the server returnedObject
            //alert(JSON.stringify(response));
            var myJson = response[0];//.PlaceName;
            //$("#table_place").html(JSON.stringify(myJson));
            //alert(myJson.Id);
            $("#ajax_Id").html(myJson.Id);
            $("#ajax_PlaceName").html(myJson.PlaceName);
            $("#ajax_Lat").html(JSON.stringify(myJson.Latitude));
            $("#ajax_Lon").html(JSON.stringify(myJson.Longitude));
            $("#ajax_Transport").html(myJson.Transport);
        },
        'json' // dataType
    );
}

// Where all the fun happens
function Initialize() {
    // Google has tweaked their interface somewhat - this tells the api to use that new UI
    google.maps.visualRefresh = true;

    // new format:
    // [{"Id":1,"PlaceName":"Wrocław","Time":"\/Date(1457814300000)\/","Latitude":51.096192565744154,"Longitude":17.038186937570572,"Altitude":0,"Note":null,"PhotoPath":null,"Transport":"bus"}]

    //if (data.length == 0) // hard-coded starting point
    //    data.push({ "Id": 1, "PlaceName": "Hard coded Wrocław, PL", "Longitude": "51.096192565744154", "Latitude": "17.038186937570572", "Transport": "bus" });

    var localData = JSON.parse(localStorage.getItem('data'));
    console.log("start.local_data: " + local_data);
    $.each(localData, function (key, value) {
        console.log(key + ' = ' + value);
    });

    var local_data = localStorage.getItem("data");
    console.log("end.local_data: " + local_data);

    //console.log(local_data.length);
    //console.log(local_data.Latitude);
    var StartCenter = new google.maps.LatLng(local_data.Longitude, local_data.Latitude);

    // These are options that set initial zoom level, where the map is centered globally to start, and the type of map to show
    var mapOptions = {
        zoom: 5,
        center: StartCenter,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    };

    // This makes the div with id "map_canvas" a google map
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var point0 = new google.maps.LatLng(data.Longitude, data.Latitude);
    var point1;
    var lineStyle;
    // Using the JQuery "each" selector to iterate through the JSON list and drop marker pins
    $.each(data, function (i, item) {
        var marker = new google.maps.Marker({
            'position': new google.maps.LatLng(item.Longitude, item.Latitude),
            'map': map,
            'title': item.PlaceName
        });
        // definitely smell code... will fix it soon
        if (i = 0) {
            point0 = new google.maps.LatLng(item.Longitude, item.Latitude);

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
            point1 = new google.maps.LatLng(item.Longitude, item.Latitude);

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