function Credits(canvasobj) {
	canvasobj.setnewcolor("purple");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	//images of katowice and stuff, music = waltz vivace!
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	Credits(canvasobj);
}
