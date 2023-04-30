//Canvas object
class Canvas {
    constructor(id, font, fontsize, color, x, y) {
        this.canvas = document.getElementById(id);
		this.canvas.width = x;
		this.canvas.height = y;
        this.context = this.canvas.getContext("2d");
        this.color = color;
		this.border = "#000000";
		this.linethickness = 1;
        this.context.font = fontsize+"px "+font;
        this.context.fillStyle = this.color;
		let canvasbuffer = document.createElement("div");
		canvasbuffer.style.setProperty("width", this.canvas.width+"px");
		canvasbuffer.style.setProperty("height", this.canvas.height+"px");
		document.getElementById(id).parentElement.appendChild(canvasbuffer);
    }
    //sets new color
    setnewcolor(newcolor) {
        this.color = newcolor;
        this.context.fillStyle = this.color;
    }
	//sets new font
	setnewfont(font, fontsize, weight = "normal") {
		 this.context.font = weight+" "+fontsize+"px "+font;
	}
	//sets the font weight
	setfontweight(weight) {
		 this.context.font = this.context.font.substring(this.context.font.indexOf(" ") + 1);
		 this.context.font = weight+" "+this.context.font;
	}
	//resets the font weight
	resetfontweight() {
		this.context.font = this.context.font.substring(this.context.font.indexOf(" ") + 1);
	}
	 //sets new border (color only is enough)
    setnewborder(newborder) {
		this.border = newborder;
        this.context.strokeStyle = this.border;
    }
    //draw box
    box(x1, y1, width, height) {
        this.context.fillRect(x1, y1, width, height);
    }
	//draw border
    border(x1, y1, width, height) {
        this.context.strokeRect(x1, y1, width, height);
    }
	//draw box with border
    boxborder(x1, y1, width, height) {
		this.context.fillRect(x1, y1, width, height);
        this.context.strokeRect(x1, y1, width, height);
    }
	//set thickness of lines (including borders)
	setlinethickness(newlinethickness) {
		this.linethickness = newlinethickness;
		this.context.lineWidth = this.linethickness;
	}
    //draws text
    text(text, xoffset, yoffset) {
		this.context.fillText(text, xoffset, yoffset);
    }
	//draws multiline text
    textml(mltext, xoffset, yoffset, padding) {
		let lines = mltext.split('\n');
		let newlineyoffset = 0;
		let metrics = this.context.measureText(mltext);
        //lowest point from line + highest point from line
		let lineheight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        lineheight *= 1.5;
		for(let Id = 0; Id < lines.length; Id++) {
			this.context.fillText(lines[Id], xoffset, yoffset + newlineyoffset);
			newlineyoffset += lineheight;
		}
    }
    //draws an image
    image(image, xoffset, yoffset, dwidth, dheight) {
        this.context.drawImage(image, xoffset, yoffset, dwidth, dheight);
    }
    //clears the canvas
    clear(newcolor = "empty") {
		if(newcolor === "empty") {
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
        this.context.fillStyle = newcolor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.color;
    }
}


//Button object

class Button {  
    //id of element where to insert as string
    insert(container_id) {
		if((typeof this.button === "undefined")) { 
			console.error("Button: Object not initialized.");
			return;
		}
		this.button.setAttribute("class", "CanvasButton CanvasInputElement");
		this.button.setAttribute("id", this.text);
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		this.button.style.setProperty("font-size", this.fontsize+"px");
		
		this.button.appendChild(this.buttontext);
		document.getElementById(container_id).appendChild(this.button);
    }
	changeText(newtext) {
		if((typeof this.button === "undefined")) { 
			console.error("Button: Object not initialized.");
			return;
		}
		this.text = newtext;
		this.buttontext.nodeValue =  this.text;
		this.button.innerHTML = '';
		this.button.appendChild(this.buttontext);
	}
	deleteButton() {
		this.button.remove();
	}
	setCallback(callback) {
		this.button.setAttribute("onclick", callback);
	}
    constructor(xoffset, yoffset, width, height, fontsize, text, container_id) {
		this.button = document.createElement("button");
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.width = width;
        this.height = height;
        this.fontsize = fontsize;
        this.text = text;
		this.buttontext = document.createTextNode(this.text);
		
		this.insert(container_id);
    } 
	recreate(container_id) {
		this.button = document.createElement("button");
		insert(container_id);
	}
};

//Arrow object

const ArrowDirections = {
	Center: 0,
	Up: 1,
	Right: 2,
	Down: 3,
	Left: 4,
	Pause: 5
}

const ArrowImages = [];
for(let ArrowImagesId = 0; ArrowImagesId < 6; ArrowImagesId++) {
	ArrowImages.push(new Image());
}

//arrow images
ArrowImages[0].src = "res/arrow_top.png";
ArrowImages[1].src = "res/arrow_up.png";
ArrowImages[2].src = "res/arrow_right.png";
ArrowImages[3].src = "res/arrow_down.png";
ArrowImages[4].src = "res/arrow_left.png";
ArrowImages[5].src = "res/pause.png";

class Arrow {
    insert(canvasobj) {
		if((typeof this.button === "undefined")) { 
			console.error("Button: Object not initialized.");
			return;
		}
		if((typeof canvasobj === "undefined")) { 
			console.error("Arrow: Argument to function not provided.");
			return;
		}
		
		this.button.setAttribute("class", "CanvasArrow CanvasInputElement");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		if(canvasobj != null) {
			canvasobj.canvas.parentElement.appendChild(this.button);
        	canvasobj.context.drawImage(ArrowImages[this.imageId], this.xoffset, this.yoffset, this.width, this.height);
		}
    }
	changeId(newid) {
		if((typeof this.button === "undefined")) { 
			console.error("Arrow: Object not initialized.");
			return;
		}
		
	}
	deleteButton() {
		this.button.remove();
	}
	draw(canvasobj) {
		if((typeof this.button === "undefined")) { 
			console.error("Arrow: Object not initialized.");
			return;
		}
		if((typeof canvasobj === "undefined")) { 
			console.error("Arrow: Argument to function not provided.");
			return;
		}
		canvasobj.context.drawImage(ArrowImages[this.imageId], this.xoffset, this.yoffset, this.width, this.height);
	}
	append(canvasobj) {
		if((typeof this.button === "undefined")) { 
			console.error("Arrow: Object not initialized.");
			return;
		}
		if((typeof canvasobj === "undefined")) { 
			console.error("Arrow: Argument to function not provided.");
			return;
		}
		canvasobj.canvas.parentElement.appendChild(this.button);
	}
	setCallback(callback) {
		this.button.setAttribute("onclick", callback);
	}
	//image id of type ArrowDirections - set canvasobj to null if don't want to draw immediately
	constructor(xoffset, yoffset, width, height, imageId, canvasobj) {
		this.button = document.createElement("button");
		this.imageId = imageId;
	    
		this.width = width;
		this.height = height;
		this.xoffset = xoffset;
		this.yoffset = yoffset;
		
		this.insert(canvasobj);
	}
};

//Audio player

class AudioPlayer {
	constructor() {
		this.audioTracks = [];
		this.audioTracks.push(new Audio("res/music/Stormfront.mp3"));        //main menu
		this.audioTracks.push(new Audio("res/music/Faceoff.mp3"));           //intro
		this.audioTracks.push(new Audio("res/music/ImpendingBoom.mp3"));     //hranice
		this.audioTracks.push(new Audio("res/music/Nerves.mp3"));            //prerov
		this.audioTracks.push(new Audio("res/music/LateNightRadio.mp3"));    //nemcice nad hanou
		this.audioTracks.push(new Audio("res/music/BlueFeather.mp3"));       //prostejov
		this.audioTracks.push(new Audio("res/music/FailingDefense.mp3"));    //olomouc
		this.audioTracks.push(new Audio("res/music/RoyalCoupling.mp3"));     //studenka
		this.audioTracks.push(new Audio("res/music/TheParting.mp3"));        //ostrava
		this.audioTracks.push(new Audio("res/music/StartingOutWaltzVivace.mp3")); //credits, ending
		for(let Id = 0; Id < 10; Id++) {
			this.audioTracks[Id].loop = true;
		}
		this.audioTrackCounter = 0;
		this.allowed = false;
	}
	playNextTrack() {
		if(this.allowed === false) { 
			this.audioTrackCounter++; return;
		}
		this.audioTracks[this.audioTrackCounter].pause();
		if(this.audioTrackCounter >= this.audioTracks.length) {
			this.audioTrackCounter = 0;
		}
		this.audioTracks[this.audioTrackCounter].play();
		this.audioTrackCounter++;
	}
	playTrack(id) {
		if(this.allowed === false) { 
			this.audioTrackCounter = id; return;
		}
		if(id >= this.audioTracks.length) {
			console.error("AudioPlayer: Out of bounds.");
			return;
		}
		this.audioTracks[this.audioTrackCounter].pause();
		this.audioTracks[id].play();
		this.audioTrackCounter = id;
	}
	resetTrack() {
		if(this.allowed === false) { return; }
		this.audioTracks[this.audioTrackCounter].pause();
		this.audioTracks[this.audioTrackCounter].currentTime = 0;
		this.audioTracks[this.audioTrackCounter].play();
	}
	start() {
		this.allowed = true;
		this.audioTracks[this.audioTrackCounter].play();
	}
	stop() {
		this.audioTracks[this.audioTrackCounter].pause();
		this.allowed = false;
	}
	toggleSound() {
		if(this.allowed) { this.stop(); }
		else { this.start(); }
	}
};
const ap = new AudioPlayer();

let MoneyCount = 0;

function drawMoneyCount(canvasobj) {
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.setnewcolor("#ffffff");
	let text = "Money: "+MoneyCount+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	canvasobj.setnewcolor("#333399");
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}

function addMoney(amount) {
	MoneyCount += amount;
}

function removeMoney(amount) {
	MoneyCount -= amount;
}

function setMoney(amount) {
	MoneyCount = amount;
}
class Character {
	constructor(source) {
		this.image = new Image();
		this.image.src = source;
		this.image.onload = this.setisloaded;
		this.loaded = false;
	}
	draw(xoffset, yoffset, scale, canvas) {
		canvas.image(this.image, xoffset, yoffset, this.image.width * scale, this.image.height * scale);
	}
	setisloaded() {
		this.loaded = true;
	}
};
let chr = new Character("res/Character.png");
let cook = new Character("res/Cook.png");

class Dialogue {
	constructor() {
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = true;
	}
	begin(canvasobj) {
		this.canvas_info = canvasobj;
	}
	makeBox() {
		this.canvas_info.setlinethickness(5);
		this.canvas_info.boxborder(20, (this.canvas_info.canvas.height * 0.8), this.canvas_info.canvas.width - 40, this.canvas_info.canvas.height - 40);
	}
	makeText(text) {
		this.canvas_info.textml(text, 30, (this.canvas_info.canvas.height * 0.8) + 30);
	}
	makeBubble(id, text, textcolor = "black") {
		if(!(this.can_proceed && this.counter === id)) {
   			setTimeout(this.makeBubble.bind(this), 100, id, text, textcolor);
  		}
		else {
		this.can_proceed = false;
		console.log(this.counter);
		let NextArrow = new Arrow(this.canvas_info.canvas.width - 140, (this.canvas_info.canvas.height * 0.8) + 10, 100, 100, ArrowDirections.Right, this.canvas_info);
		this.canvas_info.setnewcolor("white");
		this.makeBox();
		this.canvas_info.setnewcolor(textcolor);
		this.makeText(text);
		NextArrow.draw(this.canvas_info);
		NextArrow.button.addEventListener("click", () => {
			NextArrow.deleteButton();
			this.counter++;
			this.can_proceed = true;
			console.log("CN"+this.counter+" CPRO"+this.can_proceed);
			return;
		}, this);
		}
	}
	end() {
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = false;
	}
};
let SettingsValues = {
	Difficulty:1, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss:1000, //chance if instant loss per day
	MoneyCostIncrease:1, //value to multiply costs with, easy = 0,5, medium = 1, hard = 1,5
};

function Settings(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.setnewcolor("#333399");
	canvasobj.text("Settings", 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.text("Difficulty", 50, 100);
	canvasobj.text("Cost Multiplier", 50, 150);
	canvasobj.text("Chance of loss", 50, 200);
	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}
function Credits(canvasobj) {
	canvasobj.setnewcolor("purple");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	//images of katowice and stuff, music = waltz vivace!
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	Credits(canvasobj);
}
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
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, "Yet another wonderful day.\nLet's read the news!");
	FirstDialogue.makeBubble(1, "Crap. The Slovaks have rebelled and they also are just a\nfew kilometers away from Hranice!");
	FirstDialogue.makeBubble(2, "How is this possible? The Czechs will start conscription\nsoon!");
	FirstDialogue.makeBubble(3, "I must escape! But where do I go? I think Poland might be\na safe bet and it's the simplest to get to.");
	FirstDialogue.makeBubble(4, "It's not like I have a choice anyway - Germany is too far\naway and too expensive and Austria is not much better.");
	FirstDialogue.makeBubble(5, "Poland it is then!");	
	
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
	cook.draw(110, 110, 0.5, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}

function HraniceNaMoraveRestauraceJob(canvas) {
	console.log("hnm restaurace brig");
	
}
let GamePaused = false;
let AllowedToPause = true;

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		GamePaused = false;
		Pause.buttonAudio.deleteButton();
		Pause.buttonRestart.deleteButton();
		Pause.buttonCode.deleteButton();
		Pause.buttonSave.deleteButton();
		Pause.buttonLoad.deleteButton();
		Pause.buttonQuit.deleteButton();
		switch(LocationId) {
		case 1:
			switch(LocalLocationId) {
			case 0:
				HraniceNaMoraveDomov(canvasobj);	
				break;
			case 1:
				HraniceNaMoraveNamesti(canvasobj);	
				break;
			case 2:
				HraniceNaMoraveNadrazi(canvasobj);
				break;
			case 3:
				HraniceNaMoraveNastupiste(canvasobj);
				break;
			case 4:
				HraniceNaMoraveRestaurace(canvasobj);
				break;
			}
		}
		return;	
	}
	if(!AllowedToPause) { return; }
	GamePaused = true;
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(300, 50, 400, 400);
	canvasobj.setnewcolor("#333399");
	
	canvasobj.setnewfont("Arial, FreeSans", "48");
	canvasobj.text("Game paused", 320, 100);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	
	Pause.buttonAudio = new Button(320, 130, 100, 100, 25, "", "canvas_container");
	Pause.buttonRestart = new Button(420, 130, 100, 100, 25, "Restart Track", "canvas_container");
	Pause.buttonCode = new Button(520, 130, 100, 100, 25, "View source code", "canvas_container");
	Pause.buttonSave = new Button(320, 230, 100, 100, 25, "Save Game", "canvas_container");
	Pause.buttonLoad = new Button(420, 230, 100, 100, 25, "Load Game", "canvas_container");
	Pause.buttonQuit = new Button(520, 230, 100, 100, 25, "Exit Game", "canvas_container");
	
	if(ap.allowed) { Pause.buttonAudio.changeText("Disable audio"); }
	else { Pause.buttonAudio.changeText("Enable audio"); }
	
	Pause.buttonAudio.button.addEventListener("click", (event) => {
		ap.toggleSound();
		if(ap.allowed) { Pause.buttonAudio.changeText("Disable audio"); }
		else { Pause.buttonAudio.changeText("Enable audio"); }
	});	
	Pause.buttonRestart.button.addEventListener("click", (event) => {
		ap.resetTrack();
	});
	Pause.buttonCode.button.addEventListener("click", (event) => {
		window.open("https://www.github.com/MegapolisPlayer/EscapeGameJS", "_blank");
	});
	Pause.buttonSave.button.addEventListener("click", (event) => {
		Save();
	});
	Pause.buttonLoad.button.addEventListener("click", (event) => {
		Load(canvasobj);
	});
	Pause.buttonQuit.button.addEventListener("click", (event) => {
		location.reload();
	});
	
	canvasobj.textml("Press escape or click the\nbutton again to unpause.", 320, 380);
	canvasobj.setnewfont("Arial, FreeSans", "48");
}

function SetState(filecontent, canvas) {
	console.log("SetState");
	let Children = document.getElementsByClassName("CanvasInputElement");

	while(Children[0]) {
   		Children[0].parentNode.removeChild(Children[0]);
	}
	
	canvas.clear("purple");

	//file, split with spaces
	//info - location id, local location id, money, difficulty
	let Data = filecontent.split('\n');
	console.log(Data); //load using SetState() function!
}

function Save(locationId, localLocationId, difficulty, money) {
	let finalizedSave = "eors1 ";
	finalizedSave+=difficulty;
	finalizedSave+=" ";
	finalizedSave+=locationId;
	finalizedSave+=" ";
	finalizedSave+=localLocationId;
	finalizedSave+=" ";
	finalizedSave+=money;
	
	let hiddenAddrElem = document.createElement('a');
    hiddenAddrElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalizedSave));
    hiddenAddrElem.setAttribute('download', "save.eors");
    hiddenAddrElem.style.display = 'none';
	
    document.body.appendChild(hiddenAddrElem);
    hiddenAddrElem.click();
    document.body.removeChild(hiddenAddrElem);
}

function Load(canvasobj) {
	let hiddenInputElem = document.createElement("input");
	hiddenInputElem.id="fileuploaded";
	hiddenInputElem.type = "file";
	hiddenInputElem.accept = ".eors";
	
	if(document.getElementById("fileuploaded") === null) {
		//no file
		console.log("uhhh");
	}
	else {
		//yes file
   		let fileInfo = event.target.files[0]; 
		let reader = new FileReader();
   		reader.readAsText(fileInfo, "UTF-8");
		reader.onload = (event) => {
			SetState(event.target.result, canvasobj);
		}
		reader.onerror = (event) => {
			canvasobj.setnewcolor("#ff0000");
			canvasobj.text("Error: Could not load file!", 100, 100);
			canvasobj.setnewcolor("#333399");
		}
		hiddenInputElem.click();
	}
}

if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial, FreeSans", "48", "#333399", 1000, 500);
cvs.clear("purple");

const MainMenuImage = new Image();
MainMenuImage.src = "res/MainMenu.jpg";
MainMenuImage.onload = MainMenu;

let mainMenuButtons = [];

function MainMenu() {
	cvs.clear("purple");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	
	mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "canvas_container"));
	mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "canvas_container"));
	mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "canvas_container"));
	mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "canvas_container"));
	mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "canvas_container"));

	mainMenuButtons[0].setCallback("AudioEnabler()");
	mainMenuButtons[1].setCallback("ap.resetTrack()");
	
	mainMenuButtons[2].setCallback("ButtonsRouter(0)");
	mainMenuButtons[3].setCallback("ButtonsRouter(1)");
	mainMenuButtons[4].setCallback("ButtonsRouter(2)");
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	chr.draw(300, 300, 0.3, cvs);	
	cvs.setfontweight("bold");
	cvs.text("Escape from the Olomouc Region", 50, 50);	
	cvs.resetfontweight();
}

//play menu

function PlayMenu() {
	//cvs.clear("purple");
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text("Play", 50, 50);
	
	cvs.setnewfont("Arial, FreeSans", "32");
	let buttonNew = new Button(50, 130, 300, 100, 25, "New Game", "canvas_container");
	let buttonSave = new Button(350, 130, 300, 100, 25, "Load Game", "canvas_container");
	let buttonBack = new Button(650, 130, 300, 100, 25, "Back", "canvas_container");
	
	buttonNew.button.addEventListener("click", (event) => {
		buttonNew.deleteButton();
		buttonSave.deleteButton();
		buttonBack.deleteButton();
		Intro();
	});
	buttonSave.button.addEventListener("click", (event) => {
		buttonNew.deleteButton();
		buttonSave.deleteButton();
		buttonBack.deleteButton();
		Load();
	});
	buttonBack.button.addEventListener("click", (event) => {
		buttonNew.deleteButton();
		buttonSave.deleteButton();
		buttonBack.deleteButton();
		MainMenu();
	});
	
	
}

//game stuff

function Intro() {
    console.log("Registered PLAY Button press!");
	ap.playTrack(1);
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text("Backstory", 50, 50);
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml("It is the 1st of May 1997 and the Slovak minority has just\n"
                +"declared independence from the young republic of Czechia.\n\n"
                +"With the support of the Slovak Republic the separatists are\n"
                +"now pushing deep into the Moravian heartlands. They have\n"
                +"also poisoned the Bečva river along the way and are now\n"
                +"standing just a few kilometers away from Hranice.\n\n"
                +"It is time to escape.\n"
    , 100, 100);
	
	introarrow1 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow1.setCallback("MapSceneLoad(introarrow1)");
    introarrow1.draw(cvs);
}

function MapSceneLoad(arrowobj) {
	arrowobj.deleteButton();
	cvs.clear("purple");
    const mapimage = new Image();
	mapimage.src = "res/map1.png";
	mapimage.onload = MapScene; 
}
function MapScene() {
	cvs.image(this, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setfontweight("bold");
	cvs.textml("Day 1\nHranice na Morave", 50, 50);
	cvs.resetfontweight();
	cvs.setnewcolor("#000000");
	introarrow2 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow2.setCallback("StartMainGame(introarrow2)");
    introarrow2.draw(cvs);
}
function StartMainGame(arrowobj) {
    arrowobj.deleteButton();
	AllowedToPause = false;
	window.addEventListener("keydown", (event) => {
		if(event.key == "Escape") {
			Pause(cvs);
		}
	});	
    HraniceNaMoraveLoad(cvs);
}

//main menu stuff

function ButtonsRouter(buttonid) {
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
	mainMenuButtons.length = 0;
	switch(buttonid) {
		case 0:
			PlayMenu();
		break;
		case 1:
			Settings(cvs);
		break;
		case 2:
			Credits(cvs);
		break;
	}
}

//audio toggle button

function AudioEnabler() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText("Disable audio");
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText("Enable audio");
	 }
}
