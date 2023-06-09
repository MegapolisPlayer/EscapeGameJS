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

TableImages[0].src = "res/waiter/table_empty.png";
TableImages[1].src = "res/waiter/table_order.png";
TableImages[2].src = "res/waiter/table_waiting.png";
TableImages[3].src = "res/waiter/table_waiting2.png";
TableImages[4].src = "res/waiter/table_fail.png"; 

let OrderImages = [];
let OrderImagesLoaded = 0;
for(let Id = 0; Id < 2; Id++) {
	OrderImages.push(new Image());
	OrderImages[Id].onload = () => { OrderImagesLoaded++ };
}

OrderImages[0].src = "res/waiter/order.png";
OrderImages[1].src = "res/waiter/order_selected.png";

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

FishingImages[0].src = "res/fish/fish.png";
FishingImages[1].src = "res/fish/tire.png";
FishingImages[2].src = "res/fish/boot.png";
FishingImages[3].src = "res/fish/box.png";

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

//literally selection minigame - map image and random points - if correct tip (few buttons w/ text) +1 point and money
//info game

function InfodeskGame(canvas) {
	InfodeskGameReset();
	console.log("infodesk game");
	canvas.clear("#ccc27a");
	InfodeskGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(InfodeskGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			InfodeskGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function InfodeskGameComponentIntro(canvas) {
	ap.playTrack(12);
	canvas.clear("#ccc27a");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][110], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 111, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		InfodeskGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
} 
function InfodeskGameComponentMain(canvas) {
	canvas.clear("#ccc27a");
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][116], InfodeskGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(InfodeskGameValues.AmountEarned); //10Kc per help
			window.removeEventListener("click", SetResizeToTrue);	
			deleteCanvasInputElems(canvas);
			InfodeskGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function InfodeskGameReset() {
	InfodeskGameValues.IsIntroEnd = -1;
	InfodeskGameValues.IsOver = -1;
	InfodeskGameValues.AmountEarned = 0;
}

//dialect translation - nezamyslice

//word in dialect: selection of three (depending on difficulty) where one correct spelling in official dialect

let DialectTranslationGameValues = {
	IsIntroEnd: false,
	IsOver: -1,
	AmountEarned: 0,
	AmountTranslated: 0,
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
function DialectTranslationGameComponentMain(canvas) {
	canvas.clear("#ffffff");
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][123], DialectTranslationGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(DialectTranslationGameValues.AmountEarned); //10Kc per help
			window.removeEventListener("click", SetResizeToTrue);	
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
}

//cashier - prostejov, olomouc

//rotate object, scan at correct time as fast as possible?
//3 buttons, stop rotation, rotation incr. speed for both directions

let CashierGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

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
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][130], CashierGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(CashierGameValues.AmountEarned); //10Kc per help
			window.removeEventListener("click", SetResizeToTrue);	
			deleteCanvasInputElems(canvas);
			CashierGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function CashierGameReset() {
	CashierGameValues.IsIntroEnd = false;
	CashierGameValues.IsOver = -1;
}

//cleaning the benches on the square - olomouc

let CleaningGameValues = {
	IsIntroEnd: false,
	IsOver: -1
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
function CleaningGameComponentMain(canvas) {
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][137], CashierGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(CleaningGameValues.AmountEarned); //10Kc per help
			window.removeEventListener("click", SetResizeToTrue);	
			deleteCanvasInputElems(canvas);
			CleaningGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function CleaningGameReset(canvas) {
	CleaningGameValues.IsIntroEnd = false;
	CleaningGameValues.IsOver = -1;
}

//cheese making - olomouc

//build factory and then run it

let CheeseGameValues = {
	IsIntroEnd: false,
	IsOver: -1
}

let CheesemakingImages = [];
let CheesemakingImagesLoaded = 0;
for(let Id = 0; Id < 5; Id++) {
	CheesemakingImages.push(new Image());
	CheesemakingImages[Id].onload = () => { CheesemakingImagesLoaded++ };
}

CheesemakingImages[0].src = "res/cheesemaking/Quark.png";
CheesemakingImages[1].src = "res/cheesemaking/FormedQuark.png";
CheesemakingImages[2].src = "res/cheesemaking/TvaruzekDirty.png";
CheesemakingImages[3].src = "res/cheesemaking/TvaruzekDone.png";
CheesemakingImages[4].src = "res/cheesemaking/TvaruzekFailed.png";

let CheesemakingThingsImages = [];
let CheesemakingThingsImagesLoaded = 0;
for(let Id = 0; Id < 4; Id++) {
	CheesemakingThingsImages.push(new Image());
	CheesemakingThingsImages[Id].onload = () => { CheesemakingThingsImagesLoaded++ };
}

CheesemakingThingsImages[0].src = "res/cheesemaking/SaltTable.png";
CheesemakingThingsImages[1].src = "res/cheesemaking/Rack.png";
CheesemakingThingsImages[2].src = "res/cheesemaking/Bath.png";
CheesemakingThingsImages[3].src = "res/cheesemaking/Cooler.png";

function CheeseGame(canvas) {
	CheeseGameReset();
	console.log("cheese game");
	canvas.clear("#404040");
	CheeseGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(CheeseGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			CheeseGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function CheeseGameComponentIntro(canvas) {
	ap.playTrack(16);
	canvas.clear("#404040");
	canvas.setnewcolor("#000000");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][138], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 139, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		CheeseGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
} 
function CheeseGameComponentMain(canvas) {
	//main game
	timelimitStart(120); //2:00 min
	let timerInterval = window.setInterval((canvas) => {
		
		//amount earned info
		renderTextAsMinigameStatus(TranslatedText[SettingsValues.Language][144], CashierGameValues.AmountEarned, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone()) {
			clearInterval(timerInterval);
			addMoney(CheeseGameValues.AmountEarned); //10Kc per help
			window.removeEventListener("click", SetResizeToTrue);	
			deleteCanvasInputElems(canvas);
			CheeseGameValues.IsOver = 1;
			return;
		}
	}, 100, canvas);
}

function CheeseGameReset() {
	CheeseGameValues.IsIntroEnd = false;
	CheeseGameValues.IsOver = -1;
}

//defense - studenka

//tonks - defense game with tonks
//no direct shooting!

//available units
//anti-air / AA - only weapon against UAVs, 1HP (1 hit)
//anti-tank / AT - deals a lot of damage but can withstand some
//tank / TN
//pillbox / PB

let DefenseGameValues = {
	IsIntroEnd: false,
	IsPrepEnd: false,
	PrepUnitSelected: -1,
	IsDefenseEnd: false,
	DefUnitSelected: -1,
	IsOver: -1,
	Points: 100, //points system - 10 for AT gun, 30 for tank, 20 for AA and 50 for pillbox
	WavesRemaining: 10,
	WaveUAVs: 0, //enemy UAV
	HasDefended: false,
	EnemyUnits: [],
	EnemyUAVs: [],
	PlayerUnits: [],
	PlayerAA: [],
	UAVLeft: 3,
	AirSupportLeft: 1,
	DefenseCurrentTick: 0,
}

let ArmyImages = [];
let ArmyImagesLoaded = 0;
for(let Id = 0; Id < 13; Id++) {
	ArmyImages.push(new Image());
	ArmyImages[Id].onload = () => { ArmyImagesLoaded++ };
}

//1st - okay, 2nd - destroyed

ArmyImages[0].src = "res/army/Antiair1.png";
ArmyImages[1].src = "res/army/Antiair2.png";
ArmyImages[2].src = "res/army/Antitank1.png";
ArmyImages[3].src = "res/army/Antitank2.png";
ArmyImages[4].src = "res/army/Tank1.png";
ArmyImages[5].src = "res/army/Tank2.png";
ArmyImages[6].src = "res/army/Pillbox1.png";
ArmyImages[7].src = "res/army/Pillbox2.png";
ArmyImages[8].src = "res/army/UAV.png";
ArmyImages[9].src = "res/army/AirSupport.png";
ArmyImages[10].src = "res/army/Shell.png";
ArmyImages[11].src = "res/army/EnemyShell.png";
ArmyImages[12].src = "res/army/Truck.png";

let HPImages = [];
let HPImagesLoaded = 0;
for(let Id = 0; Id < 4; Id++) {
	HPImages.push(new Image());
	HPImages[Id].onload = () => { HPImagesLoaded++ };
}

HPImages[0].src = "res/hpbar/1-2.png";
HPImages[1].src = "res/hpbar/1-3.png";
HPImages[2].src = "res/hpbar/2-3.png";
HPImages[3].src = "res/hpbar/full.png";

//in order of AA, AT, TN, PB, UAV
let UnitTypes = [
	{
		code: "AA",
		cost: 10,
		hp: 1,
		damage: 1, //only against UAVs
		cooldown: 2, //in seconds
	},
	{
		code: "AT",
		cost: 20,
		hp: 1,
		damage: 2,
		cooldown: 5,
	},
	{
		code: "TN",
		cost: 40,
		hp: 2,
		damage: 2,
		cooldown: 3,
	},
	{
		code: "PB",
		cost: 60,
		hp: 3,
		damage: 0.5,
		cooldown: 0.5
	}
];

class UnitSelector {
	constructor(id, canvas) {
		this.id = id;
		this.canvas_info = canvas;
		
		this.button = document.createElement("button"); //new button, no need to del event listeners
		this.button.setAttribute("class", "CanvasInputElement MinigameElement Invisible");
		this.button.style.setProperty("width", this.canvas_info.canvas.height * 0.2+"px");
		this.button.style.setProperty("height", this.canvas_info.canvas.height * 0.2+"px");
		this.button.style.setProperty("left", this.canvas_info.canvas.height * 0.2 * this.id+"px");
		this.button.style.setProperty("top", this.canvas_info.canvas.height * 0.8+"px");
		
		this.button.addEventListener("click", (event) => {
			DefenseGameValues.PrepUnitSelected = this.id;
		});
		
		canvas.canvas.parentElement.append(this.button);
	}
	draw() {
		this.canvas_info.image(ArmyImages[this.id * 2], this.canvas_info.canvas.height * 0.2 * this.id, this.canvas_info.canvas.height * 0.8, this.canvas_info.canvas.height * 0.2, this.canvas_info.canvas.height * 0.2);
		this.canvas_info.setnewcolor("#800000");
		this.canvas_info.resetalign();
		this.canvas_info.text(String(UnitTypes[this.id].cost)+" "+UnitTypes[this.id].code, this.canvas_info.canvas.height * 0.2 * this.id, this.canvas_info.canvas.height * 0.95);
		this.canvas_info.setalign("left");
	}
}

function DefenseGameDrawUnitSelectorPrepBackground(canvas) {
	canvas.setnewcolor("#ffef00");
	canvas.box(canvas.canvas.height * 0.2 * DefenseGameValues.PrepUnitSelected, canvas.canvas.height * 0.8, canvas.canvas.height * 0.2, canvas.canvas.height * 0.2);
}

class PlayerUnit {
	constructor(cx, cy, canvas) {
		this.x = cx;
		this.y = cy;
		this.id = DefenseGameValues.PrepUnitSelected * 2;
		this.hp = UnitTypes[DefenseGameValues.PrepUnitSelected].hp;
		this.cooldown = UnitTypes[DefenseGameValues.PrepUnitSelected].cooldown * 20; //tick every 50ms
		this.cooldownlasttick = 0;
		this.damage = UnitTypes[DefenseGameValues.PrepUnitSelected].damage;
		this.destroyed = false;
		this.canvas_info = canvas;
	}
	draw() {
		this.canvas_info.context.save();
		this.canvas_info.context.translate(this.x, this.y);
		this.canvas_info.context.rotate(toRadians(90));
		this.canvas_info.context.translate(-this.x, -this.y);
		this.canvas_info.image(ArmyImages[this.id + this.destroyed], this.x - 35, this.y - 35, 70, 70);
		this.canvas_info.context.restore();
	}
	update() {
		if(this.destroyed) { return; }
		if(this.cooldownlasttick + this.cooldown <= DefenseGameValues.DefenseCurrentTick) {
			this.cooldownlasttick = DefenseGameValues.DefenseCurrentTick;
		}
	}
	findnearestenemy() {
		if(this.destroyed) { return; }
		let LowestDistance = 1000;
		let Distance = 0;
		for(let Id = 0; Id < DefenseGameValues.EnemyUnits; Id++) {
			Distance = GetDistance(this.x, this.y, DefenseGameValues.EnemyUnits[Id].x, DefenseGameValues.EnemyUnits[Id].y);
			if(Distance < LowestDistance) {
				LowestDistance = Distance;
			}
		}
	}
	setdestroyed() {
		if(!this.destroyed) {
			this.destroyed = true;
		}
	}
}

//enemy only has tanks and UAV, made for simplicity of coding and to not get in trouble with blood etc.
class EnemyUnit {
	constructor(canvas) {
		this.x = 0;
		this.y = 0;
		this.id = 4; //tonk
		this.hp = UnitTypes[2].hp;
		this.cooldown = UnitTypes[2].cooldown * 20; //tick every 50ms
		this.cooldownlasttick = 0;
		this.damage = UnitTypes[2].damage;
		this.destroyed = false;
		this.canvas_info = canvas;
	}
	genpos() {
		this.x = 800 + randomNumber(150); //800-950
		this.y = this.canvas_info.canvas.height * 0.1 + randomNumber(this.canvas_info.canvas.height * 0.7);
	}
	draw() {
		this.canvas_info.context.save();
		this.canvas_info.context.translate(this.x, this.y);
		this.canvas_info.context.rotate(toRadians(270));
		this.canvas_info.context.translate(-this.x, -this.y);
		this.canvas_info.image(ArmyImages[this.id + this.destroyed], this.x - 35, this.y - 35, 70, 70);
		this.canvas_info.context.restore();
	}
	update() {
		if(this.destroyed) { return; }
		if(this.cooldownlasttick + this.cooldown <= DefenseGameValues.DefenseCurrentTick) {
			this.cooldownlasttick = DefenseGameValues.DefenseCurrentTick;
		}
	}
	findnearestplayer() {
		if(this.destroyed) { return; }
		let LowestDistance = 1000;
		let Distance = 0;
		for(let Id = 0; Id < DefenseGameValues.PlayerUnits; Id++) {
			Distance = GetDistance(this.x, this.y, DefenseGameValues.EnemyUnits[Id].x, DefenseGameValues.EnemyUnits[Id].y);
			if(Distance < LowestDistance) {
				LowestDistance = Distance;
			}
		}
	}
	setdestroyed() {
		if(!this.destroyed) {
			this.destroyed = true;
			DefenseGameValues.WaveEnemies--;
			DefenseGameValues.Points += Math.round(40 / SettingsValues.Difficulty / 10) * 10; //round to tens, trick
		}
	}
}

class AntiAir {
	constructor(cx, cy, canvas) {
		this.x = cx;
		this.y = cy;
		this.hp = UnitTypes[0].hp;
		this.cooldown = UnitTypes[0].cooldown * 20; //tick every 50ms
		this.cooldownlasttick = 0;
		this.damage = UnitTypes[0].damage;
		this.destroyed = false;
		this.canvas_info = canvas;
	}
	draw() {
		this.canvas_info.context.save();
		this.canvas_info.context.translate(this.x, this.y);
		this.canvas_info.context.rotate(toRadians(90));
		this.canvas_info.context.translate(-this.x, -this.y);
		this.canvas_info.image(ArmyImages[0 + this.destroyed], this.x - 35, this.y - 35, 70, 70);
		this.canvas_info.context.restore();
	}
	update() {
		if(this.destroyed) { return; }
		if(this.cooldownlasttick + this.cooldown <= DefenseGameValues.DefenseCurrentTick) {
			this.cooldownlasttick = DefenseGameValues.DefenseCurrentTick;
		}
	}
	findnearestUAV() {
		if(this.destroyed) { return; }
		let LowestDistance = 1000;
		let Distance = 0;
		for(let Id = 0; Id < DefenseGameValues.EnemyUnits.length; Id++) {
				
		}
	}
	setDestroyed() {
		this.destroyed = true;
	}
}

function findMostHPPlayer() {
	let IdFound = 0;
	let MostHP = 1;
	for(let Id = 0; Id < DefenseGameValues.PlayerUnits.length; Id++) {
		if(DefenseGameValues.PlayerUnits[Id].hp > MostHP) {
			MostHP = DefenseGameValues.PlayerUnits[Id].hp;
			IdFound = Id;
		}
	}
	return IdFound;
}

class UAV {
	constructor(canvas) {
		this.xtargeted = DefenseGameValues.PlayerUnits[randomNumber(DefenseGameValues.PlayerUnits.length)].x;
		this.ytargeted = DefenseGameValues.PlayerUnits[randomNumber(DefenseGameValues.PlayerUnits.length)].y;
		this.xoffset = 700 + randomNumber(400); //700-1100
		this.yoffset = randomNumber(500); //0-500
		this.angle = 0;
		this.distance = 0;
		this.lengthtraveled = 0;
		this.starttick = 0;
		this.islaunched = false;
		this.canvas_info = canvas;
	}
	draw() {
		if(!this.islaunched) { return; }
		this.lengthtraveled += 50/50;//50tps, 50pxs
		this.xoffset = (Math.sin(toRadians(this.angle)) * this.lengthtraveled);
		this.yoffset = (Math.cos(toRadians(this.angle)) * this.lengthtraveled);
		this.canvas_info.context.save();
		this.canvas_info.context.translate(this.xoffset, this.yoffset);
		this.canvas_info.context.rotate(toRadians(this.angle));
		this.canvas_info.context.translate(-this.xoffset, -this.yoffset);
		this.canvas_info.image(ArmyImages[8], 0, 0, 50, 50);
		this.canvas_info.context.restore();
		this.canvas_info.line(this.xtargeted, this.ytargeted, this.xoffset, this.yoffset, 15, "#800000");
	}
	moveTo(x, y) {
		this.xoffset = x;
		this.yoffset = y;
	}
	launch() {
		this.islaunched = true;
		DefenseGameValues.EnemyUAVs.splice(0, 1);
		let targetId = findMostHPPlayer();
		this.xtargeted = DefenseGameValues.PlayerUnits[targetId].x;
		this.ytargeted = DefenseGameValues.PlayerUnits[targetId].y;
		this.angle = toDegrees(Math.tan(Math.abs(this.yoffset - this.ytargeted) / Math.abs(this.xoffset - this.xtargeted)));
		this.distance = GetDistance(this.xoffset, this.yoffset, this.xtargeted, this.ytargeted);
		this.starttick = DefenseGameValues.DefenseCurrentTick;
		DefenseGameValues.WaveUAVs--;
	}
}

class AirSupport {
	constructor(canvas) {
		this.x = -100;
		this.y = randomNumber(500);
		this.wasused = false;
		this.canvas_info = canvas;
	}
	draw() {
		
	}
	update() {
		for(let Id = 0; Id < DefenseGameValues.EnemyUnits.length; Id++) {
			if(0) {
				
			}	
		}
	}
	fly() {

	}
}

let DefenseGameComponentVariablePlayerAirSupport = 0;

function DefenseGame(canvas) {
	DefenseGameReset();
	console.log("defense game");
	canvas.clear("#36291b");
	DefenseGameComponentIntro(canvas);
	let thisInterval = window.setInterval((canvas) => {
		if(DefenseGameValues.IsIntroEnd === true) {
			clearInterval(thisInterval);
			DefenseGameComponentMain(canvas);
		}
	}, 100, canvas);
}

function DefenseGameComponentIntro(canvas) {
	ap.playTrack(17);
	canvas.clear("#36291b");
	canvas.setnewcolor("#ffffff");
	canvas.setfontweight("bold");
	canvas.text(TranslatedText[SettingsValues.Language][91] + " - " + TranslatedText[SettingsValues.Language][145], 50, 50);
	canvas.resetfontweight();
	canvas.textml(TranslationGetMultipleLines(SettingsValues.Language, 146, 5), 50, 100);
	let ArrowEnd = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowEnd.button.addEventListener("click", (event) => {
		ArrowEnd.deleteButton();
		DefenseGameValues.IsIntroEnd = true;
	}, { once: true });
	canvas.setnewcolor("#333399");
	canvas.setalign("right");
	canvas.text(TranslatedText[SettingsValues.Language][92], 930, 490);
	canvas.setalign("left");
	ArrowEnd.draw(canvas);
	canvas.setnewcolor("#ffffff");
} 

function DefenseGameComponentDrawArmyImage(id, angle, x, y, canvas) {
	canvas.context.save();
	canvas.context.translate(x, y);
	canvas.context.rotate(toRadians(angle));
	canvas.context.translate(-x, -y);
	canvas.image(ArmyImages[id], x - 25, y - 25, 50, 50);
	canvas.context.restore();
}

function DefenseGameComponentDrawTruck(angle, x, y, canvas) {
	DefenseGameComponentDrawArmyImage(12, angle, x, y, canvas);
}

function DefenseGameComponentDrawUAV(angle, x, y, canvas) {
	DefenseGameComponentDrawArmyImage(8, angle, x, y, canvas);
}

function DefenseGameComponentPrepDropoffCallback(event) {
	//y location check, cost check
	if(
		DefenseGameValues.PrepUnitSelected !== -1 &&
		MousePos.X > 100 + 35 && MousePos.X < 500 - 35 &&
		MousePos.Y < (event.currentTarget.canvasParam.canvas.height * 0.8) - 35 &&
		UnitTypes[DefenseGameValues.PrepUnitSelected].cost <= DefenseGameValues.Points
	) {
		DefenseGameValues.Points -= UnitTypes[DefenseGameValues.PrepUnitSelected].cost;
		if(UnitTypes[DefenseGameValues.PrepUnitSelected].code !== "AA") {
			//not AA
			DefenseGameValues.PlayerUnits.push(new PlayerUnit(MousePos.X, MousePos.Y, event.currentTarget.canvasParam));
		}
		else {
			//is AA
			DefenseGameValues.PlayerAA.push(new AntiAir(MousePos.X, MousePos.Y, event.currentTarget.canvasParam));
		}
		DefenseGameValues.PrepUnitSelected = -1;
	}
}

function DefenseGameComponentPrep(canvas) {
	if(DefenseGameValues.WavesRemaining === 0) {
		return;
	}
	console.log("defense game prep");
	canvas.clear("#36291b");
	
	window.addEventListener("click", DefenseGameComponentPrepDropoffCallback);
	window.canvasParam = canvas;
	
	//main game
	let ArrowSkip = new Arrow(950, 450, 50, 50, ArrowDirections.Right, canvas);
	ArrowSkip.button.addEventListener("click", (event) => {
		ArrowSkip.deleteButton();
		DefenseGameValues.IsPrepEnd = true;
	}, { once: true });
	timelimitStart(60); //1:00 min to prepare defense, skippable
	let UnitSelectors = [];
	for(let Id = 0; Id < 4; Id++) {
		UnitSelectors.push(new UnitSelector(Id, canvas));
	}
	DefenseGameDrawUnitSelectorPrepBackground(canvas);
	let timerInterval = window.setInterval((canvas) => {
		//update mouse pos
		mouseAssignOffsets(cvs.canvas);
		//screen clear
		canvas.clear("#36291b");
		//border lines render
		canvas.line(100, 0, 100, 500, 15, "#800000");
		canvas.line(500, 0, 500, 500, 15, "#800000");
		//bg render
		canvas.setnewcolor("#dddddd");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#aaaaaa");
		canvas.box(canvas.canvas.width * 0.9, canvas.canvas.height * 0.8, canvas.canvas.width * 0.1, canvas.canvas.height * 0.2);
		canvas.setnewcolor("#800000");
		canvas.resetalign();
		canvas.text(DefenseGameValues.Points, canvas.canvas.width * 0.92, canvas.canvas.height * 0.9);
		canvas.setalign("left");
		canvas.setnewcolor("#000000");
		ArrowSkip.draw(canvas);
		//sprites and assets render
		for(let Id = 0; Id < DefenseGameValues.UAVLeft; Id++) {
			DefenseGameComponentDrawUAV(90, 50, 100 + Id * 30, canvas);
		}
		DefenseGameComponentDrawTruck(270, 25, 250, canvas);
		DefenseGameComponentDrawTruck(225, 25, 300, canvas);
		DefenseGameComponentDrawTruck(200, 25, 350, canvas);
		DefenseGameComponentDrawTruck(200, 60, 350, canvas);
		//selector - render first!
		if(DefenseGameValues.PrepUnitSelected !== -1) {
			DefenseGameDrawUnitSelectorPrepBackground(canvas);
		}
		//units
		for(let Id = 0; Id < DefenseGameValues.PlayerUnits.length; Id++) {
			DefenseGameValues.PlayerUnits[Id].draw();
		}
		for(let Id = 0; Id < DefenseGameValues.PlayerAA.length; Id++) {
			DefenseGameValues.PlayerAA[Id].draw();
		}
		//selection menu
		for(let Id = 0; Id < 4; Id++) {
			UnitSelectors[Id].draw();
		}
		canvas.text("UAV: "+DefenseGameValues.UAVLeft, canvas.canvas.width * 0.7, canvas.canvas.height * 0.88); //UAVs
		canvas.text(TranslatedText[SettingsValues.Language][255]+": "+DefenseGameValues.AirSupportLeft, canvas.canvas.width * 0.7, canvas.canvas.height * 0.98); //air support
		//waves
		renderTextAsMinigameStatus2(TranslatedText[SettingsValues.Language][151], DefenseGameValues.WavesRemaining, canvas);
		//time stuff
		timelimitRender(canvas);
		if(timelimitIsDone() || DefenseGameValues.IsPrepEnd) {
			clearInterval(timerInterval);
			DefenseGameValues.IsPrepEnd = true;
			DefenseGameValues.PrepUnitSelected = -1;
			deleteCanvasInputElems(canvas);
			window.removeEventListener("click", DefenseGameComponentPrepDropoffCallback);
		} //time limit check
	}, 50, canvas, UnitSelectors); //preparation interval func
}

function DefenseGameComponentLaunchPlayerUAV(canvas) {
	if(DefenseGameValues.UAVLeft > 0) {
		DefenseGameValues.UAVLeft--;
			
	}
}
function DefenseGameComponentLaunchPlayerAirSupport(canvas) {
	if(DefenseGameValues.AirSupportLeft > 0) {
		DefenseGameValues.AirSupportLeft--;
		DefenseGameComponentVariablePlayerAirSupport.fly();
	}
}

function DefenseGameComponentDefense(canvas) {
	if(DefenseGameValues.WavesRemaining === 0) {
		return;
	}
	if(!DefenseGameValues.IsPrepEnd) {
      	window.setTimeout(DefenseGameComponentDefense, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }

	DefenseGameValues.IsDefenseEnd = false;
	console.log("defense game defense");	
	
	//main game, defenses auto target, player can only call in air support and UAVs, reposition tonks
	//always aim at nearest
	
	//wave ids
	switch((11 - DefenseGameValues.WavesRemaining)) {
		case 1:
			DefenseGameValues.WaveEnemies = SettingsValues.Difficulty; //1-3
			DefenseGameValues.WaveUAVs = 0;
		break;
		case 2:
			DefenseGameValues.WaveEnemies = SettingsValues.Difficulty + 1; //2-4
			DefenseGameValues.WaveUAVs = 0;
		break;
		case 3:
			DefenseGameValues.WaveEnemies = SettingsValues.Difficulty + 1; //2-4
			DefenseGameValues.WaveUAVs = -1 + SettingsValues.Difficulty; //0-2
		break;
		case 4:
			DefenseGameValues.WaveEnemies = SettingsValues.Difficulty + 1; //2-4
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty; //1-3
		break;
		case 5:
			DefenseGameValues.WaveEnemies = (SettingsValues.Difficulty + 1) * 2; //4-8
			DefenseGameValues.WaveUAVs = -1 + SettingsValues.Difficulty; //0-2
		break;
		case 6:
			DefenseGameValues.WaveEnemies = (SettingsValues.Difficulty + 1) * 2; //4-8
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty; //1-3
		break;
		case 7:
			DefenseGameValues.WaveEnemies = ((SettingsValues.Difficulty + 1) * 2 + 1); //5-9
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty; //1-3
		break;
		case 8:
			DefenseGameValues.WaveEnemies = ((SettingsValues.Difficulty + 1) * 2 + 2); //6-10
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty; //1-3
		break;
		case 9:
			DefenseGameValues.WaveEnemies = ((SettingsValues.Difficulty + 1) * 3); //6-12
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty; //1-3
		break;
		case 10:
			DefenseGameValues.WaveEnemies = ((SettingsValues.Difficulty + 1) * 3); //6-12
			DefenseGameValues.WaveUAVs = SettingsValues.Difficulty + 1; //2-4
		break;
	}
	
	for(let Id = 0; Id < DefenseGameValues.WaveEnemies; Id++) {
		DefenseGameValues.EnemyUnits.push(new EnemyUnit(canvas));
		DefenseGameValues.EnemyUnits[Id].genpos();
	}
	
	let collisionCheckPassed = true;
	
	do {
		collisionCheckPassed = true;
		//check for collisions
		for(let Id = 0; Id < DefenseGameValues.EnemyUnits.length; Id++) {
			for(let Id2 = 0; Id2 < DefenseGameValues.EnemyUnits.length; Id2++) {
				if(Id2 !== Id) {
					if(
						DetectCollisions(
							DefenseGameValues.EnemyUnits[Id].x - 35, DefenseGameValues.EnemyUnits[Id].y - 35, DefenseGameValues.EnemyUnits[Id].x + 35, DefenseGameValues.EnemyUnits[Id].y + 35,
							DefenseGameValues.EnemyUnits[Id2].x - 35, DefenseGameValues.EnemyUnits[Id2].y - 35, DefenseGameValues.EnemyUnits[Id2].x + 35, DefenseGameValues.EnemyUnits[Id2].y + 35)
					) {
						DefenseGameValues.EnemyUnits[Id].genpos();
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
	
	for(let Id = 0; Id < DefenseGameValues.WaveUAVs; Id++) {
		DefenseGameValues.EnemyUAVs.push(new UAV(canvas));
	}
	
	//player uavs - how?
	
	//UI
	let UAVLaunchButton = new Button(canvas.canvas.width * 0.7, canvas.canvas.height * 0.8, canvas.canvas.width * 0.3, canvas.canvas.height * 0.1, 20, TranslatedText[SettingsValues.Language][256], "canvas_container");
	let AirSupportButton = new Button(canvas.canvas.width * 0.7, canvas.canvas.height * 0.9, canvas.canvas.width * 0.3, canvas.canvas.height * 0.1, 20, TranslatedText[SettingsValues.Language][255], "canvas_container");
	UAVLaunchButton.button.addEventListener("click", (event) => {
		DefenseGameComponentLaunchPlayerUAV(canvas);
	});
	AirSupportButton.button.addEventListener("click", (event) => {
		DefenseGameComponentLaunchPlayerAirSupport(canvas);
	});

	let HasEnemyLaunchedUAV = false;
	
	let mainInterval = window.setInterval((canvas) => {
		canvas.clear("#36291b");
		canvas.setnewcolor("#dddddd");
		canvas.box(0, canvas.canvas.height * 0.8, canvas.canvas.width, canvas.canvas.height * 0.2);
		renderTextAsMinigameStatus3(TranslatedText[SettingsValues.Language][151], DefenseGameValues.WavesRemaining, canvas); //waves
		renderTextAsMinigameStatus2(TranslatedText[SettingsValues.Language][254], DefenseGameValues.WaveEnemies+"+"+DefenseGameValues.WaveUAVs, canvas); //enemies
		//checks
		//sprites and assets render
		for(let Id = 0; Id < DefenseGameValues.UAVLeft; Id++) {
			DefenseGameComponentDrawUAV(90, 50, 100 + Id * 30, canvas);
		}
		DefenseGameComponentDrawTruck(270, 25, 250, canvas);
		DefenseGameComponentDrawTruck(225, 25, 300, canvas);
		DefenseGameComponentDrawTruck(200, 25, 350, canvas);
		DefenseGameComponentDrawTruck(200, 60, 350, canvas);
		//units
		for(let Id = 0; Id < DefenseGameValues.PlayerUnits.length; Id++) {
			DefenseGameValues.PlayerUnits[Id].draw();
			DefenseGameValues.PlayerUnits[Id].findnearestenemy();
			DefenseGameValues.PlayerUnits[Id].update();
		}
		for(let Id = 0; Id < DefenseGameValues.PlayerAA.length; Id++) {
			DefenseGameValues.PlayerAA[Id].draw();
			DefenseGameValues.PlayerAA[Id].findnearestUAV();
			DefenseGameValues.PlayerAA[Id].update();
		}
		for(let Id = 0; Id < DefenseGameValues.EnemyUnits.length; Id++) {
			DefenseGameValues.EnemyUnits[Id].draw();
			DefenseGameValues.EnemyUnits[Id].findnearestplayer();
			DefenseGameValues.EnemyUnits[Id].update();
		}
		//when enemy has no division, launching UAVs (other way around just too OP)
		if(DefenseGameValues.WaveEnemies === 0 && HasEnemyLaunchedUAV === false) {
			HasEnemyLaunchedUAV = true;
			for(let Id = 0; Id < DefenseGameValues.EnemyUAVs.length; Id++) {
				DefenseGameValues.EnemyUAVs[Id].launch();
			}
		}
		//win check (enemy units = 0, no UAVs left) - first because if no enemies but no player divs you still kinda win (you can rebuild)
		if(DefenseGameValues.WaveEnemies === 0 && DefenseGameValues.WaveUAVs === 0) {
			DefenseGameValues.WavesRemaining--;
			DefenseGameValues.IsDefenseEnd = true;
			clearInterval(mainInterval);
			deleteCanvasInputElems(canvas);
			return;
		}
		//loss check (player units = 0)
		if(DefenseGameValues.PlayerUnits.length === 0) {
			DefenseGameValues.WavesRemaining = 0; //to stop recursion
			DefenseGameValues.IsDefenseEnd = true;
			clearInterval(mainInterval);
			deleteCanvasInputElems(canvas);
			InstantLossScreen(1, canvas); //slovak city capture game over screen
			return;
		}
		DefenseGameValues.DefenseCurrentTick++;
	}, 50, canvas); //main interval func
} 

function DefenseGameComponentMain(canvas) {
	if(!DefenseGameValues.IsIntroEnd) {
		window.setTimeout(DefenseGameComponentMain, 100, canvas);
	}
	DefenseGameComponentVariablePlayerAirSupport = new AirSupport(canvas);
	DefenseGameComponentMainLoop(canvas);
}

function DefenseGameComponentMainLoop(canvas) {
	let mainInterval = 0;
	if(DefenseGameValues.WavesRemaining === 0) {
		clearInterval(mainInterval);
		return; //stop!
	}
	console.log("defense game next accepted");
	DefenseGameComponentPrep(canvas);
	DefenseGameComponentDefense(canvas);
	mainInterval = window.setInterval((canvas) => {
		if(DefenseGameValues.IsDefenseEnd && DefenseGameValues.IsPrepEnd) {
			DefenseGameValues.IsDefenseEnd = false;
			DefenseGameValues.IsPrepEnd = false;
			if(DefenseGameValues.WavesRemaining === 0) {
				console.log("defense game stop!");
				clearInterval(mainInterval);
				DefenseGameValues.IsOver = 1;
				DefenseGameValues.HasDefended = true;
				return;
			}
			else {
				console.log("defense game next");
				DefenseGameComponentMainLoop(canvas);
			}
		}
		else {}
	}, 100, canvas);
}

function DefenseGameReset() {
	DefenseGameValues.IsIntroEnd = false;
	DefenseGameValues.IsPrepEnd = false;
	DefenseGameValues.PrepUnitSelected = -1;
	DefenseGameValues.IsDefenseEnd = false;
	DefenseGameValues.DefUnitSelected = -1;
	DefenseGameValues.IsOver = -1;
	DefenseGameValues.Points = 100;
	DefenseGameValues.WavesRemaining = 10;
	DefenseGameValues.WaveUAVs = 0;
	//has defended - NO RESETTING
	DefenseGameValues.EnemyUnits = [];
	DefenseGameValues.EnemyUAVs = [];
	DefenseGameValues.PlayerUnits = [];
	DefenseGameValues.PlayerAA = [];
	DefenseGameValues.UAVLeft = 3;
	DefenseGameValues.AirSupportLeft = 1;
	DefenseGameValues.DefenseCurrentTick = 0;
}

//ostrava not really a big location, no minigames
