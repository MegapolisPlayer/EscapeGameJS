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
