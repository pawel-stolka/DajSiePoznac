var selectedRow;
(InitMap(geoData[0].Latitude, geoData[0].Longitude))();

// change behavior of "must be a number" validation (for autonumeric text box)
//$.validator.methods.number = function (value, element) {
//    var formattedValue = value.replace('£', '');
//    formattedValue = formattedValue.replace(',', '');
//    var numberRegex = new RegExp(/^(?:\d*\.\d{1,2}|\d+)$/);
//    return this.optional(element) || numberRegex.test(formattedValue);
//};

function GetTableRowIndex() {
    if (!document.getElementsByTagName || !document.createTextNode) return;
    var rows = document.getElementById('tablePoints').getElementsByTagName('tr');//.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function () {

            //alert(this.rowIndex + 2);

            selectedRow = this.rowIndex;
            CenterMap();
            ShowAllPoints();
        }
    }
}

function CenterMap() {
    var geoDataRow = selectedRow - 1;
    var message = "selected: " + geoData[geoDataRow].PlaceName;
    // geoData[0].Latitude
    $("#jsonPlace").html(message);
    $("#posLat").html(geoData[geoDataRow].Latitude);
    $("#posLon").html(geoData[geoDataRow].Longitude);
    
    _zoom = 5;
    InitMap(geoData[geoDataRow].Latitude, geoData[geoDataRow].Longitude);
}

function ShowAllPoints() {
    var lat;
    $.each(geoData, function (index, value) {
        
        var _lat = value.Latitude;
        if (index == 0)
            lat = _lat;
        
        //alert(index + " " + _lat);
    });
}
