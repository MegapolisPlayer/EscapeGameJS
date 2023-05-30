let ost_Locations = [];
let ost_AmountLoadedImages = 0;

function OstravaImageLoaded() {
	ost_AmountLoadedImages++;
}

function OstravaLoad(canvas) {
	AllowedToPause = false;	
	timerPause();
	canvas.loadingMsg();
	locationId = 7;
}

function OstravaMap(canvas) {

}

function Ostrava(canvas) {

}

function OstravaNastupiste(canvas) {

}

function OstravaNadrazi(canvas) {

}
