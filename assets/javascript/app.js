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

    var destinations = ["Trenton", "Salem, Oregon", "Philadelphia"]

    var frequencies = [25, 3600, 15]

    var initialTimes = ["05:35", "01:39", "05:35"]
  $("#newrow").empty();
  database.ref().on("value", function(snapshot) {
      trains = snapshot.val().trains;
      destinations = snapshot.val().destinations;
      frequencies = snapshot.val().frequencies;
      initialTimes = snapshot.val().initialTimes;

      for (var i = 0; i < trains.length; i++) {
        var a = $("<tr> <th scope='row'>" + trains[i] + "</th><td>" 
        + destinations[i] + "</td><td>" + frequencies[i] + "</td><td>" 
        + initialTimes[i] + "</td></tr>");
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
        initialTimes
    });
    $("#newrow").empty();
    for (var i = 0; i < trains.length; i++) {
        var a = $("<tr> <th scope='row'>" + trains[i] + "</th><td>" 
        + destinations[i] + "</td><td>" + frequencies[i] + "</td><td>" 
        + initialTimes[i] + "</td></tr>");
        $("#newrow").append(a);
    }

})