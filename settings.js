let SettingsValues = {
	Difficulty:1, //1 - easy, 2 - medium, 3 - hard
	ChanceOfInstantLoss:1000, //chance if instant loss per day
	MoneyCostIncrease:1, //value to multiply costs with, easy = 0,5, medium = 1, hard = 1,5
};

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
