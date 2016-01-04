//Funcrtion for in games events handling

var sound = true;

function events()
{	
	if(inGame){
		console.log(hero.lives);
		if(hero.hp <= 0 && hero.lives > 0){
			inGame = !inGame;
			lost = true;
			hero.hp = 100;
			//lvl = 0;
			hero.lives --;
			stop_sample(backgroundSound);
			play_sample(deathSound);
		}else if(hero.hp <= 0 && hero.lives <= 0){
			inGame = !inGame;
			lost = true;
			hero.hp = 100;
			lvl = 0;
			stop_sample(backgroundSound);
			play_sample(deathSound);
			console.log("game over");
		}
		if(enemies.size == 0){
			if(sound){
				play_sample(winSound);
				sound = false;
			}
			
			if(lvl >= 4){
				inGame = !inGame;
				won = true;
				hero.hp = 100;
				lvl  = 0;
			}
			if(pressed[KEY_SPACE]){
				lvl++;
				load_elements();
				sound = true;
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