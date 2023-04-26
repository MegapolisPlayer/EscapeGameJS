if (window.document.documentMode) {
    //internet explorer
    alert("You seem to be using Internet Explorer.\nThe game might not work properly.\nDebug reports from IE will be ignored.\n");
}

const cvs = new Canvas("EscapeCanvas", "Arial", "48", "#333399", 1000, 500);
const ap = new AudioPlayer();

const image = new Image();
image.src = "res/MainMenu.jpg";
image.onload = mydrawImage;

let mainMenuButtons = [];

function mydrawImage() {
	cvs.context.drawImage(this, 0, 0, this.width, this.height);
	cvs.text("Útěk z Olomouckého kraje", 50, 50);
}

function PlayButtonRegister() {
    console.log("Registered PLAY Button press!");
	cvs.clear("black");
    cvs.setnewcolor("white");
	cvs.text("Backstory", 50, 50);
	for(let i = 0; i < mainMenuButtons.length; i++) {
		mainMenuButtons[i].deleteButton();
    }
    mainMenuButtons[1].changeText();
    myarrow1 = new Arrow(200, 100, 100, 100, 1, "ArrowRegister1", cvs);
    myarrow1.draw(cvs);
    cvs.setnewfont("Arial", "32");
    cvs.textml("It is the 1st of May 1997 and the Slovak minority has just\n"
                +"declared independence from the young republic of Czechia.\n\n"
                +"With the support of the Slovak Republic the separatists are\n"
                +"now pushing deep into the Moravian heartlands. They have\n"
                +"also poisoned the Bečva river along the way and are now\n"
                +"standing just a few kilometers away from Hranice.\n\n"
                +"It is time to escape.\n"
    , 100, 100);
    HraniceNaMorave();
}
function SettingsButtonRegister() {
	console.log("Registered SETTINGS Button press!");
}
function CreditsButtonRegister() {
	console.log("Registered CREDITS Button press!");
}
function ArrowRegister1() {
    console.log("Registered arrow1 press!");
}

function apNextTrackButtonWrap() {
	mainMenuButtons[0].changeText("Disable audio");
	ap.playNextTrack();
}

//Main code

mainMenuButtons.push(new Button(0,   400, 150, 100, 25, "Enable audio", "apNextTrackButtonWrap", "canvas_container"));
mainMenuButtons.push(new Button(150, 400, 150, 100, 25, "Restart track", "ap.resetTrack", "canvas_container"));
mainMenuButtons.push(new Button(600, 100, 300, 100, 50, "Play", "PlayButtonRegister", "canvas_container"));
mainMenuButtons.push(new Button(600, 200, 300, 100, 50, "Settings", "SettingsButtonRegister", "canvas_container"));
mainMenuButtons.push(new Button(600, 300, 300, 100, 50, "Credits", "CreditsButtonRegister", "canvas_container"));
