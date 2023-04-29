if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial, FreeSans", "48", "#333399", 1000, 500);
cvs.clear("purple");

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = MainMenu;

let mainMenuButtons = [];

function MainMenu() {
	mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "canvas_container"));
	mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "canvas_container"));
	mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "canvas_container"));
	mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "canvas_container"));
	mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "canvas_container"));

	mainMenuButtons[0].setCallback("AudioEnabler()");
	mainMenuButtons[1].setCallback("ap.resetTrack()");
	
	mainMenuButtons[2].setCallback("ButtonsRouter(0)");
	mainMenuButtons[3].setCallback("ButtonsRouter(1)");
	mainMenuButtons[4].setCallback("ButtonsRouter(2)");
	
	cvs.image(this, 0, 0, this.width, this.height);
	cvs.setfontweight("bold");
	cvs.text("Escape from the Olomouc Region", 50, 50);	
	cvs.resetfontweight();
}

//game stuff

function Intro() {
    console.log("Registered PLAY Button press!");
	ap.playTrack(1);
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.setfontweight("bold");
	cvs.text("Backstory", 50, 50);
	cvs.resetfontweight();
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
    cvs.setnewfont("Arial, FreeSans", "32");
    cvs.textml("It is the 1st of May 1997 and the Slovak minority has just\n"
                +"declared independence from the young republic of Czechia.\n\n"
                +"With the support of the Slovak Republic the separatists are\n"
                +"now pushing deep into the Moravian heartlands. They have\n"
                +"also poisoned the Bečva river along the way and are now\n"
                +"standing just a few kilometers away from Hranice.\n\n"
                +"It is time to escape.\n"
    , 100, 100);
	
	introarrow1 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow1.setCallback("MapSceneLoad(introarrow1)");
    introarrow1.draw(cvs);
}

function MapSceneLoad(arrowobj) {
	arrowobj.deleteButton();
	cvs.clear("purple");
    const mapimage = new Image();
	mapimage.src = "res/map1.png";
	mapimage.onload = MapScene; 
}
function MapScene() {
	cvs.image(this, 0, 0, cvs.canvas.width, cvs.canvas.height);
	cvs.setnewcolor("#333399");
	cvs.setfontweight("bold");
	cvs.textml("Day 1\nHranice na Morave", 50, 50);
	cvs.resetfontweight();
	cvs.setnewcolor("#000000");
	introarrow2 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow2.setCallback("StartMainGame(introarrow2)");
    introarrow2.draw(cvs);
}
function StartMainGame(arrowobj) {
    arrowobj.deleteButton();
	AllowedToPause = false;
	window.addEventListener("keydown", (event) => {
		if(event.key == "Escape") {
			Pause(cvs);
		}
	});	
    HraniceNaMoraveLoad(cvs);
}

//main menu stuff

function ButtonsRouter(buttonid) {
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
	switch(buttonid) {
		case 0:
			Intro();
		break;
		case 1:
			Settings(cvs);
		break;
		case 2:
			Credits(cvs);
		break;
	}
}

//audio toggle button

function AudioEnabler() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText("Disable audio");
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText("Enable audio");
	 }
}
