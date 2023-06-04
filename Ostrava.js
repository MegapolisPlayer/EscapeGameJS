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
	for(let Id = 0; Id < 5; Id++) {
		ost_Locations.push(new Image());
		ost_Locations[Id].onload = OstravaImageLoaded;
	}
	ost_Locations[0].src = "res/ostrava/nastupiste.jpg";
	ost_Locations[1].src = "res/ostrava/nadrazi.jpg";
	ost_Locations[2].src = "res/ostrava/nastupiste2.jpg";
	ost_Locations[3].src = "res/map/7.png";
	ost_Locations[4].src = "res/katowice/cutscene/B10bmnouz.jpg";
	
	OstravaMap(canvas);
}

function OstravaMap(canvas) {
	if(ost_AmountLoadedImages != 5) {
      	window.setTimeout(OstravaMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(8);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(ost_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 6\nOstrava", 50, 50);
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
	canvas.image(ost_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 170, 0.6, canvas);	
	
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][211]);
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 1) {
			clearInterval(thisInterval);
			dialogue.end();
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			OstravaNastupiste(canvas);
		}
	}, 100, dialogue, canvas);
}

function OstravaNastupiste(canvas) {
	console.log("ost nastupiste");
	localLocationId = 0;

	let ArrowToNadrazi = new Arrow(900, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
    	OstravaNadrazi(canvas);
	}, { once: true });	
	
	canvas.image(ost_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 170, 0.6, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OstravaNadrazi(canvas) {
	console.log("ost nadrazi");
	localLocationId = 1;

	let ArrowToNastupiste = new Arrow(0, 400, 100, 100, ArrowDirections.Left, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNastupiste2.deleteButton();
    	OstravaNastupiste(canvas);
	}, { once: true });	
	let ArrowToNastupiste2 = new Arrow(900, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNastupiste2.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNastupiste2.deleteButton();
    	OstravaNastupiste2(canvas);
	}, { once: true });	
	
	canvas.image(ost_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(670, 330, 0.1, canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToNastupiste2.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function OstravaNastupiste2(canvas) {
	console.log("ost nastupiste 2");
	localLocationId = 2;
	
	let ArrowToTrain = new Arrow(0, 400, 100, 100, ArrowDirections.Left, canvas);
	ArrowToTrain.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToTrain.deleteButton();
		ArrowToNadrazi.deleteButton();
		KatowiceCutscene(canvas);
	}, { once: true });	
	let ArrowToNadrazi = new Arrow(850, 250, 100, 100, ArrowDirections.Left, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToTrain.deleteButton();
		ArrowToNadrazi.deleteButton();
    	OstravaNadrazi(canvas);
	}, { once: true });	
	
	canvas.image(ost_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(100, 350, 0.25, canvas);
	ArrowToTrain.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}

function KatowiceCutscene(canvas) {
	timerEnd();
	if(timerToNumber() <= 600) {
		CreditsValues.gotAchievementSpeed = true;
	}
	ap.playTrack(18);
	canvas.image(ost_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chrs.draw(160, 160, 0.65, canvas);
	setTimeout(() => {
		let dialogue = new Dialogue();
		dialogue.begin(canvas);
		dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][212]);
		dialogue.makeBubble(1, TranslatedText[SettingsValues.Language][213]);
		let thisInterval = window.setInterval((dialogue, canvas) => {
			if(dialogue.counter === 2) {
				clearInterval(thisInterval);
				dialogue.end();
				canvas.image(ost_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
				chrs.draw(160, 160, 0.65, canvas);
				setTimeout(() => {
					CreditsCaller(canvas);
				}, 1500);
			}
		}, 100, dialogue, canvas);
	}, 2500);
}
