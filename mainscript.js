idCurrentProject = -1;
nameproject = "meuprojeto";
movemenususpended = false;
effect = false;
canvas = document.getElementById("canvas");
contexto = canvas.getContext("2d");
pallet = document.getElementById("pallet-canvas");
p_contexto = pallet.getContext("2d");
size = 40;
size_current = size;
size_pallet = 20;

arr_rgb = null;

colors = [];
colorspallet = [];
colorcopied = [0,0,0];

start();

function start(){

	 canvas.height = parseInt(document.getElementById("heightcanvas").value) * size;
	 canvas.width = parseInt(document.getElementById("widthcanvas").value) * size;
	 canvas.style.left = "calc(50% - "+canvas.width/2+"px)";
	 canvas.style.top = "calc(50% - "+canvas.height/2+"px)";
	
	arr_rgb = [];
	
	for(var i=0; i<canvas.height/size; i++){
	   arr_rgb.push([ ]);
	   for(var j=0; j<canvas.width/size; j++)
		arr_rgb[i].push([0,0,0,0]);
	}
	
	createPallet();
	drawPixel();
	
}
function createPallet(){

   red = [255,0,0,1];
   green = [0,255,0,1];
   blue = [0,50,255,1];
   
   cyan = [0,150,255,1];
   yellow = [255,255,0,1];
   magenta = [255,50,255,1];
   white = [255,255,255,0];
   orange = [250,125,0,1];
   purple = [200,0,100,1];
   blue2 = [125,0,250,1];
   colors = [white, red, green, blue, cyan, yellow, magenta, orange, purple, blue2];
	
   drawPallet();

}	


function drawPallet(){

    pallet.height = size_pallet* colors.length
	pallet.width = size_pallet * 10;
	for(var i=0; i< colors.length; i++){
		
        var nred = 0;
		var ngreen = 0;
		var nblue = 0;
		var alfa = colors[i][3];
		colorspallet.push([]);
		for(var j=0; j< 10; j++){
			
			p_contexto.fillStyle = "rgba("+nred+","+ngreen+","+nblue+","+alfa+")";
			p_contexto.fillRect( j*size_pallet , i*size_pallet ,size_pallet , size_pallet );
			
			colorspallet[i].push( [nred, ngreen, nblue, alfa] );
			
			if(nred < colors[i][0])
			   nred+=25;
			if(ngreen < colors[i][1])
			   ngreen+=25;
			if(nblue < colors[i][2])
			   nblue+=25;
			if(alfa < 1)
			   alfa = 1;
		
		}
	}

}

 
function drawPixel(){
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	for(i=0; i< arr_rgb.length; i++){
		for(j=0; j< arr_rgb[i].length; j++){	 
			contexto.fillStyle = "rgba("+arr_rgb[i][j][0]+","+arr_rgb[i][j][1]+","+arr_rgb[i][j][2]+","+arr_rgb[i][j][3]+ ")"; 
			contexto.fillRect( j*size_current, i*size_current,size_current, size_current);
		
		}
	}
}
	
 function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


function resizecanvas(size){
  size_current = 40* size;
  changesize();
}

canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	var posx = parseInt(mousePos.x/size_current);
	var posy = parseInt(mousePos.y/size_current);
 
	drawPixel();
	contexto.strokeStyle = "#ff0";
	contexto.strokeRect(posx*size_current, posy*size_current,size_current, size_current);

}, false);



canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	var posx = parseInt(mousePos.x/size_current);
	var posy = parseInt(mousePos.y/size_current);
    
	arr_rgb[posy][posx] = colorcopied;
	drawPixel();
	console.log(posx, posy);
	

}, false);


pallet.addEventListener('mousemove', function(evt) {

	var mousePos = getMousePos(pallet, evt);
	var posx = parseInt(mousePos.x/size_pallet );
	var posy = parseInt(mousePos.y/size_pallet );

	drawPallet();
	p_contexto.strokeStyle = "#ff0";
	p_contexto.strokeRect(posx*size_pallet , posy*size_pallet ,size_pallet ,size_pallet );

}, false);

pallet.addEventListener('click', function(evt) {
	var mousePos = getMousePos(pallet, evt);
	var posx = parseInt(mousePos.x/size_pallet );
	var posy = parseInt(mousePos.y/size_pallet );
    
	colorcopied = colorspallet[posy][posx];
	console.log("background-color: rgba("+colorcopied+")");
	document.getElementById("layer-currentcolor").style = "background-color: rgba("+colorcopied+")";
	document.getElementById("pallet-canvas").style = "display: none";

}, false);

inpwidthsize = document.getElementById("widthcanvas");
inpheightsize = document.getElementById("heightcanvas");
inpwidthsize.addEventListener("change", changesize);
inpheightsize.addEventListener("change", changesize);


function changesize(evt) {
	
	 canvas.height = parseInt(document.getElementById("heightcanvas").value) * size_current;
	 canvas.width = parseInt(document.getElementById("widthcanvas").value) * size_current;
	 
	 heigth = (document.height !== undefined) ? document.height : document.body.offsetHeight;
	
	/*
	 if(canvas.height <  heigth){
		console.log("ok");
		size_current = size;
	 
	 }else if(size_current != size/2){
		size_current = size/2;
		canvas.height = parseInt(document.getElementById("heightcanvas").value) * size_current ;
		canvas.width = parseInt(document.getElementById("widthcanvas").value) * size_current ;
		console.log("overflow");
	 }
	 */
	 canvas.style.left = "calc(50% - "+canvas.width/2+"px)";
	 canvas.style.top = "calc(50% - "+canvas.height/2+"px)";
	
	if( (canvas.height/size_current) < arr_rgb.length){
		console.log((canvas.height/size_current) , arr_rgb.length, arr_rgb.length - (canvas.height/size_current));
		
		while(arr_rgb.length >  (canvas.height/size_current)){
		   arr_rgb.pop();
		}
		
	}else if( (canvas.height/size_current) > arr_rgb.length){
		for(var i=arr_rgb.length; i< canvas.height/size_current; i++){
			arr_rgb.push([ ]);
			for(var j=0; j < (canvas.width/size_current); j++)
				arr_rgb[i-1].push([0,0,0,0]);
		}
	}
	for(var i=0; i < (canvas.height/size_current); i++){
	
		if( (canvas.width/size_current) > arr_rgb[i].length){   
		    for(var j=arr_rgb[i].length; j < (canvas.width/size_current); j++)
				arr_rgb[i].push([0,0,0,0]);
		
		}else if( (canvas.width/size_current) < arr_rgb[i].length){   
		    while(arr_rgb[i].length > (canvas.width/size_current))
				arr_rgb[i].pop();
		
		}
	}
	
	drawPixel();
	

};


/*OPEN PROJECT*/
document.getElementById("bt-openproject").addEventListener("click", function(){
	document.getElementById("open-project").style = "display: block";
	listProject();
});

//list projects
function listProject(){
	document.getElementById("list-project").innerHTML = "";
	var project = getListProject();
	for (var i =0; i< project.length; i++){	
		var info = getProject(project[i]).split("_");
		document.getElementById("list-project").innerHTML += "<div idproject='"+project[i]+"' class='item-listproject'><span class='title-project'>"+info[0]+"</span> <span class='bt-delete'>delete</span></div>";
	}
	
	setFunctionsList();
	
}

//function of item list
function setFunctionsList(){
	classname = document.getElementsByClassName("item-listproject");
	
	for (var i = 0; i < classname.length; i++) {
		
		classname[i].addEventListener('click', function(evt){
			idCurrentProject = this.getAttribute("idproject");
			nameproject = this.innerHTML;
			document.getElementById("open-project").style = "display: none";
			var proj = getProject(idCurrentProject);
			var info =proj.split("_");
			//OPEN
			if(evt.target.className == "title-project"){
				
				document.getElementById("idtitle-app").innerHTML  = info[0]; 
				document.getElementById("canvas").style.display = "block";
				document.getElementById("menu-suspended").style.display = "block";
				document.getElementById("widthcanvas").value = info[1];
				document.getElementById("heightcanvas").value =info[2];
				arr_rgb = [];
				
				var strarray = info[3].split("@");
				for(var i=0; i< strarray.length; i++){
					var strarray2 = strarray[i].split("#");
					arr_rgb.push([]);
					for(var j=0; j< strarray2.length; j++){
						var values = strarray2[j].split(",");
						console.log(strarray2[j]);
						arr_rgb[i].push([ parseInt(values[0]),parseInt(values[1]),parseInt(values[2]), parseInt(values[3]) ]);
					}
				}
				
				changesize();
				drawPixel();
			
			//DELETE	
			}else if(evt.target.className == "bt-delete"){
				
				deleteProject(idCurrentProject);
				
			}
			
		}, false);
	}
}


document.getElementById("bt-exit-openproject").addEventListener("click", function(){
	document.getElementById("open-project").style = "display: none";
});



/*GERATE CODE*/
document.getElementById("bt-exit-geratecode").addEventListener("click", function(){
	document.getElementById("out-geratecode").style = "display: none";
	document.getElementById("out-code").innerHTML = "";
});


document.getElementById("bt-geratecode").addEventListener("click", showCode);

function showCode(evt){
	document.getElementById("out-code").innerHTML = gerateCode();
	document.getElementById("out-geratecode").style = "display: block";
}



function gerateCode () {
	newpallet = [];
	outtext = "[ <br>";
	
    for(var i=0; i<arr_rgb.length; i++){
		//outtext +="(";
		for(var j=0; j<arr_rgb[i].length; j++){
			//if this pallet is empy, add color
			if(newpallet.length ==0)
				   //is need add position of color in master pallet, not arr_rgb[i,j]	<- but it work too
				   //is need set in outtext the positon 0 (for ref the color in local pallet)
				   newpallet.push( arr_rgb[i][j] );
			else{
				//else verify if color are in pallet
				var inpallet = false;
				for(var l=0; l< newpallet.length; l++){
					if(newpallet[l] == arr_rgb[i][j]){
					   inpallet = true;
					    //is need set in outtext the positon l (for ref the color in local pallet)
					   break;
					 }
				}
				//if not are in pallet, is a new color
				if(!inpallet){
					 //is need set in outtext the positon newpallet.length-1 (for ref the color in local pallet)
					newpallet.push( arr_rgb[i][j] );
				}
			
			}
			   
			outtext += "("+arr_rgb[i][j]+"), ";
			
			
		}
		outtext +="<br>";
	}
	outtext += "]";
	
	//add outtext the pallet
	//outtext += "[";
	//for(var l=0; l< newpallet.length; l++){
	//outtext +=newpallet[l]+","
	//}
	//outtext += "]";

	return outtext;
};

document.getElementById("div-currentcolor").addEventListener("click", function(evt){
	document.getElementById("pallet-canvas").style = "display: block";
});


document.getElementById("head-menu").addEventListener("click", function(evt){
	movemenususpended = true; //!movemenususpended;
	var styleElem = document.getElementById("menu-suspended").style;
	
	if(movemenususpended)
		document.getElementById("menu-suspended").style = "top: "+styleElem .top+"; left: "+styleElem .left+";  border: 2px solid #a30; display: block;" 
});

document.getElementById("body").addEventListener("mousemove", function(evt){
	
	if(movemenususpended)
		document.getElementById("menu-suspended").style = "border: 2px solid #a30; top: "+evt.clientY+"; left: "+evt.clientX+"; display: block";	
});


document.getElementById("body").addEventListener("click", function(evt){
	if((movemenususpended) && (evt.target.id != "head-menu")){
	  var styleElem = document.getElementById("menu-suspended").style;
      movemenususpended = false;	
	  document.getElementById("menu-suspended").style = "top: "+styleElem.top+"; left: "+styleElem.left+"; border: 2px solid #666; display: block";
	 }

});


/*ZOOM*/
document.getElementById("select-zoom").addEventListener("change", function(evt) {
   resizecanvas(evt.target.value);
});

document.getElementById("bt-clearall").addEventListener("click", function(evt){
	
	for(var i=0; i<arr_rgb.length; i++){
	   for(var j=0; j< arr_rgb[i].length; j++)
		arr_rgb[i][j] = [0,0,0,0];
	}
	
	drawPixel();
});

/*EXPORT FILE*/
document.getElementById("bt-exportfile").addEventListener("click",function (evt){
	console.log("o");
	var text = gerateCode().replace(/<br>+/g, '');
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	saveAs(blob, nameproject+".txt");
});

/*SALVE PROJECT*/
document.getElementById("bt-saveproject").addEventListener("click", function(){
	var strarray = "";
	
	if(idCurrentProject!= -1){
		for(var i=0; i< arr_rgb.length; i++){
			if(i>0)
				strarray += "@";
			for(var j=0; j< arr_rgb[i].length; j++){
				if(j>0){
					strarray +="#"+arr_rgb[i][j];
				}else 
					strarray += arr_rgb[i][j];
			}
			
		}
		
		saveProject(idCurrentProject, nameproject+"_"+document.getElementById("widthcanvas").value+"_"+document.getElementById("heightcanvas").value+"_"+strarray);
		
		console.log(strarray );
	}
});


/*SAVE IMAGE*/
document.getElementById("bt-saveimage").addEventListener('click', function() {

	drawPixel();
    var dt = canvas.toDataURL('image/jpeg');
    img = document.getElementById("downloadLnk");
	img.setAttribute("download", nameproject);
	img.href = dt;
	img.click();
}, false);


/*NEW PROJECT*/
document.getElementById("bt-newproject").addEventListener('click', function(){
	document.getElementById("option-project").style.display = "block";
}, false);


document.getElementById("bt-exit-newproject").addEventListener('click', function(){
	document.getElementById("option-project").style.display = "none";
});


/*CREATE PROJECT*/
document.getElementById("bt-createproject").addEventListener('click', function(evt){
	
	nameproject = document.getElementById("name-project").value;
	document.getElementById("idtitle-app").innerHTML = nameproject;
	document.getElementById("option-project").style.display = "none";
	document.getElementById("canvas").style.display = "block";
	document.getElementById("menu-suspended").style.display = "block";
	
	var w = parseInt(document.getElementById("widthproject").value);
	var h = parseInt(document.getElementById("heightproject").value);
	document.getElementById("widthcanvas").value = w;
	document.getElementById("heightcanvas").value = h;
	
	arr_rgb = [];
	
	for(var i=0; i<h; i++){
	   arr_rgb.push([ ]);
	   for(var j=0; j<w; j++)
		arr_rgb[i].push([0,0,0,0]);
	}
	
	canvas.width = w*size_current;
	canvas.height = h*size_current;
	
	var strarray = "";
	
	for(var i=0; i< arr_rgb.length; i++){
		if(i>0)
			strarray += "@";
		for(var j=0; j< arr_rgb[i].length; j++){
			if(j>0){
				strarray +="#"+arr_rgb[i][j];
			}else 
				strarray += arr_rgb[i][j];
		}
	}
			
	 
	idCurrentProject = setNewProject(nameproject+"_"+document.getElementById("widthcanvas").value+"_"+document.getElementById("heightcanvas").value+"_"+strarray );
	
});