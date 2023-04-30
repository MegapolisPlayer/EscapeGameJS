let MoneyCount = 0;

function drawMoneyCount(canvasobj) {
	canvasobj.setnewfont("Arial, FreeSans", "32");
	canvasobj.setnewcolor("#ffffff");
	let text = "Money: "+MoneyCount+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	canvasobj.setnewcolor("#333399");
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}

function addMoney(amount) {
	MoneyCount += amount;
}

function removeMoney(amount) {
	MoneyCount -= amount;
}

function setMoney(amount) {
	MoneyCount = amount;
}
