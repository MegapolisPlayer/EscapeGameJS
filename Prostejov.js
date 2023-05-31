let pro_Locations = [];
let pro_AmountLoadedImages = 0;

function ProstejovImageLoaded() {
	pro_AmountLoadedImages++;
}

function ProstejovLoad(canvas) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 4;
	for(let Id = 0; Id < 5; Id++) {
		pro_Locations.push(new Image());
		pro_Locations[Id].onload = ProstejovImageLoaded;
	}
	pro_Locations[0].src = "res/prostejov/nastupiste.jpg";
	pro_Locations[1].src = "res/prostejov/nadrazi.jpg";
	pro_Locations[2].src = "res/prostejov/namesti.jpg";
	pro_Locations[3].src = "res/prostejov/obchod.jpg";
	pro_Locations[4].src = "res/prostejov/cafe.jpg";
	pro_Locations[5].src = "res/map/4.png";
	
	ProstejovMap(canvas);
}

function ProstejovMap(canvas) {
	if(pro_AmountLoadedImages != 6) {
      	window.setTimeout(ProstejovMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(5);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(pro_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 4\nProstějov", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Prostejov(canvas);
	});
    maparrow.draw(canvas);
}

function Prostejov(canvas) {
	console.log("Prostejov START "+pro_AmountLoadedImages);
	CheckInstantLoss(canvas);
}

function ProstejovNastupiste(canvas) {
	console.log("pro nastupiste");
}

function ProstejovNadrazi(canvas) {
	console.log("pro nadrazi");
}

function ProstejovNamesti(canvas) {
	console.log("pro namesti");
}

function ProstejovCafe(canvas) {
	console.log("pro cafe");
}

function ProstejovObchod(canvas) {
	console.log("pro obchod");
}

function ProstejovCafeWaiterJob(canvas) {
	console.log("nzm waiter job");
}

function ProstejovObchodJob(canvas) {
	console.log("nzm obchod job");
}


