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
	
	if(typeof(Storage) !== "undefined") {
		console.log("GETTING ACHIVEMENTS FROM STORAGE");
		var arr = JSON.parse(localStorage.getItem("achievements"));
		if(arr != undefined){
			console.log(arr.length);
			for(var i = 0; i<arr.length; i++){
				addAchievement(arr[i]);
			}
		}
	} else {
		console.log("LOCAL STORAGE NOT AVAILABLE");
	}
}

function addAchievement(value){
		achivs.add(value);
		var ach = document.createElement('div');
		ach.setAttribute("id","achv");
		ach.innerHTML = value;
		elem.appendChild(ach);
		localStorage.setItem("achievements", JSON.stringify(Array.from(achivs)));
		console.log(JSON.stringify(Array.from(achivs)));
}