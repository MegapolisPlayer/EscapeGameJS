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
	CheckInstantLoss(canvas);

	canvas.image(olo_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(750, 150, 0.33, canvas);
	traindriver.draw(600, 130, 0.33, canvas);

	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 192, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 194, 2));
	FirstDialogue.makeBubble(2, TranslatedText[SettingsValues.Language][196].slice(0, -1) + " " + Math.floor(1840 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 3) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			OlomoucNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function OlomoucNastupiste(canvas) {
	console.log("olo nastupiste");
	localLocationId = 0;
	
	traindriver.append(canvas);
	traindriver.resetEventListeners();
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		OlomoucNastupisteJob(canvas);
	}, { once: true });
	
	let ArrowToNadrazi = new Arrow(0, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
    	OlomoucNadrazi(canvas);
	}, { once: true });
	let ArrowToTrain = new Arrow(400, 150, 100, 100, ArrowDirections.Right, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
	if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		if(doesHaveTicket) {
			doesHaveTicket = false;
    		StudenkaLoad(canvas);
		}
		else {
			let dialogue = new Dialogue();
			dialogue.begin(canvas);
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][147]);
			let thisInterval = window.setInterval((dialogue, canvas) => {
				if(dialogue.counter === 1) {
					clearInterval(thisInterval);
					dialogue.end();
					OlomoucNastupiste(canvas);
				}
			}, 100, dialogue, canvas);
		}
	}, { once: true });

	canvas.image(olo_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(750, 150, 0.33, canvas);
	traindriver.draw(600, 130, 0.33, canvas);
	ArrowToTrain.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucNadrazi(canvas) {
	console.log("olo nadrazi");
	localLocationId = 1;

	let ArrowToNastupiste = new Arrow(400, 150, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	OlomoucNastupiste(canvas);
	}, { once: true });
	let ArrowToNamesti = new Arrow(450, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	OlomoucNamesti(canvas);
	}, { once: true });
	
	canvas.image(olo_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(300, 350, 0.2, canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucNamesti(canvas) {
	console.log("olo namesti");
	localLocationId = 2;
	
	let ArrowToNadrazi = new Arrow(800, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToObchod.deleteButton();
		ArrowToSyrarna.deleteButton();
		ArrowToRestaurace.deleteButton();
    	OlomoucNadrazi(canvas);
	}, { once: true });
	let ArrowToObchod = new Arrow(650, 300, 100, 100, ArrowDirections.Right, canvas);
	ArrowToObchod.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToObchod.deleteButton();
		ArrowToSyrarna.deleteButton();
		ArrowToRestaurace.deleteButton();
    	OlomoucObchodVenek(canvas);
	}, { once: true });
	let ArrowToSyrarna = new Arrow(200, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToSyrarna.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToObchod.deleteButton();
		ArrowToSyrarna.deleteButton();
		ArrowToRestaurace.deleteButton();
    	OlomoucSyrarna(canvas);
	}, { once: true });
	let ArrowToRestaurace = new Arrow(50, 400, 100, 100, ArrowDirections.Left, canvas);
	ArrowToRestaurace.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToObchod.deleteButton();
		ArrowToSyrarna.deleteButton();
		ArrowToRestaurace.deleteButton();
    	OlomoucRestaurace(canvas);
	}, { once: true });	
	
	canvas.image(olo_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(450, 400, 0.15, canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToObchod.draw(canvas);
	ArrowToSyrarna.draw(canvas);
	ArrowToRestaurace.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucObchodVenek(canvas) {
	console.log("olo obchod venek");
	localLocationId = 3;
	
	let ArrowToNamesti = new Arrow(800, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToObchodVnitrek.deleteButton();
    	OlomoucNamesti(canvas);
	}, { once: true });
	let ArrowToObchodVnitrek = new Arrow(500, 300, 100, 100, ArrowDirections.Left, canvas);
	ArrowToObchodVnitrek.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToObchodVnitrek.deleteButton();
    	OlomoucObchodVnitrek(canvas);
	}, { once: true });	
	
	canvas.image(olo_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 370, 0.25, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToObchodVnitrek.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucObchodVnitrek(canvas) {
	console.log("olo obchod vnitrek");
	localLocationId = 4;
	
	let ArrowToObchodVenek = new Arrow(900, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToObchodVenek.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToObchodVenek.deleteButton();
    	OlomoucObchodVenek(canvas);
	}, { once: true });
	
	canvas.image(olo_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(900, 50, 0.45, canvas);
	ArrowToObchodVenek.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucSyrarna(canvas) {
	console.log("olo syrarna");
	localLocationId = 5;
	
	let ArrowToNamesti = new Arrow(900, 400, 100, 100, ArrowDirections.Up, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	OlomoucNamesti(canvas);
	}, { once: true });
	
	canvas.image(olo_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(300, 320, 0.3, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucRestaurace(canvas) {
	console.log("olo restaurace");
	localLocationId = 6;
	
	let ArrowToNamesti = new Arrow(550, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	OlomoucNamesti(canvas);
	}, { once: true });
	
	canvas.image(olo_Locations[6], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 200, 0.6, canvas);
	cook.draw(550, 180, 0.25, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucWaiterJob(canvas) {
	console.log("olo obchod job");
	
}


function OlomoucObchodJob(canvas) {
	console.log("olo obchod job");
	
}

function OlomoucSyrarnaJob(canvas) {
	console.log("olo syrarna job");
	
}

function OlomoucNastupisteJob(canvas) {
	console.log("olo nastupiste job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 197, 2).slice(0, -1) + " " + Math.floor(1840 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 199, 2));
	dialogue.makeBubble(2, TranslatedText[SettingsValues.Language][201]);
	dialogue.makeChoice(3);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				if(MoneyAmount >= Math.floor(1840 * SettingsValues.MoneyCostIncrease)) {
					if(doesHaveTicket) {
						dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][148]);
						return;
					}
					removeMoney(Math.floor(1840 * SettingsValues.MoneyCostIncrease));
					ap.playSFX(5);
					doesHaveTicket = true;
					dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][202]);
					return;
				}
				else {
					dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][203]);
					return;
				}
				return;
			}
			else {
				dialogue.makeBubble(4,  TranslatedText[SettingsValues.Language][204]);
				return;
			}
		}
	}, 100, dialogue);

	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 5) {
			clearInterval(thisInterval);
			dialogue.end();
			AllowedToPause = true;	
			OlomoucNastupiste(canvas);
		}
	}, 100, dialogue, canvas);
}
