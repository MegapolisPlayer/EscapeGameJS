const finalCreditsImage = new Image();

//if iscalledfrommm true means called from main menu, dont show achievements and such
function Credits(iscalledfrommm, canvasobj) {
	ap.playTrack(9); //waltz vivace
	canvasobj.setnewcolor("#333399");
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.text(TranslatedText[SettingsValues.Language][0], 50, 190);	
	canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
	
	//game by
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.text(TranslatedText[SettingsValues.Language][65], 50, 190);
	canvasobj.setfontweight("bold");
	canvasobj.textml("Martin (MegapolisPlayer)\nJirka (KohoutGD)", 200, 230);
	canvasobj.resetfontweight();
	
	setTimeout(() => {
		//images
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][66], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Google Maps Street View, SReality, Pixabay\nWikipedia Commons:\nPalickap, Marie Čchiedzeová\nAll pixel-art assets are custom-made.\nFor more information check out /res/ folder on GitHub.", 100, 230);
		canvasobj.resetfontweight();
	}, 2500);	

	setTimeout(() => {
		//music
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][67], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("All music by Kevin Macleod @ incompetech.com/music", 100, 230);
		canvasobj.resetfontweight();
	}, 5000);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][68], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Čeština - Martin\nEnglish - Martin\nDeutsch - Jirka\nРусский - Martin\nSus Language - Jirka", 100, 230);
		canvasobj.resetfontweight();
	}, 7500);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][69], 50, 190); //nice 69 is a license...
		canvasobj.setfontweight("bold");
		canvasobj.textml("Licensed under CC-BY-SA 4.0\nImages - Content License, CC-BY-SA 4.0\nMusic - CC-BY 4.0", 100, 230);
		canvasobj.resetfontweight();
	}, 10000);
	
	setTimeout(() => {
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	}, 12500);

	if(!iscalledfrommm) {
		setTimeout(() => {
			//achievements
			canvasobj.text(TranslatedText[SettingsValues.Language][70], 50, 190); 
		}, 12500);
	}
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(true, canvasobj); };
}
