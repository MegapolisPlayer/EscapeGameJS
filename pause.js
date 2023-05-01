let GamePaused = false;
let AllowedToPause = true;

function deleteCanvasInputElems() {
	let inputElems = document.getElementsByClassName("CanvasInputElement");
	while(inputElems[0]) {
   		inputElems[0].parentNode.removeChild(inputElems[0]);
	}
}

function SetState(canvasobj) {
	deleteCanvasInputElems();
	PauseButton.append(canvasobj);
	switch(locationId) {
		case 1:
			switch(localLocationId) {
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

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		GamePaused = false;
		clearInterval(Pause.thisInterval);
		Pause.buttonAudio.deleteButton();
		Pause.buttonRestart.deleteButton();
		Pause.buttonCode.deleteButton();
		Pause.buttonSave.deleteButton();
		Pause.buttonLoad.deleteButton();
		Pause.buttonQuit.deleteButton();
		SetState(canvasobj);
		return;
	}
	
	if(!AllowedToPause) { return; }
	GamePaused = true;

	Pause.thisInterval = window.setInterval(() => {
		if(Load.FileLoaded === true) {
			clearInterval(Pause.thisInterval);
			GamePaused = false;
			Pause.buttonAudio.deleteButton();
			Pause.buttonRestart.deleteButton();
			Pause.buttonCode.deleteButton();
			Pause.buttonSave.deleteButton();
			Pause.buttonLoad.deleteButton();
			Pause.buttonQuit.deleteButton();
			//SetState called, no need to call anything
		}
	}, 100);
	
	
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
		Save(locationId, localLocationId, SettingsValues.Difficulty, MoneyCount);
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

function SetStateFile(filecontent, canvas) {
	GamePaused = false;
	
	canvas.clear("purple");

	//info - location id, local location id, difficulty, money
	let Data = filecontent.split(' ');

	if(Data[0] !== "eors1") {
		console.error("SetStateFile: Incompatible save loaded! (Version 1 required)");
	}	
	
	//data splitting
	SettingsValues.Difficulty = Number(Data[1]);
	locationId =                Number(Data[2]);	
	localLocationId =           Number(Data[3]);	
	MoneyCount =                Number(Data[4]);
	UpdateSettingsValues();
	
	//pause button
	PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);
	PauseButton.button.addEventListener("click", () => {
		Pause(canvas);
	});		
	
	//image loading
	switch(locationId) {
		case 1:
			hnm_AmountLoadedImages = 0;
			HraniceNaMoraveLoad(canvas, true);
			let thisInterval = window.setInterval(() => {
				if(hnm_AmountLoadedImages === 5) {
					clearInterval(thisInterval);
					SetState(canvas);
				}
			}, 100);
		break;
		
		
	}
}

function Save(locationId, localLocationId, difficulty, money) {
	let finalizedSave = "eors1 ";
	finalizedSave+=difficulty;
	finalizedSave+=" ";
	finalizedSave+=locationId;
	finalizedSave+=" ";
	finalizedSave+=localLocationId;
	finalizedSave+=" ";
	finalizedSave+=money;
	
	let hiddenAddrElem = document.createElement('a');
    hiddenAddrElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalizedSave));
    hiddenAddrElem.setAttribute('download', "save.eors");
    hiddenAddrElem.style.display = 'none';
	
    document.body.appendChild(hiddenAddrElem);
    hiddenAddrElem.click();
    document.body.removeChild(hiddenAddrElem);
}

function Load(canvasobj) {
	Load.FileLoaded = false;
	
	let hiddenInputElem = document.createElement("input");
	hiddenInputElem.id="fileuploaded";
	hiddenInputElem.type = "file";
	hiddenInputElem.accept = ".eors";
	
	hiddenInputElem.addEventListener("change", (event) => {
		Load.FileLoaded = true;
		let reader = new FileReader();
   		reader.readAsText(hiddenInputElem.files[0], "UTF-8");
		reader.onload = (event) => {
			Load.FileLoaded = false; //finished load operation
			SetStateFile(event.target.result, canvasobj);
		}
	}, false);
	hiddenInputElem.click();
}

