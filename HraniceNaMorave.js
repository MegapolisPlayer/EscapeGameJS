let Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvasobj) {
	for(let Id = 0; Id < 5; Id++) {
		Locations.push(new Image());
		Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	Locations[0].src = "res/hnm/domov.png";
	Locations[1].src = "res/hnm/namesti.png";
	Locations[2].src = "res/hnm/nadrazi.png";
	Locations[3].src = "res/hnm/restaurace.png";
	Locations[4].src = "res/hnm/nastupiste.png";
	HraniceNaMorave(canvasobj);
}

function HraniceNaMorave(canvas) {
	if(hnm_AmountLoadedImages != 5) {
      	window.setTimeout(HraniceNaMorave, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Hranice na Morave START"+hnm_AmountLoadedImages);
	HraniceNaMoraveDomov(canvas);
}

async function HraniceNaMoraveDomov(canvas) {
	console.log("Hranice na Morave Domov START");
	ap.playTrack(2);
	canvas.clear("purple");
	canvas.setnewcolor("white");
	canvas.image(Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	dialogueMakeBox(canvas);
	canvas.setnewcolor("black");
	dialogueMakeText(canvas, "Yet another wonderful sunny day.\nLet's read the news!");
	await sleep(1000);
	canvas.setnewcolor("white");
	dialogueMakeBox(canvas);
	canvas.setnewcolor("black");
	dialogueMakeText(canvas, "Crap. The Slovaks have rebelled and they also are just\m"
							+"a few kilometers away from Hranice!");
	await sleep(2000);
	canvas.setnewcolor("white");
	dialogueMakeBox(canvas);
	canvas.setnewcolor("black");
	dialogueMakeText(canvas, "How is this possible? The Czechs will start conscription\n"
							+"soon!");
	await sleep(3000);
	canvas.image(Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	let ArrowToNamesti = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToNamesti.button.addEventListener("click", canvas => {
    	HraniceNaMoraveNamesti(canvas);
	});
}
function HraniceNaMoraveNamesti(canvas) {
	console.log("hnm namesti");
	canvas.clear("purple");
	canvas.image(Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
}
function HraniceNaMoraveNadrazi(canvas) {
	canvas.clear("purple");
	canvas.image(Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
}
function HraniceNaMoraveRestaurace(canvas) {
	canvas.clear("purple");
	canvas.image(Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
}
function HraniceNaMoraveNastupiste(canvas) {
	canvas.clear("purple");
	canvas.image(Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
}
