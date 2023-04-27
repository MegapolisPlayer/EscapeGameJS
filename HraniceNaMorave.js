let Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvasobj) {
	for(let Id = 0; Id < 5; Id++) {
		Locations.push(new Image());
		Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	Locations[0].src = "res/hnm/domov.png";
	Locations[1].src = "res/hnm/namesti.png";
	Locations[2].src = "res/hnm/nadrazi.png";
	Locations[3].src = "res/hnm/restaurace.png";
	Locations[4].src = "res/hnm/nastupiste.png";
	HraniceNaMorave(canvasobj);
}

function HraniceNaMorave(canvasobj) {
	if(hnm_AmountLoadedImages != 5) {
      	window.setTimeout(HraniceNaMorave, 100, canvasobj); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Hranice na Morave START"+hnm_AmountLoadedImages);
	HraniceNaMoraveDomov(canvasobj);
}

function HraniceNaMoraveDomov(canvasobj) {
	canvasobj.clear("purple");
	canvasobj.image(Locations[0], 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	dialogueMakeBox(canvasobj);
	let ArrowToNamesti = new Arrow(700, 400, 100, 100, ArrowDirections.Right, "HraniceNaMoraveNamesti(canvasobj)", canvasobj);
	myarrow1.draw(cvs);
}
function HraniceNaMoraveNamesti(canvasobj) {
	canvasobj.clear("purple");
	canvasobj.image(Locations[1], 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
}
function HraniceNaMoraveNadrazi(canvasobj) {
	canvasobj.clear("purple");
	canvasobj.image(Locations[2], 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
}
function HraniceNaMoraveRestaurace(canvasobj) {
	canvasobj.clear("purple");
	canvasobj.image(Locations[3], 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
}
function HraniceNaMoraveNastupiste(canvasobj) {
	canvasobj.clear("purple");
	canvasobj.image(Locations[4], 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
}

