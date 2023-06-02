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
	chr.draw(750, 170, 0.33, canvas);
	traindriver.draw(600, 150, 0.33, canvas);

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
	canvas.image(olo_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(750, 170, 0.33, canvas);
	traindriver.draw(600, 150, 0.33, canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucNadrazi(canvas) {
	console.log("olo nadrazi");
	canvas.image(olo_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucNamesti(canvas) {
	console.log("olo namesti");
	canvas.image(olo_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucObchodVenek(canvas) {
	console.log("olo obchod venek");
	canvas.image(olo_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucObchodVnitrek(canvas) {
	console.log("olo obchod vnitrek");
	canvas.image(olo_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucSyrarna(canvas) {
	console.log("olo syrarna");
	canvas.image(olo_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucRestaurace(canvas) {
	console.log("olo restaurace");
	canvas.image(olo_Locations[6], 0, 0, canvas.canvas.width, canvas.canvas.height);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucObchodJob(canvas) {
	console.log("olo obchod job");
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OlomoucSyrarnaJob(canvas) {
	console.log("olo syrarna job");
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
