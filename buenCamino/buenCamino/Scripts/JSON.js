

function getInfo(id) {
    $.ajax({
        url: jsonSrc,// + "?id=" + id,
        success: function (result) {
            //alert(result[0].Latitude);
            //console.log(result[0].PlaceName); 
            data.push(result[0]);
            //console.log(result[0].Latitude);
            //console.log(data.Longitude);
            var dataToStore = JSON.stringify(data);
            console.log("from data: " + data)

            localStorage.setItem('data', dataToStore);
            //console.log("from json.js: " + data);
            //var local_data = localStorage.getItem("data");
            //console.log("from storage: " + local_data.length);
            //console.log(local_data[0]);
            //console.log(local_data[1]);
            //console.log(local_data[2]);
            //console.log(local_data[4]);
            //alert(data[0].Latitude);
        }
    });
};

getInfo(1);

/*
// 2. approach:
var dataService = new function () {
    getAccount = function (id, callback) {
        $.getJSON(jsonSrc,
            { id: id }, function (data) {
                callback(data);
            });
    };
    return {
        getAccount: getAccount
    };
}();
*/

/*
// 1. approach:
var getFromDb = (function() {
    $.get(jsonSrc,
        function (response) {
            alert(response);
        })
    getAjaxData(2);
})();

function getAjaxData(id) {
    var data = { id: id };
    $.get(jsonSrc, // url
        data, // parameters for action
        function (response) { // success callback
            // response has teh same properties as the server returnedObject
            alert(JSON.stringify(response));
        },
        'json' // dataType
    );
}
*/

//var onload = $.getJSON(jsonSrc, function (json) {

//    // Set the variables from the results array
//    var address = json.results[0].formatted_address;
//    console.log('Address : ', address);

//    var latitude = json.results[0].geometry.location.lat;
//    console.log('Latitude : ', latitude);

//    var longitude = json.results[0].geometry.location.lng;
//    console.log('Longitude : ', longitude);

//    // Set the table td text
//    $('#ajax_PlaceName').text(address);
//    $('#ajax_Lat').text(latitude);
//    $('#ajax_Lon').text(longitude);
//});