function renderTextAsMinigameStatusRoot(x, row, width, text, canvas) {
	canvas.setnewfont("Arial, FreeSans", "32");
	canvas.setnewcolor("#ffffff");
	canvas.box(x, row * 50, width, 50);
	canvas.setnewcolor("#333399");
	canvas.text(text, x + 10, 40 + row * 40);
}

//right top corner, 2nd row
function renderTextAsMinigameStatus(text, number, canvas) {
	let textf = text+": "+number+" ";
	let metrics = canvas.context.measureText(textf);
	renderTextAsMinigameStatusRoot(1000 - metrics.width - 20, 1, metrics.width + 20, textf, canvas);
}

//left top corner
function renderTextAsMinigameStatus2(text, number, canvas) {
	let textf = text+": "+number+" ";
	let metrics = canvas.context.measureText(textf);
	renderTextAsMinigameStatusRoot(0, 0, metrics.width + 20, textf, canvas);
}

//right top corner
function renderTextAsMinigameStatus3(text, number, canvas) {
	let textf = text+": "+number+" ";
	let metrics = canvas.context.measureText(textf);
	renderTextAsMinigameStatusRoot(1000 - metrics.width - 20, 0, metrics.width + 20, textf, canvas);
}

//center top
function renderTextAsMinigameStatus4(text, number, canvas) {
	let textf = text+": "+number+" ";
	let metrics = canvas.context.measureText(textf);
	renderTextAsMinigameStatusRoot(500 - (metrics.width / 2) - 10, 0, metrics.width + 20, textf, canvas);
}

//returns if is collision
function DetectCollisions(xleft1, ytop1, xright1, ybottom1, xleft2, ytop2, xright2, ybottom2) {
	//if it works dont question it - kinda get that 2 statements are just for not bugging out when behing obj but still
	if(
		xleft1 < xright2 &&
		xright1 > xleft2 &&
		ytop1 < ybottom2 &&
		ybottom1 > ytop2
	) {
		return true;
	}
	else {
		return false;
	}
}

//calculates distance using pythagoreas theorem
function GetDistance(x1, y1, x2, y2) {
	let deltaX = Math.abs(x1 - x2);
	let deltaY = Math.abs(y1 - y2);
	return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))
}

//waiter game

let WaiterGameHranice = false;
let WaiterGameProstejov = false;

let WaiterGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	HowMuchCooking: 0,
	AmountEarned: 0,
	OrdersList: [],
	IsOrderSelected: -1,
	AmountOrders: 0,
}

let TableImages = [];
let TableImagesLoaded = 0;
for(let Id = 0; Id < 5; Id++) {
	TableImages.push(new Image());
	TableImages[Id].onload = () => { TableImagesLoaded++ };
}

TableImages[0].src = "res/minigames/waiter/table_empty.png";
TableImages[1].src = "res/minigames/waiter/table_order.png";
TableImages[2].src = "res/minigames/waiter/table_waiting.png";
TableImages[3].src = "res/minigames/waiter/table_waiting2.png";
TableImages[4].src = "res/minigames/waiter/table_fail.png"; 

let OrderImages = [];
let OrderImagesLoaded = 0;
for(let Id = 0; Id < 2; Id++) {
	OrderImages.push(new Image());
	OrderImages[Id].onload = () => { OrderImagesLoaded++ };
}

OrderImages[0].src = "res/minigames/waiter/order.png";
OrderImages[1].src = "res/minigames/waiter/order_selected.png";

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
						ap.playSFX(3); //success
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
						WaiterGameValues.AmountOrders++;
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
					ap.playSFX(4); //fail
					WaiterGameValues.AmountEarned -= 5;
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
					ap.playSFX(4);
					WaiterGameValues.AmountEarned -= 15;
					this.remove();
					this.status = 4;
					this.counter = 0;
					//remove from array
					WaiterGameValues.OrdersList = WaiterGameValues.OrdersList.filter((order) => {
						if(order.orderFrom === this.tableno) {
							if(WaiterGameValues.IsOrderSelected === this.tableno) {
								WaiterGameValues.IsOrderSelected = -1;
							}
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
	WaiterGameReset();
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
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][102], WaiterGameValues.AmountOrders, canvas);
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
	WaiterGameValues.AmountOrders = 0;
}

//le fish game - becva in prerov

let FishGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	Angle: 0, //range 65 to -65
	AngleReverseDirection: false,
	Length: 100,
	LengthResize: false,
	LengthReverseResize: false,
	IsHauling: -1, //id of hauling
	TypeOfHauledCargo: -1,
}

function SetResizeToTrue() {
	FishGameValues.LengthResize = true;
}

let FishingImages = [];
let FishingImagesLoaded = 0;
for(let Id = 0; Id < 4; Id++) {
	FishingImages.push(new Image());
	FishingImages[Id].onload = () => { FishingImagesLoaded++ };
}

FishingImages[0].src = "res/minigames/fish/fish.png";
FishingImages[1].src = "res/minigames/fish/tire.png";
FishingImages[2].src = "res/minigames/fish/boot.png";
FishingImages[3].src = "res/minigames/fish/box.png";

class LeObject {
	constructor(objtype, doesmovevertically, doesmovehorizontally, canvas) {
		this.dmv = doesmovevertically;
		this.dmh = doesmovehorizontally;
		this.canvas_info = canvas;
		this.xoffset = 100 + randomNumber(this.canvas_info.canvas.width - 200);
		this.yoffset = 200 + randomNumber(this.canvas_info.canvas.height - 250);
		this.objecttype = objtype;
	}
	reroll() {
		this.xoffset = 100 + randomNumber(this.canvas_info.canvas.width - 200);
		this.yoffset = 200 + randomNumber(this.canvas_info.canvas.height - 250);
	}
	draw() {
		this.canvas_info.image(FishingImages[this.objecttype], this.xoffset - 30, this.yoffset - 30, 60, 60);
	}
	drawhaul(cx, cy) {
		moveTo(cx, cy);
		this.canvas_info.context.save();
		this.canvas_info.context.translate(this.xoffset, this.yoffset);
		this.canvas_info.context.rotate(toRadians(90 - FishGameValues.Angle));
		this.canvas_info.context.translate(-this.xoffset, -this.yoffset);
		this.canvas_info.image(FishingImages[this.objecttype], this.xoffset - 30, this.yoffset - 30, 60, 60);
		this.canvas_info.context.restore();
	}
	moveTo(x, y) {
		this.xoffset = x;
		this.yoffset = y;
	}
	moveByX(x) {
		this.xoffset = x;
	}
	moveByY(y) {
		this.yoffset = y;
	}
};

function FishGame(canvas) {
	FishGameReset();
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
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][103], 50, 50);
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
	let FishObjects = [];
	//fish
	for(let Id = 0; Id < 9; Id++) {
		FishObjects.push(new LeObject(0, false, true, canvas));
	}
	//tires
	for(let Id = 0; Id < 4; Id++) {
		FishObjects.push(new LeObject(1, false, true, canvas));
	}
	//boots
	for(let Id = 0; Id < 4; Id++) {
		FishObjects.push(new LeObject(2, false, true, canvas));
	}
	//boxes
	for(let Id = 0; Id < 3; Id++) {
		FishObjects.push(new LeObject(3, false, true, canvas));
	}

	let collisionCheckPassed = true;
	
	do {
		collisionCheckPassed = true;
		//check for collisions
		for(let Id = 0; Id < FishObjects.length; Id++) {
			for(let Id2 = 0; Id2 < FishObjects.length; Id2++) {
				if(Id2 !== Id) {
					if(
						DetectCollisions(
							FishObjects[Id].xoffset - 30, FishObjects[Id].yoffset - 30, FishObjects[Id].xoffset + 30, FishObjects[Id].yoffset + 30,
							FishObjects[Id2].xoffset - 30, FishObjects[Id2].yoffset - 30, FishObjects[Id2].xoffset + 30, FishObjects[Id2].yoffset + 30)
					) {
						FishObjects[Id].reroll();
						collisionCheckPassed = false;
					}
				}
			}
		}
		if(collisionCheckPassed) {
			break;
		}
	}
	while(!collisionCheckPassed);
	
	window.addEventListener("click", SetResizeToTrue);	
	
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		canvas.clear("#2066d6");
		//render bg
		canvas.setnewcolor("#03ddff");
		canvas.box(0, 0, canvas.canvas.width, 100);
		canvas.setnewcolor("#633200");
		canvas.box(0, 90, canvas.canvas.width, 35);
		//render assets and stuff
		chrf.draw(470, 10, 0.2, canvas);
		canvas.image(FishingImages[3], 100, 30, 75, 75);
		canvas.image(FishingImages[3], 165, 30, 75, 75);
		canvas.image(FishingImages[3], 130, 16, 20, 20);
		//render line - length of line
		let finalx = (Math.sin(toRadians(FishGameValues.Angle)) * FishGameValues.Length) + 500;
		let finaly = (Math.cos(toRadians(FishGameValues.Angle)) * FishGameValues.Length) + 50;
		if(finaly >= 500 || finalx >= 1000 || finalx <= 0) {
			FishGameValues.LengthReverseResize = true; //out of bounds check
		}
		canvas.line(500, 50, finalx, finaly, 15, "#dddddd");
		//render objects
		for(let Id = 0; Id < FishObjects.length; Id++) {
			if(
				DetectCollisions(finalx - 10, finaly - 10, finalx + 10, finaly + 10, FishObjects[Id].xoffset - 30, FishObjects[Id].yoffset - 30, FishObjects[Id].xoffset + 30, FishObjects[Id].yoffset + 30) && 
				FishGameValues.IsHauling === -1
			) {
				FishGameValues.IsHauling = Id;
				FishGameValues.TypeOfHauledCargo = FishObjects[Id].objecttype;
				FishGameValues.LengthReverseResize = true;
			}
			if(FishGameValues.IsHauling === Id) {
				FishObjects[Id].moveTo(finalx, finaly);
				FishObjects[Id].drawhaul(finalx, finaly);
			} 
			else {
				FishObjects[Id].draw();
			}
		}
		//length calc
		if(FishGameValues.LengthResize) {
			if(FishGameValues.LengthReverseResize) {
				if(FishGameValues.IsHauling !== -1) {
					FishGameValues.Length -= 0.8;
				}
				else {
					FishGameValues.Length -= 2;
				}
				if(FishGameValues.Length <= 100) {
					FishGameValues.LengthReverseResize = false;
					FishGameValues.LengthResize = false;
					if(FishObjects.length === 1) {
						FishObjects.length = 0; //clear array
					}
					if(FishGameValues.IsHauling !== -1) {
						FishObjects.splice(FishGameValues.IsHauling, 1); //splice fails when size = 1, doesnt delete
						FishGameValues.IsHauling = -1;
					}
					switch(FishGameValues.TypeOfHauledCargo) {
						case 0:
							ap.playSFX(3); //success
							FishGameValues.AmountEarned += 50;
							break;
						case 1:
							ap.playSFX(4);  //fail
							FishGameValues.AmountEarned += 10;
							break;
						case 2:
							ap.playSFX(4);  //fail
							FishGameValues.AmountEarned += 5;
							break;
						case 3:
							//boxes
							let what = randomNumber(2);
							switch(what) {
								case 0:
									ap.playSFX(4); //fail
									//got tire
									FishGameValues.AmountEarned += 10;
									break;
								case 1:
									ap.playSFX(4); //fail
									//got shoe
									FishGameValues.AmountEarned += 5;
									break;
								case 2:
									ap.playSFX(3); //success
									//got random amount of money (at least 75CZK, max. 150)
									FishGameValues.AmountEarned += 75 + randomNumber(75);
									break;
							}
							break;
					}
					FishGameValues.TypeOfHauledCargo = -1;
				}
			}
			else {
				FishGameValues.Length += 2;
				if(FishGameValues.Length >= 500) {
					FishGameValues.LengthReverseResize = true;
				}
			}
		}
		else {
			//angle calc when no length calc
			if(FishGameValues.AngleReverseDirection) {
				FishGameValues.Angle -= 0.5;
				if(FishGameValues.Angle <= -65) {
					FishGameValues.AngleReverseDirection = false;
				}
			}
			else {
				FishGameValues.Angle += 0.5;
				if(FishGameValues.Angle >= 65) {
					FishGameValues.AngleReverseDirection = true;
				}
			}
		}
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][109], FishGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone() || FishObjects.length === 0) {
			clearInterval(timerInterval);
			addMoney(FishGameValues.AmountEarned); //50Kc fish, 10Kc pneu, 5Kc boots, boxes random
			window.removeEventListener("click", SetResizeToTrue);	
			deleteCanvasInputElems(canvas);
			FishGameValues.IsOver = 1;
			return;
		}
	}, 20, canvas);
}

function FishGameReset() {
	FishGameValues.IsIntroEnd = false;
	FishGameValues.IsOver = -1;
	FishGameValues.AmountEarned = 0;
	FishGameValues.Angle = 0;
	FishGameValues.AngleReverseDirection = false;
	FishGameValues.Length = 100;
	FishGameValues.LengthResize = false;
	FishGameValues.LengthReverseResize = false;
	FishGameValues.IsHauling = -1;
	FishGameValues.TypeOfHauledCargo = -1;
}

//ticket sale minigame - nezamyslice

let InfodeskGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	
}

//INFODESK GAME SCRAPPED!

//dialect translation - nezamyslice

let HelpedScholar = false;

let DTMDW = [];
let DTMCA = [];
let AmountDTMLoaded = 0;

function DialectTranslationMinigameLoad() {
	let code;
	switch(SettingsValues.Language) {
		case 0:
			code = "EN";
			break;
		case 1:
			code = "CZ";
			break;
		case 2:
			code = "DE";
			break;
		case 3:
			code = "RU";
			break;
		case 4:
			code = "SUS";
			break;
		case 5:
			code = "BA";
			break;
	}
	let reqd = new XMLHttpRequest();
	let reqn = new XMLHttpRequest();
	reqd.open("GET", "./res/minigames/dialect/dialect"+code+".txt");
	reqn.open("GET", "./res/minigames/dialect/non"+code+".txt");
	reqd.onload = (event) => {
		console.log("reqd");
		let splittext = reqd.responseText;
		splittext = splittext.replaceAll('\r', '');
		splittext = splittext.split('\n');
		for(let Id = 0; Id < splittext.length; Id++) {
			if(splittext[Id]) {
				DTMDW.push(splittext[Id]);
			}
		}
		AmountDTMLoaded++;
		console.log(DTMDW);
	}
	reqn.onload = (event) => {
		console.log("reqn");
		let splittext = reqn.responseText;
		splittext = splittext.replaceAll('\r', '');
		splittext = splittext.split('\n');
		for(let Id = 0; Id < splittext.length; Id++) {
			if(splittext[Id]) {
				DTMCA.push(splittext[Id]);
			}
		}
		AmountDTMLoaded++;
		console.log(DTMCA);
	}
	reqd.send();
	reqn.send();
}

//word in dialect: selection of three (depending on difficulty) where one correct spelling in official dialect

let DialectTranslationGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	AmountTranslated: 0,
	CurrentDialectWord: "",
	CurrentCorrectAnswer: "",
	AnswerSubmitted: "",
	Buttons: [],
	Ticks: 0,
	//other options are randomly picked from the list of correct answers except for the actual correct answer
}

function DialectTranslationGame(canvas) {
	DialectTranslationGameReset();
	console.log("translation game");
	canvas.clear("#ffffff");
	DialectTranslationGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(DialectTranslationGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			DialectTranslationGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function DialectTranslationGameComponentIntro(canvas) {
	ap.playTrack(13);
	canvas.clear("#ffffff");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][117], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 118, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		DialectTranslationGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
}

function DialectTranslationGameComponentGenerate() {
	let randomId = randomNumber(DTMDW.length - 1);
	DialectTranslationGameValues.CurrentDialectWord = DTMDW[randomId];
	DialectTranslationGameValues.CurrentCorrectAnswer = DTMCA[randomId];
	let ButtonWCorrectAnswer = randomNumber(3);
	DialectTranslationGameValues.Buttons[ButtonWCorrectAnswer].button.innerHTML = DialectTranslationGameValues.CurrentCorrectAnswer;
	let randomAnswer;
	for(let Id = 0; Id < 4; Id++) {
		if(Id === ButtonWCorrectAnswer) { continue; }
		else {
			do {
				randomId = randomNumber(DTMCA.length - 1);
			}
			while(DialectTranslationGameValues.CurrentCorrectAnswer === DTMCA[randomId]);
			DialectTranslationGameValues.Buttons[Id].button.innerHTML = DTMCA[randomId];
		}
	}
}

function DialectTranslationGameComponentEval(answer) {
	ap.playSFX(0);
	console.log("answer "+answer);
	if(answer === DialectTranslationGameValues.CurrentCorrectAnswer) {
		ap.playSFX(3);
		DialectTranslationGameValues.AmountEarned += 10;
		DialectTranslationGameValues.AmountTranslated++;
	}
	else {
		ap.playSFX(4);
		DialectTranslationGameValues.Ticks = 5;
	}
	DialectTranslationGameComponentGenerate();
}

function DialectTranslationGameComponentMain(canvas) {
	canvas.clear("#ffffff");
	
	for(let Id = 0; Id < 4; Id++) {
		DialectTranslationGameValues.Buttons.push(new Button(canvas.canvas.width * 0.3 + ((Id % 2) * canvas.canvas.width * 0.2), canvas.canvas.height * 0.55 + (Math.floor(Id / 2) * canvas.canvas.height * 0.2), canvas.canvas.width * 0.2, canvas.canvas.height * 0.2, 30, "", "canvas_container"));
		DialectTranslationGameValues.Buttons[Id].button.addEventListener("click", (event) => {
			DialectTranslationGameComponentEval(event.currentTarget.innerHTML);
		});	
	}

	DialectTranslationGameComponentGenerate();	
	
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		//bg render
		if(DialectTranslationGameValues.Ticks > 0) {
			canvas.clear("#800000");
			DialectTranslationGameValues.Ticks--;
		}
		else {
			canvas.clear("#ffffff");
		}
		//elements
		canvas.setnewcolor("#dddddd");
		canvas.box(canvas.canvas.width * 0.2 - 10, canvas.canvas.height * 0.15 - 10, canvas.canvas.width * 0.6 + 20, canvas.canvas.height * 0.3 + 20);
		canvas.box(canvas.canvas.width * 0.3 - 10, canvas.canvas.height * 0.55 - 10, canvas.canvas.width * 0.4 + 20, canvas.canvas.height * 0.4 + 20);
		//text
		canvas.setalign("center");
		canvas.setnewcolor("#333399");
		canvas.text(TranslatedText[SettingsValues.Language][258] + " \"" + DialectTranslationGameValues.CurrentDialectWord + "\" " + TranslatedText[SettingsValues.Language][259], canvas.canvas.width * 0.5, canvas.canvas.height * 0.3);
		canvas.resetalign();		
		//info
		canvas.setnewcolor("#ffffff");
		renderTextAsMinigameStatus2(TranslatedText[SettingsValues.Language][123], DialectTranslationGameValues.AmountTranslated, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(DialectTranslationGameValues.AmountEarned); //10Kc per word
			deleteCanvasInputElems(canvas);
			DialectTranslationGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function DialectTranslationGameReset() {
	DialectTranslationGameValues.IsIntroEnd = false;
	DialectTranslationGameValues.IsOver = -1;
	DialectTranslationGameValues.AmountEarned = 0;
	DialectTranslationGameValues.AmountTranslated = 0;
	DialectTranslationGameValues.CurrentDialectWord = "";
	DialectTranslationGameValues.CurrentCorrectAnswer = "";
	DialectTranslationGameValues.AnswerSubmitted = "";
	DialectTranslationGameValues.Buttons = [];
	DialectTranslationGameValues.Ticks = 0;
}

//cashier - prostejov, olomouc

//rotate object, scan at correct time as fast as possible?
//3 buttons, stop rotation, rotation incr. speed for both directions

let CashierGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	AmountScanned: 0,
	IsObjectSelected: false, //for tracking some no issue with different obj every tick
	CurrentObjectSelected: 1,
	RotationSpeed: 0, //in degrees
	CurrentDegrees: 0,
}

let CashierImages = [];
let CashierImagesLoaded = 0;
for(let Id = 0; Id < 6; Id++) {
	CashierImages.push(new Image());
	CashierImages[Id].onload = () => { CashierImagesLoaded++ };
}

CashierImages[0].src = "res/minigames/cashier/scanner.png";
CashierImages[1].src = "res/minigames/cashier/box.png";
CashierImages[2].src = "res/minigames/cashier/can.png";
CashierImages[3].src = "res/minigames/cashier/chips.png";
CashierImages[4].src = "res/minigames/cashier/pickles.png";
CashierImages[5].src = "res/minigames/cashier/snackbox.png";

let CashierObjectsBarcodeOffsets = [ 270, 0, 0, 270, 270 ];

function CashierGame(canvas) {
	CashierGameReset();
	console.log("cashier game");
	canvas.clear("#dddddd");
	CashierGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(CashierGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			CashierGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function CashierGameComponentCheckIfAligned(canvas) {
	//raycast from set position of scanner to object
	//if that pixel has code #ffffff - good, next object
	let hasfoundwhite = false;
	let pixeldata = canvas.context.getImageData(460, 250, 80, 50);
	for(let Id = 0; Id < pixeldata.data.length; Id+=4) {
		if(pixeldata.data[Id + 0] === 255 && pixeldata.data[Id + 1] === 255 && pixeldata.data[Id + 2] === 255) {
			hasfoundwhite = true;
			break;
		}
	}
	if(hasfoundwhite) {
		CashierGameValues.AmountScanned += 1;
		CashierGameValues.AmountEarned += 10;
		CashierGameValues.CurrentObjectSelected = 1 + randomNumber(4); //1-5
		CashierGameValues.CurrentDegrees = 0 + randomNumber(359); //0-359
	}
}

function CashierGameComponentIntro(canvas) {
	ap.playTrack(14);
	canvas.clear("#dddddd");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][124], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 125, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		CashierGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
} 
function CashierGameComponentMain(canvas) {
	//buttons
	let Scan = new Arrow(canvas.canvas.width * 0.6, canvas.canvas.height * 0.8, canvas.canvas.width * 0.1, canvas.canvas.height * 0.2, ArrowDirections.Center, canvas);
	let SpeedLeft = new Arrow(canvas.canvas.width * 0.7, canvas.canvas.height * 0.8, canvas.canvas.width * 0.1, canvas.canvas.height * 0.2, ArrowDirections.Left, canvas);
	let SpeedStop = new Arrow(canvas.canvas.width * 0.8, canvas.canvas.height * 0.8, canvas.canvas.width * 0.1, canvas.canvas.height * 0.2, ArrowDirections.Here, canvas);
	let SpeedRight = new Arrow(canvas.canvas.width * 0.9, canvas.canvas.height * 0.8, canvas.canvas.width * 0.1, canvas.canvas.height * 0.2, ArrowDirections.Right, canvas);
	//button event listeners
	Scan.button.addEventListener("click", (event) => {
		if(
			Math.abs(CashierGameValues.CurrentDegrees - CashierObjectsBarcodeOffsets[CashierGameValues.CurrentObjectSelected - 1]) % 360 > 350 ||
 			Math.abs(CashierGameValues.CurrentDegrees - CashierObjectsBarcodeOffsets[CashierGameValues.CurrentObjectSelected - 1]) % 360 < 10
		) {
			ap.playSFX(6);
			CashierGameComponentCheckIfAligned(canvas);
		}
	});
	SpeedLeft.button.addEventListener("click", (event) => {
		CashierGameValues.RotationSpeed -= 1;
	});
	SpeedStop.button.addEventListener("click", (event) => {
		CashierGameValues.RotationSpeed = 0;
	});
	SpeedRight.button.addEventListener("click", (event) => {
		CashierGameValues.RotationSpeed += 1;
	});	
	
	CashierGameValues.CurrentObjectSelected = 1 + randomNumber(4); //1-5
	CashierGameValues.CurrentDegrees = 0 + randomNumber(359); //0-359, initial random pos
	
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		CashierGameValues.CurrentDegrees += CashierGameValues.RotationSpeed;
		//bg
		canvas.clear("#dddddd");
		//buttons
		canvas.setnewcolor("#ffffff");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		Scan.draw(canvas);
		SpeedLeft.draw(canvas);
		SpeedStop.draw(canvas);
		SpeedRight.draw(canvas);
		//scanner
		canvas.image(CashierImages[0], 450, canvas.canvas.height * 0.8 - 100, 100, 100);
		//rotating box
		canvas.context.save();
		canvas.context.translate(500, 250);
		canvas.context.rotate(toRadians(CashierGameValues.CurrentDegrees));
		canvas.context.translate(-500, -250);
		canvas.image(CashierImages[CashierGameValues.CurrentObjectSelected], 450, 200, 100, 100); //offset so center is @ 500,250
		canvas.context.restore();
		//info and stuff
		canvas.setnewcolor("#ffffff");
		canvas.box(0, 0, canvas.canvas.width, 50);
		renderTextAsMinigameStatus2(TranslatedText[SettingsValues.Language][130], CashierGameValues.AmountScanned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(CashierGameValues.AmountEarned); //10Kc per help
			deleteCanvasInputElems(canvas);
			CashierGameValues.IsOver = 1;
			return;
		}
	}, 20, canvas);
}

function CashierGameReset() {
	CashierGameValues.IsIntroEnd = false;
	CashierGameValues.IsOver = -1;
}

//cleaning the benches on the square - olomouc

let HelpedBenches = false;

let CleaningGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	SpongeX: 500,
	SpongeY: 250,
	//sponge size: 80 x 20
	DirtParticlesRemaining: 0, //set in main loop
	DirtParticles: [], //dont remove, change to different color
	AmountSurfaces: 0,
 }

class DirtParticle {
	constructor(canvas) {
		this.x = 10 + randomNumber(980); //10-990
		this.y = 60 + randomNumber(430); //dont spawn at top, 60-490
		this.cleaned = false;
		this.canvas_info = canvas;
	}
	draw() {
		if(this.cleaned) { return; }
		else { this.canvas_info.setnewcolor("#33280a"); }
		this.canvas_info.box(this.x - 5, this.y - 5, 10, 10);
	}
	update() {
		if(this.cleaned) { return; }
		//optimizaton, run collisions only if close by X or Y
		if(Math.abs(this.x - CleaningGameValues.SpongeX) >= 100 || Math.abs(this.y - CleaningGameValues.SpongeY) >= 200) { return; }
		if(DetectCollisions(this.x - 5, this.y - 5, this.x + 5, this.y + 5, CleaningGameValues.SpongeX - 10, CleaningGameValues.SpongeY - 40, CleaningGameValues.SpongeX + 10, CleaningGameValues.SpongeY + 40)) {
			this.cleaned = true;
			CleaningGameValues.DirtParticlesRemaining--;
		}
	}
}

function CleaningGame(canvas) {
	CleaningGameReset();
	console.log("cleaning game");
	canvas.clear("#9c9c9c");
	CleaningGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(CleaningGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			CleaningGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function CleaningGameComponentIntro(canvas) {
	ap.playTrack(15);
	canvas.clear("#9c9c9c");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][131], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 132, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		CleaningGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
}

function CleaningGameComponentGenDirt(canvas) {
	switch(SettingsValues.Difficulty) {
		case 1:
			CleaningGameValues.DirtParticlesRemaining = 1000;
		break;
		case 2:
			CleaningGameValues.DirtParticlesRemaining = 2500;
		break;
		case 3:
			CleaningGameValues.DirtParticlesRemaining = 5000;
		break;
	}	
	
	for(let Id = 0; Id < CleaningGameValues.DirtParticlesRemaining; Id++) {
		CleaningGameValues.DirtParticles.push(new DirtParticle(canvas));
	}
}

function CleaningGameComponentResetDirt() {
	switch(SettingsValues.Difficulty) {
		case 1:
			CleaningGameValues.DirtParticlesRemaining = 1000;
		break;
		case 2:
			CleaningGameValues.DirtParticlesRemaining = 2500;
		break;
		case 3:
			CleaningGameValues.DirtParticlesRemaining = 5000;
		break;
	}
	for(let Id = 0; Id < CleaningGameValues.DirtParticles.length; Id++) {
		CleaningGameValues.DirtParticles[Id].cleaned = false;
	}
}

function CleaningGameComponentMain(canvas) {
	//main game
	timelimitStart(180); //3:00 min
	CleaningGameComponentGenDirt(canvas);
	let currenthexcode = "#9c9c9c";
	let timerInterval = window.setInterval((canvas) => {
		//update mouse pos
		mouseAssignOffsets(canvas.canvas);
		CleaningGameValues.SpongeX = MousePos.X;
		CleaningGameValues.SpongeY = MousePos.Y;
		//bg render
		canvas.clear(currenthexcode);
		//dirt render
		for(let Id = 0; Id < CleaningGameValues.DirtParticles.length; Id++) {
			CleaningGameValues.DirtParticles[Id].update();
			CleaningGameValues.DirtParticles[Id].draw();
		}
		//sponge render
		canvas.setnewcolor("#cc9b16");
		canvas.box(CleaningGameValues.SpongeX - 10, CleaningGameValues.SpongeY - 40, 20, 80);
		//info and time
		canvas.setnewcolor("#ffffff");
		canvas.box(0, 0, canvas.canvas.width, 50);
		renderTextAsMinigameStatus2(TranslatedText[SettingsValues.Language][137], (100 - Math.round(CleaningGameValues.DirtParticlesRemaining / CleaningGameValues.DirtParticles.length * 100))+"%", canvas); //amount clean
		renderTextAsMinigameStatus4(TranslatedText[SettingsValues.Language][257], CleaningGameValues.AmountSurfaces + 1, canvas);
		timelimitRender(canvas);
		//next surface check
		if(CleaningGameValues.DirtParticlesRemaining === 0) {
			currenthexcode = RGBToHex(100 + randomNumber(155), 100 + randomNumber(155), 100 + randomNumber(155));
			CleaningGameComponentResetDirt();
			CleaningGameValues.AmountEarned += 50; //50kc per surface
			CleaningGameValues.AmountSurfaces++;
		}
		//time check
		if(timelimitIsDone()) {
			//if when finishing you have more than or exactly 85 percent you will still get 20kc
			if(Math.round(CleaningGameValues.DirtParticlesRemaining / CleaningGameValues.DirtParticles.length * 100) <= 15) {
				CleaningGameValues.AmountEarned += 20;
			}
			clearInterval(timerInterval);
			addMoney(CleaningGameValues.AmountEarned);
			deleteCanvasInputElems(canvas);
			CleaningGameValues.IsOver = 1;
			return;
		}
	}, 20, canvas);
}

function CleaningGameReset(canvas) {
	CleaningGameValues.IsIntroEnd = false;
	CleaningGameValues.IsOver = -1;
	CleaningGameValues.AmountEarned = 0;
	CleaningGameValues.SpongeX = 500;
	CleaningGameValues.SpongeY = 25;
	CleaningGameValues.DirtParticlesRemaining = 0;
	CleaningGameValues.DirtParticles = [];
	CleaningGameValues.AmountSurfaces = 0;
}

//CHEESEMAKING GAME SCRAPPED!

//DEFENSE GAME SCRAPPED!

//ostrava not really a big location, no minigames

