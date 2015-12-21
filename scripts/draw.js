//Fucntion for drawing elements on canvas
function draw()
{   

	if(inGame){
		//draw all bullets
		bullets.forEach(function(value){
			circlefill(canvas, value.x, value.y, 2, makecol(255,0,0));
		});
		
		//draw hero
		circlefill(canvas, hero.x+hero.width/2, hero.y+hero.height/2, hero.width/2, makecol(0,0,0));
		
		//draw heros hand
		var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, mouse_x, mouse_y);
		circlefill(canvas, hero.x +hero.width/2 + 15*((mouse_x-hero.x-hero.width/2)/d), hero.y + hero.height/2 + 15*((mouse_y-hero.y- hero.height/2)/d), 4, makecol(0,0,0));
		
		activeEnemies.forEach(function(enemy){	
			
			var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2);
			circlefill(canvas, enemy.x - translatedX + enemy.radius/2 - 15*((enemy.x+enemy.radius/2 - translatedX -hero.x-hero.width/2)/d), enemy.y + enemy.radius/2 - 15*((enemy.y+enemy.radius/2-hero.y- hero.height/2)/d), 4, makecol(255,0,0));
		
			circlefill(canvas, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2, enemy.radius/2, makecol(255,0,0));
		});
		
		//draw all platforms
		activePlatforms.forEach(function(value){
			
			//draw platform body
			rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,0,0));
			
			//draw platform shades, relatively to hero positiond
			if(value.drawShades){
					var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
					polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
					polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
			}
			
		});
		
		rectfill(canvas, 0, height-5, width*(hero.hp/100), 5, makecol(255*(1 - (hero.hp/100)),255*(hero.hp/100),0));
	}else{
		var x = sgn(width/2+100-mouse_x), x1 = sgn(width/2-100 - mouse_x);
		
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, x*10000, ((height/2 -50 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 -50 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2-100, height/2+10, x1*10000, ((height/2+10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 - 50- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2+100, height/2-50, width/2+100, height/2+10, x*10000, ((height/2+10 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 - 50- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2+10, width/2+100, height/2+10, x*10000, ((height/2 +10 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		if(mouse_x > width/2-100 && mouse_x < width/2+100 && mouse_y >height/2-50 && mouse_y<height/2+10){
			textout_centre(canvas,font,"PLAY GAME",SCREEN_W/2,SCREEN_H/2-10,20,makecol(0,0,0));
			if(mouse_b){
				load_elements();
				inGame = !inGame;
			}
		}else{
			textout_centre(canvas,font,"PLAY GAME",SCREEN_W/2,SCREEN_H/2-10,20,makecol(255,255,255));
		}
		
	}
}