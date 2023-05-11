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
		this.choice_result = -1;
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
			return;
  		}
		else {
			this.can_proceed = false;
		}
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
		let YesButton = new Arrow(140, (this.canvas_info.canvas.height * 0.8), 100, 100, ArrowDirections.Yes, this.canvas_info);
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
		AllowedToPause = true;
	}
};
