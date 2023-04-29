let GamePaused = false;
let AllowedToPause = true;

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		GamePaused = false;
		Pause.buttonAudio.deleteButton();
		Pause.buttonRestart.deleteButton();
		Pause.buttonCode.deleteButton();
		Pause.buttonSave.deleteButton();
		Pause.buttonLoad.deleteButton();
		Pause.buttonQuit.deleteButton();
		switch(LocationId) {
		case 1:
			switch(LocalLocationId) {
			case 0:
				HraniceNaMoraveDomov(canvasobj);	
				break;
			case 1:
				HraniceNaMoraveNamesti(canvasobj);	
				break;
			case 2:
				HraniceNaMoraveNadrazi(canvasobj);
				break;
			case 3:
				HraniceNaMoraveNastupiste(canvasobj);
				break;
			case 4:
				HraniceNaMoraveRestaurace(canvasobj);
				break;
			}
		}
		return;	
	}
	if(!AllowedToPause) { return; }
	GamePaused = true;
	canvasobj.setnewcolor("#dddddd");
	canvasobj.box(300, 50, 400, 400);
	canvasobj.setnewcolor("#333399");
	
	canvasobj.setnewfont("Arial, FreeSans", "48");
	canvasobj.text("Game paused", 320, 100);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	
	Pause.buttonAudio = new Button(320, 130, 100, 100, 25, "", "canvas_container");
	Pause.buttonRestart = new Button(420, 130, 100, 100, 25, "Restart Track", "canvas_container");
	Pause.buttonCode = new Button(520, 130, 100, 100, 25, "View source code", "canvas_container");
	Pause.buttonSave = new Button(320, 230, 100, 100, 25, "Save Game", "canvas_container");
	Pause.buttonLoad = new Button(420, 230, 100, 100, 25, "Load Game", "canvas_container");
	Pause.buttonQuit = new Button(520, 230, 100, 100, 25, "Exit Game", "canvas_container");
	
	if(ap.allowed) { Pause.buttonAudio.changeText("Disable audio"); }
	else { Pause.buttonAudio.changeText("Enable audio"); }
	
	Pause.buttonAudio.button.addEventListener("click", (event) => {
		ap.toggleSound();
		if(ap.allowed) { Pause.buttonAudio.changeText("Disable audio"); }
		else { Pause.buttonAudio.changeText("Enable audio"); }
	});	
	Pause.buttonRestart.button.addEventListener("click", (event) => {
		ap.resetTrack();
	});
	Pause.buttonCode.button.addEventListener("click", (event) => {
		window.open("https://www.github.com/MegapolisPlayer/EscapeGameJS", "_blank");
	});
	Pause.buttonSave.button.addEventListener("click", (event) => {
		Save();
	});
	Pause.buttonLoad.button.addEventListener("click", (event) => {
		Load(canvasobj);
	});
	Pause.buttonQuit.button.addEventListener("click", (event) => {
		location.reload();
	});
	
	canvasobj.textml("Press escape or click the\nbutton again to unpause.", 320, 380);
	canvasobj.setnewfont("Arial, FreeSans", "48");
}

function SetState(filecontent, canvas) {
	let Children = document.getElementsByClassName("CanvasInputElement");

	while(Children[0]) {
   		Children[0].parentNode.removeChild(Children[0]);
	}
	
	canvas.clear("purple");

	//file, split with spaces
	//info - location id, local location id, money, difficulty
	let Data = filecontent.split('\n');
	console.log(Data); //load using SetState() function!
}

function Save() {

}

function Load(canvasobj) {
	let hiddenInputElem = document.createElement("input");
	hiddenInputElem.type = "file";

	hiddenInputElem.onchange = (event) => { 
   		let fileInfo = event.target.files[0]; 
		let reader = new FileReader();
   		reader.readAsText(fileInfo, "UTF-8");
		reader.onload = readerEvent => {
			SetState(readerEvent.target.result, canvasobj);
		}
	}
	hiddenInputElem.click();
}

