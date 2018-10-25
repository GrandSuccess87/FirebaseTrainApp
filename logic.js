
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDNtz5iZf6HSKxpZjLGLLbyVysRwawfG3Y",
    authDomain: "trainapp-d2ff9.firebaseapp.com",
    databaseURL: "https://trainapp-d2ff9.firebaseio.com",
    projectId: "trainapp-d2ff9",
    storageBucket: "trainapp-d2ff9.appspot.com",
    messagingSenderId: "157362001473"
  };
  firebase.initializeApp(config);

  var trainDB = firebase.database();

  $("#add-train-btn").on("click", function(){
    var trainName = $("#name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: firstTrain,
      frequency: trainFrequency
    };

    trainDB.ref().push(newTrain);


      // Logs everything to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrain);
      console.log(newTrain.frequency);

      // Alert
      alert("Train successfully added");

      // Clears all of the text-boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");

      // Determine when the next train arrives.
      return false;

  });

  // Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainDB.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  // Store everything pushed to db into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var tFirstTrainTimeConverted = moment(tFirstTrain, "HH:mm");
  console.log("First train time: " + tFirstTrainTimeConverted);
  var tDifference = moment().diff(tFirstTrainTimeConverted, "minutes");
  console.log("Difference in minutes: " + tDifference);
  // time apart remainder
  var tRemainder = tDifference % tFrequency;
  console.log(tRemainder);
  // minutes away until train arrives
  var tMinutesAway = tFrequency - tRemainder;
  console.log("Minutes Away: " + tMinutesAway);
  // next train Arrival
  var tNextTrain = moment().add(tMinutesAway, "minutes").format("hh:mm A");
  console.log("Next train: " + tNextTrain);

  // create a new row to append table fields
  var row = $("<tr>");

  row.append($("<td>").text(tName));
  row.append($("<td>").text(tDestination));
  row.append($("<td>").text(tFrequency));
  row.append($("<td>").text(tNextTrain));
  row.append($("<td>").text(tMinutesAway));

  $("#train-table").append(row);


})
