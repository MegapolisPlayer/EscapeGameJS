function Credits(canvasobj) {
	canvasobj.setnewcolor("purple");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.setnewcolor("#333399");
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	Credits(canvasobj);
}
