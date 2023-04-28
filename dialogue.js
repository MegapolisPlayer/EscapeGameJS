let Character = new Image();
Character.src = "res/Character.png";

function dialogueMakeBox(canvasobj) {
	canvasobj.box(20, (canvasobj.canvas.height * 0.8) + 20, canvasobj.canvas.width - 40,canvasobj.canvas.height - 40);
}
function dialogueMakeText(canvasobj, text) {
	canvasobj.textml(text, 30, (canvasobj.context.height * 0.8) - 10);
}
