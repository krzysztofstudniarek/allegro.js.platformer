function dispose ()
{
	activePlatforms = new Set();
	var size = 0;
	platforms.forEach(function(value){
		
		if((value.x - translatedX + 2*width) > hero.x && (value.x + value.width - translatedX - 2*width< hero.x)){
			activePlatforms.add(value);
			size++;
		}
		
	});
	log(translatedX);
	log(size);
	
}