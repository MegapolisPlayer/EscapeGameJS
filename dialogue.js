let Character = new Image();
Character.src = "res/Character.png";

function dialogueMakeBox(canvasobj) {
	canvasobj.box(20, (canvasobj.context.height * 0,8) - 20, canvasobj.context.width - 20, canvasobj.context.height - 20);
}
function dialogueNewText(canvasobj) {
	canvasobj.textml(text, 30, (canvasobj.context.height * 0,8) - 10);
}
