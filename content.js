const NEAREST_TRAIN_STATIONS = "Nearest Train Stations";
const NEAREST_BUS_STOPS = "Nearest Bus Stops";

function getNearestStations(){
  var domItems = document.getElementsByClassName("feature");
  var length = domItems.length;
  var idx = 0;
  for( idx = 0; idx < length; idx++ ){
    var item = domItems[idx];
    var context = item.childNodes[0].textContent
    if( NEAREST_TRAIN_STATIONS == context  ){
      var stations = item.getElementsByTagName("td");
      return stations[0].textContent
    }
  }
}

function getNearestBusStops(){
  var domItems = document.getElementsByClassName("feature");
  var length = domItems.length;
  var idx = 0;
  for( idx = 0; idx < length; idx++ ){
    var item = domItems[idx];
    var context = item.childNodes[0].textContent
    if( NEAREST_BUS_STOPS == context  ){
      var busStop = item.getElementsByTagName("td");
      return busStop[0].textContent
    }
  }
}

var nearStations = getNearestStations();
var nearBusStops = getNearestBusStops();

console.log(nearStations);
console.log(nearBusStops);


// find distense by google map api
// Show in console.log
findRoute("Southern cross station", nearStations, drawHelperContent);
