function logic(){
	platforms.forEach(function(value){
		
		if(mouse_pressed && mouse_x > value.x - translatedX && mouse_x < value.x - translatedX + value.width && mouse_y < value.y + value.height && mouse_y > value.y){
			selectedPlatform = value;	
		}
		
	});
}