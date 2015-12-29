//Funcrtion for in games events handling
function events()
{	
	if(inGame){
		if(hero.hp <= 0){
			inGame = !inGame;
			lost = true;
			hero.hp = 100;
			lvl = 0;
		}
		if(enemies.size == 0){
			if(lvl >= 2){
				inGame = !inGame;
				won = true;
				hero.hp = 100;
				lvl = 0;
			}
			if(pressed[KEY_SPACE]){
				lvl++;
				load_elements();
			}
		}
	}
	
	if(lost && pressed[KEY_SPACE]){
		lvl = 0;
		load_elements();
		lost = false;
		inGame = true;
	}

}