let CreditsValues = {
	gotAchievementSpeed: 0,
	gotAchievementWaiter: 0,
	gotAchievementHelp: 0,
	gotAchievementSus: 0
};

const finalCreditsImage = new Image();

function CreditsRenderAchievement(isdone, imageyes, imageno, canvasobj) {
	canvasobj.context.textAlign = "center"; 
	canvasobj.setfontweight("bold");
	if(isdone) {
		canvasobj.image(imageyes, 350, 100, 300, 300);
		canvasobj.text(TranslatedText[SettingsValues.Language][82], 500, 450);
	}
	else {
		canvasobj.image(imageno, 350, 100, 300, 300);
		canvasobj.text(TranslatedText[SettingsValues.Language][83], 500, 450);
	}
	canvasobj.resetfontweight();
	canvasobj.context.textAlign = "left"; 
}

//if iscalledfrommm true means called from main menu, dont show achievements and such
function Credits(iscalledfrommm, canvasobj) {
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
		//images
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][67], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Google Maps Street View, SReality, Pixabay\nWikipedia Commons:\nPalickap, Marie Čchiedzeová, Vojtěch Dočkal\nAll pixel-art assets are custom-made.\nFor more information check out /res/ folder on GitHub.", 100, 230);
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
		CreditsRenderAchievement(CreditsValues.gotAchievementSpeed, credits_Achievements[1], credits_Achievements[0], canvasobj);
	}, 7 * delay);

	setTimeout(() => {
		//achievements - waiters medal
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][74], 100, 250); 
		CreditsRenderAchievement(CreditsValues.gotAchievementWaiter, credits_Achievements[2], credits_Achievements[0], canvasobj);
	}, 8 * delay);

	setTimeout(() => {
		//achievements - help medal
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][76], 100, 250);
		CreditsRenderAchievement(CreditsValues.gotAchievementHelp, credits_Achievements[3], credits_Achievements[0], canvasobj);
	}, 9 * delay);
	
	setTimeout(() => {
		//achievements - sus medal
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][78], 100, 250);
		CreditsRenderAchievement(CreditsValues.gotAchievementSus, credits_Achievements[4], credits_Achievements[0], canvasobj);
	}, 10 * delay);

	setTimeout(() => {
		//quit game
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 80, 2), 100, 190); 
		window.addEventListener("click", function(event) {
			location.reload();		
		});
	}, 11 * delay);
	
}

let credits_Achievements = [];
let credits_AmountLoadedImages = 0;

function CreditsLoadImages(iscalledfrommm, canvasobj) {
	for(let Id = 0; Id < 5; Id++) {
		credits_Achievements.push(new Image());
		credits_Achievements[Id].onload = () => { credits_AmountLoadedImages++; };
	}
	credits_Achievements[0].src = "res/achievements/medal_unknown.png";
	credits_Achievements[1].src = "res/achievements/medal_speed.png";
	credits_Achievements[2].src = "res/achievements/medal_waiter.png";
	credits_Achievements[3].src = "res/achievements/medal_help.png";
	credits_Achievements[4].src = "res/achievements/medal_sus.png";
	
	let thisInterval = window.setInterval(() => {
		if(credits_AmountLoadedImages === 5) {
			clearInterval(thisInterval);
			Credits(iscalledfrommm, canvasobj);
		}
	}, 100);
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { CreditsLoadImages(true, canvasobj); };
}

function debug_CreditsLoad(iscalledfrommm, canvasobj) {
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/Credits.jpg";
	finalCreditsImage.onload = () => { CreditsLoadImages(iscalledfrommm, canvasobj); };
}
