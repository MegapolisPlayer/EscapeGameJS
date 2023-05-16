//waiter game

let WaiterGameValues = {
	IsOver: -1
}

function WaiterGame(canvas) {
	WaiterGameValues.IsOver = -1;
	console.log("waiter game");
	canvas.clear("#dddddd");
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Here, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		addMoney(700);
		WaiterGameValues.IsOver = 1;
	}, { once: true });
	ArrowEnd.draw(canvas);
}

function WaiterGameComponentIntro(canvas) {
	canvas.text("");
}
function WaiterGameComponentMain(canvas) {
	
}

function WaiterGameReset() {
	WaiterGameValues.IsOver = -1;
}

//le fish game - becva in prerov

let FishGameValues = {
	IsOver: -1,
	LeFishCaught: 0
}

function FishGame(canvas) {
	FishGameValues.LeFishCaught = 0;
	FishGameValues.IsOver = -1;
	console.log("fish game");
	canvas.clear("#4d5234");
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Here, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		FishGameValues.IsOver = 1;
	}, { once: true });
	ArrowEnd.draw(canvas);
}

function FishGameReset() {
	FishGameValues.IsOver = -1;
}

let ToiletCleaningGameValues = {
	IsOver: -1
}

function ToiletCleaningGame(canvas) {

}

function ToiletCleaningGameReset(canvas) {
	ToiletCleaningGameValues.IsOver = -1;
}

//dialect translation

let DialectTranslationGameValues = {
	IsOver: -1
}

function DialectTranslationGame(canvas) {

}

function DialectTranslationGameComponentIntro(canvas) {

} 
function DialectTranslationGameComponentMain(canvas) {
	
}

function DialectTranslationGameReset() {
	WaiterGameValues.IsOver = -1;
}

//cashier

let CashierGameValues = {
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

function CashierGameReset() {
	CashierGameValues.IsOver = -1;
}

//cheese making

let CheeseGameValues = {
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
	IsOver: -1
}

function DefenseGame(canvas) {
	DefenseGameValues.IsOver = -1;
	console.log("shooting game");
}

function DefenseGameComponentIntro(canvas) {

} 
function DefenseGameComponentMain(canvas) {
	
}

function DefenseGameReset() {
	DefenseGameValues.IsOver = -1;
}
