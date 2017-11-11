const URL_ROOT = "https://maps.googleapis.com/maps/api/directions/json?"

class GoogleMapApi {

  googleMapPlaceSearch(place){

    var placeItems = place.split("#");
    var place = placeItems[0].trim();
    place = place.split(" ").join("+");

    const API_PLACE_ROOT = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
    const url = `${API_PLACE_ROOT}query=${place}+in+melbourn&key=${API_KEY}`;

/*    var gMapReq = new XMLHttpRequest();
    gMapReq.open("GET", url);

    gMapReq.onload = (oEvent) => {
      var resObj = JSON.parse(oEvent.target.response);
      console.log(resObj.results[0].name)
      return;
    }

    gMapReq.send()*/

    return encodeURI(url)

  }

  googleMapfindRoute(origin, dest){

    // White space will cause API error, we remove it.
    var origin = origin.split(" ").join("+");
    var destItems = dest.split("#");
    var dest = destItems[0].trim();
    dest = dest.split(" ").join("+");

    const urlStr = `${URL_ROOT}origin=${origin}&destination=${dest}&mode=transit&language=en`;
    const url = encodeURI(urlStr) + "&key="+API_KEY;

    return url

    /*var gMapReq = new XMLHttpRequest();
    gMapReq.open("GET", url);

    gMapReq.onload = (oEvent) => {
      var resObj = JSON.parse(oEvent.target.response);
      alert(resObj.routes[0].legs[0].duration.text);
      return;
    }

    gMapReq.send()*/
  }

  googleMapDistancematrix(origin, dest){
    const API_MATRIX_ROOT = "https://maps.googleapis.com/maps/api/distancematrix/json?";

    var gMapReq = new XMLHttpRequest();
    gMapReq.addEventListener("load", requestComplete);

    const url = `${API_MATRIX_ROOT}origins=${origin}&destinations=${dest}&mode=transit&language=en&key=&{API_KEY}`
    const url = URL_ROOT + "origins=" + origin + "&destinations=" + dest +"&mode=transit" +  "&key=" + API_KEY;
    gMapReq.open("GET", url);
    gMapReq.send()

  }

}

function findRoute(origin, dest, callback){

  // promise
  let request = obj =>{
    return new Promise((resolve, reject)=>{
      let req = new XMLHttpRequest();
      req.open("GET", obj.url);
      req.onload = (oEvent)=>{
        if(req.status == 200){
            resolve(req.response);
        } else {
            reject(req.statusText);
        }
      }
      req.send()
    });
  }

  console.log("findRoute: " + origin + ", " + dest);
  gApiReq = new GoogleMapApi()

  // get origin name
  request({url: gApiReq.googleMapPlaceSearch(origin) })
    .then( data=>{
      let resObj = JSON.parse(data);
      origin = resObj.results[0].name + resObj.results[0].formatted_address
      console.log(origin);

    // Get dest name
    request({url: gApiReq.googleMapPlaceSearch(dest) })
      .then( data=>{

        let resObj = JSON.parse(data);
        dest = resObj.results[0].name + resObj.results[0].formatted_address
        console.log(dest);

        // Get route result
        request({url: gApiReq.googleMapfindRoute(origin, dest)})
        .then( data => {
          var resObj = JSON.parse(data);

          let duration = resObj.routes[0].legs[0].duration.text;
          callback( {
              origin: origin,
              dest:dest,
              duration : duration} );
        });
    });
  });
}
