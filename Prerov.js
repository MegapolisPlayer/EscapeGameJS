let pre_Locations = [];
let pre_AmountLoadedImages = 0;

function PrerovImageLoaded() {
	pre_AmountLoadedImages += 1;
}

function PrerovLoad(canvas, calledbysetstate = false) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 2;
	for(let Id = 0; Id < 6; Id++) {
		pre_Locations.push(new Image());
		pre_Locations[Id].onload = PrerovImageLoaded;
	}
	pre_Locations[0].src = "res/prerov/nastupiste.jpg";
	pre_Locations[1].src = "res/prerov/nadrazi.jpg";
	pre_Locations[2].src = "res/prerov/namesti.jpg";
	pre_Locations[3].src = "res/prerov/autobus.jpg";
	pre_Locations[4].src = "res/prerov/becva.jpg";
	pre_Locations[5].src = "res/map/2.png";
	
	PrerovMap(canvas);
	//no condition for pause - either added during HnM phase or added by setstatefile
}

function PrerovMap(canvas) {
	if(pre_AmountLoadedImages != 6) {
      	window.setTimeout(PrerovMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(3);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(pre_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 2\nPřerov", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Prerov(canvas);
	});
    maparrow.draw(canvas);
}

function Prerov(canvas) {
    console.log("Prerov START "+pre_AmountLoadedImages);
	CheckInstantLoss(canvas);
	
	canvas.image(pre_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(100, 150, 0.5, canvas);
	traindriver.draw(550, 150, 0.5, canvas);
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 149, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 151, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 153, 2).slice(0, -1) + " " + Math.floor(1220 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	FirstDialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 155, 2));
	FirstDialogue.makeBubble(4, TranslatedText[SettingsValues.Language][157]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 5) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			PrerovNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function PrerovNastupiste(canvas) {
	console.log("pre nastupiste");
	localLocationId = 0;
	canvas.image(pre_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	
	traindriver.append(canvas);
	traindriver.resetEventListeners();
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		PrerovNastupisteJob(canvas);
	}, { once: true });
	
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
    	PrerovNadrazi(canvas);
	}, { once: true });
	let ArrowToTrain = new Arrow(800, 200, 100, 100, ArrowDirections.Right, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
	if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		if(doesHaveTicket) {
			doesHaveTicket = false;
    		NezamysliceLoad(canvas);
		}
		else {
			let dialogue = new Dialogue();
			dialogue.begin(canvas);
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][147]);
			let thisInterval = window.setInterval((dialogue, canvas) => {
				if(dialogue.counter === 1) {
					clearInterval(thisInterval);
					dialogue.end();
					PrerovNastupiste(canvas);
				}
			}, 100, dialogue, canvas);
		}
	}, { once: true });
	chr.draw(100, 150, 0.5, canvas);
	traindriver.draw(550, 150, 0.5, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovNadrazi(canvas) {
	console.log("pre nadrazi");
	localLocationId = 1;
	let ArrowToNastupiste = new Arrow(450, 400, 100, 100, ArrowDirections.Down, canvas);
	let ArrowToNamesti = new Arrow(600, 300, 100, 100, ArrowDirections.Up, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	PrerovNastupiste(canvas);
	}, { once: true });
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	canvas.image(pre_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(300, 420, 0.4, canvas); //426 = 500 - 64, for character image drawing
	ArrowToNastupiste.draw(canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovNamesti(canvas) {
	console.log("pre namesti");
	localLocationId = 2;
	let ArrowToNadrazi = new Arrow(100, 400, 100, 100, ArrowDirections.Down, canvas);
	let ArrowToAutobus = new Arrow(100, 300, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToBecva = new Arrow(600, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovNadrazi(canvas);
	}, { once: true });
	ArrowToAutobus.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovAutobus(canvas);
	}, { once: true });
	ArrowToBecva.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovBecva(canvas);
	}, { once: true });
	canvas.image(pre_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(426, 300, 0.3, canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToBecva.draw(canvas);
	ArrowToAutobus.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovAutobus(canvas) {
	console.log("pre autobus");
	localLocationId = 3;
	let ArrowToNamesti = new Arrow(0, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	canvas.image(pre_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(150, 290, 0.35, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovBecva(canvas) {
	console.log("pre becva");
	localLocationId = 4;
	let ArrowToNamesti = new Arrow(50, 350, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToBecvaJob = new Arrow(320, 370, 50, 50, ArrowDirections.Here, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToBecvaJob.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	ArrowToBecvaJob.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToBecvaJob.deleteButton();
    	PrerovBecvaJob1(canvas);
	}, { once: true });
	canvas.image(pre_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(170, 320, 0.25, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToBecvaJob.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovBecvaJob1(canvas) {
	AllowedToPause = false;
	PauseButton.deleteButton();
	FishGame(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(FishGameValues.IsOver !== -1) {
			clearInterval(thisInterval);
			FishGameReset();
			PauseButton.append(canvas);
			AllowedToPause = true;
			ap.playTrack(3);
			PrerovBecva(canvas);
		}
	}, 100, canvas);
}

function PrerovNastupisteJob(canvas) {
	console.log("pre nastupiste job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 158, 2).slice(0, -1) + " " + Math.floor(1220 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	dialogue.makeBubble(1, TranslatedText[SettingsValues.Language][160]);
	dialogue.makeChoice(2);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				if(MoneyAmount >= Math.floor(1220 * SettingsValues.MoneyCostIncrease)) {
					if(doesHaveTicket) {
						dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][148]);
						return;
					}
					removeMoney(Math.floor(1220 * SettingsValues.MoneyCostIncrease));
					ap.playSFX(5);
					doesHaveTicket = true;
					dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][161]);
					return;
				}
				else {
					dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][162]);
					return;
				}
				return;
			}
			else {
				dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][163]);
				return;
			}
		}
	}, 100, dialogue);

	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			clearInterval(thisInterval);
			dialogue.end();
			AllowedToPause = true;	
			PrerovNastupiste(canvas);
		}
	}, 100, dialogue, canvas);
}
