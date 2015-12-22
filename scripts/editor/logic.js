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
		}
	});
	
	if(mouse_pressed&1){
		newX = mouse_x;
		newY = mouse_y;
	}

	if(mouse_released&1){
		
		platforms.add({
				x: (newX<mouse_x?newX:mouse_x) + translatedX,
				y: newY<mouse_y?newY:mouse_y,
				width: abs(newX - mouse_x),
				height: abs(newY - mouse_y),
				drawShades: true
		});
		
		newX = undefined;
		newY = undefined;
	}
	
	if(pressed[KEY_S]){
		var name = prompt("Please enter file name", "");
		
		if(name == ""){
			alert("Filename could not be empty");
		}else{	
			var tx = "<lvl><platforms>";
			
			platforms.forEach(function(value){
				tx += "<platform x='"+value.x+"' y='"+value.y+"' width='"+value.width+"' height='"+value.height+"' drawShades='true'></platform>"
			});
			
			
			tx += "</platforms><enemies>"
			
			enemies.forEach(function(value){
				tx += "<enemy x='"+value.x+"' y='"+value.y+"' radius='"+value.radius+"'></enemy>"
			});
			
			tx += "</enemies></lvl>"
			
			var a = document.createElement("a");
			var file = new Blob([tx], {type: 'text/html'});
			a.href = URL.createObjectURL(file);
			a.download = name + ".lvl";
			a.click();
		}
		
		
	}
	
}