let SettingsValues = {
	Difficulty:2, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss: 5000, //chance if instant loss per day, easy = 10000, medium = 5000, hard = 1000
	MoneyCostIncrease: 1, //value to multiply costs with, easy = 0,75, medium = 1, hard = 1,25
};

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

function Settings(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.setnewcolor("#333399");
	canvasobj.text("Settings", 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.text("Difficulty", 50, 100);
	canvasobj.text("Cost Multiplier", 50, 150);
	canvasobj.text("Chance of loss", 50, 200);
	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}
