let SettingsValues = {
	Difficulty:1, //0 - easy, 1 - medium, 2 - hard
	ChanceOfInstantLoss:1000, //chance if instant loss per day
	MoneyCostIncrease:1, //value to multiply costs with, easy = 0,5, medium = 1, hard = 1,5
};

function Settings(canvasobj) {
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(0, 0, canvasobj.canvas.width, canvasobj.canvas.height);
	canvasobj.setnewcolor("#333399");
	canvasobj.text("Settings", 50, 50);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.text("Difficulty", 50, 50);
	canvasobj.text("Cost Multiplier", 50, 150);
	canvasobj.text("Chance of loss", 50, 250);
	
}

function SettingsButtonRegister(canvasobj) {
	console.log("Registered SETTINGS Button press!");
	Settings(canvasobj);
}
