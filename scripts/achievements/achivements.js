var elem;
var achivs;
var enemiesKilled;

function achivements(){
	if(inGame && !achivs.has("start")){
		addAchievement("start");
	}
	
	if(hero != null && hero.platform != null && hero.platform.trap && lost && !achivs.has("it's a trap")){
		addAchievement("it's a trap");
	}
	
	if(enemiesKilled >= 5 && !achivs.has("5 kills")){
		addAchievement("5 kills");
	}
	
	if(enemiesKilled >= 10 && !achivs.has("10 kills")){
		addAchievement("10 kills");
	}
	
	console.log(enemiesKilled);
	
	if(typeof(Storage) !== undefined) {
		localStorage.setItem("killed_enemies", enemiesKilled);
	}
}

function initAchivements(){
	
	achivs = new Set();
	elem = document.getElementById("achievements");
	enemiesKilled = 0;

	if(typeof(Storage) !== undefined) {
		var arr = JSON.parse(localStorage.getItem("achievements"));
		if(arr != undefined){
			for(var i = 0; i<arr.length; i++){
				addAchievement(arr[i]);
			}
		}
		enemiesKilled = localStorage.getItem("killed_enemies")!= undefined?parseInt(localStorage.getItem("killed_enemies")) : 0;
	} else {
		allert("Your browser does not support LocalStorage. \n You could play, but your achievements would not be saved");
	}
}

function addAchievement(value){
		achivs.add(value);
		var ach = document.createElement('div');
		ach.setAttribute("id","achv");
		ach.innerHTML = value;
		elem.appendChild(ach);
		if(typeof(Storage) !== undefined) {
			localStorage.setItem("achievements", JSON.stringify(Array.from(achivs)));
		}
}