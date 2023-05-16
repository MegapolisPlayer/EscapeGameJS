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
