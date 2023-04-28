if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial", "48", "#333399", 1000, 500);

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = MainMenu;

let mainMenuButtons = [];

function MainMenu() {
	cvs.image(this, 0, 0, this.width, this.height);
	cvs.text("Útěk z Olomouckého kraje", 50, 50);
}

function PlayButtonRegister() {
    console.log("Registered PLAY Button press!");
	ap.playTrack(1);
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.text("Backstory", 50, 50);
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
    mainMenuButtons[1].changeText();
    cvs.setnewfont("Arial", "32");
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

//game sutff

function MapSceneLoad(arrowobj) {
	arrowobj.deleteButton();
    const mapimage = new Image();
	mapimage.src = "res/map1.png";
	mapimage.onload = MapScene;
}
function MapScene() {
	cvs.image(this, 0, 0, cvs.canvas.width, cvs.canvas.height);
	introarrow2 = new Arrow(700, 400, 100, 100, ArrowDirections.Right, cvs);
	introarrow2.setCallback("StartMainGame(introarrow2)");
    introarrow2.draw(cvs);
}
function StartMainGame(arrowobj) {
    arrowobj.deleteButton();
    HraniceNaMoraveLoad(cvs);
}

function apWrap() {
	ap.toggleSound();
	if(ap.allowed) { 
		mainMenuButtons[0].changeText("Disable audio");
		ap.playTrack(0);
    }
	else { 
		mainMenuButtons[0].changeText("Enable audio");
	 }
}

//Main code

mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "canvas_container"));
mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "canvas_container"));
mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "canvas_container"));
mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "canvas_container"));
mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "canvas_container"));

mainMenuButtons[0].setCallback("apWrap()");
mainMenuButtons[1].setCallback("ap.resetTrack()");
mainMenuButtons[2].setCallback("PlayButtonRegister()");
mainMenuButtons[3].setCallback("SettingsButtonRegister()");
mainMenuButtons[4].setCallback("CreditsButtonRegister()");
