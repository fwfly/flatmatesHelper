/* This js is used to draw html in website */

function drawElement( tag, props, childNodes ){

    let newdom = document.createElement(tag);
    if (props){
      if(typeof(props) == "string"){
        newdom.style.cssText = props;
      }
      else{
        for (key in props){
          newdom.setAttribute(key, props[key]);
        }
      }
    }

    // Get child node
    childs = Array.prototype.slice.call(arguments, 2);
    if (childs){
        for(key in childs){
          let child = childs[key];
          if (typeof(child) == "string"){
            child = document.createTextNode(child);
          }
          newdom.appendChild(child);
        }
    }
    return newdom;
}

function drawHelperContent(data){
  let body = document.getElementsByTagName("BODY")[0];
  let divContentWrapper = document.getElementsByClassName("content-wrapper")[0];
  divContentWrapper.style.width = "80%"

  let domContent = drawElement("div", "width: 20%; float: right; padding-top: 100px;",
    drawElement("h4","padding:1rem; color:#2f3a4a; background:#f5f5f6; text-align: center; margin-top: 0;",
      drawElement("img", {src:"https://flatmates-res.cloudinary.com/image/asset/map-train-22b696ebe96c5caac10dce96760200ed.png",
                          style:"height: 27px;margin-right: 0.5rem;position: relative;top: 8px;width: auto;"}),
      "Distence"),
    drawElement("table", "max-width: 100%;",
      drawElement("tr", null,
        drawElement("td", "text-align: center; font-weight: bold;", "From")
      ),
      drawElement("tr", null,
        drawElement("td", "text-align: center", data.origin)
      ),
      drawElement("tr", null,
        drawElement("td", "text-align: center; font-weight: bold;", "To")
      ),
      drawElement("tr", null,
        drawElement("td", "text-align: center", data.dest)
      ),
      drawElement("tr", null,
        drawElement("td", "text-align: center; font-weight: bold;", "Spend")
      ),
      drawElement("tr", null,
        drawElement("td", "text-align: center", data.duration)
      )
    )
  );

  body.insertBefore(domContent, divContentWrapper);

}
