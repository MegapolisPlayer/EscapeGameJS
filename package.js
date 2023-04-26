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
		this.button.setAttribute("onclick", this.callbackname+"()");
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
    constructor(xoffset, yoffset, width, height, fontsize, text, callbackname, container_id) {
		this.button = document.createElement("button");
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.width = width;
        this.height = height;
        this.fontsize = fontsize;
        this.text = text;
		this.buttontext = document.createTextNode(this.text);
        this.callbackname = callbackname;
		
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
		this.button.setAttribute("onclick", this.callbackname+"()");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		canvasobj.canvas.appendChild(this.button);
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
	//image id of type ArrowDirections
	constructor(xoffset, yoffset, width, height, imageId, callbackname, canvasobj) {
		this.button = document.createElement("button");
		this.imageId = imageId;
		this.callbackname = callbackname;
		
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
	}
	playNextTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[(this.audioTrackCounter) - 1].pause();
		}
		if(this.audioTrackCounter >= this.audioTracks.length) {
			this.audioTrackCounter = 0;
		}
		this.audioTracks[this.audioTrackCounter].play();
		this.audioTrackCounter++;
	}
	playTrack(id) {
		if(id >= this.audioTracks.length) {
			console.error("AudioPlayer: Out of bounds.");
			return;
		}
		if(this.audioTrackCounter > 0) {
			this.audioTracks[(this.audioTrackCounter) - 1].pause();
		}
		this.audioTracks[id].play();
	}
	resetTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[this.audioTrackCounter - 1].pause();
			this.audioTracks[this.audioTrackCounter - 1].currentTime = 0;
			this.audioTracks[this.audioTrackCounter - 1].play();
		}
	}
};
function HraniceNaMorave() {
    console.log("Hranice na Morave START");
}
if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial", "48", "#333399", 1000, 500);
const ap = new AudioPlayer();

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = mydrawImage;

let mainMenuButtons = [];

function mydrawImage() {
	cvs.context.drawImage(this, 0, 0, this.width, this.height);
	cvs.text("Útěk z Olomouckého kraje", 50, 50);
}

function PlayButtonRegister() {
    console.log("Registered PLAY Button press!");
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.text("Backstory", 50, 50);
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
    mainMenuButtons[1].changeText();
    myarrow1 = new Arrow(200, 100, 100, 100, 1, "ArrowRegister1", cvs);
    myarrow1.draw(cvs);
    cvs.setnewfont("Arial", "32");
    cvs.textml("It is the 1st of May 1997 and the Slovak minority has just\n"
                +"declared independence from the young republic of Czechia.\n\n"
                +"With the support of the Slovak Republic the separatists are\n"
                +"now pushing deep into the Moravian heartlands. They have\n"
                +"also poisoned the Bečva river along the way and are now\n"
                +"standing just a few kilometers away from Hranice.\n\n"
                +"It is time to escape.\n"
    , 100, 100);
    HraniceNaMorave();
}
function SettingsButtonRegister() {
	console.log("Registered SETTINGS Button press!");
}
function CreditsButtonRegister() {
	console.log("Registered CREDITS Button press!");
}
function ArrowRegister1() {
    console.log("Registered arrow1 press!");
}

function apNextTrackButtonWrap() {
	mainMenuButtons[0].changeText("Disable audio");
	ap.playNextTrack();
}

//Main code

mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "apNextTrackButtonWrap", "canvas_container"));
mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "ap.resetTrack", "canvas_container"));
mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "PlayButtonRegister", "canvas_container"));
mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "SettingsButtonRegister", "canvas_container"));
mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "CreditsButtonRegister", "canvas_container"));
