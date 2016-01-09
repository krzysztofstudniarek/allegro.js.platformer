//function for updating the single frame objects
function update(editor)
{	
	editor = editor !== 'undefined' ? editor : false;

	if(inGame){
		//update bullets positions, regardles to their velocity
		bullets.forEach(function(value){
			
			value.x += value.vx;
			value.y += value.vy;
			
			if(distance(value.x, value.y, hero.x+hero.width/2, hero.y+hero.width/2) < hero.width/2 && !editor){
					hero.hp -= 10;
					bullets.delete(value);
			}
			
		});
		
		grenades.forEach(function(value){
			if(value.bang == 0){
				value.x += value.vx;
				value.y += value.vy;
				value.vy += 0.2;
			}
		});
		
		log(hero.hp);
		
		//if hero is currently not on platform make gravity brings him down
		if(hero.platform == null && hero.vy <= 5){
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
			
			grenades.forEach(function(grenade){
				
				if(grenade.x + 5 > value.x && grenade.x + 5 < value.x + value.width && grenade.y + 5 > value.y && grenade.y + 5 < value.y + value.height && grenade.bang == 0){
					grenade.bang = time();
					grenade.vx = 0;
					grenade.vy= 0;
					if(!editor){
						d = distance(grenade.x - translatedX + 5, grenade.y + 5, hero.x + hero.width/2, hero.y+hero.width/2);
						if(d <= 75){
							hero.hp -= 150*(75-d)/75; 
						}
					}
					var dist = distance(hero.x +hero.width/2, hero.y + hero.height/2, grenade.x + 5 - translatedX, grenade.y + 5);
					play_sample(grenadeSound, (dist/500>1?0:(1- dist/500)));
				}
				
			});
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
		
		if(hero.platform != null && hero.platform.trap){
			hero.hp -=5;
		}
		
		//If hero falls out of the canvas by bottom edge it falls from the top again.
		if(hero.y > 480){
			hero.y = 0;
		}
	}
	
}

function cross(x1,y1,x2,y2,x3,y3,x4,y4){
	
	if ((det_matrix(x1, y1, x2, y2, x3, y3))*(det_matrix(x1, y1, x2, y2, x4, y4))>=0){
		return false; 
	}else if ((det_matrix(x3, y3, x4, y4, x1, y1))*(det_matrix(x3, y3, x4, y4, x2, y2))>=0){
		return false;
	}
	else{
		return true;
	}
}

function det_matrix(xx,xy,yx,yy,zx,zy)
{
	return (xx*yy + yx*zy + zx*xy - zx*yy - xx*zy - yx*xy);
}
