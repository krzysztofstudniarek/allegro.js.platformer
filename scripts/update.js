function update()
{	
	bullets.forEach(function(value){
		
		value.x += value.vx;
		value.y += value.vy;
		
	});

	if(hero.platform == null && hero.vy <= 3){
			hero.vy += 0.2;
	}

		//Logical statements needs simplification
		platforms.forEach(function(value){
			if(((hero.y <= (value.y) && hero.y+hero.height > value.y) || (hero.y + hero.height >= (value.y + value.height) && hero.y > value.y && hero.y<value.y + value.height) || (hero.y >= value.y) && (hero.y+hero.width <= value.y + value.height))){
				
				if(hero.x + hero.width >= value.x && hero.x + hero.width <= value.x + 5){
					hero.x = value.x - hero.width - 1;
					hero.vx = 0;
				}
				
				if(hero.x <= value.x + value.width && hero.x >= value.x + value.width - 5){
					hero.x = value.x +value.width + 1;
					hero.vx = 0;
				}
				
			}
			
			if(hero.platform == null){
				if((hero.y < (value.y + value.height+1)) && (hero.y > value.y) && (hero.x + hero.width >= value.x) && (hero.x <= value.x + value.width)){
					hero.y = value.y +  value.height + 2;
					hero.vy = -hero.vy;
				}
				
				if(hero.y >= (value.y - hero.height) && hero.x + hero.width > value.x && hero.x < value.x + value.width && hero.y < value.y){
					hero.platform = value;
					hero.y = value.y - hero.height;
					hero.vy = 0;
				}
			}
			
			bullets.forEach(function(bullet){
				
				if(bullet.x > value.x && bullet.x < value.x + value.width && bullet.y > value.y && bullet.y < value.y + value.height){
					bullets.delete(bullet);
				}
				
			});
		});
	

	if(hero.vx > 0){
		hero.vx -= 0.1;
	}else if(hero.vx < 0 && !pressed[KEY_LEFT]){
		hero.vx += 0.1;
	} 
	
	if(abs(hero.vx)<0.1){
		hero.vx = 0;
	}
	
	hero.y += hero.vy;
	hero.x += hero.vx;
	
	if(hero.platform != null && (hero.x + hero.width< hero.platform.x || hero.x > hero.platform.x + hero.platform.width)){
		hero.platform = null;
	}
	
	if(hero.y > 480){
		hero.y = 0;
	}
}