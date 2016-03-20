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

function FillArray() {

    $.getJSON("/forTesting/GiveMeJson", null, function (data) {

        $.each(data, function (index, value) {
            geoData.push(value);
        });
    });

    //TryToInit();
}