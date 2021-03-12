// ==UserScript==
// @name         OctoSTL en meer
// @description  Octoprint STL viewer   
// @version      1.2
// @grant        GM.xmlHttpRequest
// @include      http://octopi*
// @include      https://octopi*
// @require      https://marcelv.net/jquery-1.6.4.min.js
// ==/UserScript==

// Config
// Alle mapjes waar ik mijn STL's wel eens in zet
var MAPJES = [
  "/media/marcel/4TB/Proj/Wachtrij/",
  "/media/marcel/4TB/ff/",
];
// Link naar MijnProjectensite die een STL-omzetter heeft
var MIJNPROJECTEN = "http://localhost:8072/";
// Einde config



STOP=false;
setTimeout(Go,800); 
STOP2=false,STOP3=false;
setInterval(Go2,1800); 

// Alerts van octopi hiden
setInterval(function(){
 $(".ui-pnotify").hide();
},8000);


function Go2() {  
 $("#sidebar").removeClass("span4").addClass("span6");
 $(".tabbable").removeClass("span8").addClass("span6");
  
 $("#files .entry").attr("style","height:120px");
 $(".back").removeAttr("style");
  
  
 if(STOP3) return;
 $(".w3-image").each(function(){
  var src=$(this).attr("src");
  if(src.startsWith("Db")) {
   $(this).attr("src",MIJNPROJECTEN+src);
   $(this).attr("style","float:left;width:100px");
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
   for(var i=0; i<MAPJES.length; i++) {
    var STL=MAPJES[i]+fname.substring(0,fname.indexOf('_')) + ".stl";   
    GM.xmlHttpRequest({
     method: "GET",
     context: $(this).attr("id"),
     url: MIJNPROJECTEN+"Ashx/Stl.ashx?name="+encodeURI(STL),
     onload: function (R) {
      var resp = R.responseText;     
      console.log(resp);        
      if(resp.indexOf("ERROR")<0) 
       $("#"+R.context).prepend(resp);
     }
    });
   }
   
 });
    
 setTimeout(Go,800); 
}
