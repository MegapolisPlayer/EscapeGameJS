class Character {
	constructor(source) {
		this.image = new Image();
		this.image.src = source;
		this.image.onload = this.setisloaded;
		this.loaded = false;
		this.button = document.createElement("button");
		this.evtlistener = null;
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
	deleteListener() {
		this.button.removeEventListener("click", this.evtlistener);
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
		let dlgInputElems = document.getElementsByClassName("DialogueArrow"); //remove all at beginning to avoid duplicates
		while(dlgInputElems[0]) {
   			dlgInputElems[0].parentNode.removeChild(dlgInputElems[0]);
		}
		let NextArrow = new Arrow(this.canvas_info.canvas.width - 140, (this.canvas_info.canvas.height * 0.8) + 10, 100, 100, ArrowDirections.Right, this.canvas_info);
		NextArrow.button.setAttribute("class", NextArrow.button.getAttribute("class")+" DialogueArrow");
		this.canvas_info.setnewcolor("white");
		this.makeBox();
		this.canvas_info.setnewcolor(textcolor);
		this.makeText(text);
		NextArrow.draw(this.canvas_info);
		NextArrow.button.addEventListener("click", () => {
			NextArrow.deleteButton();
			this.counter++;
			this.can_proceed = true;
			NextArrow.deleteButton();
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
