//waiter game

let WaiterGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	HowMuchCooking: 0,
	AmountEarned: 0,
}

class TableManager {
	constructor() {

	}
};

function WaiterGame(canvas) {
	WaiterGameValues.IsOver = -1;
	console.log("waiter game");
	WaiterGameComponentIntro(canvas);
	let introInterval = window.setInterval((canvas) => {
		if(WaiterGameValues.IsIntroEnd === true) {
			clearInterval(introInterval);
			WaiterGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function WaiterGameComponentIntro(canvas) {
	canvas.clear("#dddddd");
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		WaiterGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][96], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 97, 5), 50, 100);
	canvas.setnewcolor("#333399");
	canvas.context.textAlign = "right";
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.context.textAlign = "left";
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#000000");
}

//table count: easy - 16, medium - 24, hard - 32

function WaiterGameComponentMain(canvas) {
	canvas.clear("#bd9d80");
	let amountToRender = ((SettingsValues.Difficulty === 3) ? 32 : (SettingsValues.Difficulty === 1) ? 16 : 24);
	let tableButtons = [];
	for(let Id = 0; Id < amountToRender; Id++) {
		tableButtons.push(new TableManager()); //todo: make TableManager in minigame.js
	}
	timelimitStart(150); //2:30
	let timerInterval = window.setInterval((canvas) => {
		canvas.clear("#bd9d80");
		canvas.setnewcolor("#5c2f06"); //table colour
		for(let Id = 0; Id < amountToRender; Id++) {
			canvas.box(50 + ((250/SettingsValues.Difficulty) * Math.floor(Id / 4)), 50 + ((Id % 4) * 80), 60, 60);
		}
		canvas.setnewcolor("#555555");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#dddddd");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.height * 0.2, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#800000");
		canvas.context.textAlign = "center";
		canvas.text(WaiterGameValues.HowMuchCooking, canvas.canvas.height * 0.1, canvas.canvas.height * 0.9);
		canvas.context.textAlign = "left";
		canvas.setnewcolor("#000000");
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			WaiterGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
	addMoney(WaiterGameValues.AmountEarned); //15Kc per order!
}
function WaiterGameComponentSummary(canvas) {

}

function WaiterGameReset() {
	WaiterGameValues.IsIntroEnd = false;
	WaiterGameValues.IsOver = -1;
}

//le fish game - becva in prerov

let FishGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	LeFishCaught: 0
}

function FishGame(canvas) {
	FishGameValues.LeFishCaught = 0;
	FishGameValues.IsOver = -1;
	console.log("fish game");
	canvas.clear("#03ddff");
	FishGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(FishGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			FishGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function FishGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][99], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 100, 2), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		FishGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.context.textAlign = "right";
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.context.textAlign = "left";
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
}
function FishGameComponentMain(canvas) {
	canvas.clear("#03ddff");
	addMoney(50);
	FishGameValues.IsOver = 1;
}
function FishGameComponentSummary(canvas) {

}

function FishGameReset() {
	FishGameValues.IsIntroEnd = false;
	FishGameValues.IsOver = -1;
	FishGameValues.LeFishCaught = 0;
}

//dialect translation

let DialectTranslationGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DialectTranslationGame(canvas) {

}

function DialectTranslationGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function DialectTranslationGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}
function DialectTranslationGameComponentSummary(canvas) {

}

function DialectTranslationGameReset() {
	WaiterGameValues.IsOver = -1;
}

//toilet cleaning

let ToiletCleaningGameValues = {
	IsOver: -1
}

function ToiletCleaningGame(canvas) {

}

function  ToiletCleaningGameComponentIntro(canvas) {

}
function ToiletCleaningGameComponentMain(canvas) {

}
function ToiletCleaningGameComponentSummary(canvas) {

}

function ToiletCleaningGameReset(canvas) {
	ToiletCleaningGameValues.IsOver = -1;
}

//cashier

let CashierGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function CashierGame(canvas) {
	CashierGameValues.IsOver = -1;
	console.log("cashier game");
}

function CashierGameComponentIntro(canvas) {
	
} 
function CashierGameComponentMain(canvas) {
	
}
function CashierGameComponentSummary(canvas) {
	
}

function CashierGameReset() {
	CashierGameValues.IsOver = -1;
}

//cheese making

let CheeseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function CheeseGame(canvas) {
	CheeseGameValues.IsOver = -1;
	console.log("cashier game");
}

function CheeseGameComponentIntro(canvas) {

} 
function CheeseGameComponentMain(canvas) {
	
}

function CheeseGameReset() {
	CheeseGameValues.IsOver = -1;
}

//defense

let DefenseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DefenseGame(canvas) {
	DefenseGameValues.IsOver = -1;
	console.log("shooting game");
}

function DefenseGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function DefenseGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}

function DefenseGameReset() {
	DefenseGameValues.IsOver = -1;
}
