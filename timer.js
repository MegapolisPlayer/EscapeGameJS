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
	TimerValues.OverallPauseTime += Math.abs(TimerValues.CurrentTime - TimerValues.PauseStartTime);
	TimerValues.PauseStartTime = 0;
}
function timerEnd() {
	TimerValues.CurrentTime = Date.now();
	TimerValues.OverallTime = Math.abs((TimerValues.CurrentTime - TimerValues.StartTime - TimerValues.OverallPauseTime) / 1000);
}
function timerToString() {
	return String(Math.floor(TimerValues.OverallTime / 60) + ":" + ('00'+((TimerValues.OverallTime % 60) - Math.floor(TimerValues.OverallTime / 60))).slice(-2) + " ([M]M:SS)");
}
