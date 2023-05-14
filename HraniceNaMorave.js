//global for all locations, HnM is just first

let locationId = 0; //HnM, Prerov, etc... (HnM = 1, 0 is for main menu)
let localLocationId = 0; //railway station, house, etc... (HnM house = 0, starts from 0)

let PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);
let TicketImages = [];
let TicketImagesLoaded = 0;
for(let Id = 0; Id < 2; Id++)  {
	TicketImages.push(new Image());
	TicketImages[Id].onload = () => { TicketImagesLoaded++; };
}
TicketImages[0].src = "res/noticket.png";
TicketImages[1].src = "res/ticket.png";
let doesHaveTicket = false;

let AchievementImages = [];
let AchievementImagesLoaded = 0;
for(let Id = 0; Id < 5; Id++)  {
	AchievementImages.push(new Image());
	AchievementImages[Id].onload = () => { AchievementImagesLoaded++; };
}
AchievementImages[0].src = "res/achievements/medal_unknown.png";
AchievementImages[1].src = "res/achievements/medal_speed.png";
AchievementImages[2].src = "res/achievements/medal_waiter.png";
AchievementImages[3].src = "res/achievements/medal_help.png";
AchievementImages[4].src = "res/achievements/medal_sus.png";


function RenderStatus(canvas) {
	canvas.image(TicketImages[Number(doesHaveTicket)], 965, 210, 30, 30);
	canvas.image(AchievementImages[CreditsValues.gotAchievementSpeed ? 1 : 0], 965, 250, 30, 30);
	canvas.image(AchievementImages[CreditsValues.gotAchievementWaiter ? 2 : 0], 965, 290, 30, 30);
	canvas.image(AchievementImages[CreditsValues.gotAchievementHelp ? 3 : 0], 965, 330, 30, 30);
	canvas.image(AchievementImages[CreditsValues.gotAchievementSus ? 4 : 0], 965, 370, 30, 30);
}

//HnM specific

let hnm_Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvas, calledbysetstate = false) {
	AllowedToPause = false;	
	canvas.loadingMsg();
	
	locationId = 1;
	for(let Id = 0; Id < 6; Id++) {
		hnm_Locations.push(new Image());
		hnm_Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	hnm_Locations[0].src = "res/hnm/domov.png";
	hnm_Locations[1].src = "res/hnm/namesti.jpg";
	hnm_Locations[2].src = "res/hnm/nadrazi.jpg";
	hnm_Locations[3].src = "res/hnm/nastupiste.jpg";
	hnm_Locations[4].src = "res/hnm/restaurace.jpg";
	hnm_Locations[5].src = "res/map/1.png";
	
	if(calledbysetstate !== true) {
		//if called by load and setstatefile -> setstatefile adds pause button, skip dialogue
		PauseButton.button.addEventListener("click", () => {
			Pause(canvas);
		});	
		HraniceNaMoraveMap(canvas);
	}
}

function HraniceNaMoraveMap(canvas) {
	if(hnm_AmountLoadedImages != 6) {
      	window.setTimeout(HraniceNaMoraveMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(2);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(hnm_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][20]+" 1\nHranice na Moravě", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		HraniceNaMorave(canvas);
	});
    maparrow.draw(canvas);
}

function HraniceNaMorave(canvas) {
    console.log("Hranice na Morave START "+hnm_AmountLoadedImages);
	CheckInstantLoss(canvas);
	
	canvas.image(hnm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 100, 0.65, canvas);		
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 32, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 34, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 36, 2));
	FirstDialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 38, 2));
	FirstDialogue.makeBubble(4, TranslationGetMultipleLines(SettingsValues.Language, 40, 2));
	FirstDialogue.makeBubble(5, TranslatedText[SettingsValues.Language][42]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 6) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;	
			HraniceNaMoraveDomov(canvas);
		}
	}, 100, FirstDialogue, canvas);
}


function HraniceNaMoraveDomov(canvas) {
	console.log("hnm domov");
	localLocationId = 0;
	let ArrowToNamesti = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	}, { once: true });
	canvas.image(hnm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 100, 0.65, canvas);	
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function HraniceNaMoraveNamesti(canvas) {
	console.log("hnm namesti");
	localLocationId = 1;
	let ArrowToDomov = new Arrow(300, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToDomov.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveDomov(canvas);
	}, { once: true });
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	}, { once: true });
	canvas.image(hnm_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(550, 270, 0.3, canvas);
	ArrowToDomov.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function HraniceNaMoraveNadrazi(canvas) {
	console.log("hnm nadrazi");
	localLocationId = 2;
	let ArrowToNamesti = new Arrow(100, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNastupiste = new Arrow(800, 400, 100, 100, ArrowDirections.Down, canvas);
	let ArrowToRestaurace = new Arrow(900, 320, 100, 100, ArrowDirections.Up, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	}, { once: true });
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNastupiste(canvas);
	}, { once: true });
	ArrowToRestaurace.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveRestaurace(canvas);
	}, { once: true });
	canvas.image(hnm_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(150, 250, 0.35, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToRestaurace.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function HraniceNaMoraveNastupiste(canvas) {
	console.log("hnm nastupiste");
	localLocationId = 3;
	
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		HraniceNaMoraveNastupisteJob(canvas);
	}, { once: true });
	traindriver.append(canvas);
	
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	}, { once: true });
	let ArrowToTrain = new Arrow(430, 250, 100, 100, ArrowDirections.Left, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		if(doesHaveTicket) {
			doesHaveTicket = false;
    		PrerovLoad(canvas);
		}
		else {
			let dialogue = new Dialogue();
			dialogue.begin(canvas);
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][93]);
			let thisInterval = window.setInterval((dialogue, canvas) => {
				if(dialogue.counter === 1) {
					clearInterval(thisInterval);
					dialogue.end();
					HraniceNaMoraveNastupiste(canvas);
				}
			}, 100, dialogue, canvas);
		}
	}, { once: true });
	
	canvas.image(hnm_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(570, 260, 0.35, canvas);
	traindriver.draw(320, 260, 0.35, canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToTrain.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function HraniceNaMoraveRestaurace(canvas) {
	console.log("hnm restaurace");
	localLocationId = 4;	
		
	let ArrowToNadrazi = new Arrow(850, 400, 100, 100, ArrowDirections.Down, canvas);
	
	ArrowToNadrazi.button.addEventListener("click", (event) => {
		if(GamePaused) { return; }
		cook.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	
	cook.button.addEventListener("click", (event) => {
		if(GamePaused) { return; }
		cook.deleteButton();
		ArrowToNadrazi.deleteButton();
		HraniceNaMoraveRestauraceJob(canvas);
	}, { once: true });
	
	cook.append(canvas);
	canvas.image(hnm_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(450, 300, 0.75, canvas);
	cook.draw(820, 110, 0.5, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function HraniceNaMoraveRestauraceJob(canvas) {
	console.log("hnm restaurace job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 47, 2));
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 49, 2));
	dialogue.makeChoice(2);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][51]);
				WaiterGame(canvas);
				return;
			}
			else {
				dialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 52, 2));
				return;
			}
		}
	}, 100, dialogue);
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			clearInterval(thisInterval);
			dialogue.end();		
			AllowedToPause = true;	
			HraniceNaMoraveRestaurace(canvas);
		}
	}, 100, dialogue, canvas);
}

function HraniceNaMoraveNastupisteJob(canvas) {
	console.log("hnm nastupiste job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 84, 2).slice(0, -1) + " " + Math.floor(650 * SettingsValues.MoneyCostIncrease) + " CZK");
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 86, 2));
	dialogue.makeBubble(2, TranslatedText[SettingsValues.Language][88]);
	dialogue.makeChoice(3);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				if(MoneyAmount >= Math.floor(650 * SettingsValues.MoneyCostIncrease)) {
					removeMoney(Math.floor(650 * SettingsValues.MoneyCostIncrease));
					doesHaveTicket = true;
					dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][89]);
				}
				else {
					dialogue.makeBubble(4, TranslationGetMultipleLines(SettingsValues.Language, 90, 2));
				}
				return;
			}
			else {
				dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][92]);
				return;
			}
		}
	}, 100, dialogue);

	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 5) {
			clearInterval(thisInterval);
			dialogue.end();
			AllowedToPause = true;	
			HraniceNaMoraveNastupiste(canvas);
		}
	}, 100, dialogue, canvas);
}

function HraniceNaMoraveTrainEntry(canvas) {

}
