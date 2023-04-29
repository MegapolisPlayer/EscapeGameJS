//global for all locations, HnM is just first

let LocationId = 0; //HnM, Prerov, etc... (HnM = 1, 0 is for main menu)
let LocalLocationId = 0; //railway station, house, etc... (HnM house = 0, starts from 0)

let PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);

//HnM specific

let hnm_Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvas) {
	cvs.clear("purple");
	LocationId = 1;
	for(let Id = 0; Id < 5; Id++) {
		hnm_Locations.push(new Image());
		hnm_Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	hnm_Locations[0].src = "res/hnm/domov.png";
	hnm_Locations[1].src = "res/hnm/namesti.png";
	hnm_Locations[2].src = "res/hnm/nadrazi.png";
	hnm_Locations[3].src = "res/hnm/nastupiste.png";
	hnm_Locations[4].src = "res/hnm/restaurace.png";
	HraniceNaMorave(canvas);
}

function HraniceNaMorave(canvas) {
	if(hnm_AmountLoadedImages != 5) {
      	window.setTimeout(HraniceNaMorave, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Hranice na Morave START "+hnm_AmountLoadedImages);
	
	ap.playTrack(2);

	PauseButton.button.addEventListener("click", () => {
		Pause(canvas);
	});	
	
	canvas.clear("purple");
	canvas.image(hnm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 100, 0.65, canvas);		
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas, 2000);
	FirstDialogue.makeBubble(0, "Yet another wonderful day.\nLet's read the news!");
	FirstDialogue.makeBubble(1, "Crap. The Slovaks have rebelled and they also are just a\nfew kilometers away from Hranice!");
	FirstDialogue.makeBubble(2, "How is this possible? The Czechs will start conscription\nsoon!");
	FirstDialogue.makeBubble(3, "I must escape! But where do I go? I think Poland might be\na safe bet and it's the simplest to get to.");
	FirstDialogue.makeBubble(4, "It's not like I have a choice anyway - Germany is too far\naway and too expensive and Austria is not much better.");
	FirstDialogue.makeBubble(5, "Poland it is then!");	
	FirstDialogue.end();		
	
	setTimeout(function() {	
		PauseButton.append(canvas);
		AllowedToPause = true;	
		HraniceNaMoraveDomov(canvas);
	}, ((5 * 2000) + 1000));
}

function HraniceNaMoraveDomov(canvas) {
	console.log("hnm domov");
	LocalLocationId = 0;
	canvas.image(hnm_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(600, 100, 0.65, canvas);	
	let ArrowToNamesti = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	});
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
function HraniceNaMoraveNamesti(canvas) {
	console.log("hnm namesti");
	LocalLocationId = 1;
	canvas.clear("purple");
	let ArrowToDomov = new Arrow(300, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToDomov.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveDomov(canvas);
	});
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(hnm_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(550, 320, 0.2, canvas);
	ArrowToDomov.draw(canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
function HraniceNaMoraveNadrazi(canvas) {
	console.log("hnm nadrazi");
	LocalLocationId = 2;
	canvas.clear("purple");
	let ArrowToNamesti = new Arrow(100, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNastupiste = new Arrow(300, 300, 100, 100, ArrowDirections.Up, canvas);
	let ArrowToRestaurace = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	});
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNastupiste(canvas);
	});
	ArrowToRestaurace.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveRestaurace(canvas);
	});
	canvas.image(hnm_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(320, 210, 0.17, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToRestaurace.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
function HraniceNaMoraveNastupiste(canvas) {
	console.log("hnm nastupiste");
	LocalLocationId = 3;
	canvas.clear("purple");
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(hnm_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(550, 250, 0.35, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
function HraniceNaMoraveRestaurace(canvas) {
	console.log("hnm restaurace");
	LocalLocationId = 4;
	canvas.clear("purple");
	let ArrowToNadrazi = new Arrow(500, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(hnm_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(540, 170, 0.5, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
