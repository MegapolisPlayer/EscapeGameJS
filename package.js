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
			console.error("Arrow: Object not initialized.");
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
		this.button = document.createElement("button");
	}
	draw(xoffset, yoffset, scale, canvasobj) {
		canvasobj.image(this.image, xoffset, yoffset, this.image.width * scale, this.image.height * scale);
		this.button.setAttribute("class", "CanvasArrow CanvasInputElement");  //canvas arrow -> transparency
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
};
let chr = new Character("res/Character.png");
let cook = new Character("res/Cook.png");
let traindriver = new Character("res/TrainDriver.png");

class Dialogue {
	constructor() {
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = true;
	}
	begin(canvasobj) {
		this.canvas_info = canvasobj;
		AllowedToPause = false;
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
			return;
		}, this);
		}
	}
	end() {
		this.canvas_info;
		this.counter = 0;
		this.can_proceed = false;
		AllowedToPause = true;
	}
};
//Codes
//Czech - CZ
//English - EN
//Russian - RU
//German - DE

let TranslatedText = [];
let AmountTranslations = 0;

function TranslationLoad(lang, lid) {
	TranslatedText.push([]);
	let req = new XMLHttpRequest();
	req.open("GET", "lang/text"+lang+".txt");
	req.onload = (event) => {
		let splittext = req.responseText.split('\n');
		for(let Id = 0; Id < splittext.length; Id++) {
			if(splittext[Id].length !== 0) {
				(TranslatedText[lid]).push(splittext[Id]);
			}
		}
		AmountTranslations++;
		console.log(TranslatedText[lid]);
	}
	req.send();
}
let SettingsValues = {
	Difficulty:2, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss: 5000, //chance if instant loss per day, easy = 10000, medium = 5000, hard = 1000
	MoneyCostIncrease: 1, //value to multiply costs with, easy = 0,75, medium = 1, hard = 1,25
	Language: 0 //0 - English, 1 - Czech, 2 - German, 3 - Russian
};

function randomNumber(maxRange) {
  return Math.floor(Math.random() * maxRange);
}

function CheckInstantLoss() {
	if(randomNumber(SettingsValues.ChanceOfInstantLoss) === 1) {
		//game over!
		canvas.clear("black");
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
			canvasobj.text(TranslatedText[SettingsValues.Language][11], 150, 150);
			canvasobj.text("0.75", 450, 200);
			canvasobj.text("1:10000", 450, 250);
		break;
		case 2:
			canvasobj.text(TranslatedText[SettingsValues.Language][12], 150, 150);
			canvasobj.text("1.00", 450, 200);
			canvasobj.text("1:5000", 450, 250);
		break;
		case 3:
			canvasobj.text(TranslatedText[SettingsValues.Language][13], 150, 150);
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
	Settings.buttonBack = new Button(50, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][9], "canvas_container");
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
	
	canvasobj.text(TranslatedText[SettingsValues.Language][10], 50, 100);
	
	canvasobj.text(TranslatedText[SettingsValues.Language][14], 50, 200);
	canvasobj.text(TranslatedText[SettingsValues.Language][15], 50, 250);

	canvasobj.text(TranslatedText[SettingsValues.Language][19], 650, 50);

	canvasobj.resetfontweight();

	Settings.arrowPrev.draw(canvasobj);
	Settings.arrowNext.draw(canvasobj);

	Settings.arrowPrevL.draw(canvasobj);
	Settings.arrowNextL.draw(canvasobj);
	
	UpdateSettingsValues();
	SettingsRenderDifficultyRelatedText(canvasobj);		
	SettingsRenderLanguageRelatedText(canvasobj);
	
	canvasobj.textml(
	"The difficulty determines not only the above values, but also the\n"+
	"difficulty of the minigames. The difficulty or the language cannot\n"+
	"be changed during the game. All values will be saved.", 50, 300);	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}

let finalCreditsImage = new Image();

function Credits(canvasobj) {
	ap.playTrack(9); //waltz vivace
	canvasobj.setnewcolor("#333399");
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.text(TranslatedText[SettingsValues.Language][0], 50, 50);	
	canvasobj.resetfontweight();
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = Credits(canvasobj);
}
//global for all locations, HnM is just first

let locationId = 0; //HnM, Prerov, etc... (HnM = 1, 0 is for main menu)
let localLocationId = 0; //railway station, house, etc... (HnM house = 0, starts from 0)

let PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);

//HnM specific

let hnm_Locations = [];
let hnm_AmountLoadedImages = 0;

function HraniceNaMoraveImageLoaded() {
	hnm_AmountLoadedImages += 1;
}

function HraniceNaMoraveLoad(canvas, calledbysetstate = false) {
	canvas.loadingMsg();
	locationId = 1;
	for(let Id = 0; Id < 5; Id++) {
		hnm_Locations.push(new Image());
		hnm_Locations[Id].onload = HraniceNaMoraveImageLoaded;
	}
	hnm_Locations[0].src = "res/hnm/domov.png";
	hnm_Locations[1].src = "res/hnm/namesti.png";
	hnm_Locations[2].src = "res/hnm/nadrazi.png";
	hnm_Locations[3].src = "res/hnm/nastupiste.png";
	hnm_Locations[4].src = "res/hnm/restaurace.png";
	
	ap.playTrack(2);
	
	if(calledbysetstate !== true) {
		//if called by load and setstatefile -> setstatefile adds pause button, skip dialogue
		PauseButton.button.addEventListener("click", () => {
			Pause(canvas);
		});	
		HraniceNaMorave(canvas);
	}
}

function HraniceNaMorave(canvas) {
	if(hnm_AmountLoadedImages != 5) {
      	window.setTimeout(HraniceNaMorave, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Hranice na Morave START "+hnm_AmountLoadedImages);
	
	canvas.loadingMsg();
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
	localLocationId = 0;
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
	localLocationId = 1;
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
	localLocationId = 2;
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
	localLocationId = 3;
	traindriver.button.addEventListener("click", () => {
		traindriver.deleteButton();
		ArrowToNadrazi.deleteButton();
		HraniceNaMoraveNastupisteDialogue(canvas);
	});
	traindriver.append(canvas);
	let ArrowToNadrazi = new Arrow(700, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		ArrowToNadrazi.deleteButton();
    	HraniceNaMoraveNadrazi(canvas);
	});
	canvas.image(hnm_Locations[3], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(700, 260, 0.35, canvas);
	traindriver.draw(500, 250, 0.35, canvas);
	ArrowToNadrazi.draw(canvas);
	PauseButton.draw(canvas);
	drawMoneyCount(canvas);
}
function HraniceNaMoraveRestaurace(canvas) {
	console.log("hnm restaurace");
	localLocationId = 4;
	cook.button.addEventListener("click", () => {
		cook.deleteButton();
		ArrowToNadrazi.deleteButton();
		HraniceNaMoraveRestauraceJob(canvas);
	});
	cook.append(canvas);
	let ArrowToNadrazi = new Arrow(500, 400, 100, 100, ArrowDirections.Down, canvas);
	ArrowToNadrazi.button.addEventListener("click", () => {
		if(GamePaused) { return; }
		cook.deleteButton();
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
	console.log("hnm restaurace job");
	AllowedToPause = false;
	let dialogue = new Dialogue();
	dialogue.begin(canvas);
	dialogue.makeBubble(0, "Our waiter just left us. Want to take up the position?");
	dialogue.makeBubble(1, "I will pay you 500 CZK, deal?");
	addMoney(500);
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 2) {
			clearInterval(thisInterval);
			dialogue.end();		
			AllowedToPause = true;	
			HraniceNaMoraveRestaurace(canvas);
		}
	}, 100, dialogue, canvas);
}

function HraniceNaMoraveNastupisteDialogue(canvas) {
	console.log("hnm nastupiste dlg");
	//AllowedToPause = false;
	HraniceNaMoraveNastupiste(canvas);
}
let GamePaused = false;
let AllowedToPause = true;

function deleteCanvasInputElems() {
	let inputElems = document.getElementsByClassName("CanvasInputElement");
	while(inputElems[0]) {
   		inputElems[0].parentNode.removeChild(inputElems[0]);
	}
}

function SetState(canvasobj) {
	deleteCanvasInputElems();
	PauseButton.append(canvasobj);
	switch(locationId) {
		case 1:
			switch(localLocationId) {
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

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
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
	
	Pause.buttonAudio.button.addEventListener("click", () => {
		ap.toggleSound();
		if(ap.allowed) { Pause.buttonAudio.changeText("Disable audio"); }
		else { Pause.buttonAudio.changeText("Enable audio"); }
	});	
	Pause.buttonRestart.button.addEventListener("click", () => {
		ap.resetTrack();
	});
	Pause.buttonCode.button.addEventListener("click", () => {
		window.open("https://www.github.com/MegapolisPlayer/EscapeGameJS", "_blank");
	});
	Pause.buttonSave.button.addEventListener("click", () => {
		Save(locationId, localLocationId, SettingsValues.Difficulty, MoneyCount);
	});
	Pause.buttonLoad.button.addEventListener("click", () => {
		Load(canvasobj);
	});
	Pause.buttonQuit.button.addEventListener("click", () => {
		location.reload();
	});
	
	canvasobj.textml("Press escape or click the\nbutton again to unpause.", 320, 380);
	canvasobj.setnewfont("Arial, FreeSans", "48");
}

function SetStateFile(filecontent, canvas) {
	GamePaused = false;
	
	canvas.loadingMsg();

	//info - location id, local location id, difficulty, money
	let Data = filecontent.split(' ');

	if(Data[0] !== "eors1") {
		console.error("SetStateFile: Incompatible save loaded! (Version 1 required)");
	}	
	
	//data splitting
	SettingsValues.Difficulty = Number(Data[1]);
	locationId =                Number(Data[2]);	
	localLocationId =           Number(Data[3]);	
	MoneyCount =                Number(Data[4]);
	SettingsValues.Language =   Number(Data[5]);
	UpdateSettingsValues();
	
	//pause button
	PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);
	PauseButton.button.addEventListener("click", () => {
		Pause(canvas);
	});		
	
	//image loading
	switch(locationId) {
		case 1:
			hnm_AmountLoadedImages = 0;
			HraniceNaMoraveLoad(canvas, true);
			let thisInterval = window.setInterval(() => {
				if(hnm_AmountLoadedImages === 5) {
					clearInterval(thisInterval);
					AllowedToPause = true;
					SetState(canvas);
				}
			}, 100);
		break;
	}
}

function Save(locationId, localLocationId, difficulty, money, language) {
	let finalizedSave = "eors1 ";
	finalizedSave+=language;
	finalizedSave+=" ";
	finalizedSave+=difficulty;
	finalizedSave+=" ";
	finalizedSave+=locationId;
	finalizedSave+=" ";
	finalizedSave+=localLocationId;
	finalizedSave+=" ";
	finalizedSave+=money;
	
	let hiddenAddrElem = document.createElement('a');
    hiddenAddrElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalizedSave));
    hiddenAddrElem.setAttribute('download', "save.eors1");
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

if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial, FreeSans", "48", "#333399", 1000, 500);
cvs.clear("purple");

const MainMenuImage = new Image();
MainMenuImage.src = "res/MainMenu.jpg";
MainMenuImage.onload = MainMenuSetup;

let mainMenuButtons = [];

function MainMenuSetup() {
	cvs.loadingMsg();
	AllowedToPause = false;
	//translations
	
	TranslationLoad("EN", 0);
	TranslationLoad("CZ", 1);
	TranslationLoad("DE", 2);
	TranslationLoad("RU", 3);

	//key buttons activation
	window.addEventListener("keydown", (event) => {
		if(event.key == "Escape") {
			Pause(cvs);
		}
	});	
	
	let thisInterval = window.setInterval(() => {
		if(AmountTranslations === 4) {
			clearInterval(thisInterval);
			MainMenu();
		}
	}, 100);
}

function MainMenu() {	
	//main menu
	
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	
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
	chr.draw(300, 300, 0.3, cvs);	
	cvs.setfontweight("bold");
	cvs.text(TranslatedText[SettingsValues.Language][0], 50, 50);	
	cvs.resetfontweight();
	cvs.setnewfont("Arial, FreeSans", "16");
	cvs.setnewcolor("white");
	cvs.text("build date 02/05/2023, prerelease version", 650, 492);
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48");
}

//play menu

function PlayMenu() {
	cvs.loadingMsg();
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][1], 50, 50);
	
	cvs.setnewfont("Arial, FreeSans", "32");
	let buttonNew = new Button(50, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][7], "canvas_container");
	let buttonLoad = new Button(350, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][8], "canvas_container");
	let buttonBack = new Button(650, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][9], "canvas_container");
	
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
    cvs.setnewcolor("white");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][21], 50, 50);
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
	cvs.loadingMsg();
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
