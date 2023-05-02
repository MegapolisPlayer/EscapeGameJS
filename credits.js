let finalCreditsImage = new Image();

function Credits(canvasobj) {
	ap.playTrack(9); //waltz vivace
	canvasobj.setnewcolor("#333399");
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.text(TranslatedText[SettingsValues.Language][0], 50, 50);	
	canvasobj.resetfontweight();
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = Credits(canvasobj);
}
