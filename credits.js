let CreditsValues = {
	gotAchievementSpeed: false,
	gotAchievementWaiter: false,
	gotAchievementHelp: false,
	gotAchievementSus: false
};

const finalCreditsImage = new Image();

function CreditsRenderAchievement(isdone, imageyes, imageno, canvasobj) {
	canvasobj.setfontweight("bold");
	if(isdone) {
		canvasobj.context.textAlign = "center"; 
		canvasobj.image(imageyes, 350, 100, 300, 300);
		canvasobj.context.textAlign = "left"; 
		canvasobj.text(TranslatedText[SettingsValues.Language][82], 100, 300);
	}
	else {
		canvasobj.context.textAlign = "center"; 
		canvasobj.image(imageno, 350, 100, 300, 300);
		canvasobj.context.textAlign = "left"; 
		canvasobj.text(TranslatedText[SettingsValues.Language][83], 100, 300);
	}
	canvasobj.resetfontweight();
}

//if iscalledfrommm true means called from main menu, dont show achievements and such
function Credits(iscalledfrommm, canvasobj) {
	timerEnd();
	deleteCanvasInputElems();
	ap.playTrack(9); //waltz vivace
	canvasobj.setnewcolor("#ffffff");
	canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	let delay = 2500;
		
	if(!iscalledfrommm) {
		canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslatedText[SettingsValues.Language][65], 50, 190);
		canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
	}
	else {
		canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslatedText[SettingsValues.Language][0], 50, 190);
		canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
	}

	//game by
	setTimeout(() => {
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][66], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Martin (MegapolisPlayer)\nJirka (KohoutGD)", 200, 230);
		canvasobj.resetfontweight();
	}, 1 * delay);
	
	setTimeout(() => {
		//images - main, hranice na morave, prerov
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][67], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("SReality, Pixabay, VlakemJednoduse.cz, Freepik: jcomp\nWikipedia Commons: Palickap, Marie Čchiedzeová,\nVojtěch Dočkal, Jiří Komárek\nAll pixel-art assets are custom-made.", 100, 230);
		canvasobj.resetfontweight();
	}, 2 * delay);	


	setTimeout(() => {
		//music
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][68], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("All music by Kevin Macleod (incompetech.com)\nLicensed under CC-BY 3.0", 100, 230);
		canvasobj.resetfontweight();
	}, 3 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][69], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Čeština - Martin\nEnglish - Martin\nDeutsch - Jirka\nРусский - Martin\nSus Language - Jirka", 100, 230);
		canvasobj.resetfontweight();
	}, 4 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][70], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Licensed under CC-BY-SA 4.0\nImages - Content License, CC-BY-SA 4.0\nMusic - CC-BY 4.0", 100, 230);
		canvasobj.resetfontweight();
	}, 5 * delay);
	
	if(!iscalledfrommm) {
		setTimeout(() => {
			//achievements
			canvasobj.context.textAlign = "center"; 
			canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][71], 500, 250); 
			canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
			canvasobj.context.textAlign = "left"; 
		}, 6 * delay);
		
		setTimeout(() => {
			//achievements - medal for speed
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][72], 100, 250); 
			canvasobj.context.textAlign = "center";
			canvasobj.text(TranslatedText[SettingsValues.Language][73], 500, 450); 
			canvasobj.context.textAlign = "left";
			CreditsRenderAchievement(CreditsValues.gotAchievementSpeed, AchievementImages[1], AchievementImages[0], canvasobj);
		}, 7 * delay);

		setTimeout(() => {
			//achievements - waiters medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][74], 100, 250); 
			canvasobj.context.textAlign = "center";
			canvasobj.text(TranslatedText[SettingsValues.Language][75], 500, 450); 
			canvasobj.context.textAlign = "left";
			CreditsRenderAchievement(CreditsValues.gotAchievementWaiter, AchievementImages[2], AchievementImages[0], canvasobj);
		}, 8 * delay);

		setTimeout(() => {
			//achievements - help medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][76], 100, 250);
			canvasobj.context.textAlign = "center";
			canvasobj.text(TranslatedText[SettingsValues.Language][77], 500, 450); 
			canvasobj.context.textAlign = "left";
			CreditsRenderAchievement(CreditsValues.gotAchievementHelp, AchievementImages[3], AchievementImages[0], canvasobj);
		}, 9 * delay);
		
		setTimeout(() => {
			//achievements - sus medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][78], 100, 250);
			canvasobj.context.textAlign = "center";
			canvasobj.text(TranslatedText[SettingsValues.Language][79], 500, 450); 
			canvasobj.context.textAlign = "left";
			CreditsRenderAchievement(CreditsValues.gotAchievementSus, AchievementImages[4], AchievementImages[0], canvasobj);
		}, 10 * delay);
		setTimeout(() => {
			//time played
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][84], 50, 190); 
			canvasobj.setfontweight("bold");
			canvasobj.text(timerToString(), 100, 230);
			canvasobj.resetfontweight();
		}, 11 * delay);
	}

	setTimeout(() => {
		//quit game
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 80, 2), 100, 190); 
		window.addEventListener("click", function(event) {
			location.reload();		
		});
	}, (iscalledfrommm ? 7 : 12) * delay);
	
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(true, canvasobj); };
}

function debug_Credits(iscalledfrommm, canvasobj) {
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(iscalledfrommm, canvasobj); };
}
