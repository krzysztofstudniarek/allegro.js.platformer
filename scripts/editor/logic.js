function logic(){
	platforms.forEach(function(value){
		if(mouse_pressed&2 && mouse_x > value.x - translatedX && mouse_x < value.x - translatedX + value.width && mouse_y < value.y + value.height && mouse_y > value.y){
			selectedPlatform = value;	
			selectedEnemy = undefined;
		}
	});
	
	enemies.forEach(function(value){
		if(mouse_pressed&2 && distance(mouse_x, mouse_y, value.x- translatedX, value.y) < value.radius){
			selectedEnemy = value;
			selectedPlatform = undefined;
			console.log("selected Enemy");
		}
	});

}