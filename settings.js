let SettingsValues = {
	Difficulty:2, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss: 5000, //chance if instant loss per day, easy = 10000, medium = 5000, hard = 1000
	MoneyCostIncrease: 1, //value to multiply costs with, easy = 0,75, medium = 1, hard = 1,25
};

function randomNumber(maxRange) {
  return Math.floor(Math.random() * maxRange);
}

function CheckInstantLoss() {
	if(randomNumber(SettingsValues.ChanceOfInstantLoss) === 1) {
		//game over!
		canvas.clear("black");
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
	canvasobj.box(420, 0, 600, 250);
	canvasobj.box(100, 110, 250, 50);
	canvasobj.setnewcolor("#333399");
	switch(SettingsValues.Difficulty) {
		case 1:
			canvasobj.text("Easy", 150, 150);
			canvasobj.text("0.75", 450, 200);
			canvasobj.text("10000", 450, 250);
		break;
		case 2:
			canvasobj.text("Medium", 150, 150);
			canvasobj.text("1.00", 450, 200);
			canvasobj.text("5000", 450, 250);
		break;
		case 3:
			canvasobj.text("Hard", 150, 150);
			canvasobj.text("1.25", 450, 200);
			canvasobj.text("1000", 450, 250);
		break;
	}
}

function Settings(canvasobj) {	
	Settings.arrowPrev = new Arrow(50, 110, 50, 50, ArrowDirections.Left, null);
	Settings.arrowNext = new Arrow(350, 110, 50, 50, ArrowDirections.Right, null);
	Settings.buttonBack = new Button(50, 400, 300, 100, 25, "Back to Menu", "canvas_container");
	
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
		MainMenu();
	});
	
	Settings.arrowPrev.append(canvasobj);
	Settings.arrowNext.append(canvasobj);
	
	canvasobj.clear("#dddddd");
	canvasobj.text("Settings", 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.setfontweight("bold");
	
	canvasobj.text("Difficulty", 50, 100);
	
	canvasobj.text("Cost Multiplier: ", 50, 200);
	canvasobj.text("Chance of loss per day: ", 50, 250);

	canvasobj.resetfontweight();

	Settings.arrowPrev.draw(canvasobj);
	Settings.arrowNext.draw(canvasobj);
	
	UpdateSettingsValues();
	SettingsRenderDifficultyRelatedText(canvasobj);		
	
	canvasobj.textml("The difficulty determines not only the above values,\nbut also the difficulty of the minigames.\nThe difficulty cannot be changed in-game.", 50, 300);	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}

