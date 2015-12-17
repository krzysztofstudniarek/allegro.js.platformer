
function draw()
{   
	
	bullets.forEach(function(value){
		circlefill(canvas, value.x, value.y, 2, makecol(255,0,0));
	});
	
	circlefill(canvas, hero.x+hero.width/2, hero.y+hero.height/2, hero.width/2, makecol(0,0,0));
	
	var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, mouse_x, mouse_y);
	circlefill(canvas, hero.x +hero.width/2 + 15*((mouse_x-hero.x-hero.width/2)/d), hero.y + hero.height/2 + 15*((mouse_y-hero.y- hero.height/2)/d), 4, makecol(0,0,0));
	
	
	platforms.forEach(function(value){
		
		rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,0,0));
		
		if(value.drawShades){
				var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
				polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
				polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
		}
		
	});
}