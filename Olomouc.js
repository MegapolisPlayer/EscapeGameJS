let olo_Locations = [];
let olo_AmountLoadedImages = 0;

function OlomoucImageLoaded() {
	olo_AmountLoadedImages++;
}

function OlomoucLoad(canvas) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 5;
	for(let Id = 0; Id < 8; Id++) {
		olo_Locations.push(new Image());
		olo_Locations[Id].onload = OlomoucImageLoaded;
	}
	olo_Locations[0].src = "res/olomouc/nastupiste.jpg";
	olo_Locations[1].src = "res/olomouc/nadrazi.jpg";
	olo_Locations[2].src = "res/olomouc/namesti.jpg";
	olo_Locations[3].src = "res/olomouc/obchod_venek.jpg";
	olo_Locations[4].src = "res/olomouc/obchod_vnitrek.jpg";
	olo_Locations[5].src = "res/olomouc/syrarna.jpg";
	olo_Locations[6].src = "res/olomouc/restaurant.jpg";
	olo_Locations[7].src = "res/map/5.png";
	
	OlomoucMap(canvas);
}

function OlomoucMap(canvas) {
	if(olo_AmountLoadedImages != 8) {
      	window.setTimeout(OlomoucMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(6);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(olo_Locations[7], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 5\nOlomouc", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Olomouc(canvas);
	});
    maparrow.draw(canvas);
}

function Olomouc(canvas) {
	console.log("Olomouc START"+olo_AmountLoadedImages);
}

function OlomoucNastupiste(canvas) {

}

function OlomoucNadrazi(canvas) {

}

function OlomoucNamesti(canvas) {

}

function OlomoucSyrarna(canvas) {

}

function OlomoucObchodVenek(canvas) {

}

function OlomoucObchodVnitrek(canvas) {

}

function OlomoucObchodJob(canvas) {

}

function OlomoucSyrarnaJob(canvas) {

}
