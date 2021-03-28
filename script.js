(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            h = ((h + 11) % 12 + 1);

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");
        let present = document.getElementById("v1");
        let contactless = document.getElementById("v2");
        let lname = document.getElementById("lname");
        let fname = document.getElementById("fname");

        if (fname.value === "") {

            alert("Palun tee eesnimi korda");

            fname.focus();

            return;


        }
        if (lname.value === "") {

            alert("Palun tee perenimi korda");

            lname.focus();

            return;


        }

        var letters = /^[a-zA-Z]+$/;
        if(!fname.value.match(letters))
        {
            alert("Palun tee eesnimi korda");
            return;
        }
        if(!lname.value.match(letters))
        {
            alert("Palun tee perenimi korda");
            return;
        }

        if(!(document.getElementById('small').checked || document.getElementById('medium').checked)) {
            alert("Palun vali paki suurus");

            return;
        }

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            let price = 0
            switch (linn.value){
                case "tln":
                    price = 0;
                    break;
                case "trt":
                    price = 2.5;
                    break;
                case "nrv":
                    price = 2.5;
                    break;
                case "prn":
                    price = 3;
                    break;

            }
            if (contactless.checked){
                price += 1
            }
            if (present.checked){
                price += 5
            }
            e.innerHTML = price.toString() + " &euro;";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let point1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let point2 = new Microsoft.Maps.Location(
        58.103485097812914, 27.03799860365789
    );
    let centerPoint = new Microsoft.Maps.Location(
        58.257235211543524, 26.826769288801785
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(point1, {
            title: 'Tartu Ülikool'
        });

    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
        title: 'Taevaskoda'
    });

    var infobox = new Microsoft.Maps.Infobox(point1, { title: 'Tartu Ülikool', description: 'Hea koht', visible: false });
    infobox.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin, 'click', function () {
        infobox.setOptions({ visible: true });
    });

    var infobox2 = new Microsoft.Maps.Infobox(point2, { title: 'Taevaskoda', description: 'Ilus koht', visible: false });
    infobox2.setMap(map);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        infobox2.setOptions({ visible: true });
    });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

