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
	for(let Id = 0; Id < 6; Id++) {
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

	canvas.image(pro_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(150, 190, 0.3, canvas);
	traindriver.draw(700, 200, 0.5, canvas);
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 178, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 180, 2));
	FirstDialogue.makeBubble(2, 
		(TranslatedText[SettingsValues.Language][182].slice(0, -1) + " " + 
		Math.floor(1470 * SettingsValues.MoneyCostIncrease) + " "  + TranslatedText[SettingsValues.Language][90])
		+ "\n" + TranslatedText[SettingsValues.Language][183]);
	FirstDialogue.makeBubble(3, TranslatedText[SettingsValues.Language][184]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			ProstejovNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function ProstejovNastupiste(canvas) {
	console.log("pro nastupiste");
	localLocationId = 0;
	canvas.image(pro_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	
	traindriver.append(canvas);
	traindriver.resetEventListeners();
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		ProstejovNastupisteJob(canvas);
	}, { once: true });
	
	let ArrowToNadrazi = new Arrow(500, 300, 100, 100, ArrowDirections.Up, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
    	ProstejovNadrazi(canvas);
	}, { once: true });
	let ArrowToTrain = new Arrow(850, 300, 100, 100, ArrowDirections.Right, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
	if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		if(doesHaveTicket) {
			doesHaveTicket = false;
    		OlomoucLoad(canvas);
		}
		else {
			let dialogue = new Dialogue();
			dialogue.begin(canvas);
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][147]);
			let thisInterval = window.setInterval((dialogue, canvas) => {
				if(dialogue.counter === 1) {
					clearInterval(thisInterval);
					dialogue.end();
					ProstejovNastupiste(canvas);
				}
			}, 100, dialogue, canvas);
		}
	}, { once: true });
	chr.draw(150, 190, 0.3, canvas);
	traindriver.draw(700, 200, 0.5, canvas);		
}

function ProstejovNadrazi(canvas) {
	console.log("pro nadrazi");
	localLocationId = 1;
	canvas.image(pro_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	
	
	
}

function ProstejovNamesti(canvas) {
	console.log("pro namesti");
	localLocationId = 2;
	canvas.image(pro_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	



}

function ProstejovObchod(canvas) {
	console.log("pro obchod");
	localLocationId = 3;
	canvas.image(pro_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);


	
}

function ProstejovCafe(canvas) {
	console.log("pro cafe");
	localLocationId = 4;
	canvas.image(pro_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	


}

function ProstejovCafeWaiterJob(canvas) {
	console.log("pro waiter job");
}

function ProstejovObchodJob(canvas) {
	console.log("pro obchod job");
}
function ProstejovNastupisteJob(canvas) {
	console.log("pro nastupiste job");
}


