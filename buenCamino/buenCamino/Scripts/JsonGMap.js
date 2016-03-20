var geoData = [];
var _zoom;

$(function getJsonFromDb() {
    var id = 1;
    _zoom = 5;

    FillArray();

    $("#btnJson").click(function () {
        
        //TryToInit();
    });

    $("#showJson").click(function () {
        CheckGeoDataIsFilled();
        
    });

    $("#JsonAlert").click(function () {
        $("#jsonPlace").html(geoData.length);
    });

    (GetTableRowIndex());

});

function TryToInit()
{
    if (geoData.length > 0) {
        $("#jsonPlace").html("Data available!");
        InitMap(geoData[0].Latitude, geoData[0].Longitude);
    }
    else {
        while (geoData.length == 0) {
            $("#jsonPlace").html("Not yet...");
        }
        $("#jsonPlace").html("Data available!");
        InitMap(geoData[0].Latitude, geoData[0].Longitude);
        //TryToInit();
    }

}
//alert(geoData[1]);

function CheckGeoDataIsFilled() {
    if (geoData.length > 0) {
        $("#jsonPlace").html("Pushed to array");
        InitMap(geoData[0].Latitude, geoData[0].Longitude);
    }
    else {
        $("#jsonPlace").html("Not yet...");
    }
}

function FillArray() {
    
    $.getJSON("/forTesting/GiveMeJson", null, function (data) {

        $.each(data, function (index, value) {
            geoData.push(value);
        });
    });
    
    //TryToInit();
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
        //var pos = e.LatLng.lat();
        //alert(pos);
        //$("#posLat").text(pos);
        //placeMarkerAndPanTo(e.latLng, map);
        //map.panTo(e.latLng);
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

    //map.addListener('mousemove', function (e) {
    //    var pos = e.LatLng.lat();
    //    //alert(pos);
    //    $("#posLat").text(pos);
    //    //placeMarkerAndPanTo(e.latLng, map);
    //    //map.panTo(e.latLng);
    //});

    //map.addListener('click', function (e) {
    //    //placeMarkerAndPanTo(e.latLng, map);
    //    map.panTo(e.latLng);
    //});

    //function placeMarkerAndPanTo(latLng, map) {
    //    var marker = new google.maps.Marker({
    //        position: latLng,
    //        map: map
    //    });
    //    map.panTo(latLng);
    //}
}

function ShowGeoData() {
    var points;

    //$.each(geoData, function () {
    //    $.each(this, function (name, value) {
    //        if (name == "PlaceName")
    //            $("#jsonPlace").html("<p>" + value + "<br/></p>");
    //        if (name == "Latitude")
    //            $("#jsonPlace").html("<p>" + value + "<br/></p>");
    //        if (name == "Longitude")
    //            $("#jsonPlace").html("<p>" + value + "<br/></p>");
    //        console.log(name + '=' + value);
    //    });
    //});

 //   var json = [
 //{ 'red': '#f00' },
 //{ 'green': '#0f0' },
 //{ 'blue': '#00f' }
 //   ];

    //$.each(json, function () {
    //    $.each(this, function (name, value) {
    //        console.log(name + '=' + value);
    //    });
    //});

    $.each(geoData, function (i, item) {

        var placeInHtml = document.getElementById("jsonPlace");
        placeInHtml.innerHTML += "<p>" + item.PlaceName + "</p>";
        //$("#jsonPlace").html("<p>" + item.PlaceName + "</p>");
        //$.each(value, function (index, value) {
        //    console.log($(this));
        //});

        //for (var item in geoData) {
        //    console.log(geoData[item]);
        //    //sum += obj[item];
        //}

        //$.each(index, function () {
        //    $("#jsonPlace").html("<p>" + value + "<br/></p>");
        //});
        //points += value;
        //console.log(value);
        //$("#jsonPlace").html("<p>" + value + "<br/></p>");
    });
     
    
}

//$(function getJsonFromDb() {
//    var id = 1;
//    $("#btnJson").click(function () {
//        //alert("sdgf");
//        //$.getJSON("/forTesting/GetJson2?id=1", null, function (data) {
//        $.getJSON("/forTesting/GiveMeJson", null, function (data) {

//            var entry = "<p>Id: " + data[id].Id + "</br>Name:" + data[id].PlaceName + "</br>Latitude: " + data[id].Latitude + "</br>Latitude: " + data[id].Longitude + "</p>";
//            console.log(data[id].PlaceName);
//            geoData.push(data[id]);
//            alert(geoData[0].PlaceName);
//            $("#jsonPlace").html(entry);
//        });
//    });
//});
