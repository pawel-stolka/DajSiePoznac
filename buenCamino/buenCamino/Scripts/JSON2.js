var data = [];


$(function getJsonFromDb() {
    var id = 1;
    $("#btnJson").click(function () {
        //alert("sdgf");
        //$.getJSON("/forTesting/GetJson2?id=1", null, function (data) {
        $.getJSON("/forTesting/GiveMeJson", null, function (data) {

            var entry = "<p>Id: " + data[id].Id + "</br>Name:" + data[id].PlaceName + "</br>Latitude: " + data[id].Latitude + "</br>Latitude: " + data[id].Longitude + "</p>";
            $("#jsonPlace").html(entry);
        });
    });
});

//$(function () {
//    $("#btnJson").click(function () {
//        //alert("sdgf");
//        //$.getJSON("/forTesting/GetJson2?id=1", null, function (data) {
//        $.getJSON("/forTesting/GiveMeJson", null, function (data) {
            
//            var entry = "<p>Id: " + data[0].Id + "</br>Name:" + data[0].PlaceName + "</br>Latitude: " + data[1].Latitude + "</br>Latitude: " + data[1].Longitude + "</p>";
//            $("#jsonPlace").html(entry);
//        });
//    });
//});


function GetThisJson() {
    var jsonObj;
    $.getJSON("/forTesting/GetJson", null, function (data) {
        jsonObj = {
            PlaceName: data.PlaceName,
            Latitude: data.Latitude,
            Longitude: data.Longitude
        };
        alert(data.PlaceName);
        alert(jsonObj.PlaceName);
        //var entry = "<p>Name: " + data.PlaceName + "</br>Latitude: " + data.Latitude + "</br>Latitude: " + data.Longitude + "</p>";
        //$("#jsonPlace").html(entry);
    });
    return jsonObj;
}

