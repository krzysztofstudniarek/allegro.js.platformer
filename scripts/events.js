//Funcrtion for in games events handling
function events()
{	
	if(inGame){
		if(hero.hp <= 0){
			inGame = !inGame;
			hero.hp = 100;
		}	
	}

}