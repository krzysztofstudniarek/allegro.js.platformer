//Function for disposing inacive elements, added to improve performace of the game.
function dispose ()
{	
	//calculating of active platforms in this frame
	//active platforms are only those that are close to the hero
	activePlatforms = new Set();
	platforms.forEach(function(value){
		
		//when platform is closer that 2*width the platform is assumed active
		if((value.x - translatedX + 2*width) > hero.x && (value.x + value.width - translatedX - 2*width< hero.x)){
			activePlatforms.add(value);
		}
		
	});

}