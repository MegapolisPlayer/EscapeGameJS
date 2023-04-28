//Canvas object
class Canvas {
    constructor(id, font, fontsize, color, x, y) {
        this.canvas = document.getElementById(id);
		this.canvas.width = x;
		this.canvas.height = y;
        this.context = this.canvas.getContext("2d");
        this.color = color;
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
    setnewfont(font, fontsize) {
        this.context.font = fontsize+"px "+font;
    }
    //draw box
    box(x1, y1, width, height) {
        this.context.fillRect(x1, y1, width, height);
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
	//clears the canvas color
    clear() {
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    //clears the canvas color
    clear(newcolor) {
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
		this.button.setAttribute("class", "CanvasButton");
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
	Left: 4
}

const ArrowImages = [];
for(let ArrowImagesId = 0; ArrowImagesId < 5; ArrowImagesId++) {
	ArrowImages.push(new Image());
}

//arrow images
ArrowImages[0].src = "res/arrow_top.png";
ArrowImages[1].src = "res/arrow_up.png";
ArrowImages[2].src = "res/arrow_right.png";
ArrowImages[3].src = "res/arrow_down.png";
ArrowImages[4].src = "res/arrow_left.png";

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
		
		this.button.setAttribute("class", "CanvasArrow");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		canvasobj.canvas.parentElement.appendChild(this.button);
        canvasobj.context.drawImage(ArrowImages[this.imageId], this.xoffset, this.yoffset, this.width, this.height);
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
	setCallback(callback) {
		this.button.setAttribute("onclick", callback);
	}
	//image id of type ArrowDirections
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
		this.audioTrackCounter = 0;
		this.allowed = false;
	}
	playNextTrack() {
		if(this.allowed === false) { return; }
		this.audioTracks[this.audioTrackCounter].pause();
		if(this.audioTrackCounter >= this.audioTracks.length) {
			this.audioTrackCounter = 0;
		}
		this.audioTracks[this.audioTrackCounter].play();
		this.audioTrackCounter++;
	}
	playTrack(id) {
		if(this.allowed === false) { return; }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let Character = new Image();
Character.src = "res/Character.png";

function dialogueMakeBox(canvasobj) {
	canvasobj.box(20, (canvasobj.canvas.height * 0.8) + 20, canvasobj.canvas.width - 40,canvasobj.canvas.height - 40);
}
function dialogueMakeText(canvasobj, text) {
	canvasobj.textml(text, 30, (canvasobj.context.height * 0.8) - 10);
}
function Settings(canvasobj) {
	console.log("Registered SETTINGS Button press!");
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
}
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
	dialogueMakeText(canvas, "Crap. The Slovaks have rebelled and they also are just\m"
							+"a few kilometers away from Hranice!");
	await sleep(1000);
	dialogueMakeText(canvas, "How is this possible? The czechs will start conscription\n"
							+"soon!");
	await sleep(1000);
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
function Credits(canvasobj) {

}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
}
if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial", "48", "#333399", 1000, 500);

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = MainMenu;

let mainMenuButtons = [];

function MainMenu() {
	cvs.image(this, 0, 0, this.width, this.height);
	cvs.text("Útěk z Olomouckého kraje", 50, 50);
}

function PlayButtonRegister() {
    console.log("Registered PLAY Button press!");
	ap.playTrack(1);
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.text("Backstory", 50, 50);
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
    mainMenuButtons[1].changeText();
    cvs.setnewfont("Arial", "32");
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

//game sutff

function MapSceneLoad(arrowobj) {
	arrowobj.deleteButton();
    const mapimage = new Image();
	mapimage.src = "res/map1.png";
	mapimage.onload = MapScene;
}
function MapScene() {
	cvs.image(this, 0, 0, cvs.canvas.width, cvs.canvas.height);
	introarrow2 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow2.setCallback("StartMainGame(introarrow2)");
    introarrow2.draw(cvs);
}
function StartMainGame(arrowobj) {
    arrowobj.deleteButton();
    HraniceNaMoraveLoad(cvs);
}

function apWrap() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText("Disable audio");
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText("Enable audio");
	 }
}

//Main code

mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "canvas_container"));
mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "canvas_container"));
mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "canvas_container"));
mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "canvas_container"));
mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "canvas_container"));

mainMenuButtons[0].setCallback("apWrap()");
mainMenuButtons[1].setCallback("ap.resetTrack()");
mainMenuButtons[2].setCallback("PlayButtonRegister()");
mainMenuButtons[3].setCallback("SettingsButtonRegister()");
mainMenuButtons[4].setCallback("CreditsButtonRegister()");
