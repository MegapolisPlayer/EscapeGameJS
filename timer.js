let TimerValues = {
	StartTime: 0,
	CurrentTime: 0,
	PauseStartTime: 0,
	OverallPauseTime: 0,
	OverallTime: 0
}

function timerStart() {
	TimerValues.StartTime = Date.now();
}
function timerPause() {
	TimerValues.PauseStartTime = Date.now();
}
function timerUnpause() {
	TimerValues.CurrentTime = Date.now();
	TimerValues.OverallPauseTime += Math.abs(Number(TimerValues.CurrentTime) - Number(TimerValues.PauseStartTime));
	TimerValues.PauseStartTime = 0;
}
function timerEnd() {
	TimerValues.CurrentTime = Date.now();
	TimerValues.OverallTime = Math.floor((Math.abs(Number(TimerValues.CurrentTime) - Number(TimerValues.StartTime)) - Number(TimerValues.OverallPauseTime)) / 1000);
}
function timerToString() {
	return String(Math.floor(TimerValues.OverallTime / 60) + ":" + String("00" + Number(TimerValues.OverallTime % 60) ).slice(-2) + " ([M]M:SS)");
}

let TimerlimitValues = {
	TimeLimit: 0,
	StartTime: 0,
	CurrentTime: 0,
	OverallTime: 0
}

function timelimitStart(minutes, seconds) {
	TimerlimitValues.StartTime = Date.now();
	TimerlimitValues.TimeLimit = (minutes * 60) + seconds;
}
function timelimitStart(seconds) {
	TimerlimitValues.StartTime = Date.now();
	TimerlimitValues.TimeLimit = seconds;
}
function timelimitUpdate() {
	TimerlimitValues.CurrentTime = Date.now();
	TimerlimitValues.OverallTime = Math.floor(Math.abs(Number(TimerlimitValues.CurrentTime) - Number(TimerlimitValues.StartTime)) / 1000);
}
function timelimitToString() {
	timelimitUpdate();
	return String(
		Number(Math.floor((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) / 60))
		+ ":" + String("00" + 
		Number((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) % 60)
		).slice(-2));
}
function timelimitToNumber() {
	timelimitUpdate();
	return Number(
			Math.floor((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) / 60)
			+ ":" + String("00" + Number((TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime) % 60)).slice(-2)
		);
}
function timelimitRender(canvasobj) {
	timelimitUpdate();
	canvasobj.setnewcolor("#ffffff");
	canvasobj.setnewfont("Arial, FreeSans", "32");
	let text = TranslatedText[SettingsValues.Language][94]+": "+timelimitToString()+" ";
	let metrics = canvasobj.context.measureText(text);
	canvasobj.box(1000 - metrics.width - 20, 0, metrics.width + 20, 50);
	if(TimerlimitValues.TimeLimit - TimerlimitValues.OverallTime <= 10) { canvasobj.setnewcolor("#800000"); }
	else { canvasobj.setnewcolor("#333399"); }
	canvasobj.text(text, 1000 - metrics.width - 10, 40);
}
function timelimitInfo() {
	TranslatedText[SettingsValues.Language][93] + String(
		Number(Math.floor((TimerlimitValues.TimeLimit) / 60))
		+ ":" + String("00" + 
		Number((TimerlimitValues.TimeLimit) % 60)
		).slice(-2));
}

function timelimitIsDone() {
	return (TimerlimitValues.OverallTime >= TimerlimitValues.TimeLimit);
}
