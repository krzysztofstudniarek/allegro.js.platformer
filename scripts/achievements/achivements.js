var elem;
var achivs;

function achivements(){
	if(inGame && !achivs.has("start")){
		addAchievement("start");
	}
	
	if(hero != null && hero.platform != null && hero.platform.trap && lost && !achivs.has("it's a trap")){
		addAchievement("it's a trap");
	}
}

function initAchivements(){
	achivs = new Set();
	elem = document.getElementById("achievements");
}

function addAchievement(value){
		achivs.add(value);
		var ach = document.createElement('div');
		ach.setAttribute("id","achv");
		ach.innerHTML = value;
		elem.appendChild(ach);
}