let stu_Locations = [];
let stu_AmountLoadedImages = 0;

function StudenkaImageLoaded() {
	stu_AmountLoadedImages++;
}

function StudenkaLoad(canvas) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 6;
	for(let Id = 0; Id < 8; Id++) {
		stu_Locations.push(new Image());
		stu_Locations[Id].onload = StudenkaImageLoaded;
	}
	stu_Locations[0].src = "res/studenka/prejezd.jpg";
	stu_Locations[1].src = "res/studenka/namesti.jpg";
	stu_Locations[2].src = "res/studenka/most.jpg";
	stu_Locations[3].src = "res/studenka/nadrazi.jpg";
	stu_Locations[4].src = "res/studenka/nastupiste.jpg";
	stu_Locations[5].src = "res/studenka/pole.jpg";
	stu_Locations[6].src = "res/map/6.png";
	
	StudenkaMap(canvas);
}

function StudenkaMap(canvas) {
	if(stu_AmountLoadedImages != 7) {
      	window.setTimeout(StudenkaMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(7);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(stu_Locations[6], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+"6\nStudénka", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Studenka(canvas);
	});
    maparrow.draw(canvas);
}

function Studenka(canvas) {
	console.log("Studenka START"+stu_AmountLoadedImages);
}

function StudenkaPrejezd(canvas) {
	console.log("stu prejezd");
}

function StudenkaNamesti(canvas) {
	console.log("stu namesti");
}

function StudenkaMost(canvas) {
	console.log("stu most");
}

function StudenkaNadrazi(canvas) {
	console.log("stu nadrazi");
}

function StudenkaNastupiste(canvas) {
	console.log("stu nastupiste");
}

function StudenkaPole(canvas) {
	console.log("stu pole");
}

function StudenkaDefenseJob(canvas) {
	console.log("stu defense job");
}
