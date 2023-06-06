let GamePaused = false;
let AllowedToPause = true;

function SetState(canvasobj) {
	deleteCanvasInputElems(); //local functions will remake
	PauseButton.append(canvasobj);
	console.log("SetState called!");
	switch(locationId) {
		case 1:
			switch(localLocationId) {
				case 0:
					HraniceNaMoraveDomov(canvasobj);	
					return;
				case 1:
					HraniceNaMoraveNamesti(canvasobj);	
					return;
				case 2:
					HraniceNaMoraveNadrazi(canvasobj);
					return;
				case 3:
					HraniceNaMoraveNastupiste(canvasobj);
					return;
				case 4:
					HraniceNaMoraveRestaurace(canvasobj);
					return;
			}
		case 2:
			switch(localLocationId) {
				case 0:
					PrerovNastupiste(canvasobj);	
					return;
				case 1:
					PrerovNadrazi(canvasobj);	
					return;
				case 2:
					PrerovNamesti(canvasobj);
					return;
				case 3:
					PrerovAutobus(canvasobj);
					return;
				case 4:
					PrerovBecva(canvasobj);
					return;
			}
		case 3:
			switch(localLocationId) {
				case 0:
					NezamysliceNastupiste(canvasobj);	
					return;
				case 1:
					NezamysliceNadrazi(canvasobj);	
					return;
				case 2:
					NezamyslicePodnikVenek(canvasobj);
					return;
				case 3:
					NezamyslicePodnikVnitrek(canvasobj);
					return;
			}
			return;
		case 4:
			switch(localLocationId) {
				case 0:
					ProstejovNastupiste(canvasobj);	
					return;
				case 1:
					ProstejovNadrazi(canvasobj);	
					return;
				case 2:
					ProstejovNamesti(canvasobj);
					return;
				case 3:
					ProstejovObchod(canvasobj);
					return;
				case 4:
					ProstejovCafe(canvasobj);
					return;
			}
			return;
		case 5:
			switch(localLocationId) {
				case 0:
					OlomoucNastupiste(canvasobj);	
					return;
				case 1:
					OlomoucNadrazi(canvasobj);	
					return;
				case 2:
					OlomoucNamesti(canvasobj);
					return;
				case 3:
					OlomoucObchodVenek(canvasobj);
					return;
				case 4:
					OlomoucObchodVnitrek(canvasobj);
					return;
				case 5:
					OlomoucSyrarna(canvasobj);
					return;
				case 6:
					OlomoucRestaurace(canvasobj);
					return;
				
			}
			return;
		case 6:
			switch(localLocationId) {
				case 0:
					StudenkaPrejezd(canvasobj);	
					return;
				case 1:
					StudenkaNamesti(canvasobj);	
					return;
				case 2:
					StudenkaMost(canvasobj);
					return;
				case 3:
					StudenkaNadrazi(canvasobj);
					return;
				case 4:
					StudenkaNastupiste(canvasobj);
					return;
				case 5:
					StudenkaPole(canvasobj);
					return;
			}
			return;
		case 7:
			switch(localLocationId) {
				case 0:
					OstravaNastupiste(canvasobj);	
					return;
				case 1:
					OstravaNadrazi(canvasobj);	
					return;
				case 2:
					OstravaNastupiste2(canvasobj);	
					return;
			}
			return;
	}
	return;	
}

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		timerUnpause();
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
	timerPause();	
	
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
	canvasobj.text(TranslatedText[SettingsValues.Language][7], 320, 100);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
	
	Pause.buttonAudio = new Button(320, 130, 100, 100, 25, "", "canvas_container");
	Pause.buttonRestart = new Button(420, 130, 100, 100, 25, TranslatedText[SettingsValues.Language][6], "canvas_container");
	Pause.buttonCode = new Button(520, 130, 100, 100, 25, TranslatedText[SettingsValues.Language][50], "canvas_container");
	Pause.buttonSave = new Button(320, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][9], "canvas_container");
	Pause.buttonLoad = new Button(420, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][10], "canvas_container");
	Pause.buttonQuit = new Button(520, 230, 100, 100, 25, TranslatedText[SettingsValues.Language][11], "canvas_container");
	
	if(ap.allowed) { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][5]); }
	else { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][4]); }
	
	Pause.buttonAudio.button.addEventListener("click", () => {
		ap.toggleSound();
		if(ap.allowed) { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][5]); }
		else { Pause.buttonAudio.changeText(TranslatedText[SettingsValues.Language][4]); }
	});	
	Pause.buttonRestart.button.addEventListener("click", () => {
		ap.resetTrack();
	});
	Pause.buttonCode.button.addEventListener("click", () => {
		window.open("https://www.github.com/MegapolisPlayer/EscapeGameJS", "_blank");
	});
	Pause.buttonSave.button.addEventListener("click", () => {
		Save();
	});
	Pause.buttonLoad.button.addEventListener("click", () => {
		Load(canvasobj);
	});
	Pause.buttonQuit.button.addEventListener("click", () => {
		location.reload();
	});
	
	canvasobj.textml(TranslationGetMultipleLines(SettingsValues.Language, 48, 2), 320, 380);
	canvasobj.setnewfont("Arial, FreeSans", "48");
}

function SetStateFile(filecontent, canvas) {
	GamePaused = false;
	
	canvas.loadingMsg();
	deleteCanvasInputElems();

	//info - location id, local location id, difficulty, money
	let Data = filecontent.split(' ');

	if(Data[0] !== "eors1") {
		console.error("SetStateFile: Incompatible save loaded! (Version 1 required)");
	}	
	if(Data.length != 12) {
		console.error("SetStateFile: Invalid save loaded!");
	}
	
	console.log("Save loaded: "+filecontent);
	
	timerReset();
	
	//data splitting
	SettingsValues.Language =            Number(Data[1]);
	SettingsValues.Difficulty =          Number(Data[2]);
	locationId =                         Number(Data[3]);	
	localLocationId =                    Number(Data[4]);	
	MoneyAmount =                        Number(Data[5]);
	doesHaveTicket =                     Number(Data[6]);
	CreditsValues.gotAchievementSpeed =  Number(Data[7]);
	CreditsValues.gotAchievementWaiter = Number(Data[8]);
	CreditsValues.gotAchievementHelp =   Number(Data[9]);
	CreditsValues.gotAchievementSus =    Number(Data[10]);
	TimerValues.InheritedSaveTime =      Number(Data[11]);
	UpdateSettingsValues();

	console.log("Data split!");

	timerStart();		
	
	//pause button
	PauseButton = new Arrow(10, 10, 50, 50, ArrowDirections.Pause, null);
	PauseButton.button.addEventListener("click", () => {
		Pause(canvas);
	});
	
	SavefileLoaded = true;
	
	//image loading - dont forget to add stuff here
	switch(locationId) {
		case 1:
			hnm_AmountLoadedImages = 0;
			HraniceNaMoraveLoad(canvas, true);
			let thisInterval1 = window.setInterval(() => {
				if(hnm_AmountLoadedImages === 6) {
					clearInterval(thisInterval1);
					AllowedToPause = true;
					ap.playTrack(2);
					SetState(canvas);
				}
			}, 100);
		break;
		case 2:
			pre_AmountLoadedImages = 0;
			PrerovLoad(canvas, true);
			let thisInterval2 = window.setInterval(() => {
				if(pre_AmountLoadedImages === 6) {
					clearInterval(thisInterval2);
					AllowedToPause = true;
					ap.playTrack(3);
					SetState(canvas);
				}
			}, 100);
		break;
		case 3:
			nzm_AmountLoadedImages = 0;
			NezamysliceLoad(canvas, true);
			let thisInterval3 = window.setInterval(() => {
				if(nzm_AmountLoadedImages === 5) {
					clearInterval(thisInterval3);
					AllowedToPause = true;
					ap.playTrack(4);
					SetState(canvas);
				}
			}, 100);
		break;
		case 4:
			pro_AmountLoadedImages = 0;
			ProstejovLoad(canvas, true);
			let thisInterval4 = window.setInterval(() => {
				if(pro_AmountLoadedImages === 6) {
					clearInterval(thisInterval4);
					AllowedToPause = true;
					ap.playTrack(5);
					SetState(canvas);
				}
			}, 100);
		break;
		case 5:
			olo_AmountLoadedImages = 0;
			OlomoucLoad(canvas, true);
			let thisInterval5 = window.setInterval(() => {
				if(olo_AmountLoadedImages === 8) {
					clearInterval(thisInterval5);
					AllowedToPause = true;
					ap.playTrack(6);
					SetState(canvas);
				}
			}, 100);
		break;
		case 6:
			stu_AmountLoadedImages = 0;
			StudenkaLoad(canvas, true);
			let thisInterval6 = window.setInterval(() => {
				if(stu_AmountLoadedImages === 8) {
					clearInterval(thisInterval6);
					AllowedToPause = true;
					ap.playTrack(7);
					SetState(canvas);
				}
			}, 100);
		break;
		case 7:
			ost_AmountLoadedImages = 0;
			OstravaLoad(canvas, true);
			let thisInterval7 = window.setInterval(() => {
				if(ost_AmountLoadedImages === 5) {
					clearInterval(thisInterval7);
					AllowedToPause = true;
					ap.playTrack(8);
					SetState(canvas);
				}
			}, 100);
		break;
	}
}

function Save() {
	timerEnd(); //finishes counting time
	
	let finalizedSave = "eors1 ";
	finalizedSave+=Number(SettingsValues.Language);
	finalizedSave+=" ";
	finalizedSave+=Number(SettingsValues.Difficulty);
	finalizedSave+=" ";
	finalizedSave+=Number(locationId);
	finalizedSave+=" ";
	finalizedSave+=Number(localLocationId);
	finalizedSave+=" ";
	finalizedSave+=Number(MoneyAmount);
	finalizedSave+=" ";
	finalizedSave+=Number(doesHaveTicket);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementSpeed);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementWaiter);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementHelp);
	finalizedSave+=" ";
	finalizedSave+=Number(CreditsValues.gotAchievementSus);
	finalizedSave+=" ";
	finalizedSave+=Number(TimerValues.OverallTime);
	
	let hiddenAddrElem = document.createElement('a');
    hiddenAddrElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalizedSave));
    hiddenAddrElem.setAttribute('download', "savefile.eors1");
    hiddenAddrElem.style.display = 'none';
	
    document.body.appendChild(hiddenAddrElem);
    hiddenAddrElem.click();
    document.body.removeChild(hiddenAddrElem);
}

let SavefileLoaded = false;

function Load(canvasobj) {
	SavefileLoaded = false;
	let hiddenInputElem = document.createElement("input");
	hiddenInputElem.id="fileuploaded";
	hiddenInputElem.type = "file";
	hiddenInputElem.accept = ".eors1";
	
	hiddenInputElem.addEventListener("change", (event) => {
		let reader = new FileReader();
   		reader.readAsText(hiddenInputElem.files[0], "UTF-8");
		reader.onload = (event) => {
			SavefileLoaded = true;
			SetStateFile(event.target.result, canvasobj);
		}
	}, false);
	hiddenInputElem.click();
}

