let stu_Locations = [];
let stu_AmountLoadedImages = 0;

function StudenkaImageLoaded() {
	stu_AmountLoadedImages++;
}

function StudenkaLoad(canvas, calledbysetstate = false) {
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
	
	if(calledbysetstate !== true) {
		StudenkaCutscene(canvas); //cutscene first, then map
	}
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
		ap.sfx[9].volume = 0.4; //wayy too boosted
		ap.playSFX(9);
		let dialogue = new Dialogue();
		dialogue.begin(canvas);
		dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][219]);
		dialogue.makeBubble(1, TranslatedText[SettingsValues.Language][220]);
		let thisInterval = window.setInterval((dialogue, canvas) => {
			if(dialogue.counter === 2) {
				clearInterval(thisInterval);
				ap.sfx[9].pause();
				canvas.clear("#000000");
				setTimeout(() => {
					dialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 221, 2));
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
	if(stu_AmountLoadedImages != 8) {
      	window.setTimeout(StudenkaMap, 100, canvas); //here kinda redundant, when loading in save required!
		return;
    }
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
	
	let ArrowToNamesti = new Arrow(100, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	StudenkaNamesti(canvas);
	}, { once: true });	
	
	canvas.image(stu_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(100, 300, 0.3, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaNamesti(canvas) {
	console.log("stu namesti");
	localLocationId = 1;
	
	let ArrowToPrejezd = new Arrow(350, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToPrejezd.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToPrejezd.deleteButton();
		ArrowToMost.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToPole.deleteButton();
    	StudenkaPrejezd(canvas);
	}, { once: true });	
	let ArrowToMost = new Arrow(100, 300, 100, 100, ArrowDirections.Left, canvas);
	ArrowToMost.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToPrejezd.deleteButton();
		ArrowToMost.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToPole.deleteButton();
    	StudenkaMost(canvas);
	}, { once: true });	
	let ArrowToNadrazi = new Arrow(800, 300, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToPrejezd.deleteButton();
		ArrowToMost.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToPole.deleteButton();
    	StudenkaNadrazi(canvas);
	}, { once: true });	
	let ArrowToPole = new Arrow(100, 400, 100, 100, ArrowDirections.Left, canvas);
	ArrowToPole.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToPrejezd.deleteButton();
		ArrowToMost.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToPole.deleteButton();
    	StudenkaPole(canvas);
	}, { once: true });	
	
	canvas.image(stu_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(650, 200, 0.5, canvas);
	ArrowToPrejezd.draw(canvas);
	ArrowToMost.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToPole.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaMost(canvas) {
	console.log("stu most");
	localLocationId = 2;

	let PayRespect = new Arrow(400, 300, 100, 100, ArrowDirections.Here, canvas);
	PayRespect.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		PayRespect.deleteButton();
		ArrowToNamesti.deleteButton();
    	StudenkaRespect(canvas);
	}, { once: true });	
	let ArrowToNamesti = new Arrow(800, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		PayRespect.deleteButton();
		ArrowToNamesti.deleteButton();
    	StudenkaNamesti(canvas);
	}, { once: true });	
	
	canvas.image(stu_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(100, 150, 0.6, canvas);
	PayRespect.draw(canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaNadrazi(canvas) {
	console.log("stu nadrazi");
	localLocationId = 3;
	
	let ArrowToNamesti = new Arrow(100, 400, 100, 100, ArrowDirections.Left, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
    	StudenkaNamesti(canvas);
	}, { once: true });	
	let ArrowToNastupiste = new Arrow(900, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
    	StudenkaNastupiste(canvas);
	}, { once: true });		
	
	canvas.image(stu_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(300, 150, 0.7, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNastupiste.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaNastupiste(canvas) {
	console.log("stu nastupiste");
	localLocationId = 4;
	
	let ArrowToTrain = new Arrow(450, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToTrain.deleteButton();
		ArrowToNadrazi.deleteButton();
		//since defense game is scrapped, no need to check for anything!
    	let dialogue = new Dialogue();
		dialogue.begin(canvas);
		dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][224]);
		let thisInterval = window.setInterval((dialogue, canvas) => {
			if(dialogue.counter === 1) {
				clearInterval(thisInterval);
				dialogue.end();
				OstravaLoad(canvas);
			}
		}, 100, dialogue, canvas);
	}, { once: true });	
	let ArrowToNadrazi = new Arrow(350, 300, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToTrain.deleteButton();
		ArrowToNadrazi.deleteButton();
    	StudenkaNadrazi(canvas);
	}, { once: true });	
	
	canvas.image(stu_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(800, 310, 0.3, canvas);
	ArrowToTrain.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaPole(canvas) {
	console.log("stu pole");
	localLocationId = 5;
	
	let ArrowToNamesti = new Arrow(350, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	StudenkaNamesti(canvas);
	}, { once: true });		
	
	canvas.image(stu_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(100, 250, 0.5, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function StudenkaRespect(canvas) {
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, "EC 108 Comenius, 8.8.2008");
	dialogue.makeBubble(1, "R.I.P.");
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.counter === 2) {
			dialogue.end();
			StudenkaMost(canvas);
		}
	}, 100, dialogue);
}
