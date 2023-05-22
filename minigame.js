function renderTextAsMinigameStatus(text, number, canvas) {
	canvas.setnewfont("Arial, FreeSans", "32");
	canvas.setnewcolor("#ffffff");
	let textf = text+": "+number+" ";
	let metrics = canvas.context.measureText(textf);
	canvas.box(1000 - metrics.width - 20, 60, metrics.width + 20, 50);
	canvas.setnewcolor("#333399");
	canvas.text(textf, 1000 - metrics.width - 10, 80);
}

//waiter game

let WaiterGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	HowMuchCooking: 0,
	AmountEarned: 0,
	OrdersList: [],
	IsOrderSelected: -1,
}

let TableImages = [];
let TableImagesLoaded = 0;
for(let Id = 0; Id < 5; Id++) {
	TableImages.push(new Image());
	TableImages[Id].onload = () => { TableImagesLoaded++ };
}

TableImages[0].src = "res/table_empty.png";
TableImages[1].src = "res/table_order.png";
TableImages[2].src = "res/table_waiting.png";
TableImages[3].src = "res/table_waiting2.png";
TableImages[4].src = "res/table_fail.png"; 

let OrderImages = [];
let OrderImagesLoaded = 0;
for(let Id = 0; Id < 2; Id++) {
	OrderImages.push(new Image());
	OrderImages[Id].onload = () => { OrderImagesLoaded++ };
}

OrderImages[0].src = "res/order.png";
OrderImages[1].src = "res/order_selected.png";

//orders, etc
class TableManager {
	constructor(xoffset, yoffset, width, height, canvas, tableno) {
		this.button = document.createElement("button"); //new button, no need to del event listeners
	    
		this.width = width;
		this.height = height;
		this.xoffset = xoffset;
		this.yoffset = yoffset;
		this.status = 0; //0 - std, 1 - to order, 2 - waiting (ok), 3 - waiting (should deliver), 4 - warning
		this.counter = 0;
		this.canvas_info = canvas;
		this.tableno = tableno;
		
		this.button.setAttribute("class", "CanvasInputElement MinigameElement TableButton Invisible");
		this.button.style.setProperty("width", this.width+"px");
		this.button.style.setProperty("height", this.height+"px");
		this.button.style.setProperty("left", this.xoffset+"px");
		this.button.style.setProperty("top", this.yoffset+"px");
		
		this.button.addEventListener("click", (event) => {
			switch(this.status) {
				case 1:
					//ordering, clicked
					this.status = 2;
					WaiterGameValues.HowMuchCooking++;
					this.counter = 0;
					WaiterGameValues.OrdersList.push({
						orderFrom: this.tableno,
						timeAt: (timelimitToNumber() * 10),             //seconds left converted to ticks (=ticks left) at time of starting
						forHowLongCooking: 0,                           //ticks cooking, when reaches
						forHowLongShouldCook: (60 + randomNumber(20)),  //ticks for how long to cook between 6-8s (max waiting time 15s)
						isCooked: false,                                //if has finished cooking
						buttonObject: document.createElement("button"), //button element
						doesHaveButton: false,                          //if has button in DOM
					});
					let tempId = WaiterGameValues.OrdersList.length - 1;
					WaiterGameValues.OrdersList[tempId].buttonObject.setAttribute("class", "CanvasInputElement MinigameElement TableButton Invisible");
					WaiterGameValues.OrdersList[tempId].buttonObject.style.setProperty("width", this.canvas_info.canvas.height*0.2+"px");
					WaiterGameValues.OrdersList[tempId].buttonObject.style.setProperty("height", this.canvas_info.canvas.height*0.2+"px");
					WaiterGameValues.OrdersList[tempId].buttonObject.style.setProperty("top", canvas.canvas.height * 0.8+"px");
					break;
				case 2:
				case 3:
					//waiting - recieved
					if(WaiterGameValues.IsOrderSelected === this.tableno) {
						this.reset();
						WaiterGameValues.AmountEarned += 15;
						this.remove();
						this.counter = 0;
						//remove from array
						WaiterGameValues.OrdersList = WaiterGameValues.OrdersList.filter((order) => {
							if(order.orderFrom === this.tableno) {
								WaiterGameValues.IsOrderSelected = -1;
								order.buttonObject.remove();
								return false;
							}
							return true;
						});
					}
					break;
			}
		});		
	}
	draw() {	
		this.canvas_info.image(TableImages[this.status], this.xoffset, this.yoffset, this.width, this.height);
		this.canvas_info.setnewcolor("#a55200");
		this.canvas_info.resetalign();
		this.canvas_info.text(String("00" + Number(this.tableno)).slice(-2), this.xoffset + (this.width / 2), this.yoffset + this.height);
		this.canvas_info.setalign("left");
	}
	append() {
		this.canvas_info.canvas.parentElement.appendChild(this.button);
	}
	remove() {
		this.canvas_info.canvas.parentElement.removeChild(this.button);
	}
	setstatus(status) {
		this.status = status;
	}
	//in order to avoid using timer - freq is 100ms so counter int variable - update 100x and then start waiting
	update() {
		if(this.status != 0) {
			this.counter++;
		}
		switch(this.status) {
			case 0:
				//not ordered anything, order in 30s max
				if(randomNumber(300) === 100) {
					this.status = 1;
					this.append();
				}
				break;
			case 1:
				if(this.counter >= 100) { //10s
					//didnt click on order fast enough
					WaiterGameValues.AmountEarned -= 15;
					this.remove();
					this.status = 4;
					this.counter = 0;
				}
				break;
			case 2:
				if(this.counter >= 100) { //10s
					this.status = 3;
					this.counter = 0;
				}
				break;
			case 3:
				if(this.counter >= 50) { //5s
					//fail
					WaiterGameValues.AmountEarned -= 15;
					this.remove();
					this.status = 4;
					this.counter = 0;
					//remove from array
					WaiterGameValues.OrdersList = WaiterGameValues.OrdersList.filter((order) => {
						if(order.orderFrom === this.tableno) {
							WaiterGameValues.IsOrderSelected = -1;
							order.buttonObject.remove();
							return false;
						}
						return true;
					});
				}
				break;
			case 4:
				if(this.counter >= 50) { //5s - cooldown, nothing allowed
					this.reset();
				}
				break;
		}
	}
	reset() {
		this.status = 0;
		this.counter = 0;
	}
};

//waiter game - hranice, prostejov

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
	ap.playTrack(10);
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
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#000000");
}

//table count: easy - 16, medium - 24, hard - 32

function WaiterGameComponentMain(canvas) {
	canvas.clear("#bd9d80");

	//variables and setup
	let amountToRender = ((SettingsValues.Difficulty === 3) ? 32 : (SettingsValues.Difficulty === 1) ? 16 : 24);
	let tables = [];
	for(let Id = 0; Id < amountToRender; Id++) {
		tables.push(new TableManager(
			50 + ((250/SettingsValues.Difficulty) * Math.floor(Id / 4)),
			50 + ((Id % 4) * 80), 
			60, 60, canvas, Id));
	}
	let orderFLCounter = 0;

	//main game
	timelimitStart(150); //2:30 min, you should get around 900-1000 with 3mins depending on luck 2:30 is ok
	let timerInterval = window.setInterval((canvas) => {
		console.log(WaiterGameValues.IsOrderSelected);
		canvas.clear("#bd9d80");
		//render tables
		for(let Id = 0; Id < amountToRender; Id++) {
			tables[Id].update();
			tables[Id].draw();
		}
		//background
		canvas.setnewcolor("#555555");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#dddddd");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.height * 0.2, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#800000");
		canvas.resetalign();
		canvas.text(WaiterGameValues.HowMuchCooking, canvas.canvas.height * 0.1, canvas.canvas.height * 0.9);
		canvas.setalign("left");
		canvas.setnewcolor("#000000");

		let lastOrderListSize = 0;
		//process and render 
		for(let Id = 0; Id < WaiterGameValues.OrdersList.length; Id++) {
			if(!WaiterGameValues.OrdersList[Id].isCooked) {
				WaiterGameValues.OrdersList[Id].forHowLongCooking++;
				if(WaiterGameValues.OrdersList[Id].forHowLongCooking === WaiterGameValues.OrdersList[Id].forHowLongShouldCook) {
					WaiterGameValues.HowMuchCooking--;
					WaiterGameValues.OrdersList[Id].isCooked = true;
				}
			}
			else {
				WaiterGameValues.OrdersList[Id].buttonObject.style.setProperty("left", String(Number(canvas.canvas.height * 0.2 + 25 + (orderFLCounter * canvas.canvas.height * 0.2)))+"px");
				
				//throws non-fatal error "WaiterGameValues.OrdersList[Id] is undefined" and does nothing, this is ok since the game works!
				try {
					WaiterGameValues.OrdersList[Id].buttonObject.removeEventListener("click", (event) => {
						try {
							WaiterGameValues.IsOrderSelected = WaiterGameValues.OrdersList[Id].orderFrom;
						} catch(error) {}
					});
					WaiterGameValues.OrdersList[Id].buttonObject.addEventListener("click", (event) => {
						try {
							WaiterGameValues.IsOrderSelected = WaiterGameValues.OrdersList[Id].orderFrom; //set to which table's order (if -1 none)
						} catch(error) { WaiterGameValues.IsOrderSelected = -1; }
					});
				}
				catch(error) {}

				if(WaiterGameValues.OrdersList[Id].doesHaveButton === false) {
					canvas.canvas.parentElement.appendChild(WaiterGameValues.OrdersList[Id].buttonObject);
					WaiterGameValues.OrdersList[Id].doesHaveButton = true;
				}
				canvas.image(OrderImages[(WaiterGameValues.IsOrderSelected === WaiterGameValues.OrdersList[Id].orderFrom) ? 1 : 0], canvas.canvas.height * 0.2 + 25 + (orderFLCounter * canvas.canvas.height * 0.2), canvas.canvas.height * 0.8, canvas.canvas.height * 0.2, canvas.canvas.height * 0.2);
				canvas.resetalign();
				canvas.text(WaiterGameValues.OrdersList[Id].orderFrom, canvas.canvas.height * 0.3 + 25 + (orderFLCounter * canvas.canvas.height * 0.2), canvas.canvas.height * 0.9 + 16);
				canvas.setalign("left");
				orderFLCounter++;
			}
		}
		orderFLCounter = 0;
		//is selected
		if(WaiterGameValues.IsOrderSelected !== -1) {
			renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][102], WaiterGameValues.IsOrderSelected, canvas);
		}
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(WaiterGameValues.AmountEarned); //15Kc per order!
			deleteCanvasInputElems(canvas);
			WaiterGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function WaiterGameReset() {
	WaiterGameValues.IsIntroEnd = false;
	WaiterGameValues.IsOver = -1;
	WaiterGameValues.HowMuchCooking = 0;
	WaiterGameValues.AmountEarned = 0;
	WaiterGameValues.OrdersList = [];
	WaiterGameValues.IsOrderSelected = -1;
}

//le fish game - becva in prerov

let FishGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	Angle: 0, //range 60 to -60
	AngleReverseDirection: false,
}

let FishingImages = [];
let FishingImagesLoaded = 0;
for(let Id = 0; Id < 3; Id++) {
	FishingImages.push(new Image());
	FishingImages[Id].onload = () => { FishingImagesLoaded++ };
}

FishingImages[0].src = "res/fish.png";
FishingImages[1].src = "res/tire.png";
FishingImages[2].src = "res/boot.png";

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
	ap.playTrack(11);
	canvas.clear("#03ddff");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][103] + " - " + TranslatedText[SettingsValues.Language][96], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 104, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		FishGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
}
function FishGameComponentMain(canvas) {
	canvas.clear("#03ddff");
	//variables and setup
	
	//main game
	timelimitStart(60); //1:00 min
	let timerInterval = window.setInterval((canvas) => {
		canvas.clear("#03ddff");
		//render objects - abstract into classes
		for(let Id = 0; Id < 10; Id++) {
			canvas.image(FishingImages[randomNumber(3)], randomNumber(1000), randomNumber(500), 60, 60);
		}
		//render line - length of line 400
		let finalx = Math.sin(toRadians(FishGameValues.Angle)) * 400;
		let finaly = Math.cos(toRadians(FishGameValues.Angle)) * 400;
		canvas.line(500, 50, 500 + finalx, 50 + finaly, 15, "#dddddd");
		canvas.line(500, 50, 500 + finalx, 50, 5, "#800000"); //debug
		canvas.line(500, 50, 500, 50 + finaly, 5, "#000080"); //debug
		//angle calc
		if(FishGameValues.AngleReverseDirection) {
			FishGameValues.Angle -= 1;
			if(FishGameValues.Angle <= -60) {
				FishGameValues.AngleReverseDirection = false;
			}
		}
		else {
			FishGameValues.Angle += 1;
			if(FishGameValues.Angle >= 60) {
				FishGameValues.AngleReverseDirection = true;
			}
		}
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(FishGameValues.AmountEarned); //50Kc fish, 10Kc pneu, 5Kc boots
			deleteCanvasInputElems(canvas);
			FishGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function FishGameReset() {
	FishGameValues.IsIntroEnd = false;
	FishGameValues.IsOver = -1;
	FishGameValues.AmountEarned = 0;
}

//ticket sale minigame - nezamyslice

let TicketSaleGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

//literally selection minigame - map image and random points - if correct tip (few buttons w/ text) +1 point and money

function TicketSaleGame(canvas) {
	TicketSaleGameValues.IsOver = -1;
	console.log("ticket sale game");
}

function TicketSaleGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function TicketSaleGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}

function TicketSaleGameReset() {
	TicketSaleGame.IsOver = -1;
}

//dialect translation - nezamyslice

let DialectTranslationGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DialectTranslationGame(canvas) {
	WaiterGameValues.IsOver = -1;
	console.log("waiter game");
}

function DialectTranslationGameComponentIntro(canvas) {
	canvas.clear("#03ddff");
} 
function DialectTranslationGameComponentMain(canvas) {
	canvas.clear("#03ddff");
}

function DialectTranslationGameReset() {
	WaiterGameValues.IsOver = -1;
}

//cleaning the beches on the square - prostejov

let CleaningGameValues = {
	IsOver: -1
}

function CleaningGame(canvas) {
	CleaningGameValues.IsOver = -1;
	console.log("cleaning game");
}

function CleaningGameComponentIntro(canvas) {

}
function CleaningGameComponentMain(canvas) {

}

function CleaningGameReset(canvas) {
	CleaningGameValues.IsOver = -1;
}

//cashier - prostejov, olomouc

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

function CashierGameReset() {
	CashierGameValues.IsOver = -1;
}

//cheese making - olomouc

let CheeseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function CheeseGame(canvas) {
	CheeseGameValues.IsOver = -1;
	console.log("cheese game");
}

function CheeseGameComponentIntro(canvas) {

} 
function CheeseGameComponentMain(canvas) {
	
}

function CheeseGameReset() {
	CheeseGameValues.IsOver = -1;
}

//defense - studenka

let DefenseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

function DefenseGame(canvas) {
	DefenseGameValues.IsOver = -1;
	console.log("defense game");
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

//maze game in ostrava integrated into Ostrava.js
