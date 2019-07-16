var config = {
    apiKey: "AIzaSyABxxJRkSWvL6lNWXigMJBlPmwxHFZh8rg",
    authDomain: "gart-c818d.firebaseapp.com",
    databaseURL: "https://gart-c818d.firebaseio.com",
    projectId: "gart-c818d",
    storageBucket: "",
    messagingSenderId: "1095228649044",
    appId: "1:1095228649044:web:7919ab47e90755ad"
};

firebase.initializeApp(config);
var database = firebase.database();

var trains = ["Trenton Express", "Oregon Trail", "Midnight Carriage"]
var initialTimes = ["22:55", "01:39", "05:35"]
var frequencies = [20, 3600, 15]
var arrivalTimes = []
var minutes = [];
initialize();



var destinations = ["Trenton", "Salem, Oregon", "Philadelphia"]





  
  database.ref().on("value", function(snapshot) {
      trains = snapshot.val().trains;
      destinations = snapshot.val().destinations;
      frequencies = snapshot.val().frequencies;
      initialTimes = snapshot.val().initialTimes;
      arrivalTimes = snapshot.val().arrivalTimes;
      minutes = snapshot.val().minutes;

      initialize();



      $("#newrow").empty();
      for (var i = 0; i < trains.length; i++) {
        var a = $("<tr> <th scope='row'>" + trains[i] + "</th><td>" 
        + destinations[i] + "</td><td>" + frequencies[i] + "</td><td>" 
        + arrivalTimes[i] + "</td><td>" + minutes[i] + "</td></tr>");
        $("#newrow").append(a);
    }




    })

$("#submit").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#tname").val().trim();
    var destination = $("#destin").val().trim();
    var frequency = parseInt($("#frequency").val().trim());
    var initialTime = $("#stime").val().trim();

    trains.push(trainName);
    destinations.push(destination);
    frequencies.push(frequency);
    initialTimes.push(initialTime);

    database.ref().update({
        trains,
        destinations,
        frequencies,
        initialTimes,
        minutes,
        arrivalTimes
    });
    $("#newrow").empty();
    for (var i = 0; i < trains.length; i++) {
        var a = $("<tr> <th scope='row'>" + trains[i] + "</th><td>" 
        + destinations[i] + "</td><td>" + frequencies[i] + "</td><td>" 
        + initialTimes[i] + "</td><td>" + minutes[i] + "</td></tr>");
        $("#newrow").append(a);
    }

})



// var currentTime = moment().format("HH:mm");

// var currentMinutes = moment.duration(currentTime).asMinutes();
// var b = moment.duration("23:30").asMinutes();
// var c = b - a
// console.log(currentTime);
// console.log(currentMinutes);
// console.log(b);
// console.log(c);
// console.log(b.diff(a, "minutes"));
// var converted = moment.utc(moment.duration(b, "minutes").asMilliseconds()).format("HH:mm");
// moment.utc(moment.duration(4500, "seconds").asMilliseconds()).format("HH:mm")
// console.log(converted);

setInterval(function(){ 
        minutes = [];
        arrivalTimes = [];
    for (var i = 0; i < trains.length; i++) {
        var currentTime = moment().format("HH:mm");
        var currentMinutes = moment.duration(currentTime).asMinutes();
        var initialMinutes = moment.duration(initialTimes[i]).asMinutes();

        var arrivalTime = initialMinutes + frequencies[i]
        var arrivalCon = moment.utc(moment.duration(arrivalTime, "minutes").asMilliseconds()).format("HH:mm");
        arrivalTimes.push(arrivalCon);
        // console.log(arrivalCon);
        
        var minutesAway = arrivalTime - currentMinutes

        minutes.push(minutesAway);

        if (minutesAway <= 0 ) {
            var newArrival = arrivalTime + minutes[i]
            arrivalTimes[i] = moment.utc(moment.duration(newArrival, "minutes").asMilliseconds()).format("HH:mm");
            minutes[i] = frequencies[i]
            console.log(minutes[i]);

            

        }
    }

    database.ref().update({
        trains,
        destinations,
        frequencies,
        initialTimes,
        minutes,
        arrivalTimes
    });


}, 1000);

function initialize() {
        minutes = [];
        arrivalTimes = [];
    for (var i = 0; i < trains.length; i++) {
        var currentTime = moment().format("HH:mm");
        var currentMinutes = moment.duration(currentTime).asMinutes();
        var initialMinutes = moment.duration(initialTimes[i]).asMinutes();

        var arrivalTime = initialMinutes + frequencies[i]
        var arrivalCon = moment.utc(moment.duration(arrivalTime, "minutes").asMilliseconds()).format("HH:mm");
        arrivalTimes.push(arrivalCon);
        // console.log(arrivalCon);
        
        var minutesAway = arrivalTime - currentMinutes

        minutes.push(minutesAway);
        // console.log(minutesAway);
        // console.log(currentMinutes);
        // console.log(minutes);
        
        if (minutesAway <= 0 ) {
           var newArrival = arrivalTime + minutes[i]
           arrivalTimes[i] = moment.utc(moment.duration(newArrival, "minutes").asMilliseconds()).format("HH:mm");
           minutes[i] = frequencies[i]
            
        }

}};
