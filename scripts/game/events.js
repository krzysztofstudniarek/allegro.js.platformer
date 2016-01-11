//Funcrtion for in games events handling

var sound = true;

function events()
{	
	if(inGame){
		if(hero.hp <= 0){
			inGame = !inGame;
			lost = true;
			hero.hp = 100;
			//lvl = 0;
			hero.lives --;
			if(hero.lives <= 0){
				lvl = 0;
			}
			
			stop_sample(backgroundSound);
			play_sample(deathSound);
		}
		if(enemies.size == 0){
			if(sound){
				play_sample(winSound);
				sound = false;
			}
			
			if(lvl >= maxLvl){
				inGame = !inGame;
				won = true;
				hero.hp = 100;
				lvl  = 0;
			}
			if(pressed[KEY_SPACE]){
				lvl++;
				load_elements();
				sound = true;
				if(typeof(Storage) !== undefined) {
					localStorage.setItem("lvl", lvl);
				}
			}
		}
	}
	
	if(lost && pressed[KEY_SPACE]){
		load_elements();
		lost = false;
		inGame = true;
		sound = true;
		play_sample(backgroundSound,1.0,1.0,true);
	}

}