// ==UserScript==
// @name         OctoSTL
// @description  Octoprint STL viewer   
// @version      1
// @grant        GM.xmlHttpRequest
// @include      http://octopi*
// @require      https://marcelv.net/jquery-1.6.4.min.js
// ==/UserScript==

STOP=false;
setTimeout(Go,800); 
STOP2=false,STOP3=false;
setInterval(Go2,1800); 

function Go2() {
 if(STOP3) return;
 $(".w3-image").each(function(){
  var src=$(this).attr("src");
  if(src.startsWith("Db")) {
   $(this).attr("src","http://localhost:8072/"+src);
   $(this).attr("style","float:left;width:80px");
   STOP2=true;
  }
 });  
 if(STOP2) STOP3=true;
}

function Go() {
 if(STOP) return;
 if($(".machinecode").size()>0) STOP=true;
  
  
 $(".machinecode").each(function(){ 

   var gcodefile = $(this).find(".title").text();   
   var fname=gcodefile.substring(gcodefile.lastIndexOf('/')+1, gcodefile.lastIndexOf('.'));   
   var STL="/media/marcel/4TB/ff/"+fname.substring(0,fname.indexOf('_')) + ".stl";   
   GM.xmlHttpRequest({
    method: "GET",
    context: $(this).attr("id"),
    url: "http://localhost:8072/Ashx/Stl.ashx?name="+encodeURI(STL),
    onload: function (R) {
     var resp = R.responseText;
     console.log(resp);        
     $("#"+R.context).prepend(resp);
    }
   });
   
 });
    
 setTimeout(Go,800); 
}
