const URL_ROOT = "https://maps.googleapis.com/maps/api/directions/json?"

function requestComplete(oEvent){

    var resObj = JSON.parse(oEvent.target.response);
    alert(resObj.routes[0].legs[0].duration.text);
    return;
}


function googleMapPlaceSearch(place){

  const API_PLACE_ROOT = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
  const url = `${API_PLACE_ROOT}query=${place}+in+melbourn&key=${API_KEY}`;
  console.log(url);
}

function googleMapfindRoute(origin, dest){

  // White space will cause API error, we remove it.
  origin = origin.split(" ").join("+");
  destItems = dest.split("#");
  dest = destItems[0].trim();
  dest = dest.split(" ").join("+");

  //googleMapPlaceSearch(origin);
  //googleMapPlaceSearch(dest);

  const urlStr = `${URL_ROOT}origin=${origin}&destination=${dest}&mode=transit&key=${API_KEY}`;
  const url = encodeURI(urlStr);

  var gMapReq = new XMLHttpRequest();
  gMapReq.addEventListener("load", requestComplete);
  gMapReq.open("GET", url);
  gMapReq.send()


}

function googleMapDistancematrix(origin, dest){
  const API_MATRIX_ROOT = "https://maps.googleapis.com/maps/api/distancematrix/json?";

  var gMapReq = new XMLHttpRequest();
  gMapReq.addEventListener("load", requestComplete);

  const url = `${API_MATRIX_ROOT}origins=${origin}&destinations=${dest}&mode=transit&key=&{API_KEY}`
  const url = URL_ROOT + "origins=" + origin + "&destinations=" + dest +"&mode=transit" +  "&key=" + API_KEY;
  gMapReq.open("GET", url);
  gMapReq.send()

}

