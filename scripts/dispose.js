function dispose ()
{
	
	//Active platforms are only those that are close to the hero
	activePlatforms = new Set();
	platforms.forEach(function(value){
		
		if((value.x - translatedX + 2*width) > hero.x && (value.x + value.width - translatedX - 2*width< hero.x)){
			activePlatforms.add(value);
		}
		
	});

}