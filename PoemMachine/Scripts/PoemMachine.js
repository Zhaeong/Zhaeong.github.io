window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

   

  canvas.onmousedown = canvasClick;
};

function canvasClick(e){

}


function genPoem(){
	context.fillStyle = "blue";
  	context.font = "bold 16px Arial";
 	context.fillText("Still in progress", 100, 100); 
}