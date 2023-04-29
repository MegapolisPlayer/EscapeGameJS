let GamePaused = false;
let AllowedToPause = true;

function Pause(canvasobj) {
	if(GamePaused) {
		//unpause
		GamePaused = false;
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
	canvasobj.box(350, 100, 300, 300);
	canvasobj.setnewcolor("#333399");
	canvasobj.text("Game paused", 360, 120);
	
	canvasobj.setnewfont("Arial, FreeSans", "32");
}

