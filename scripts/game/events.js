//Funcrtion for in games events handling
function events()
{	
	if(inGame){
		if(hero.hp <= 0){
			inGame = !inGame;
			hero.hp = 100;
			lvl = 0;
		}
		
		if(enemies.size == 0){
			if(pressed[KEY_SPACE]){
				lvl++;
				load_elements();
				console.log(lvl);
			}
		}
	}

}