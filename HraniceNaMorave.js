let Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvas) {
	for(let Id = 0; Id < 5; Id++) {
		Locations.push(new Image());
		Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	Locations[0].src = "res/hnm/domov.png";
	Locations[1].src = "res/hnm/namesti.png";
	Locations[2].src = "res/hnm/nadrazi.png";
	Locations[3].src = "res/hnm/nastupiste.png";
	Locations[4].src = "res/hnm/restaurace.png";
	HraniceNaMorave(canvas);
}

function HraniceNaMorave(canvas) {
	if(hnm_AmountLoadedImages != 5) {
      	window.setTimeout(HraniceNaMorave, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Hranice na Morave START "+hnm_AmountLoadedImages);
	ap.playTrack(2);
	canvas.clear("purple");
	canvas.image(Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	
	dialogueBegin(canvas, 1500);
	dialogueMakeBubble(0, "Yet another wonderful sunny day.\nLet's read the news!");
	dialogueMakeBubble(1, "Crap. The Slovaks have rebelled and they also are just a\nfew kilometers away from Hranice!");
	dialogueMakeBubble(2, "How is this possible? The Czechs will start conscription\nsoon!");
	dialogueMakeBubble(3, "I must escape! But where do I go? I think Poland might be\na safe bet and it's the simplest to get to.");
	dialogueMakeBubble(4, "It's not like I have a choice anyway - Germany is too far\naway and too expensive and Austria is not much better.");
	dialogueMakeBubble(5, "Poland it is then!");	
	dialogueEnd();	
	
	setTimeout(function() {
		HraniceNaMoraveDomov(canvas);
	}, ((5 * 1500) + 500));
}

function HraniceNaMoraveDomov(canvas) {
	console.log("hnm domov");
	canvas.image(Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	let ArrowToNamesti = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		ArrowToNamesti.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	});
}
function HraniceNaMoraveNamesti(canvas) {
	console.log("hnm namesti");
	canvas.clear("purple");
	let ArrowToDomov = new Arrow(300, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToDomov.button.addEventListener("click", () => {
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveDomov(canvas);
	});
	ArrowToNadrazi.button.addEventListener("click", () => {
		ArrowToDomov.deleteButton();
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	ArrowToDomov.draw(canvas);
	ArrowToNadrazi.draw(canvas);
}
function HraniceNaMoraveNadrazi(canvas) {
	console.log("hnm nadrazi");
	canvas.clear("purple");
	let ArrowToNamesti = new Arrow(100, 400, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToNastupiste = new Arrow(300, 300, 100, 100, ArrowDirections.Up, canvas);
	let ArrowToRestaurace = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNamesti(canvas);
	});
	ArrowToNastupiste.button.addEventListener("click", () => {
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveNastupiste(canvas);
	});
	ArrowToRestaurace.button.addEventListener("click", () => {
		ArrowToNamesti.deleteButton();
		ArrowToNastupiste.deleteButton();
		ArrowToRestaurace.deleteButton();
    	HraniceNaMoraveRestaurace(canvas);
	});
	canvas.image(Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	ArrowToNamesti.draw(canvas);
	ArrowToNastupiste.draw(canvas);
	ArrowToRestaurace.draw(canvas);
}
function HraniceNaMoraveNastupiste(canvas) {
	console.log("hnm nastupiste");
	canvas.clear("purple");
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	ArrowToNadrazi.draw(canvas);
}
function HraniceNaMoraveRestaurace(canvas) {
	console.log("hnm restaurace");
	canvas.clear("purple");
	let ArrowToNadrazi = new Arrow(500, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	ArrowToNadrazi.draw(canvas);
}
