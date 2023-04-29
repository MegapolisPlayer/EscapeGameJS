class Character {
	constructor() {
		this.image = new Image();
		this.image.src = "res/Character.png";
	}
	draw(xoffset, yoffset, canvas) {
		canvas.image(image, xoffset, yoffset);
	}
};
let chr = new Character();

class Dialogue {
	constructor() {
		this.delay_info = 0;
		this.canvas_info;
	}
	begin(canvasobj, delay) {
		this.delay_info = delay;
		this.canvas_info = canvasobj;
	}
	makeBox() {
		this.canvas_info.setlinethickness(5);
		this.canvas_info.boxborder(20, (this.canvas_info.canvas.height * 0.8), this.canvas_info.canvas.width - 40, this.canvas_info.canvas.height - 40);
	}
	makeText(text) {
		this.canvas_info.textml(text, 30, (this.canvas_info.canvas.height * 0.8) + 30);
	}
	makeBubble(id, text) {
		setTimeout(function(dialogueinstance, text) {
			dialogueinstance.canvas_info.setnewcolor("white");
			dialogueinstance.makeBox();
			dialogueinstance.canvas_info.setnewcolor("black");
			dialogueinstance.makeText(text);
		}, (id * this.delay_info), this, text);
	}
	end() {
		this.delay_info = 0;
		this.canvas_info;
	}
};
