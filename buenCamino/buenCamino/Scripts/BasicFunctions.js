var geoData = [];
var _zoom;

$(function getJsonFromDb() {
    var id = 1;
    _zoom = 5;

    FillArray();

    CheckGeoDataIsFilled();
    
    $("#showJson").click(function () {
        CheckGeoDataIsFilled();
    });

    $("#JsonAlert").click(function () {
        $("#jsonPlace").html(geoData.length);
    });

});

function FillArray() {

    $.getJSON("/forTesting/GiveMeJson", null, function (data) {

        $.each(data, function (index, value) {
            geoData.push(value);
        });
    });
}

function CheckGeoDataIsFilled() {
    if (geoData.length > 0) {
        $("#jsonPlace").html("Pushed to array");
        alert("geoData: " + geoData[0].Latitude + ", " + geoData[0].Longitude);
        InitMap(geoData[0].Latitude, geoData[0].Longitude);
    }
    else {
        $("#jsonPlace").html("Not yet...");
    }
}

function InitMap(startLat, startLon) {
    google.maps.visualRefresh = true;
    var StartCenter = new google.maps.LatLng(startLat, startLon);
    var mapOptions = {
        zoom: _zoom,
        center: StartCenter,
        mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    $.each(geoData, function (i, item) {
        var marker = new google.maps.Marker({
            'position': new google.maps.LatLng(item.Latitude, item.Longitude),
            'map': map,
            'title': item.PlaceName
        });
        var point = new google.maps.LatLng(item.Latitude, item.Longitude);
        var lineStyle = '#ff0000';
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')

    });

    map.addListener('mousemove', function (e) {
        _zoom = 5;
        var myLatLng = e.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        $("#moveLat").html(lat);
        $("#moveLon").html(lng);
    });

    map.addListener('click', function (event) {
        var myLatLng = event.latLng;
        var lat = myLatLng.lat();
        var lng = myLatLng.lng();
        $("#posLat").html(lat);
        $("#posLon").html(lng);
        //clearing
        $("#moveLat").html("");
        $("#moveLon").html("");
        localStorage.setItem("_tempLat", lat);//.replace(".",","));
        localStorage.setItem("_tempLon", lng);
        alert(localStorage.getItem("_tempLat") + " " + localStorage.getItem("_tempLon"));
    })
}

