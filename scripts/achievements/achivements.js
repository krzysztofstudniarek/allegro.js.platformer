var elem;
var achivs;
var enemiesKilled;
var selfKill = false;
var achivement;

function achivements(){
	if(inGame){
		achivement = {
			name : "start",
			description: "Achivement for starting the game"
		};
		
		if(!contains(achivement)){
			addAchievement(achivement);
		}
	}
	
	if(hero != null && hero.platform != null && hero.platform.trap && lost){
		
		achivement = {
			name : "it's a trap",
			description : "Achivement for dying in a trap"
		}
		
		if(!contains(achivement)){
			addAchievement(achivement);
		}
		
	}
	
	if(enemiesKilled >= 5){
		achivement = {
			name : "5 kills",
			description : "Achivment for killing 5 enemies"
		}
		
		if(!contains(achivement)){
			addAchievement(achivement);
		}
	}
	
	if(enemiesKilled >= 10){
		achivement = {
			name : "10 kills",
			description : "Achivment for killing 10 enemies"
		}
		
		if(!contains(achivement)){
			addAchievement(achivement);
		};
	}
	
	if(enemiesKilled >= 100){
		achivement = {
			name : "100 kills",
			description : "Achivment for killing 100 enemies"
		}
		
		if(!contains(achivement)){
			addAchievement(achivement);
		}
	}
	
	if(selfKill && !achivs.has("self kill")){
		achivement = {
			name : "self kill",
			description : "Achivment for killing yourself"
		}
		
		if(!contains(achivement)){
			addAchievement(achivement);
		}
	}
	
	if(typeof(Storage) !== undefined) {
		localStorage.setItem("killed_enemies", enemiesKilled);
	}
}

function initAchivements(){
	
	achivs = new Set();
	elem = document.getElementById("achievements");
	enemiesKilled = 0;

	if(typeof(Storage) !== undefined) {
		var arr = JSON.parse(localStorage.getItem("achiv"));
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
		var spanTitle = document.createElement('span');
		spanTitle.setAttribute("id", "title");
		spanTitle.innerHTML = value.name;
		
		var spanDesc = document.createElement('span');
		spanDesc.setAttribute("id", "description");
		spanDesc.innerHTML = value.description;
		
		ach.appendChild(spanTitle);
		ach.appendChild(spanDesc);
		
		ach.setAttribute("id","achv");
		elem.appendChild(ach);
		if(typeof(Storage) !== undefined) {
			localStorage.setItem("achiv", JSON.stringify(Array.from(achivs)));
		}
}

function contains(ach){
	
	var ret = false;
	
	achivs.forEach(function(value){
			if(ach.name == value.name){
				ret = true;
			}
		});
		
	return ret;
}