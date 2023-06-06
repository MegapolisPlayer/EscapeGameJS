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
		canvasbuffer.id = "CanvasBuffer"+id;
		canvasbuffer.style.setProperty("width", this.canvas.width+"px");
		canvasbuffer.style.setProperty("height", this.canvas.height+"px");
		this.canvas.parentElement.appendChild(canvasbuffer);
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
	//draws a line
	line(fromx, fromy, tox, toy, linewidth, color = "null") {
		this.context.beginPath();
		this.context.moveTo(fromx, fromy);
		this.context.lineTo(tox, toy);
		let colorsave = this.context.strokeStyle;
		if(color !== "null") {
			this.context.strokeStyle = color;
		}
		else {
			this.context.strokeStyle = this.color;
		}
		this.context.lineWidth = linewidth;
		this.context.stroke();
		this.context.strokeStyle = colorsave;
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
		
		this.button.setAttribute("onclick", ap.playSFX(0));	
		
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
		
		this.button.setAttribute("onclick", ap.playSFX(0));

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
		//music
		this.audioTracks.push(new Audio("res/music/Stormfront.mp3"));                //main menu
		this.audioTracks.push(new Audio("res/music/Faceoff.mp3"));                   //intro
		this.audioTracks.push(new Audio("res/music/ImpendingBoom.mp3"));             //hranice
		this.audioTracks.push(new Audio("res/music/Nerves.mp3"));                    //prerov
		this.audioTracks.push(new Audio("res/music/LateNightRadio.mp3"));            //nezamyslice
		this.audioTracks.push(new Audio("res/music/StringImpromptu1.mp3"));          //prostejov
		this.audioTracks.push(new Audio("res/music/RoyalCoupling.mp3"));             //olomouc
		this.audioTracks.push(new Audio("res/music/FailingDefense.mp3"));            //studenka
		this.audioTracks.push(new Audio("res/music/TheParting.mp3"));                //ostrava
		this.audioTracks.push(new Audio("res/music/StartingOutWaltzVivace.mp3"));    //credits, ending
		this.audioTracks.push(new Audio("res/music/AlmostBliss.mp3"));               //waiter minigame
		this.audioTracks.push(new Audio("res/music/PorchSwingDays.mp3"));            //fishing
		this.audioTracks.push(new Audio("res/music/AVeryBradySpecial.mp3"));         //info minigame
		this.audioTracks.push(new Audio("res/music/DevonshireWaltzAllegretto.mp3")); //dialect translation
		this.audioTracks.push(new Audio("res/music/Nonstop.mp3"));                   //cashier minigame
		this.audioTracks.push(new Audio("res/music/Cipher.mp3"));                    //cleaning minigame
		this.audioTracks.push(new Audio("res/music/NeonLaserHorizon.mp3"));          //cheesemaking
		this.audioTracks.push(new Audio("res/music/FiveArmies.mp3"));                //defense minigame
		this.audioTracks.push(new Audio("res/music/Pride.mp3"));                     //wagon cutscenes
		for(let Id = 0; Id < 19; Id++) {
			this.audioTracks[Id].onended = () => {
				
			};
		}
		
		//sfx - no looping
		this.sfx = [];
		this.sfx.push(new Audio("res/sfx/Click.mp3"));
		this.sfx.push(new Audio("res/sfx/DialogueYes.mp3"));
		this.sfx.push(new Audio("res/sfx/DialogueNo.mp3"));
		this.sfx.push(new Audio("res/sfx/Success.mp3"));
		this.sfx.push(new Audio("res/sfx/Fail.mp3"));
		this.sfx.push(new Audio("res/sfx/Ticket.mp3"));
		this.sfx.push(new Audio("res/sfx/Beep.mp3"));
		this.sfx.push(new Audio("res/sfx/Shoot.mp3"));
		this.sfx.push(new Audio("res/sfx/GameOver.mp3"));
		this.sfx.push(new Audio("res/sfx/TrainBrake.mp3"));
		
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
	playSFX(id) {
		if(this.allowed === false) { return; }
		this.sfx[id].currentTime = 0;
		this.sfx[id].play();
	}
};
const ap = new AudioPlayer();

//math conversion stuff

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}
function toRadians(angle) {
	return angle * (Math.PI / 180);
}


