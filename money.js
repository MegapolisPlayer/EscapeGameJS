let MoneyAmount = 0;

//todo: red if in debt, if more than certain amount of debt - lose the game instantly

function drawMoneyCount(canvasobj) {
	if(MoneyAmount < -100) {
		//lose instantly
		
	}
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.setnewcolor("#ffffff");
	let text = TranslatedText[SettingsValues.Language][51]+": "+MoneyAmount+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	if(MoneyAmount >= 1000) {
		canvasobj.setnewcolor("#298600");
	}
	else if(MoneyAmount >= 0) {
		canvasobj.setnewcolor("#333399");
	}
	else {
		canvasobj.setnewcolor("#800000");
	}
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}

function addMoney(amount) {
	MoneyAmount += amount;
}

function removeMoney(amount) {
	MoneyAmount -= amount;
}

function setMoney(amount) {
	MoneyAmount = amount;
}
