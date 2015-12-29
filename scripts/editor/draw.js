//Fucntion for drawing elements on canvas
function editor_draw()
{   
		enemies.forEach(function(enemy){	
			
			if(enemy != selectedEnemy){
				var d = distance(mouse_x, mouse_y, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2);
				circlefill(canvas, enemy.x - translatedX + enemy.radius/2 - 15*((enemy.x+enemy.radius/2 - translatedX -mouse_x)/d), enemy.y + enemy.radius/2 - 15*((enemy.y+enemy.radius/2-mouse_y)/d), 4, makecol(255,0,0));
		
				circlefill(canvas, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2, enemy.radius/2, makecol(255,0,0));
			}else{
				var d = distance(mouse_x, mouse_y, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2);
				circlefill(canvas, enemy.x - translatedX + enemy.radius/2 - 15*((enemy.x+enemy.radius/2 - translatedX -mouse_x)/d), enemy.y + enemy.radius/2 - 15*((enemy.y+enemy.radius/2-mouse_y)/d), 4, makecol(0,255,0));
		
				circlefill(canvas, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2, enemy.radius/2, makecol(0,255,0));
			}

		});
		

		//draw all platforms
		platforms.forEach(function(value){
			
			if(value.drawShades && mouse_b == 4){
						var x = sgn(value.x - translatedX+value.width-mouse_x), x1 = sgn(value.x - translatedX-mouse_x);
						polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - mouse_y)*(x*10000-mouse_x))/(value.x - translatedX+value.width-mouse_x) + mouse_y, x1*10000, ((value.y - mouse_y)*(x1*10000-mouse_x))/(value.x - translatedX-mouse_x) + mouse_y ], makecol(0,0,0));
						polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - mouse_y)*(x*10000-mouse_x))/(value.x - translatedX+value.width-mouse_x) + mouse_y, x1*10000, ((value.y+value.height - mouse_y)*(x1*10000-mouse_x))/(value.x - translatedX-mouse_x) + mouse_y ], makecol(0,0,0));
			}	
			
			
			if(value == selectedPlatform){
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,255,0));
			}else{
				//draw platform body
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,0,0));
			}

		});
		
		if(grid){
			for(var i = 0; i<=10000; i+= 40){
				 line(canvas, i-translatedX,0,i-translatedX,height,makecol(125,125,125),1);
			}
			for(var i = 0; i<height; i+= 40){
				line(canvas,0,i,width,i,makecol(125,125,125),1);
			}
			
		}
		
		if(newX != undefined && newY != undefined){
			rectfill(canvas, newX, newY, mouse_x - newX, mouse_y-newY, makecol(0,0,0));
		}
		
		rectfill(canvas, width/2 - translatedX, 150, 25, 25, makecol(0,0,255));
}