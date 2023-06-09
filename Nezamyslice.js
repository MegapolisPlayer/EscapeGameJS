let nzm_Locations = [];
let nzm_AmountLoadedImages = 0;

function NezamysliceImageLoaded() {
	nzm_AmountLoadedImages++;
}

function NezamysliceLoad(canvas, calledbysetstate = false) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 3;
	for(let Id = 0; Id < 5; Id++) {
		nzm_Locations.push(new Image());
		nzm_Locations[Id].onload = NezamysliceImageLoaded;
	}
	nzm_Locations[0].src = "res/nezamyslice/nastupiste.jpg";
	nzm_Locations[1].src = "res/nezamyslice/nadrazi.jpg";
	nzm_Locations[2].src = "res/nezamyslice/podnik_venek.jpg";
	nzm_Locations[3].src = "res/nezamyslice/podnik_vnitrek.jpg";
	nzm_Locations[4].src = "res/map/3.png";
	
	if(calledbysetstate !== true) {
		NezamysliceMap(canvas);
	}
}

function NezamysliceMap(canvas) {
	if(nzm_AmountLoadedImages != 5) {
      	window.setTimeout(NezamysliceMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(4);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(nzm_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 3\nNezamyslice", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Nezamyslice(canvas);
	});
    maparrow.draw(canvas);
}

function Nezamyslice(canvas) {
	console.log("Nezamyslice START "+nzm_AmountLoadedImages);
	CheckInstantLoss(canvas);

	canvas.image(nzm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(750, 350, 0.25, canvas);
	traindriver.draw(250, 300, 0.25, canvas);

	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 178, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 180, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 182, 2));
	FirstDialogue.makeBubble(3, TranslatedText[SettingsValues.Language][184].slice(0, -1) + " " + Math.floor(940 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			clearInterval(thisInterval);
			dialogue.end();
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			NezamysliceNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function NezamysliceNastupiste(canvas) {
	console.log("nzm nastupiste");
	localLocationId = 0;
	
	traindriver.append(canvas);
	traindriver.resetEventListeners();
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		NezamysliceNastupisteJob(canvas);
	}, { once: true });
	
	let ArrowToNadrazi = new Arrow(850, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
    	NezamysliceNadrazi(canvas);
	}, { once: true });
	let ArrowToTrain = new Arrow(350, 220, 100, 100, ArrowDirections.Left, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
	if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		if(doesHaveTicket) {
			doesHaveTicket = false;
    		ProstejovLoad(canvas);
		}
		else {
			let dialogue = new Dialogue();
			dialogue.begin(canvas);
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][161]);
			let thisInterval = window.setInterval((dialogue, canvas) => {
				if(dialogue.counter === 1) {
					clearInterval(thisInterval);
					dialogue.end();
					NezamysliceNastupiste(canvas);
				}
			}, 100, dialogue, canvas);
		}
	}, { once: true });

	canvas.image(nzm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(750, 350, 0.25, canvas);
	traindriver.draw(250, 300, 0.25, canvas);
	ArrowToTrain.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function NezamysliceNadrazi(canvas) {
	console.log("nzm nadrazi");
	localLocationId = 1;

	let ArrowToNastupiste = new Arrow(500, 370, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		info.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToPodnikVenek.deleteButton();
    	NezamysliceNastupiste(canvas);
	}, { once: true });
	let ArrowToPodnikVenek = new Arrow(100, 350, 100, 100, ArrowDirections.Left, canvas);
	ArrowToPodnikVenek.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		info.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToPodnikVenek.deleteButton();
    	NezamyslicePodnikVenek(canvas);
	}, { once: true });
	
	canvas.image(nzm_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(250, 140, 0.7, canvas);
	info.draw(750, 140, 0.7, canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToPodnikVenek.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function NezamyslicePodnikVenek(canvas) {
	console.log("nzm podnik venek");
	localLocationId = 2;

	let ArrowToNadrazi = new Arrow(900, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToPodnikVnitrek.deleteButton();
    	NezamysliceNadrazi(canvas);
	}, { once: true });
	let ArrowToPodnikVnitrek = new Arrow(700, 300, 75, 75, ArrowDirections.Left, canvas);
	ArrowToPodnikVnitrek.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToPodnikVnitrek.deleteButton();
    	NezamyslicePodnikVnitrek(canvas);
	}, { once: true });
	
	canvas.image(nzm_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(800, 350, 0.25, canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToPodnikVnitrek.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function NezamyslicePodnikVnitrek(canvas) {
	console.log("nzm podnik vnitrek");
	localLocationId = 3;
	
	schl.append(canvas);
	schl.resetEventListeners();
	schl.button.addEventListener("click", (event) => {
		if(GamePaused) { return; }
		schl.deleteButton();
		ArrowToPodnikVenek.deleteButton();
		NezamyslicePodnikVnitrekJob(canvas);
	});
	
	let ArrowToPodnikVenek = new Arrow(870, 370, 100, 100, ArrowDirections.Up, canvas);
	ArrowToPodnikVenek.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		schl.deleteButton();
		ArrowToPodnikVenek.deleteButton();
    	NezamyslicePodnikVenek(canvas);
	}, { once: true });

	canvas.image(nzm_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(800, 100, 0.85, canvas);
	schl.draw(600, 100, 0.85, canvas);
	ArrowToPodnikVenek.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function NezamyslicePodnikVnitrekJob(canvas) {
	console.log("nzm podnik vnitrek job");
	AllowedToPause = false;
	PauseButton.deleteButton();
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][233]);
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 234, 2));
	dialogue.makeBubble(2, TranslatedText[SettingsValues.Language][236]);
	dialogue.makeChoice(3);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][237]);
				return;
			}
			else {
				dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][238]);
				return;
			}
		}
	}, 100, dialogue);
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 5) {
			dialogue.end();
			if(dialogue.choice_result === 1) {
				HelpedScholar = true;
				DialectTranslationGame(canvas);
				return;
			}
			if(dialogue.choice_result === 0) {
				DialectTranslationGameValues.IsOver = 0;
				return;
			}
		}
		if(DialectTranslationGameValues.IsOver !== -1) {
			clearInterval(thisInterval);
			DialectTranslationGameReset();
			PauseButton.append(canvas);
			AllowedToPause = true;
			ap.playTrack(4);
			NezamyslicePodnikVnitrek(canvas);
		}
	}, 100, dialogue, canvas);
}

function NezamysliceNastupisteJob(canvas) {
	console.log("nzm nastupiste job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 185, 2).slice(0, -1) + " " + Math.floor(940 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 187, 2));
	dialogue.makeChoice(2);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				if(MoneyAmount >= Math.floor(940 * SettingsValues.MoneyCostIncrease)) {
					if(doesHaveTicket) {
						dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][162]);
						return;
					}
					removeMoney(Math.floor(940 * SettingsValues.MoneyCostIncrease));
					doesHaveTicket = true;
					ap.playSFX(5);
					dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][189]);
					return;
				}
				else {
					dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][190]);
					return;
				}
				return;
			}
			else {
				dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][191]);
				return;
			}
		}
	}, 100, dialogue);

	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			clearInterval(thisInterval);
			dialogue.end();
			AllowedToPause = true;	
			NezamysliceNastupiste(canvas);
		}
	}, 100, dialogue, canvas);
}
