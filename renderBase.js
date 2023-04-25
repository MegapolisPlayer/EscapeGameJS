//Canvas object
class Canvas {
    constructor(id, font, fontsize, color) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext("2d");
        this.color = color;
        this.context.font = fontsize+"px "+font;
        this.context.fillStyle = this.color;
    }
    //sets new color
    setnewcolor(newcolor) {
        this.color = newcolor;
        this.context.fillStyle = this.color;
    }
    //draws text
    text(text, xoffset, yoffset) {
		this.context.fillText(text, xoffset, yoffset);
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
    insert(id) {
		this.button.setAttribute("class", "CanvasButton");
		this.button.setAttribute("id", this.text);
		this.button.setAttribute("onclick", this.callbackname+"()");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		this.button.style.setProperty("font-size", this.fontsize+"px");
		
		this.button.appendChild(this.buttontext);
		document.getElementById(id).appendChild(this.button);
    }
	changeText(newtext) {
		this.text = newtext;
		this.buttontext.nodeValue =  this.text;
		this.button.appendChild(this.buttontext);
		document.getElementById(id).appendChild(this.button);
	}
	deleteButton() {
		
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
};

//Audio player

class AudioPlayer {
	constructor() {
		this.audioTracks = [];
		this.audioTracks.push(new Audio("res/music/Stormfront.mp3"));
		this.audioTracks.push(new Audio("res/music/Faceoff.mp3"));
		this.audioTrackCounter = 0;
	}
	playNextTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[(this.audioTrackCounter) - 1].pause();
		}
		this.audioTracks[this.audioTrackCounter].play();
		this.audioTrackCounter++;
	}
	resetTrack() {
		if(this.audioTrackCounter > 0) {
			this.audioTracks[this.audioTrackCounter - 1].pause();
			this.audioTracks[this.audioTrackCounter - 1].currentTime = 0;
			this.audioTracks[this.audioTrackCounter - 1].play();
		}
	}
};
