let ost_Locations = [];
let ost_AmountLoadedImages = 0;

function OstravaImageLoaded() {
	ost_AmountLoadedImages++;
}

function OstravaLoad(canvas) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 7;
	for(let Id = 0; Id < 3; Id++) {
		ost_Locations.push(new Image());
		ost_Locations[Id].onload = OstravaImageLoaded;
	}
	ost_Locations[0].src = "res/studenka/prejezd.jpg";
	ost_Locations[1].src = "res/studenka/namesti.jpg";
	ost_Locations[2].src = "res/map/7.png";
	
	OstravaMap(canvas);
}

function OstravaMap(canvas) {
	if(ost_AmountLoadedImages != 3) {
      	window.setTimeout(ProstejovMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(8);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(pro_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 7\nOstrava", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Ostrava(canvas);
	});
    maparrow.draw(canvas);
}

function Ostrava(canvas) {
	console.log("Ostrava START"+ost_AmountLoadedImages);
}

function OstravaNastupiste(canvas) {

}

function OstravaNadrazi(canvas) {

}
