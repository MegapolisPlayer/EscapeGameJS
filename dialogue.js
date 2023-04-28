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

//TODO: convert to class

let dlg_delay_info = 0;
let dlg_canvas_info;

function dialogueBegin(canvasobj, delay) {
	dlg_delay_info = delay;
	dlg_canvas_info = canvasobj;
}
function dialogueMakeBox(canvasobj) {
	canvasobj.setlinethickness(5);
	canvasobj.boxborder(20, (canvasobj.canvas.height * 0.8), canvasobj.canvas.width - 40,canvasobj.canvas.height - 40);
}
function dialogueMakeText(canvasobj, text) {
	canvasobj.textml(text, 30, (canvasobj.canvas.height * 0.8) + 30);
}
function dialogueMakeBubble(id, text) {
	setTimeout(function() {
		dlg_canvas_info.setnewcolor("white");
		dialogueMakeBox(dlg_canvas_info);
		dlg_canvas_info.setnewcolor("black");
		dialogueMakeText(dlg_canvas_info, text);
	}, (id * dlg_delay_info));
}
function dialogueEnd(canvasobj, delay) {
	dlg_counter = 0;
	dlg_delay_info = 0;
}
