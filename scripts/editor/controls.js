function editor_controls()
{
		if(pressed[KEY_LEFT] || pressed[KEY_A] || goingLeft){
			goingLeft = true;
			translatedX -= 5;
		}

		if(released[KEY_LEFT] || released[KEY_A]){
			goingLeft = false;
		}
		
		if(pressed[KEY_G]){
			grid = !grid;
		}
		
		//moving right
		if(pressed[KEY_RIGHT] || pressed[KEY_D] || goingRight){
			goingRight = true;
			translatedX += 5;
		 }
		
		//stop moving right
		if(released[KEY_RIGHT] || released[KEY_D]){
			goingRight = false;
		}
		
		if(selectedPlatform != undefined && pressed[KEY_R]){
			
			platforms.delete(selectedPlatform);
			selectedPlatform = undefined;
		}
		
		if(selectedEnemy != undefined && pressed[KEY_R]){
			
			enemies.delete(selectedEnemy);
			selectedEnemy = undefined;
		}
}
	