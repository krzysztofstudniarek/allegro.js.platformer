function controls ()
{
	if((pressed[KEY_UP] || pressed[KEY_W] )&& hero.platform != null){
		hero.platform = null;
		hero.vy = -6;
		hero.y -= 1;
	}
	
	if(pressed[KEY_LEFT] || pressed[KEY_A] || goingLeft){
		goingLeft = true;
		hero.vx = -2;
	}
	if(released[KEY_LEFT] || released[KEY_A]){
		goingLeft = false;
	}
	
	if(pressed[KEY_RIGHT] || pressed[KEY_D] || goingRight){
		goingRight = true;
		hero.vx = 2;
	}
	if(released[KEY_RIGHT] || released[KEY_D]){
		goingRight = false;
	}
	
	if(mouse_pressed){
		var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, mouse_x, mouse_y);
		bullets.add({
			x : hero.x + hero.width/2 + 15*((mouse_x-hero.x-hero.width/2)/d), 
			y : hero.y + hero.height/2 + 15*((mouse_y-hero.y- hero.height/2)/d),
			vx : 10*((mouse_x-hero.x- hero.width/2)/d),
			vy : 10*((mouse_y-hero.y- hero.height/2)/d)
		});
	}
	
}