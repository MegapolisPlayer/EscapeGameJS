//ENTRY POINT FILE
//three-letter city codes:
//HNM - Hranice Na Morave, ID 1
//PRE - Prerov, ID 2
//NZM - Nezamyslice, ID 3
//PRO - Prostejov, ID 4
//OLO - Olomouc, ID 5
//STU - Studenka, ID 6
//OST - Ostrava, ID 7
//KTW - Katowice (PL) - end, no code

if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

console.log("Escape from Olomouc\n%cPlease do not enter anything here.\nThis is strictly for debugging or error logging.\nIf you see an error (large red box) please report it to the author.", "color: red; font-weight: bold;");

AllowedToPause = false;

const cvs = new Canvas("EscapeCanvas", "Arial, FreeSans", "48", "#333399", 1000, 500);
cvs.clear("purple");
cvs.loadingMsg();

const MainMenuImage = new Image();
MainMenuImage.src = "res/prerov/nastupiste.jpg";
MainMenuImage.onload = MainMenuSetup;

let mainMenuButtons = [];

function MainMenuSetup() {
	cvs.loadingMsg();
	console.log("Entered MainMenuSetup()");
	
	//translations
	TranslationLoad("EN", 0);
	TranslationLoad("CZ", 1);
	TranslationLoad("DE", 2);
	TranslationLoad("SUS", 3); //jirkas custom lang
	TranslationLoad("BA", 4); //jirkas custom lang

	//key buttons activation
	window.addEventListener("keydown", (event) => {
		if(event.key == "Escape") {
			Pause(cvs);
		}
	});	
	
	//checks if all images loaded
	let thisInterval = window.setInterval(() => {
		if(
			AmountTranslations === 5 && 
			TicketImagesLoaded === 2 &&
			AchievementImagesLoaded === 5 &&
			ArrowImagesLoaded === 9 &&
			TableImagesLoaded === 5 &&
			OrderImagesLoaded === 2 &&
			FishingImagesLoaded === 4 &&
			CashierImagesLoaded === 6
		) {
			clearInterval(thisInterval);
			MainMenu();
		}
	}, 100);
}

function MainMenu() {	
	//main menu
	
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.setnewborder("#ffffff");
	cvs.setnewcolor("#333399");
	
	mainMenuButtons.push(new Button(0,   400, 150, 100, 25, ap.allowed ? TranslatedText[SettingsValues.Language][5] : TranslatedText[SettingsValues.Language][4], "canvas_container"));
	mainMenuButtons.push(new Button(150, 400, 150, 100, 25, TranslatedText[SettingsValues.Language][6], "canvas_container"));
	mainMenuButtons.push(new Button(600, 100, 300, 100, 50, TranslatedText[SettingsValues.Language][1], "canvas_container"));
	mainMenuButtons.push(new Button(600, 200, 300, 100, 50, TranslatedText[SettingsValues.Language][2], "canvas_container"));
	mainMenuButtons.push(new Button(600, 300, 300, 100, 50, TranslatedText[SettingsValues.Language][3], "canvas_container"));

	mainMenuButtons[0].button.addEventListener("click", AudioEnabler);
	mainMenuButtons[1].button.addEventListener("click", (event) => { ap.resetTrack() });
	
	mainMenuButtons[2].button.addEventListener("click", (event) => { ButtonsRouter(0) });
	mainMenuButtons[3].button.addEventListener("click", (event) => { ButtonsRouter(1) });
	mainMenuButtons[4].button.addEventListener("click", (event) => { ButtonsRouter(2) });
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	chr.draw(360, 100, 0.25, cvs);	
	cvs.setfontweight("bold");

	cvs.text(TranslatedText[SettingsValues.Language][0], 50, 50);
	cvs.textborder(TranslatedText[SettingsValues.Language][0], 50, 50);
	
	cvs.resetfontweight();
	cvs.setnewcolor("#ffffff");
	cvs.setnewfont("Arial, FreeSans", "16");
	
	cvs.text("(c) Martin/MegapolisPlayer, Jiri/KohoutGD 2023", 650, 472);
	cvs.text("version 1.00, build date 10/6/2023", 650, 492);
	
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48");
	cvs.setnewborder("#000000");
}

//play menu

function PlayMenu() {
	cvs.loadingMsg();
	
	cvs.image(MainMenuImage, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][1], 50, 50);
	
	cvs.setnewfont("Arial, FreeSans", "32");
	let buttonNew = new Button(50, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][1], "canvas_container");
	let buttonLoad = new Button(350, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][10], "canvas_container");
	let buttonBack = new Button(650, 130, 300, 100, 25, TranslatedText[SettingsValues.Language][36], "canvas_container");
	
	let thisInterval = window.setInterval(() => {
		if(SavefileLoaded === true) {
			clearInterval(thisInterval);
			buttonNew.deleteButton();
			buttonLoad.deleteButton();
			buttonBack.deleteButton();
			//SetState called, no need to call anything
		}
	}, 100);
	
	buttonNew.button.addEventListener("click", (event) => {
		clearInterval(thisInterval);
		buttonNew.deleteButton();
		buttonLoad.deleteButton();
		buttonBack.deleteButton();
		setMoney(100000); //debug!!!!! todo: REMOVE remove REMOVE!!!!!!!
		//susstina achievement
		if(SettingsValues.Language === 4) {
			CreditsValues.gotAchievementSus = true;
		}
		IntroSetup();
	});
	buttonLoad.button.addEventListener("click", (event) => {
		Load(cvs);
	});
	buttonBack.button.addEventListener("click", (event) => {
		clearInterval(thisInterval);
		buttonNew.deleteButton();
		buttonLoad.deleteButton();
		buttonBack.deleteButton();
		MainMenu();
	});
}

//game stuff

function IntroSetup() {
	console.log("Registered PLAY Button press!");
	DialectTranslationMinigameLoad();
	//checks if all dialect files loaded
	let thisInterval = window.setInterval(() => {
		if(
			AmountDTMLoaded === 2
		) {
			clearInterval(thisInterval);
			Intro();
		}
	}, 100);
}

function Intro() {
	ap.playTrack(1);
	
	cvs.clear("black");
    cvs.setnewcolor("#800000");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][19], 50, 50);
	cvs.setnewcolor("white");
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml(TranslationGetMultipleLines(SettingsValues.Language, 20, 4), 100, 100);
	
	introarrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow.button.addEventListener("click", (event) => {
		introarrow.deleteButton();
   	 	Backstory(cvs);
	});
    introarrow.draw(cvs);
}

function Backstory() {
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.setnewfont("Arial, FreeSans", "48", "bold");
	cvs.text(TranslatedText[SettingsValues.Language][24], 50, 50);
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml(TranslationGetMultipleLines(SettingsValues.Language, 29, 7), 100, 100);
	
	introarrow = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow.button.addEventListener("click", (event) => {
		introarrow.deleteButton();
   	 	HraniceNaMoraveLoad(cvs);
	});
    introarrow.draw(cvs);
}

//main menu stuff

function ButtonsRouter(buttonid) {
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
	mainMenuButtons.length = 0;
	switch(buttonid) {
		case 0:
			PlayMenu();
		break;
		case 1:
			SettingsButtonRegister(cvs);
		break;
		case 2:
			CreditsButtonRegister(cvs);
		break;
	}
}

//audio toggle button

function AudioEnabler() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText(TranslatedText[SettingsValues.Language][5]);
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText(TranslatedText[SettingsValues.Language][4]);
	 }
}
