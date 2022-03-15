let time = getSavedTime();
let myTimer;
let timeSpan = document.getElementById("timeSpan");

// Length time of day/night takes in secconds
const dayLength = 250;
const nightLength = 50;

function getSavedTime() {
	let saved = parseInt(sessionStorage.getItem("Time"));
	if (!isNaN(saved)) return saved;
	else return 0;
}

function StartTimer() {
	myTimer = setInterval(incrementTime, 1000);
	displayTime();
}

function incrementTime() {
	time++;
	saveTime();

	displayTime();

	// TODO: Do something when reaches night
	// TODO: Do something when over 5 minutes
}

function displayTime() {
	if (timeSpan) {
		let translatedTime = translateTimeToHours();
		let timeRemaining;
		if (time < dayLength) {
			timeRemaining = `${Math.floor((dayLength - time) / 60)}:${padTime((dayLength - time) % 60)} until night begins`;
		} else {
			let nightTime = time - dayLength;
			timeRemaining = `${Math.floor((nightLength - nightTime) / 60)}:${padTime((nightLength - nightTime) % 60)} until dawn`;
		}

		timeSpan.innerHTML = `${translatedTime}<br /><br />(${timeRemaining})`;
	}
}

function translateTimeToHours() {
	// Time the day starts at (eg 1700 being 5:00pm)
	const dayStart = 1200;
	// Time the day ends at (eg 2200 being 10:00pm)
	const dayEnd = 2200;

	const nightStart = 2200;
	const nightEnd = 550;

	let dayLen = dayEnd - dayStart;

	let nightLen;
	if (nightStart < nightEnd) nightLen = nightEnd - nightStart;
	else nightLen = nightStart + 24 - nightEnd;

	let translatedTime = (dayLen / dayLength) * time;

	let hour, minutes;

	if (translatedTime < dayLen) {
		hour = Math.floor(translatedTime / 100) + dayStart / 100;
	} else {
		translatedTime = (nightLen / nightLength) * (time - dayLength);
		hour = Math.floor(translatedTime / 100) + nightStart / 100;
	}

	minutes = Math.floor(((translatedTime % 100) / 25) * 3);
	hour = hour % 24;

	return `${padTime(hour)}:${padTime(minutes * 5)}`;
}

function padTime(num) {
	if (num < 10) return "0" + num;
	else return num;
}

function stopTimer() {
	clearTimeout(myTimer);
	displayTime();
}

function getTime() {
	return time;
}

function saveTime(value = time) {
	sessionStorage.setItem("Time", value);
}

function playAgain() {
	window.location.href = "Hospital.html";
	//window.location.href = "Cabin.html";
	//window.location.href = "GasStation.html";
	//window.location.href = "FarmHouse.html";
}
