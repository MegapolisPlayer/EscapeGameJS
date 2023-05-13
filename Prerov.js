let pre_Locations = [];
let pre_AmountLoadedImages = 0;

function PrerovImageLoaded() {
	pre_AmountLoadedImages += 1;
}

function PrerovLoad(canvas, calledbysetstate = false) {
	canvas.loadingMsg(); //replace by cutscene?
	CheckInstantLoss(canvas);
	locationId = 2;
	for(let Id = 0; Id < 5; Id++) {
		pre_Locations.push(new Image());
		pre_Locations[Id].onload = PrerovImageLoaded;
	}
	pre_Locations[0].src = "res/hnm/domov.png";
	pre_Locations[1].src = "res/hnm/namesti.jpg";
	pre_Locations[2].src = "res/hnm/nadrazi.jpg";
	pre_Locations[3].src = "res/hnm/nastupiste.jpg";
	pre_Locations[4].src = "res/hnm/restaurace.jpg";
	
	if(calledbysetstate !== true) {
		//if called by load and setstatefile -> setstatefile adds pause button
		PauseButton.button.addEventListener("click", () => {
			Pause(canvas);
		});	
		Prerov(canvas);
	}
}

function Prerov(canvas) {
	if(pre_AmountLoadedImages != 5) {
      	window.setTimeout(Prerov, 100, canvas); // this checks the flag every 100 milliseconds
		return;
    }
    console.log("Prerov START "+pre_AmountLoadedImages);
	canvas.loadingMsg();
	ap.playTrack(3);
	
	canvas.image(pre_Locations[0], 0, 0, canvas.canvas.width, canvas.canvas.height);
	chr.draw(360, 100, 0.25, cvs);
	
	let FirstDialogue = new Dialogue();
	FirstDialogue.begin(canvas);
	FirstDialogue.makeBubble(0, TranslationGetMultipleLines(SettingsValues.Language, 94, 2));
	FirstDialogue.makeBubble(1, TranslationGetMultipleLines(SettingsValues.Language, 96, 2));
	FirstDialogue.makeBubble(2, TranslationGetMultipleLines(SettingsValues.Language, 98, 2));
	FirstDialogue.makeBubble(3, TranslationGetMultipleLines(SettingsValues.Language, 100, 2));
	FirstDialogue.makeBubble(5, TranslatedText[SettingsValues.Language][102]);	
	
	let thisInterval = window.setInterval((dialogue, canvas) => {
		if(dialogue.counter === 6) {
			clearInterval(thisInterval);
			dialogue.end();		
			PauseButton.append(canvas);
			AllowedToPause = true;	
			PrerovNastupiste(canvas);
		}
	}, 100, FirstDialogue, canvas);
}

function PrerovNastupiste(canvas) {
	console.log("pre nastupiste");
	localLocationId = 0;
}
