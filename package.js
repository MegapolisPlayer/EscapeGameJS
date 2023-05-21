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
	//sets the text alignment
	setalign(align) {
		this.context.textAlign = align;
	}
	//resets the text alignment
	resetalign(align) {
		this.context.textAlign = "left";
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
	//draws text border
	textborder(text, xoffset, yoffset) {
		this.context.strokeText(text, xoffset, yoffset);
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
			return;
		}
        this.context.fillStyle = newcolor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.color;
    }
	loadingMsg() {
        let colorstorage = this.context.fillStyle;
		let fontstorage = this.context.font;
		
		this.context.fillStyle = "purple";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.context.fillStyle = "white";
		this.context.font = "bold 48px Arial, FreeSans";
		this.text("Loading...", 100, 100);
		
        this.context.fillStyle = colorstorage;
		this.context.font = fontstorage;
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

//Arrow/Symbol object

const ArrowDirections = {
	Center: 0,
	Up: 1,
	Right: 2,
	Down: 3,
	Left: 4,
	Pause: 5,
	Yes: 6,
	No: 7,
	Here: 8
}

const ArrowImages = [];
let ArrowImagesLoaded = 0;
for(let Id = 0; Id < 9; Id++) {
	ArrowImages.push(new Image());
	ArrowImages[Id].onload = () => { ArrowImagesLoaded++; };
}

//arrow images
ArrowImages[0].src = "res/arrow_top.png";
ArrowImages[1].src = "res/arrow_up.png";
ArrowImages[2].src = "res/arrow_right.png";
ArrowImages[3].src = "res/arrow_down.png";
ArrowImages[4].src = "res/arrow_left.png";
ArrowImages[5].src = "res/pause.png";	
ArrowImages[6].src = "res/yes.png";
ArrowImages[7].src = "res/no.png";
ArrowImages[8].src = "res/arrow_here.png";

class Arrow {
    insert(canvasobj) {
		if((typeof this.button === "undefined")) { 
			console.error("Arrow: Object not initialized.");
			return;
		}
		if((typeof canvasobj === "undefined")) { 
			console.error("Arrow: Argument to function not provided.");
			return;
		}
		
		this.button.setAttribute("class", "CanvasArrow CanvasInputElement Invisible");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		if(canvasobj !== null) {
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
		if((typeof this.button === "undefined")) { 
			console.error("Arrow: Object not initialized.");
			return;
		}
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
	newOffset(newxo, newyo) {
		this.xoffset = newxo;
		this.yoffset = newyo;
	}
	newXOffset(newxo) {
		this.xoffset = newxo;
	}
	newYOffset(newyo) {
		this.yoffset = newyo;
	}
	//image id of type ArrowDirections - set canvasobj to null if don't want to draw immediately
	constructor(xoffset, yoffset, width, height, imageId, canvasobj) {
		this.button = document.createElement("button"); //new button, no need to del event listeners
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
		this.audioTrackCounter = 0;
		this.audioTracks.push(new Audio("res/music/Stormfront.mp3"));             //main menu
		this.audioTracks.push(new Audio("res/music/Faceoff.mp3"));                //intro
		this.audioTracks.push(new Audio("res/music/ImpendingBoom.mp3"));          //hranice
		this.audioTracks.push(new Audio("res/music/Nerves.mp3"));                 //prerov
		this.audioTracks.push(new Audio("res/music/LateNightRadio.mp3"));         //nemcice nad hanou
		this.audioTracks.push(new Audio("res/music/BlueFeather.mp3"));            //prostejov
		this.audioTracks.push(new Audio("res/music/FailingDefense.mp3"));         //olomouc
		this.audioTracks.push(new Audio("res/music/RoyalCoupling.mp3"));          //studenka
		this.audioTracks.push(new Audio("res/music/TheParting.mp3"));             //ostrava
		this.audioTracks.push(new Audio("res/music/StartingOutWaltzVivace.mp3")); //credits, ending
		this.audioTracks.push(new Audio("res/music/AlmostBliss.mp3"));            //waiter minigame
		this.audioTracks.push(new Audio("res/music/PorchSwingDays.mp3"));         //fishing
		for(let Id = 0; Id < 12; Id++) {
			this.audioTracks[Id].loop = true;
		}
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

let MoneyAmount = 0;

//todo: red if in debt, if more than certain amount of debt - lose the game instantly

function drawMoneyCount(canvasobj) {
	if(MoneyAmount < -100) {
		//lose instantly
		
	}
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.setnewcolor("#ffffff");
	let text = TranslatedText[SettingsValues.Language][51]+": "+MoneyAmount+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	if(MoneyAmount >= 1000) {
		canvasobj.setnewcolor("#298600");
	}
	else if(MoneyAmount >= 0) {
		canvasobj.setnewcolor("#333399");
	}
	else {
		canvasobj.setnewcolor("#800000");
	}
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}

function addMoney(amount) {
	MoneyAmount += amount;
}

function removeMoney(amount) {
	MoneyAmount -= amount;
}

function setMoney(amount) {
	MoneyAmount = amount;
}
class Character {
	constructor(source) {
		this.image = new Image();
		this.image.src = source;
		this.image.onload = this.setisloaded;
		this.loaded = false;
		this.button = document.createElement("button");
		this.haseventlistener = false;
	}
	draw(xoffset, yoffset, scale, canvasobj) {
		canvasobj.image(this.image, xoffset, yoffset, this.image.width * scale, this.image.height * scale);
		this.button.setAttribute("class", "CanvasArrow CanvasInputElement Invisible");
		this.button.style.setProperty("width", (this.image.width * scale)+"px");
		this.button.style.setProperty("height", (this.image.height * scale)+"px");
		this.button.style.setProperty("left", xoffset+"px");
		this.button.style.setProperty("top", yoffset+"px");
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
	deleteButton() {
		this.button.remove();
	}
	setisloaded() {
		this.loaded = true;
	}
	resetEventListeners() {
		var newElem = this.button.cloneNode(true);
		this.button.parentNode.replaceChild(newElem, this.button);
		this.button = newElem;
	}
};
let chr = new Character("res/Character.png");
let cook = new Character("res/Cook.png");
let traindriver = new Character("res/TrainDriver.png");

class Dialogue {
	constructor() {
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = true;
		this.choice_result = -1;
	}
	begin(canvasobj) {
		this.canvas_info = canvasobj;
		AllowedToPause = false;
	}
	makeBox() {
		this.canvas_info.setlinethickness(5);
		this.canvas_info.boxborder(20, (this.canvas_info.canvas.height * 0.8), this.canvas_info.canvas.width - 40,  (this.canvas_info.canvas.height * 0.2));
	}
	makeText(text) {
		this.canvas_info.textml(text, 30, (this.canvas_info.canvas.height * 0.8) + 30);
	}
	makeBubble(id, text, textcolor = "black") {
		if(!(this.can_proceed && this.counter === id)) {
   			setTimeout(this.makeBubble.bind(this), 100, id, text, textcolor);
			return;
  		}
		else { this.can_proceed = false; }
		let dlgInputElems = document.getElementsByClassName("DialogueArrow"); //remove all at beginning to avoid duplicates
		while(dlgInputElems[0]) {
		  	dlgInputElems[0].parentNode.removeChild(dlgInputElems[0]);
		}
		this.canvas_info.setnewcolor("white");
		this.makeBox();
		this.canvas_info.setnewcolor(textcolor);
		this.makeText(text);
		let NextArrow = new Arrow(this.canvas_info.canvas.width - 140, (this.canvas_info.canvas.height * 0.8) + 10, 100, 100, ArrowDirections.Right, this.canvas_info);
		NextArrow.button.setAttribute("class", NextArrow.button.getAttribute("class")+" DialogueArrow");
		NextArrow.button.addEventListener("click", () => {
			this.counter++;
			this.can_proceed = true;
			NextArrow.deleteButton();
		}, this, { once: true });
	}
	makeChoice(id) {
		if(!(this.can_proceed && this.counter === id)) {
   			setTimeout(this.makeChoice.bind(this), 100, id);
			return;
  		}
		else {
			this.can_proceed = false;
		}
		this.choice_result = -1;
		let dlgInputElems = document.getElementsByClassName("DialogueArrow"); //remove all at beginning to avoid duplicates
		while(dlgInputElems[0]) {
		  	dlgInputElems[0].parentNode.removeChild(dlgInputElems[0]);
		}
		this.canvas_info.setnewcolor("white");
		this.makeBox();
		let YesButton = new Arrow(40, (this.canvas_info.canvas.height * 0.8), 100, 100, ArrowDirections.Yes, this.canvas_info);
		let NoButton = new Arrow(this.canvas_info.canvas.width - 140, (this.canvas_info.canvas.height * 0.8), 100, 100, ArrowDirections.No, this.canvas_info);
		
		YesButton.button.setAttribute("class", YesButton.button.getAttribute("class")+" DialogueArrow");
		NoButton.button.setAttribute("class", NoButton.button.getAttribute("class")+" DialogueArrow");		
		
		YesButton.button.addEventListener("click", () => {
			this.choice_result = 1;
		}, this, { once: true });
		NoButton.button.addEventListener("click", () => {
			this.choice_result = 0;
		}, this, { once: true });
		
		let thisInterval = window.setInterval((dialogue) => {
			if(this.choice_result !== -1) {
				clearInterval(thisInterval);
				YesButton.deleteButton();
				NoButton.deleteButton();
				dialogue.counter++;
				dialogue.can_proceed = true;	
			}
		}, 100, this, { once: true });
	}
	end() {
		let dlgInputElems = document.getElementsByClassName("DialogueArrow"); //remove all at beginning to avoid duplicates
		while(dlgInputElems[0]) {
		  	dlgInputElems[0].parentNode.removeChild(dlgInputElems[0]);
		}
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = false;
	}
};
//Codes
//Czech - CZ
//English - EN
//Russian - RU
//German - DE
//Skolstina - AL

let TranslatedText = [];
let AmountTranslations = 0;

function TranslationLoad(lang, lid) {
	TranslatedText.push([]);
	let req = new XMLHttpRequest();
	req.open("GET", "lang/text"+lang+".txt");
	req.onload = (event) => {
		let splittext = req.responseText.split('\n');
		for(let Id = 0; Id < splittext.length; Id++) {
			splittext[Id] = splittext[Id].replaceAll('\r', ''); //for windows compatibility
			if(splittext[Id].length !== 0) {
				(TranslatedText[lid]).push(splittext[Id]);
			}
		}
		AmountTranslations++;
		console.log("Language code "+lang+": ");
		console.log(TranslatedText[lid]);
	}
	req.send();
}

function TranslationGetMultipleLines(lid, idf, amount) {
	let tempResult = "";
	for(let Id = 0; Id < amount; Id++) {
		tempResult += TranslatedText[lid][idf + Id];
		tempResult += '\n';
	}
	return tempResult;
}
let TimerValues = {
	StartTime: 0,
	CurrentTime: 0,
	PauseStartTime: 0,
	OverallPauseTime: 0,
	OverallTime: 0
}

function timerStart() {
	TimerValues.StartTime = Date.now();
}
function timerPause() {
	TimerValues.PauseStartTime = Date.now();
}
function timerUnpause() {
	TimerValues.CurrentTime = Date.now();
	TimerValues.OverallPauseTime += Math.abs(Number(TimerValues.CurrentTime) - Number(TimerValues.PauseStartTime));
	TimerValues.PauseStartTime = 0;
}
function timerEnd() {
	TimerValues.CurrentTime = Date.now();
	TimerValues.OverallTime = Math.floor((Math.abs(Number(TimerValues.CurrentTime) - Number(TimerValues.StartTime)) - Number(TimerValues.OverallPauseTime)) / 1000);
}
function timerToString() {
	return String(Math.floor(TimerValues.OverallTime / 60) + ":" + String("00" + Number(TimerValues.OverallTime % 60) ).slice(-2) + " ([M]M:SS)");
}

let TimerlimitValues = {
	TimeLimit: 0,
	StartTime: 0,
	CurrentTime: 0,
	OverallTime: 0
}

function timelimitStart(minutes, seconds) {
	TimerlimitValues.StartTime = Date.now();
	TimerlimitValues.TimeLimit = (minutes * 60) + seconds;
}
function timelimitStart(seconds) {
	TimerlimitValues.StartTime = Date.now();
	TimerlimitValues.TimeLimit = seconds;
}
function timelimitUpdate() {
	TimerlimitValues.CurrentTime = Date.now();
	TimerlimitValues.OverallTime = Math.floor(Math.abs(Number(TimerlimitValues.CurrentTime) - Number(TimerlimitValues.StartTime)) / 1000);
}
function timelimitToString() {
	timelimitUpdate();
	return String(
		Number(Math.floor((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) / 60))
		+ ":" + String("00" + 
		Number((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) % 60)
		).slice(-2));
}
function timelimitToNumber() {
	timelimitUpdate();
	return Number(
			Math.floor((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) / 60)
			+ ":" + String("00" + Number((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) % 60)).slice(-2)
		);
}
function timelimitRender(canvasobj) {
	timelimitUpdate();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.setnewfont("Arial, FreeSans", "32");
	let text = TranslatedText[SettingsValues.Language][94]+": "+timelimitToString()+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	if(TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime <= 10) { canvasobj.setnewcolor("#800000"); }
	else { canvasobj.setnewcolor("#333399"); }
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}
function timelimitInfo() {
	TranslatedText[SettingsValues.Language][93] + String(
		Number(Math.floor((TimerlimitValues.TimeLimit) / 60))
		+ ":" + String("00" + 
		Number((TimerlimitValues.TimeLimit) % 60)
		).slice(-2));
}

function timelimitIsDone() {
	return (TimerlimitValues.OverallTime >= TimerlimitValues.TimeLimit);
}
let SettingsValues = {
	Difficulty: 2, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss: 5000, //chance if instant loss per day, easy = 10000, medium = 5000, hard = 1000
	MoneyCostIncrease: 1, //value to multiply costs with, easy = 0,75, medium = 1, hard = 1,25
	Language: 0 //0 - English, 1 - Czech, 2 - German, 3 - Russian
};

function deleteCanvasInputElems() {
	let inputElems = document.getElementsByClassName("CanvasInputElement");
	while(inputElems[0]) {
   		inputElems[0].parentNode.removeChild(inputElems[0]);
	}
}

function randomNumber(maxRange) {
  return Math.floor(Math.random() * maxRange);
}

function InstantLossScreen(eventNo, canvasobj) {
	deleteCanvasInputElems();
	canvasobj.clear("black");
	ap.playTrack(1);
	canvasobj.resetalign(); 
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.setnewcolor("#ff0000");
	canvasobj.text(TranslatedText[SettingsValues.Language][60], 500, 100);
	canvasobj.resetfontweight();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 55+(eventNo*2), 2), 500, 200);
	InstantLossScreen.Quit = new Button(700, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][17], "canvas_container");
	InstantLossScreen.Quit.button.addEventListener("click", (event) => {
		location.reload();
	});
}

function MoneyLossScreen(canvasobj) {
	deleteCanvasInputElems();
	canvasobj.clear("black");
	ap.playTrack(1);
	canvasobj.resetalign(); 
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.setnewcolor("#ff0000");
	canvasobj.text(TranslatedText[SettingsValues.Language][60], 500, 100);
	canvasobj.resetfontweight();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 55+(eventNo*2), 2), 500, 200);
	InstantLossScreen.Quit = new Button(700, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][17], "canvas_container");
	InstantLossScreen.Quit.button.addEventListener("click", (event) => {
		location.reload();
	});
}

function CheckInstantLoss(canvasobj) {
	let eventNo = randomNumber(SettingsValues.ChanceOfInstantLoss);
	console.log("random loss event no: "+eventNo);
	if(eventNo < 5) {
		//game over!
		InstantLossScreen(eventNo, canvasobj);
	}
}

function IncrementDifficulty() {
	SettingsValues.Difficulty++;
	if(SettingsValues.Difficulty === 4) {
		SettingsValues.Difficulty = 1;
	}
}
function DecrementDifficulty() {
	SettingsValues.Difficulty--;
	if(SettingsValues.Difficulty === 0) {
		SettingsValues.Difficulty = 3;
	}
}
function IncrementLanguage() {
	SettingsValues.Language++;
	if(SettingsValues.Language === 4) {
		SettingsValues.Language = 0;
	}
}
function DecrementLanguage() {
	SettingsValues.Language--;
	if(SettingsValues.Language === -1) {
		SettingsValues.Language = 3;
	}
}

function UpdateSettingsValues() {
	switch(SettingsValues.Difficulty) {
		case 1:
		SettingsValues.ChanceOfInstantLoss = 10000;
		SettingsValues.MoneyCostIncrease = 0.75;
		break;
		case 2:
		SettingsValues.ChanceOfInstantLoss = 5000;
		SettingsValues.MoneyCostIncrease = 1;
		break;
		case 3:
		SettingsValues.ChanceOfInstantLoss = 1000;
		SettingsValues.MoneyCostIncrease = 1.25;
		break;
	}
}

function SettingsRenderDifficultyRelatedText(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(420, 150, 200, 120);
	canvasobj.box(100, 110, 200, 50);
	canvasobj.setnewcolor("#333399");
	switch(SettingsValues.Difficulty) {
		case 1:
			canvasobj.text(TranslatedText[SettingsValues.Language][13], 150, 150);
			canvasobj.text("0.75", 450, 200);
			canvasobj.text("1:10000", 450, 250);
		break;
		case 2:
			canvasobj.text(TranslatedText[SettingsValues.Language][14], 150, 150);
			canvasobj.text("1.00", 450, 200);
			canvasobj.text("1:5000", 450, 250);
		break;
		case 3:
			canvasobj.text(TranslatedText[SettingsValues.Language][15], 150, 150);
			canvasobj.text("1.25", 450, 200);
			canvasobj.text("1:1000", 450, 250);
		break;
	}
}

function SettingsRenderLanguageRelatedText(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(650, 110, 200, 50);
	canvasobj.setnewcolor("#333399");
	switch(SettingsValues.Language) {
		case 0:
			canvasobj.text("English", 700, 150);
		break;
		case 1:
			canvasobj.text("Čeština", 700, 150);
		break;
		case 2:
			canvasobj.text("Deutsch", 700, 150);
		break;
		case 3:
			canvasobj.text("Русский", 700, 150);
		break;
	}
}

function Settings(canvasobj) {	
	Settings.arrowPrev = new Arrow(50, 110, 50, 50, ArrowDirections.Left, null);
	Settings.arrowNext = new Arrow(300, 110, 50, 50, ArrowDirections.Right, null);
	Settings.buttonBack = new Button(50, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][36], "canvas_container");
	//language
	Settings.arrowPrevL = new Arrow(600, 110, 50, 50, ArrowDirections.Left, null);
	Settings.arrowNextL = new Arrow(850, 110, 50, 50, ArrowDirections.Right, null);
	
	Settings.arrowPrev.button.addEventListener("click", (event) => {
		DecrementDifficulty();
		UpdateSettingsValues();
		SettingsRenderDifficultyRelatedText(canvasobj);
	});
	Settings.arrowNext.button.addEventListener("click", (event) => {
		IncrementDifficulty();
		UpdateSettingsValues();
		SettingsRenderDifficultyRelatedText(canvasobj);
	});
	Settings.buttonBack.button.addEventListener("click", (event) => {
		Settings.arrowPrev.deleteButton();
		Settings.arrowNext.deleteButton();
		Settings.buttonBack.deleteButton();
		Settings.arrowPrevL.deleteButton();
		Settings.arrowNextL.deleteButton();
		MainMenu();
	});
	Settings.arrowPrevL.button.addEventListener("click", (event) => {
		DecrementLanguage();
		SettingsRenderLanguageRelatedText(canvasobj);
	});
	Settings.arrowNextL.button.addEventListener("click", (event) => {
		IncrementLanguage();
		SettingsRenderLanguageRelatedText(canvasobj);
	});
	
	Settings.arrowPrev.append(canvasobj);
	Settings.arrowNext.append(canvasobj);
	Settings.arrowPrevL.append(canvasobj);
	Settings.arrowNextL.append(canvasobj);
	
	canvasobj.clear("#dddddd");
	canvasobj.setfontweight("bold");
	canvasobj.text(TranslatedText[SettingsValues.Language][2], 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32", "bold");
	
	canvasobj.text(TranslatedText[SettingsValues.Language][12], 50, 100);
	
	canvasobj.text(TranslatedText[SettingsValues.Language][16], 50, 200);
	canvasobj.text(TranslatedText[SettingsValues.Language][17], 50, 250);

	canvasobj.text(TranslatedText[SettingsValues.Language][18], 650, 50);

	canvasobj.resetfontweight();

	Settings.arrowPrev.draw(canvasobj);
	Settings.arrowNext.draw(canvasobj);

	Settings.arrowPrevL.draw(canvasobj);
	Settings.arrowNextL.draw(canvasobj);
	
	UpdateSettingsValues();
	SettingsRenderDifficultyRelatedText(canvasobj);		
	SettingsRenderLanguageRelatedText(canvasobj);
	
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 26, 3), 50, 300);	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}

let CreditsValues = {
	gotAchievementSpeed: false,
	gotAchievementWaiter: false,
	gotAchievementHelp: false,
	gotAchievementSus: false
};

const finalCreditsImage = new Image();

function CreditsRenderAchievement(isdone, imageyes, imageno, canvasobj) {
	canvasobj.setfontweight("bold");
	if(isdone) {
		canvasobj.resetalign(); 
		canvasobj.image(imageyes, 350, 100, 300, 300);
		canvasobj.setalign("left"); 
		canvasobj.text(TranslatedText[SettingsValues.Language][87], 100, 300);
	}
	else {
		canvasobj.resetalign(); 
		canvasobj.image(imageno, 350, 100, 300, 300);
		canvasobj.setalign("left"); 
		canvasobj.text(TranslatedText[SettingsValues.Language][88], 100, 300);
	}
	canvasobj.resetfontweight();
}

//if iscalledfrommm true means called from main menu, dont show achievements and such
function Credits(iscalledfrommm, canvasobj) {
	timerEnd();
	deleteCanvasInputElems();
	ap.playTrack(9); //waltz vivace
	canvasobj.setnewcolor("#ffffff");
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	let delay = 2500;
		
	if(!iscalledfrommm) {
		canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslatedText[SettingsValues.Language][70], 50, 190);
		canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
	}
	else {
		canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslatedText[SettingsValues.Language][0], 50, 190);
		canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
	}

	//game by
	setTimeout(() => {
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][71], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Martin (MegapolisPlayer)\nJirka (KohoutGD)", 200, 230);
		canvasobj.resetfontweight();
	}, 1 * delay);
	
	setTimeout(() => {
		//images - main, hranice na morave, prerov
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][72], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("SReality, Pixabay, VlakemJednoduse.cz, Freepik: jcomp\nWikipedia Commons: Palickap, Marie Čchiedzeová,\nVojtěch Dočkal, Jiří Komárek, Vitezslava\nEverything else is custom-made.", 100, 230);
		canvasobj.resetfontweight();
	}, 2 * delay);	


	setTimeout(() => {
		//music
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][73], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("All music by Kevin Macleod (incompetech.com)\nLicensed under CC-BY 3.0", 100, 230);
		canvasobj.resetfontweight();
	}, 3 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][74], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Čeština - Martin\nEnglish - Martin\nDeutsch - Jirka\nРусский - Martin\nSus Language - Jirka", 100, 230);
		canvasobj.resetfontweight();
	}, 4 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][75], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Licensed under CC-BY-SA 4.0\nImages - Content License, CC-BY-SA 4.0\nMusic - CC-BY 4.0", 100, 230);
		canvasobj.resetfontweight();
	}, 5 * delay);
	
	if(!iscalledfrommm) {
		setTimeout(() => {
			//achievements
			canvasobj.resetalign(); 
			canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][76], 500, 250); 
			canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
			canvasobj.setalign("left"); 
		}, 6 * delay);
		
		setTimeout(() => {
			//achievements - medal for speed
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][77], 100, 250); 
			canvasobj.resetalign();
			canvasobj.text(TranslatedText[SettingsValues.Language][78], 500, 450); 
			canvasobj.setalign("left");
			CreditsRenderAchievement(CreditsValues.gotAchievementSpeed, AchievementImages[1], AchievementImages[0], canvasobj);
		}, 7 * delay);

		setTimeout(() => {
			//achievements - waiters medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][79], 100, 250); 
			canvasobj.resetalign();
			canvasobj.text(TranslatedText[SettingsValues.Language][80], 500, 450); 
			canvasobj.setalign("left");
			CreditsRenderAchievement(CreditsValues.gotAchievementWaiter, AchievementImages[2], AchievementImages[0], canvasobj);
		}, 8 * delay);

		setTimeout(() => {
			//achievements - help medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][81], 100, 250);
			canvasobj.resetalign();
			canvasobj.text(TranslatedText[SettingsValues.Language][82], 500, 450); 
			canvasobj.setalign("left");
			CreditsRenderAchievement(CreditsValues.gotAchievementHelp, AchievementImages[3], AchievementImages[0], canvasobj);
		}, 9 * delay);
		
		setTimeout(() => {
			//achievements - sus medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][83], 100, 250);
			canvasobj.resetalign();
			canvasobj.text(TranslatedText[SettingsValues.Language][84], 500, 450); 
			canvasobj.setalign("left");
			CreditsRenderAchievement(CreditsValues.gotAchievementSus, AchievementImages[4], AchievementImages[0], canvasobj);
		}, 10 * delay);
		setTimeout(() => {
			//time played
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][89], 50, 190); 
			canvasobj.setfontweight("bold");
			canvasobj.text(timerToString(), 100, 230);
			canvasobj.resetfontweight();
		}, 11 * delay);
	}

	setTimeout(() => {
		//quit game
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 85, 2), 100, 190); 
		window.addEventListener("click", function(event) {
			location.reload();		
		});
	}, (iscalledfrommm ? 7 : 12) * delay);
	
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(true, canvasobj); };
}

function debug_Credits(iscalledfrommm, canvasobj) {
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(iscalledfrommm, canvasobj); };
}
//waiter game

let WaiterGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	HowMuchCooking: 0,
	AmountEarned: 0,
	OrdersList: []
}

let TableImages = [];
let TableImagesLoaded = 0;
for(let Id = 0; Id < 5; Id++) {
	TableImages.push(new Image());
	TableImages[Id].onload = () => { TableImagesLoaded++ };
}

TableImages[0].src = "res/table_empty.png";
TableImages[1].src = "res/table_order.png";
TableImages[2].src = "res/table_waiting.png";
TableImages[3].src = "res/table_waiting2.png";
TableImages[4].src = "res/table_fail.png"; 

let OrderImages = [];
let OrderImagesLoaded = 0;
for(let Id = 0; Id < 2; Id++) {
	OrderImages.push(new Image());
	OrderImages[Id].onload = () => { OrderImagesLoaded++ };
}

OrderImages[0].src = "res/order.png";
OrderImages[1].src = "res/order_selected.png"; 

//orders, etc
class TableManager {
	constructor(xoffset, yoffset, width, height, canvas, tableno) {
		this.button = document.createElement("button"); //new button, no need to del event listeners
	    
		this.width = width;
		this.height = height;
		this.xoffset = xoffset;
		this.yoffset = yoffset;
		this.status = 0; //0 - std, 1 - to order, 2 - waiting (ok), 3 - waiting (should deliver), 4 - warning
		this.counter = 0;
		this.canvas_info = canvas;
		this.tableno = tableno;
		
		this.button.setAttribute("class", "CanvasInputElement MinigameElement TableButton Invisible");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		this.button.addEventListener("click", (event) => {
			switch(this.status) {
				case 1:
					//ordering, clicked
					this.status = 2;
					WaiterGameValues.HowMuchCooking++;
					this.counter = 0;
					WaiterGameValues.OrdersList.push({
						orderFrom: this.tableno,
						timeAt: (timelimitToNumber() * 10),             //seconds left converted to ticks (=ticks left) at time of starting
						forHowLongCooking: 0,                           //ticks cooking, when reaches
						forHowLongShouldCook: (80 + randomNumber(20)),  //ticks for how long to cook between 8-10s (max waiting time 13s)
						isCooked: false,                                //if has finished cooking
					});
					break;
				case 2:
				case 3:
					//waiting - recieved
					this.reset();
					WaiterGameValues.AmountEarned += 15;
					this.counter = 0;
					break;
			}
		});		
	}
	draw() {	
		this.canvas_info.image(TableImages[this.status], this.xoffset, this.yoffset, this.width, this.height);
		this.canvas_info.setnewcolor("#a55200");
		this.canvas_info.resetalign();
		this.canvas_info.text(String("00" + Number(this.tableno)).slice(-2), this.xoffset + (this.width / 2), this.yoffset + this.height);
		this.canvas_info.setalign("left");
	}
	append() {
		this.canvas_info.canvas.parentElement.appendChild(this.button);
	}
	remove() {
		this.canvas_info.canvas.parentElement.removeChild(this.button);
	}
	setstatus(status) {
		this.status = status;
	}
	//in order to avoid using timer - freq is 100ms so counter int variable - update 100x and then start waiting
	update() {
		if(this.status != 0) {
			this.counter++;
		}
		switch(this.status) {
			case 0:
				//not ordered anything, order in 25s max
				if(randomNumber(250) === 100) {
					this.status = 1;
					this.append();
				}
				break;
			case 1:
				if(this.counter >= 75) { //7.5s
					//didnt click on order fast enough
					WaiterGameValues.AmountEarned -= 15;
					this.status = 4;
					this.counter = 0;
				}
				break;
			case 2:
				if(this.counter >= 100) { //10s
					this.status = 3;
					this.counter = 0;
				}
				break;
			case 3:
				if(this.counter >= 30) { //3s
					//fail
					WaiterGameValues.AmountEarned -= 15;
					this.remove();
					this.status = 4;
					this.counter = 0;
				}
				break;
			case 4:
				if(this.counter >= 50) { //5s - cooldown, nothing allowed
					this.reset();
				}
				break;
		}
	}
	reset() {
		this.status = 0;
		this.counter = 0;
	}
};

function WaiterGame(canvas) {
	WaiterGameValues.IsOver = -1;
	console.log("waiter game");
	WaiterGameComponentIntro(canvas);
	let introInterval = window.setInterval((canvas) => {
		if(WaiterGameValues.IsIntroEnd === true) {
			clearInterval(introInterval);
			WaiterGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function WaiterGameComponentIntro(canvas) {
	canvas.clear("#dddddd");
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		WaiterGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][96], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 97, 5), 50, 100);
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#000000");
}

//table count: easy - 16, medium - 24, hard - 32

function WaiterGameComponentMain(canvas) {
	canvas.clear("#bd9d80");
	let amountToRender = ((SettingsValues.Difficulty === 3) ? 32 : (SettingsValues.Difficulty === 1) ? 16 : 24);
	let tables = [];
	for(let Id = 0; Id < amountToRender; Id++) {
		tables.push(new TableManager(
			50 + ((250/SettingsValues.Difficulty) * Math.floor(Id / 4)),
			50 + ((Id % 4) * 80), 
			60, 60, canvas, Id));
	}
	console.log(tables);
	timelimitStart(80); //1:20 min, you should get around 900-1000 depending on luck, kinda difficult but ok
	let timerInterval = window.setInterval((canvas) => {
		canvas.clear("#bd9d80");
		for(let Id = 0; Id < amountToRender; Id++) {
			tables[Id].update();
			tables[Id].draw();
		}
		canvas.setnewcolor("#555555");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#dddddd");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.height * 0.2, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#800000");
		canvas.setalign("center");
		canvas.text(WaiterGameValues.HowMuchCooking, canvas.canvas.height * 0.1, canvas.canvas.height * 0.9);
		canvas.setalign("left");
		for(let Id = 0; Id < WaiterGameValues.OrdersList.length; Id++) {
			if(!isCooked) {
				WaiterGameValues.OrdersList[Id].forHowLongCooking++;
				if(WaiterGameValues.OrdersList[Id].forHowLongCooking === WaiterGameValues.OrdersList[Id].forHowLongShouldCook) {
					WaiterGameValues.OrdersList[Id].isCooked = true;
					//add button object, selection and click on table
				}
			}
			else {
				canvas.image(OrderImages[0], canvas.canvas.width * 0.25 + (Id * canvas.canvas.width * 0.2), canvas.canvas.height * 0.2, canvas.canvas.width * 0.2, canvas.canvas.height * 0.2);
			}
		}
		canvas.setnewcolor("#000000");
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(WaiterGameValues.AmountEarned); //15Kc per order!
			WaiterGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}
function WaiterGameComponentSummary(canvas) {

}

function WaiterGameReset() {
	WaiterGameValues.IsIntroEnd = false;
	WaiterGameValues.IsOver = -1;
	WaiterGameValues.HowMuchCooking = 0;
	WaiterGameValues.AmountEarned = 0;
	WaiterGameValues.OrdersList = [];
}

//le fish game - becva in prerov

let FishGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	LeFishCaught: 0
}

function FishGame(canvas) {
	FishGameValues.LeFishCaught = 0;
	FishGameValues.IsOver = -1;
	console.log("fish game");
	canvas.clear("#03ddff");
	FishGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(FishGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			FishGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function FishGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][99], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 100, 2), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		FishGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign = "right";
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
}
function FishGameComponentMain(canvas) {
	canvas.clear("#03ddff");
	addMoney(50);
	FishGameValues.IsOver = 1;
}
function FishGameComponentSummary(canvas) {

}

function FishGameReset() {
	FishGameValues.IsIntroEnd = false;
	FishGameValues.IsOver = -1;
	FishGameValues.LeFishCaught = 0;
}

//ticket sale minigame - nezamyslice

let TicketSaleGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

//literally selection minigame - map image and random points - if correct tip (few buttons w/ text) +1 point and money

function TicketSaleGame(canvas) {
	TicketSaleGameValues.IsOver = -1;
	console.log("ticket sale game");
}

function TicketSaleGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function TicketSaleGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}
function TicketSaleGameComponentSummary(canvas) {

}

function TicketSaleGameReset() {
	TicketSaleGame.IsOver = -1;
}

//dialect translation - nezamyslice

let DialectTranslationGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DialectTranslationGame(canvas) {
	WaiterGameValues.IsOver = -1;
	console.log("waiter game");
}

function DialectTranslationGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function DialectTranslationGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}
function DialectTranslationGameComponentSummary(canvas) {

}

function DialectTranslationGameReset() {
	WaiterGameValues.IsOver = -1;
}

//cleaning

let CleaningGameValues = {
	IsOver: -1
}

function CleaningGame(canvas) {
	CleaningGameValues.IsOver = -1;
	console.log("cleaning game");
}

function CleaningGameComponentIntro(canvas) {

}
function CleaningGameComponentMain(canvas) {

}
function CleaningGameComponentSummary(canvas) {

}

function CleaningGameReset(canvas) {
	CleaningGameValues.IsOver = -1;
}

//cashier

let CashierGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function CashierGame(canvas) {
	CashierGameValues.IsOver = -1;
	console.log("cashier game");
}

function CashierGameComponentIntro(canvas) {
	
} 
function CashierGameComponentMain(canvas) {
	
}
function CashierGameComponentSummary(canvas) {
	
}

function CashierGameReset() {
	CashierGameValues.IsOver = -1;
}

//cheese making

let CheeseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function CheeseGame(canvas) {
	CheeseGameValues.IsOver = -1;
	console.log("cheese game");
}

function CheeseGameComponentIntro(canvas) {

} 
function CheeseGameComponentMain(canvas) {
	
}

function CheeseGameReset() {
	CheeseGameValues.IsOver = -1;
}

//defense

let DefenseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DefenseGame(canvas) {
	DefenseGameValues.IsOver = -1;
	console.log("defense game");
}

function DefenseGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function DefenseGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}

function DefenseGameReset() {
	DefenseGameValues.IsOver = -1;
}
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
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 1\nHranice na Moravě", 50, 50);
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
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 37, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 39, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 41, 2));
	FirstDialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 43, 2));
	FirstDialogue.makeBubble(4, TranslationGetMultipleLines(SettingsValues.Language, 45, 2));
	FirstDialogue.makeBubble(5, TranslatedText[SettingsValues.Language][47]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 6) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerStart();
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
	
	traindriver.append(canvas);
	traindriver.resetEventListeners();
	traindriver.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		ArrowToTrain.deleteButton();
		HraniceNaMoraveNastupisteJob(canvas);
	}, { once: true });
	
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
			dialogue.makeBubble(0, TranslatedText[SettingsValues.Language][141]);
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

	cook.append(canvas);
	cook.resetEventListeners();
	cook.button.addEventListener("click", (event) => {
		if(GamePaused) { return; }
		cook.deleteButton();
		ArrowToNadrazi.deleteButton();
		HraniceNaMoraveRestauraceJob(canvas);
	});
	
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
	PauseButton.deleteButton();
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 52, 2));
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 54, 2));
	dialogue.makeChoice(2);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				dialogue.makeBubble(3, TranslatedText[SettingsValues.Language][56]);
				return;
			}
			else {
				dialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 57, 2));
				return;
			}
		}
	}, 100, dialogue);
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 4) {
			dialogue.end();
			if(dialogue.choice_result === 1) {
				WaiterGame(canvas);
				return;
			}
			if(dialogue.choice_result === 0) {
				WaiterGameValues.IsOver = 0;
				return;
			}
		}
		if(WaiterGameValues.IsOver !== -1) {
			clearInterval(thisInterval);
			WaiterGameReset();
			PauseButton.append(canvas);
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
	dialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 132, 2).slice(0, -1) + " " + Math.floor(650 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	dialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 134, 2));
	dialogue.makeBubble(2, TranslatedText[SettingsValues.Language][136]);
	dialogue.makeChoice(3);
	
	let dWaitInterval = window.setInterval((dialogue) => {
		if(dialogue.choice_result !== -1) {
			clearInterval(dWaitInterval);
			if(dialogue.choice_result === 1) {
				if(MoneyAmount >= Math.floor(650 * SettingsValues.MoneyCostIncrease)) {
					if(doesHaveTicket) {
						dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][142]);
						return;
					}
					removeMoney(Math.floor(650 * SettingsValues.MoneyCostIncrease));
					doesHaveTicket = true;
					dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][137]);
					return;
				}
				else {
					dialogue.makeBubble(4, TranslationGetMultipleLines(SettingsValues.Language, 138, 2));
					return;
				}
				return;
			}
			else {
				dialogue.makeBubble(4, TranslatedText[SettingsValues.Language][140]);
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
let pre_Locations = [];
let pre_AmountLoadedImages = 0;

function PrerovImageLoaded() {
	pre_AmountLoadedImages += 1;
}

function PrerovLoad(canvas, calledbysetstate = false) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 2;
	for(let Id = 0; Id < 6; Id++) {
		pre_Locations.push(new Image());
		pre_Locations[Id].onload = PrerovImageLoaded;
	}
	pre_Locations[0].src = "res/prerov/nastupiste.jpg";
	pre_Locations[1].src = "res/prerov/nadrazi.jpg";
	pre_Locations[2].src = "res/prerov/namesti.jpg";
	pre_Locations[3].src = "res/prerov/autobus.jpg";
	pre_Locations[4].src = "res/prerov/becva.jpg";
	pre_Locations[5].src = "res/map/2.png";
	
	PrerovMap(canvas);
	//no condition for pause - either added during HnM phase or added by setstatefile
}

function PrerovMap(canvas) {
	if(pre_AmountLoadedImages != 6) {
      	window.setTimeout(PrerovMap, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
	//map scene
	ap.playTrack(3);
	canvas.setnewcolor("#333399");
	canvas.setnewfont("Arial, FreeSans", "32", "bold");
	canvas.image(pre_Locations[5], 0, 0, canvas.canvas.width, canvas.canvas.height);
	canvas.textml(TranslatedText[SettingsValues.Language][25]+" 2\nPřerov", 50, 50);
	canvas.resetfontweight();
	maparrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, canvas);
	maparrow.button.addEventListener("click", (event) => {
		maparrow.deleteButton();
		Prerov(canvas);
	});
    maparrow.draw(canvas);
}

function Prerov(canvas) {
    console.log("Prerov START "+pre_AmountLoadedImages);
	CheckInstantLoss(canvas);
	
	canvas.image(pre_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(830, 150, 0.5, canvas);
	traindriver.draw(550, 150, 0.5, canvas);
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 143, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 145, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 147, 2).slice(0, -1) + " " + Math.floor(1220 * SettingsValues.MoneyCostIncrease) + " " + TranslatedText[SettingsValues.Language][90]);
	FirstDialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 149, 2));
	FirstDialogue.makeBubble(4, TranslatedText[SettingsValues.Language][151]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 5) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;
			timerUnpause();	
			PrerovNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function PrerovNastupiste(canvas) {
	console.log("pre nastupiste");
	localLocationId = 0;
	canvas.image(pre_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(830, 150, 0.5, canvas);
	traindriver.draw(550, 150, 0.5, canvas);	
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
    	PrerovNadrazi(canvas);
	}, { once: true });
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovNadrazi(canvas) {
	console.log("pre nadrazi");
	localLocationId = 1;
	let ArrowToNastupiste = new Arrow(450, 400, 100, 100, ArrowDirections.Down, canvas);
	let ArrowToNamesti = new Arrow(600, 300, 100, 100, ArrowDirections.Up, canvas);
	ArrowToNastupiste.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	PrerovNastupiste(canvas);
	}, { once: true });
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNastupiste.deleteButton();
		ArrowToNamesti.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	canvas.image(pre_Locations[1], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(300, 420, 0.4, canvas); //426 = 500 - 64, for character image drawing
	ArrowToNastupiste.draw(canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovNamesti(canvas) {
	console.log("pre namesti");
	localLocationId = 2;
	let ArrowToNadrazi = new Arrow(100, 400, 100, 100, ArrowDirections.Down, canvas);
	let ArrowToAutobus = new Arrow(100, 300, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToBecva = new Arrow(600, 400, 100, 100, ArrowDirections.Right, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovNadrazi(canvas);
	}, { once: true });
	ArrowToAutobus.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovAutobus(canvas);
	}, { once: true });
	ArrowToBecva.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
		ArrowToAutobus.deleteButton();
		ArrowToBecva.deleteButton();
    	PrerovBecva(canvas);
	}, { once: true });
	canvas.image(pre_Locations[2], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(426, 300, 0.3, canvas);
	ArrowToNadrazi.draw(canvas);
	ArrowToBecva.draw(canvas);
	ArrowToAutobus.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovAutobus(canvas) {
	console.log("pre autobus");
	localLocationId = 3;
	let ArrowToNamesti = new Arrow(0, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	canvas.image(pre_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(150, 290, 0.35, canvas);
	ArrowToNamesti.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovBecva(canvas) {
	console.log("pre becva");
	localLocationId = 4;
	let ArrowToNamesti = new Arrow(50, 350, 100, 100, ArrowDirections.Left, canvas);
	let ArrowToBecvaJob = new Arrow(320, 370, 50, 50, ArrowDirections.Here, canvas);
	ArrowToNamesti.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToBecvaJob.deleteButton();
    	PrerovNamesti(canvas);
	}, { once: true });
	ArrowToBecvaJob.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNamesti.deleteButton();
		ArrowToBecvaJob.deleteButton();
    	PrerovBecvaJob1(canvas);
	}, { once: true });
	canvas.image(pre_Locations[4], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(170, 320, 0.25, canvas);
	ArrowToNamesti.draw(canvas);
	ArrowToBecvaJob.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
	RenderStatus(canvas);
}
function PrerovBecvaJob1(canvas) {
	AllowedToPause = false;
	PauseButton.deleteButton();
	FishGame(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(FishGameValues.IsOver !== -1) {
			clearInterval(thisInterval);
			FishGameReset();
			PauseButton.append(canvas);
			AllowedToPause = true;
			PrerovBecva(canvas);
		}
	}, 100, canvas);
}
function NezamysliceImageLoaded() {

}

function NezamysliceLoad(canvas) {

}

function NezamysliceMap(canvas) {

}

function Nezamyslice(canvas) {

}

function NezamysliceNastupiste(canvas) {

}

function NezamysliceNadrazi(canvas) {

}

function NezamyslicePodnikVenek(canvas) {

}

function NezamyslicePodnikVnitrek(canvas) {

}

function NezamysliceZachody(canvas) {

}

function NezamyslicePodnikVnitrekJob(canvas) {

}

function NezamysliceZachodyJob(canvas) {

}
let GamePaused = false;
let AllowedToPause = true;

function SetState(canvasobj) {
	deleteCanvasInputElems(); //local functions will remake
	PauseButton.append(canvasobj);
	switch(locationId) {
		case 1:
			switch(localLocationId) {
				case 0:
					HraniceNaMoraveDomov(canvasobj);	
					return;
				case 1:
					HraniceNaMoraveNamesti(canvasobj);	
					return;
				case 2:
					HraniceNaMoraveNadrazi(canvasobj);
					return;
				case 3:
					HraniceNaMoraveNastupiste(canvasobj);
					return;
				case 4:
					HraniceNaMoraveRestaurace(canvasobj);
					return;
			}
		case 2:
			switch(localLocationId) {
				case 0:
					PrerovNastupiste(canvasobj);	
					return;
				case 1:
					PrerovNadrazi(canvasobj);	
					return;
				case 2:
					PrerovNamesti(canvasobj);
					return;
				case 3:
					PrerovAutobus(canvasobj);
					return;
				case 4:
					PrerovBecva(canvasobj);
					return;
			}
		case 3:
			switch(localLocationId) {
				//nemcice
			}
			return;
	}
	return;	
}

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		timerUnpause();
		GamePaused = false;
		clearInterval(Pause.thisInterval);
		Pause.buttonAudio.deleteButton();
		Pause.buttonRestart.deleteButton();
		Pause.buttonCode.deleteButton();
		Pause.buttonSave.deleteButton();
		Pause.buttonLoad.deleteButton();
		Pause.buttonQuit.deleteButton();
		SetState(canvasobj);
		return;
	}
	
	if(!AllowedToPause) { return; }
	GamePaused = true;
	timerPause();	
	
	Pause.thisInterval = window.setInterval(() => {
		if(Load.FileLoaded === true) {
			clearInterval(Pause.thisInterval);
			GamePaused = false;
			Pause.buttonAudio.deleteButton();
			Pause.buttonRestart.deleteButton();
			Pause.buttonCode.deleteButton();
			Pause.buttonSave.deleteButton();
			Pause.buttonLoad.deleteButton();
			Pause.buttonQuit.deleteButton();
			//SetState called, no need to call anything
		}
	}, 100);
	
	
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(300, 50, 400, 400);
	canvasobj.setnewcolor("#333399");
	
	canvasobj.setnewfont("Arial, FreeSans", "48");
	canvasobj.text(TranslatedText[SettingsValues.Language][7], 320, 100);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	
	Pause.buttonAudio = new Button(320, 130, 100, 100, 25, "", "canvas_container");
	Pause.buttonRestart = new Button(420, 130, 100, 100, 25, TranslatedText[SettingsValues.Language][6], "canvas_container");
	Pause.buttonCode = new Button(520, 130, 100, 100, 25, TranslatedText[SettingsValues.Language][50], "canvas_container");
	Pause.buttonSave = new Button(320, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][9], "canvas_container");
	Pause.buttonLoad = new Button(420, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][10], "canvas_container");
	Pause.buttonQuit = new Button(520, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][11], "canvas_container");
	
	if(ap.allowed) { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][5]); }
	else { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][4]); }
	
	Pause.buttonAudio.button.addEventListener("click", () => {
		ap.toggleSound();
		if(ap.allowed) { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][5]); }
		else { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][4]); }
	});	
	Pause.buttonRestart.button.addEventListener("click", () => {
		ap.resetTrack();
	});
	Pause.buttonCode.button.addEventListener("click", () => {
		window.open("https://www.github.com/MegapolisPlayer/EscapeGameJS", "_blank");
	});
	Pause.buttonSave.button.addEventListener("click", () => {
		Save();
	});
	Pause.buttonLoad.button.addEventListener("click", () => {
		Load(canvasobj);
	});
	Pause.buttonQuit.button.addEventListener("click", () => {
		location.reload();
	});
	
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 48, 2), 320, 380);
	canvasobj.setnewfont("Arial, FreeSans", "48");
}

function SetStateFile(filecontent, canvas) {
	GamePaused = false;
	
	canvas.loadingMsg();
	deleteCanvasInputElems();

	//info - location id, local location id, difficulty, money
	let Data = filecontent.split(' ');

	if(Data[0] !== "eors1") {
		console.error("SetStateFile: Incompatible save loaded! (Version 1 required)");
	}	
	if(Data.length != 13) {
		console.error("SetStateFile: Invalid save loaded!");
	}
	
	console.log("Save loaded: "+filecontent);
	
	//data splitting
	SettingsValues.Language =            Number(Data[1]);
	SettingsValues.Difficulty =          Number(Data[2]);
	locationId =                         Number(Data[3]);	
	localLocationId =                    Number(Data[4]);	
	MoneyAmount =                        Number(Data[5]);
	doesHaveTicket =                     Number(Data[6]);
	CreditsValues.gotAchievementSpeed =  Number(Data[7]);
	CreditsValues.gotAchievementWaiter = Number(Data[8]);
	CreditsValues.gotAchievementHelp =   Number(Data[9]);
	CreditsValues.gotAchievementSus =    Number(Data[10]);
	TimerValues.StartTime =              Number(Data[11]);
	TimerValues.OverallPauseTime =       Number(Data[12]);
	UpdateSettingsValues();

	console.log("Data split!");
	
	//pause button
	PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);
	PauseButton.button.addEventListener("click", () => {
		Pause(canvas);
	});		
	
	//image loading - dont forget to add stuff here
	switch(locationId) {
		case 1:
			hnm_AmountLoadedImages = 0;
			HraniceNaMoraveLoad(canvas, true);
			let thisInterval1 = window.setInterval(() => {
				if(hnm_AmountLoadedImages === 6) {
					clearInterval(thisInterval1);
					AllowedToPause = true;
					ap.playTrack(2);
					SetState(canvas);
				}
			}, 100);
		break;
		case 2:
			pre_AmountLoadedImages = 0;
			PrerovLoad(canvas, true);
			let thisInterval2 = window.setInterval(() => {
				if(pre_AmountLoadedImages === 6) {
					clearInterval(thisInterval2);
					AllowedToPause = true;
					ap.playTrack(3);
					SetState(canvas);
				}
			}, 100);
		break;
	}
}

function Save() {
	timerEnd(); //finishes counting time
	
	let finalizedSave = "eors1 ";
	finalizedSave+=Number(SettingsValues.Language);
	finalizedSave+=" ";
	finalizedSave+=Number(SettingsValues.Difficulty);
	finalizedSave+=" ";
	finalizedSave+=Number(locationId);
	finalizedSave+=" ";
	finalizedSave+=Number(localLocationId);
	finalizedSave+=" ";
	finalizedSave+=Number(MoneyAmount);
	finalizedSave+=" ";
	finalizedSave+=Number(doesHaveTicket);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementSpeed);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementWaiter);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementHelp);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementSus);
	finalizedSave+=" ";
	finalizedSave+=Number(TimerValues.StartTime);
	finalizedSave+=" ";
	finalizedSave+=Number(TimerValues.OverallPauseTime);
	
	let hiddenAddrElem = document.createElement('a');
    hiddenAddrElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalizedSave));
    hiddenAddrElem.setAttribute('download', "savefile.eors1");
    hiddenAddrElem.style.display = 'none';
	
    document.body.appendChild(hiddenAddrElem);
    hiddenAddrElem.click();
    document.body.removeChild(hiddenAddrElem);
}

function Load(canvasobj) {
	Load.FileLoaded = false;
	let hiddenInputElem = document.createElement("input");
	hiddenInputElem.id="fileuploaded";
	hiddenInputElem.type = "file";
	hiddenInputElem.accept = ".eors1";
	
	hiddenInputElem.addEventListener("change", (event) => {
		Load.FileLoaded = true;
		let reader = new FileReader();
   		reader.readAsText(hiddenInputElem.files[0], "UTF-8");
		reader.onload = (event) => {
			Load.FileLoaded = false; //finished load operation
			SetStateFile(event.target.result, canvasobj);
		}
	}, false);
	hiddenInputElem.click();
}

//ENTRY POINT FILE
//three-letter city codes:
//HNM - Hranice Na Morave, ID 1
//PRE - Prerov, ID 2
//NZM - Nezamyslice, ID 3
//PRO - Prostejov, ID 4
//OLO - Olomouc, ID 5
//STU - Studenka, ID 6
//OST - Ostrava, ID 7
//KTW - Katowice (PL) - end, no code

if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

console.log("Escape from Olomouc\n%cPlease do not enter anything here.\nThis is strictly for debugging or error logging.\nIf you see an error (large red box) please report it to the author.", "color: red; font-weight: bold;");

AllowedToPause = false;

const cvs = new Canvas("EscapeCanvas", "Arial, FreeSans", "48", "#333399", 1000, 500);
cvs.clear("purple");
cvs.loadingMsg();

const MainMenuImage = new Image();
MainMenuImage.src = "res/prerov/nastupiste.jpg";
MainMenuImage.onload = MainMenuSetup;

let mainMenuButtons = [];

function MainMenuSetup() {
	cvs.loadingMsg();
	
	//translations
	TranslationLoad("EN", 0);
	TranslationLoad("CZ", 1);
	TranslationLoad("DE", 2);
	TranslationLoad("RU", 3);
	//TranslationLoad("SUS", 4); //jirkas custom lang

	//key buttons activation
	window.addEventListener("keydown", (event) => {
		if(event.key == "Escape") {
			Pause(cvs);
		}
	});	
	
	//checks if all images loaded
	let thisInterval = window.setInterval(() => {
		if(
			AmountTranslations === 4 && 
			TicketImagesLoaded === 2 &&
			AchievementImagesLoaded === 5 &&
			ArrowImagesLoaded === 9 &&
			TableImagesLoaded === 5 &&
			OrderImagesLoaded === 2
		) {
			clearInterval(thisInterval);
			MainMenu();
		}
	}, 100);
}

function MainMenu() {	
	//main menu
	
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.setnewborder("#ffffff");
	cvs.setnewcolor("#333399");
	
	mainMenuButtons.push(new Button(0,   400, 150, 100, 25, TranslatedText[SettingsValues.Language][4], "canvas_container"));
	mainMenuButtons.push(new Button(150, 400, 150, 100, 25, TranslatedText[SettingsValues.Language][6], "canvas_container"));
	mainMenuButtons.push(new Button(600, 100, 300, 100, 50, TranslatedText[SettingsValues.Language][1], "canvas_container"));
	mainMenuButtons.push(new Button(600, 200, 300, 100, 50, TranslatedText[SettingsValues.Language][2], "canvas_container"));
	mainMenuButtons.push(new Button(600, 300, 300, 100, 50, TranslatedText[SettingsValues.Language][3], "canvas_container"));

	mainMenuButtons[0].setCallback("AudioEnabler()");
	mainMenuButtons[1].setCallback("ap.resetTrack()");
	
	mainMenuButtons[2].setCallback("ButtonsRouter(0)");
	mainMenuButtons[3].setCallback("ButtonsRouter(1)");
	mainMenuButtons[4].setCallback("ButtonsRouter(2)");
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	chr.draw(360, 100, 0.25, cvs);	
	cvs.setfontweight("bold");

	cvs.text(TranslatedText[SettingsValues.Language][0], 50, 50);
	cvs.textborder(TranslatedText[SettingsValues.Language][0], 50, 50);
	
	cvs.resetfontweight();
	cvs.setnewcolor("#ffffff");
	cvs.setnewfont("Arial, FreeSans", "16");
	
	cvs.text("(c) Martin/MegapolisPlayer, Jiri/KohoutGD 2023", 650, 472);
	cvs.text("build date 21/05/2023, prerelease test version", 650, 492);
	
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48");
	cvs.setnewborder("#000000");
}

//play menu

function PlayMenu() {
	cvs.loadingMsg();
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][1], 50, 50);
	
	cvs.setnewfont("Arial, FreeSans", "32");
	let buttonNew = new Button(50, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][1], "canvas_container");
	let buttonLoad = new Button(350, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][10], "canvas_container");
	let buttonBack = new Button(650, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][36], "canvas_container");
	
	let thisInterval = window.setInterval(() => {
		if(Load.FileLoaded === true) {
			clearInterval(thisInterval);
			buttonNew.deleteButton();
			buttonLoad.deleteButton();
			buttonBack.deleteButton();
			//SetState called, no need to call anything
		}
	}, 100);
	
	buttonNew.button.addEventListener("click", (event) => {
		clearInterval(thisInterval);
		buttonNew.deleteButton();
		buttonLoad.deleteButton();
		buttonBack.deleteButton();
		Intro();
	});
	buttonLoad.button.addEventListener("click", (event) => {
		Load(cvs);
	});
	buttonBack.button.addEventListener("click", (event) => {
		clearInterval(thisInterval);
		buttonNew.deleteButton();
		buttonLoad.deleteButton();
		buttonBack.deleteButton();
		MainMenu();
	});
}

//game stuff

function Intro() {
	console.log("Registered PLAY Button press!");
	ap.playTrack(1);
	
	cvs.clear("black");
    cvs.setnewcolor("#800000");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][19], 50, 50);
	cvs.setnewcolor("white");
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml(TranslationGetMultipleLines(SettingsValues.Language, 20, 4), 100, 100);
	
	introarrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow.button.addEventListener("click", (event) => {
		introarrow.deleteButton();
   	 	Backstory(cvs);
	});
    introarrow.draw(cvs);
}

function Backstory() {
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][24], 50, 50);
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml(TranslationGetMultipleLines(SettingsValues.Language, 29, 7), 100, 100);
	
	introarrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow.button.addEventListener("click", (event) => {
		introarrow.deleteButton();
   	 	HraniceNaMoraveLoad(cvs);
	});
    introarrow.draw(cvs);
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
			SettingsButtonRegister(cvs);
		break;
		case 2:
			CreditsButtonRegister(cvs);
		break;
	}
}

//audio toggle button

function AudioEnabler() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText(TranslatedText[SettingsValues.Language][5]);
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText(TranslatedText[SettingsValues.Language][4]);
	 }
}
