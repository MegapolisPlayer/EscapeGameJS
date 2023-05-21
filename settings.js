let SettingsValues = {
	Difficulty: 2, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss: 5000, //chance if instant loss per day, easy = 10000, medium = 5000, hard = 1000
	MoneyCostIncrease: 1, //value to multiply costs with, easy = 0,75, medium = 1, hard = 1,25
	Language: 0 //0 - English, 1 - Czech, 2 - German, 3 - Russian
};

function deleteCanvasInputElems() {
	let inputElems = document.getElementsByClassName("CanvasInputElement");
	while(inputElems[0]) {
   		inputElems[0].parentNode.removeChild(inputElems[0]);
	}
}

function randomNumber(maxRange) {
  return Math.floor(Math.random() * maxRange);
}

function InstantLossScreen(eventNo, canvasobj) {
	deleteCanvasInputElems();
	canvasobj.clear("black");
	ap.playTrack(1);
	canvasobj.resetalign(); 
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.setnewcolor("#ff0000");
	canvasobj.text(TranslatedText[SettingsValues.Language][60], 500, 100);
	canvasobj.resetfontweight();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 55+(eventNo*2), 2), 500, 200);
	InstantLossScreen.Quit = new Button(700, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][17], "canvas_container");
	InstantLossScreen.Quit.button.addEventListener("click", (event) => {
		location.reload();
	});
}

function MoneyLossScreen(canvasobj) {
	deleteCanvasInputElems();
	canvasobj.clear("black");
	ap.playTrack(1);
	canvasobj.resetalign(); 
	canvasobj.setnewfont("Arial, FreeSans", "48", "bold");
	canvasobj.setnewcolor("#ff0000");
	canvasobj.text(TranslatedText[SettingsValues.Language][60], 500, 100);
	canvasobj.resetfontweight();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 55+(eventNo*2), 2), 500, 200);
	InstantLossScreen.Quit = new Button(700, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][17], "canvas_container");
	InstantLossScreen.Quit.button.addEventListener("click", (event) => {
		location.reload();
	});
}

function CheckInstantLoss(canvasobj) {
	let eventNo = randomNumber(SettingsValues.ChanceOfInstantLoss);
	console.log("random loss event no: "+eventNo);
	if(eventNo < 5) {
		//game over!
		InstantLossScreen(eventNo, canvasobj);
	}
}

function IncrementDifficulty() {
	SettingsValues.Difficulty++;
	if(SettingsValues.Difficulty === 4) {
		SettingsValues.Difficulty = 1;
	}
}
function DecrementDifficulty() {
	SettingsValues.Difficulty--;
	if(SettingsValues.Difficulty === 0) {
		SettingsValues.Difficulty = 3;
	}
}
function IncrementLanguage() {
	SettingsValues.Language++;
	if(SettingsValues.Language === 4) {
		SettingsValues.Language = 0;
	}
}
function DecrementLanguage() {
	SettingsValues.Language--;
	if(SettingsValues.Language === -1) {
		SettingsValues.Language = 3;
	}
}

function UpdateSettingsValues() {
	switch(SettingsValues.Difficulty) {
		case 1:
		SettingsValues.ChanceOfInstantLoss = 10000;
		SettingsValues.MoneyCostIncrease = 0.75;
		break;
		case 2:
		SettingsValues.ChanceOfInstantLoss = 5000;
		SettingsValues.MoneyCostIncrease = 1;
		break;
		case 3:
		SettingsValues.ChanceOfInstantLoss = 1000;
		SettingsValues.MoneyCostIncrease = 1.25;
		break;
	}
}

function SettingsRenderDifficultyRelatedText(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(420, 150, 200, 120);
	canvasobj.box(100, 110, 200, 50);
	canvasobj.setnewcolor("#333399");
	switch(SettingsValues.Difficulty) {
		case 1:
			canvasobj.text(TranslatedText[SettingsValues.Language][13], 150, 150);
			canvasobj.text("0.75", 450, 200);
			canvasobj.text("1:10000", 450, 250);
		break;
		case 2:
			canvasobj.text(TranslatedText[SettingsValues.Language][14], 150, 150);
			canvasobj.text("1.00", 450, 200);
			canvasobj.text("1:5000", 450, 250);
		break;
		case 3:
			canvasobj.text(TranslatedText[SettingsValues.Language][15], 150, 150);
			canvasobj.text("1.25", 450, 200);
			canvasobj.text("1:1000", 450, 250);
		break;
	}
}

function SettingsRenderLanguageRelatedText(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(650, 110, 200, 50);
	canvasobj.setnewcolor("#333399");
	switch(SettingsValues.Language) {
		case 0:
			canvasobj.text("English", 700, 150);
		break;
		case 1:
			canvasobj.text("Čeština", 700, 150);
		break;
		case 2:
			canvasobj.text("Deutsch", 700, 150);
		break;
		case 3:
			canvasobj.text("Русский", 700, 150);
		break;
	}
}

function Settings(canvasobj) {	
	Settings.arrowPrev = new Arrow(50, 110, 50, 50, ArrowDirections.Left, null);
	Settings.arrowNext = new Arrow(300, 110, 50, 50, ArrowDirections.Right, null);
	Settings.buttonBack = new Button(50, 400, 300, 100, 25, TranslatedText[SettingsValues.Language][36], "canvas_container");
	//language
	Settings.arrowPrevL = new Arrow(600, 110, 50, 50, ArrowDirections.Left, null);
	Settings.arrowNextL = new Arrow(850, 110, 50, 50, ArrowDirections.Right, null);
	
	Settings.arrowPrev.button.addEventListener("click", (event) => {
		DecrementDifficulty();
		UpdateSettingsValues();
		SettingsRenderDifficultyRelatedText(canvasobj);
	});
	Settings.arrowNext.button.addEventListener("click", (event) => {
		IncrementDifficulty();
		UpdateSettingsValues();
		SettingsRenderDifficultyRelatedText(canvasobj);
	});
	Settings.buttonBack.button.addEventListener("click", (event) => {
		Settings.arrowPrev.deleteButton();
		Settings.arrowNext.deleteButton();
		Settings.buttonBack.deleteButton();
		Settings.arrowPrevL.deleteButton();
		Settings.arrowNextL.deleteButton();
		MainMenu();
	});
	Settings.arrowPrevL.button.addEventListener("click", (event) => {
		DecrementLanguage();
		SettingsRenderLanguageRelatedText(canvasobj);
	});
	Settings.arrowNextL.button.addEventListener("click", (event) => {
		IncrementLanguage();
		SettingsRenderLanguageRelatedText(canvasobj);
	});
	
	Settings.arrowPrev.append(canvasobj);
	Settings.arrowNext.append(canvasobj);
	Settings.arrowPrevL.append(canvasobj);
	Settings.arrowNextL.append(canvasobj);
	
	canvasobj.clear("#dddddd");
	canvasobj.setfontweight("bold");
	canvasobj.text(TranslatedText[SettingsValues.Language][2], 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32", "bold");
	
	canvasobj.text(TranslatedText[SettingsValues.Language][12], 50, 100);
	
	canvasobj.text(TranslatedText[SettingsValues.Language][16], 50, 200);
	canvasobj.text(TranslatedText[SettingsValues.Language][17], 50, 250);

	canvasobj.text(TranslatedText[SettingsValues.Language][18], 650, 50);

	canvasobj.resetfontweight();

	Settings.arrowPrev.draw(canvasobj);
	Settings.arrowNext.draw(canvasobj);

	Settings.arrowPrevL.draw(canvasobj);
	Settings.arrowNextL.draw(canvasobj);
	
	UpdateSettingsValues();
	SettingsRenderDifficultyRelatedText(canvasobj);		
	SettingsRenderLanguageRelatedText(canvasobj);
	
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 26, 3), 50, 300);	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}

