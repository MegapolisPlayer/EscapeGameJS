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
	stu_Locations[7].src = "res/studenka/cutscene/Bmz245.jpg";
	
	StudenkaCutscene(canvas); //cutscene first, then map
}

function StudenkaCutscene(canvas) {
	if(stu_AmountLoadedImages != 8) {
      	window.setTimeout(StudenkaCutscene, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	ap.playTrack(18);
	canvas.image(stu_Locations[7], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chrs.draw(160, 160, 0.65, canvas);
	
	setTimeout(() => {
		ap.sfx[9].loop = true;
		ap.sfx[9].volume = 0.7; //wayy too boosted
		ap.playSFX(9);
		let dialogue = new Dialogue();
		dialogue.begin(canvas);
		dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][205]);
		dialogue.makeBubble(1, TranslatedText[SettingsValues.Language][206]);
		let thisInterval = window.setInterval((dialogue, canvas) => {
			if(dialogue.counter === 2) {
				clearInterval(thisInterval);
				ap.sfx[9].pause();
				canvas.clear("#000000");
				setTimeout(() => {
					canvas.image(stu_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
					dialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 207, 2));
					let thisInterval = window.setInterval((dialogue, canvas) => {
						if(dialogue.counter === 3) {
							clearInterval(thisInterval);
							dialogue.end();
							StudenkaMap(canvas);
						}
					}, 100, dialogue, canvas);
				}, 2500);
			}
		}, 100, dialogue, canvas);
	}, 3000);
}

function StudenkaMap(canvas) {
	//map scene
	ap.playTrack(7);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(stu_Locations[6], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 5\nStudénka", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		PauseButton.append(canvas);
		AllowedToPause = true;
		timerUnpause();	
		StudenkaPrejezd(canvas);
	});
    maparrow.draw(canvas);
}

function StudenkaPrejezd(canvas) {
	console.log("stu prejezd");
	localLocationId = 0;
	canvas.image(stu_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaNamesti(canvas) {
	console.log("stu namesti");
	localLocationId = 1;
	canvas.image(stu_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaMost(canvas) {
	console.log("stu most");
	localLocationId = 2;
	canvas.image(stu_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaNadrazi(canvas) {
	console.log("stu nadrazi");
	localLocationId = 3;
	canvas.image(stu_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaNastupiste(canvas) {
	console.log("stu nastupiste");
	localLocationId = 4;
	canvas.image(stu_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaPole(canvas) {
	console.log("stu pole");
	localLocationId = 5;
	canvas.image(stu_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
}

function StudenkaDefenseJob(canvas) {
	console.log("stu defense job");
}

function StudenkaNastupisteJob(canvas) {

}
