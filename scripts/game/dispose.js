//Function for disposing inacive elements, added to improve performace of the game.
function dispose ()
{	
	if(inGame){
		//calculating of active platforms in this frame
		//active platforms are only those that are close to the hero
		activePlatforms = new Set();
		platforms.forEach(function(value){
			
			//when platform is closer that 2*width the platform is assumed active
			if((value.x - translatedX + 2*width) > hero.x && (value.x + value.width - translatedX - 2*width< hero.x)){
				activePlatforms.add(value);
			}
			
		});
		
		activeEnemies = new Set();
		enemies.forEach(function(value){
			//when platform is closer that 2*width the platform is assumed active
			if((value.x - translatedX + 2*width) > hero.x && (value.x + value.radius - translatedX - 2*width< hero.x) && value.hp >= 0){
				activeEnemies.add(value);
			}
			
			if(value.hp <= 0){
				enemies.delete(value);
			}
			
		});
		
		//deleting bullets when out of canvaads
		bullets.forEach(function(value){
			if((value.x + width/2 + 50) < hero.x || (value.x - translatedX - width/2 - 50> hero.x)){
				bullets.delete(value);
			}
		});
		
		grenades.forEach(function(value){
			if(value.bang != 0 && time() - value.bang >= 2550){
				grenades.delete(value);
			}
		});
	}

}