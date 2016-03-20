var geoData = [];

(function FillArray() {

    $.getJSON("/forTesting/GiveMeJson", null, function (data) {

        $.each(data, function (index, value) {
            geoData.push(value);
        });
        
    });
    //alert("Array full");
    
    //TryToInit();
})();