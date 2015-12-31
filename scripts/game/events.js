//Funcrtion for in games events handling

var sound = true;

function events()
{	
	if(inGame){
		if(hero.hp <= 0){
			inGame = !inGame;
			lost = true;
			hero.hp = 100;
			lvl = 0;
			play_sample(deathSound);
		}
		if(enemies.size == 0){
			if(sound){
				play_sample(winSound);
				sound = false;
			}
			
			if(lvl >= 3){
				inGame = !inGame;
				won = true;
				hero.hp = 100;
				lvl = 0;
			}
			if(pressed[KEY_SPACE]){
				lvl++;
				load_elements();
				sound = true;
			}
		}
	}
	
	if(lost && pressed[KEY_SPACE]){
		lvl = 0;
		load_elements();
		lost = false;
		inGame = true;
		sound = true;
	}

}