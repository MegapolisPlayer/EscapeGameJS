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
		canvasobj.setalign("center");; 
		canvasobj.image(imageyes, 350, 100, 300, 300);
		canvasobj.resetalign() 
		canvasobj.text(TranslatedText[SettingsValues.Language][87], 100, 300);
	}
	else {
		canvasobj.setalign("center");; 
		canvasobj.image(imageno, 350, 100, 300, 300);
		canvasobj.resetalign() 
		canvasobj.text(TranslatedText[SettingsValues.Language][88], 100, 300);
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
		canvasobj.textml(TranslatedText[SettingsValues.Language][70], 50, 190);
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
		canvasobj.text(TranslatedText[SettingsValues.Language][71], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Martin (MegapolisPlayer)\nJirka (KohoutGD)", 200, 230);
		canvasobj.resetfontweight();
	}, 1 * delay);
	
	setTimeout(() => {
		//images - wikipedia
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][72], 50, 160);
		canvasobj.setfontweight("bold");
		canvasobj.textml(
			"SReality, Freepik: jcomp, VlakemJednoduse.cz, Fortes Interactive\n"+
			"VagonWeb.cz, Pixabay: PickupImage, pexels\n"+
			"All other assets are custom-made.\n"
		, 75, 200);
		canvasobj.resetfontweight();
	}, 2 * delay);
	
	setTimeout(() => {
		//images - non-wikipedia
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][72], 50, 160);
		canvasobj.setfontweight("bold");
		canvasobj.textml(
			"From Wikimedia Commons (in no particular order):\n"+
			"Marie Čchiedzeová, Vojtěch Dočkal, Jiří Komárek, JirkaSv\n"+
			"Dezidor, Vitezslava, Kamil Czianskim, Michal Klajban\n"+
			"STERUSSTUDENKA, Draceane, Herbert Frank, Palickap\n"+
			"RPekar\n"
		, 75, 200);
		canvasobj.resetfontweight();
	}, 3 * delay);	

	setTimeout(() => {
		//music
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][73], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("All music by Kevin Macleod (incompetech.com)\n"+
						"Licensed under CC-BY 4.0\n"+
						"https://creativecommons.org/licenses/by/4.0/\n"+
						"SFX from Pixabay\n"+
						"The list of authors is in the res/sfx/ folder.\n"
						, 100, 230);
		canvasobj.resetfontweight();
	}, 4 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][74], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Čeština, English, Русский - Martin\nDeutsch, Susština - Jirka\n", 100, 230);
		canvasobj.resetfontweight();
	}, 5 * delay);

	setTimeout(() => {
		//translations
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][75], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Licensed under CC-BY-SA 4.0\nImages - Content License, CC-BY-SA 4.0\nMusic - CC-BY 4.0", 100, 230);
		canvasobj.resetfontweight();
	}, 6 * delay);

	setTimeout(() => {
		//misc
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.text(TranslatedText[SettingsValues.Language][75], 50, 190);
		canvasobj.setfontweight("bold");
		canvasobj.textml("Nářečí ČJ: cs.wikiversity.org/wiki\nEnglish Dialect: -\nDeutsche Dialekte: -\nРусские диалекты: -\n", 100, 230);
		canvasobj.resetfontweight();
	}, 7 * delay);
	
	if(!iscalledfrommm) {
		setTimeout(() => {
			//achievements
			canvasobj.setalign("center"); 
			canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][76], 500, 250); 
			canvasobj.setnewfont("Arial, FreeSans", "32", "normal");
			canvasobj.resetalign();
		}, 8 * delay);
		
		setTimeout(() => {
			//achievements - medal for speed
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][77], 100, 250); 
			canvasobj.setalign("center");;
			canvasobj.text(TranslatedText[SettingsValues.Language][78], 500, 450); 
			canvasobj.resetalign()
			CreditsRenderAchievement(CreditsValues.gotAchievementSpeed, AchievementImages[1], AchievementImages[0], canvasobj);
		}, 9 * delay);

		setTimeout(() => {
			//achievements - waiters medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][79], 100, 250); 
			canvasobj.setalign("center");;
			canvasobj.text(TranslatedText[SettingsValues.Language][80], 500, 450); 
			canvasobj.resetalign()
			CreditsRenderAchievement(CreditsValues.gotAchievementWaiter, AchievementImages[2], AchievementImages[0], canvasobj);
		}, 10 * delay);

		setTimeout(() => {
			//achievements - help medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][81], 100, 250);
			canvasobj.setalign("center");;
			canvasobj.text(TranslatedText[SettingsValues.Language][82], 500, 450); 
			canvasobj.resetalign()
			CreditsRenderAchievement(CreditsValues.gotAchievementHelp, AchievementImages[3], AchievementImages[0], canvasobj);
		}, 11 * delay);
		
		setTimeout(() => {
			//achievements - sus medal
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][83], 100, 250);
			canvasobj.setalign("center");;
			canvasobj.text(TranslatedText[SettingsValues.Language][84], 500, 450); 
			canvasobj.resetalign()
			CreditsRenderAchievement(CreditsValues.gotAchievementSus, AchievementImages[4], AchievementImages[0], canvasobj);
		}, 12 * delay);
		setTimeout(() => {
			//time played
			canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
			canvasobj.text(TranslatedText[SettingsValues.Language][89], 50, 190); 
			canvasobj.setfontweight("bold");
			canvasobj.text(timerToString(), 100, 230);
			canvasobj.resetfontweight();
		}, 13 * delay);
	}

	setTimeout(() => {
		//quit game
		canvasobj.image(finalCreditsImage, 0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
		canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 85, 2), 100, 190); 
		window.addEventListener("click", (event) => {
			location.reload();		
		});
	}, (iscalledfrommm ? 9 : 14) * delay);
	
}

function CreditsButtonRegister(canvasobj) {
	console.log("Registered CREDITS Button press!");
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/katowice/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(true, canvasobj); };
}

function CreditsCaller(canvasobj) {
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/katowice/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(false, canvasobj); };
}

function debugCredits(iscalledfrommm, canvasobj) {
	canvasobj.loadingMsg();
	finalCreditsImage.src = "res/katowice/Credits.jpg";
	finalCreditsImage.onload = () => { Credits(iscalledfrommm, canvasobj); };
}
