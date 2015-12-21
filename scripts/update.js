//function for updating the single frame objects
function update()
{	
	//update bullets positions, regardles to their velocity
	bullets.forEach(function(value){
		
		value.x += value.vx;
		value.y += value.vy;
		
		if(distance(value.x, value.y, hero.x+hero.width/2, hero.y+hero.width/2) < hero.width/2){
				hero.hp -= 10;
				bullets.delete(value);
		}
		
	});
	
	log(hero.hp);
	
	//if hero is currently not on platform make gravity brings him down
	if(hero.platform == null && hero.vy <= 3){
			hero.vy += 0.2;
	}

		
	activePlatforms.forEach(function(value){
		//Hero-Platforms collision detection 
		//TO-DO Simplify
		//collision in horizontal movement
		if(((hero.y <= (value.y) && hero.y+hero.height > value.y) || (hero.y + hero.height >= (value.y + value.height) && hero.y > value.y && hero.y<value.y + value.height) || (hero.y >= value.y) && (hero.y+hero.width <= value.y + value.height))){
			
			if(hero.x + hero.width + 2 >= value.x - translatedX && hero.x + hero.width <= value.x - translatedX + hero.width){
				hero.vx = 0;
				translatedX -= 2;
				
			}
			
			if(hero.x - 2 <= value.x - translatedX + value.width && hero.x >= value.x - translatedX + value.width - hero.width){
				hero.vx = 0;
				translatedX += 2;
			}
			
		}
		
		
		if(hero.platform == null){
			//collision in vartical movement
			if((hero.y < (value.y + value.height+1)) && (hero.y > value.y) && (hero.x + hero.width >= value.x - translatedX + 5) && (hero.x <= value.x - translatedX + value.width - 5)){
				hero.y = value.y +  value.height + 2;
				hero.vy = -hero.vy;
			}
			
			if(hero.y >= (value.y - hero.height) && hero.x + hero.width > value.x - translatedX +5 && hero.x < value.x - translatedX + value.width -5 && hero.y < value.y){
				hero.platform = value;
				hero.y = value.y - hero.height;
				hero.vy = 0;
			}
		}
		
		//bullets Platform collision detection
		bullets.forEach(function(bullet){
			
			if(bullet.x > value.x - translatedX && bullet.x < value.x - translatedX + value.width && bullet.y > value.y && bullet.y < value.y + value.height){
				bullets.delete(bullet);
			}
			
		});
	});
	
	
	activeEnemies.forEach(function(enemy){
		bullets.forEach(function(bullet){
			if(distance(bullet.x, bullet.y, enemy.x + enemy.radius/2 - translatedX, enemy.y +enemy.radius/2) < enemy.radius/2){
				bullets.delete(bullet);
				enemies.delete(enemy);
			}
		});

		if((time() - enemy.lastShotTime) >= 200 & frand()<=0.5){
			var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, enemy.x+enemy.radius/2 - translatedX, enemy.y+enemy.radius/2);
			if(d < 200 ){
				bullets.add({
					x : enemy.x + enemy.radius/2 - translatedX - 15*((enemy.x+enemy.radius/2 - translatedX-hero.x-hero.width/2)/d), 
					y : enemy.y + enemy.radius/2 - 15*((enemy.y + enemy.radius/2 - hero.y- hero.height/2)/d),
					vx : -10*((enemy.x + enemy.radius/2 - translatedX-hero.x- hero.width/2)/d),
					vy : -10*((enemy.y + enemy.radius/2 - hero.y - hero.height/2)/d)
				});
				enemy.lastShotTime = time();
			}
		}
		
	});
	
	//side scrolling behaviour; In fact hero is not moving horizontally;
	//when if velocity changes the whole world is moving except hero :D.
	hero.y += hero.vy;
	

		translatedX += hero.vx;

	log(hero.x + ":"+width/2);
	
	//falling form the platform behaviourdddd
	if(hero.platform != null && (hero.x + hero.width< hero.platform.x- translatedX  || hero.x > hero.platform.x- translatedX  + hero.platform.width)){
		hero.platform = null;
	}
	
	//If hero falls out of the canvas by bottom edge it falls from the top again.
	if(hero.y > 480){
		hero.y = 0;
	}
	
}