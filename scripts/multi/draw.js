//Fucntion for drawing elements on canvas
var isPlaySelected = false;
var isEditorSelected = false;
var playPlay = false, playEditor = false;
function draw(editor)
{   

	editor = editor !== 'undefined' ? editor : false;

	if(inGame){
		//draw all bullets
		bullets.forEach(function(value){
			circlefill(canvas, value.x, value.y, 2, makecol(255,0,0));
		});
		
		grenades.forEach(function(value){
			if(value.bang == 0){
				circlefill(canvas, value.x - translatedX, value.y, 5, makecol(0,255,0));
			}else{
				circlefill(canvas, value.x - translatedX, value.y, 75, makecol(255,0,0,2550/(time()-value.bang)));
			}
		});
		
		//draw hero
		circlefill(canvas, hero.x+hero.width/2, hero.y+hero.height/2, hero.width/2, makecol(0,0,0));
		
		//draw heros hand
		var d = distance(hero.x +hero.width/2, hero.y + hero.height/2, mouse_x, mouse_y);
		circlefill(canvas, hero.x +hero.width/2 + 15*((mouse_x-hero.x-hero.width/2)/d), hero.y + hero.height/2 + 15*((mouse_y-hero.y- hero.height/2)/d), 4, makecol(0,0,0));
		
		
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		
		activePlatforms.forEach(function(value){
			if(value.trap){
				
				if(value.drawShades){
						var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
						polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
						polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
				}
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(255,0,0));
			}
		});
		
		//draw all platforms
		activePlatforms.forEach(function(value){
			
			//draw platform body
			if(!value.trap){
				rectfill(canvas, value.x - translatedX, value.y, value.width, value.height, makecol(0,0,0));
				
				//draw platform shades, relatively to hero positiond
				if(value.drawShades){
						var x = sgn(value.x - translatedX+value.width-hero.x), x1 = sgn(value.x - translatedX-hero.x);
						polygonfill(canvas, 4, [value.x - translatedX, value.y, value.x - translatedX+value.width, value.y+value.height, x*10000, ((value.y+value.height - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
						polygonfill(canvas, 4, [value.x - translatedX, value.y+value.height, value.x - translatedX+value.width, value.y, x*10000, ((value.y - hero.y)*(x*10000-hero.x))/(value.x - translatedX+value.width-hero.x) + hero.y, x1*10000, ((value.y+value.height - hero.y)*(x1*10000-hero.x))/(value.x - translatedX-hero.x) + hero.y ], makecol(0,0,0));
				}
			}
			
		});
		
		rectfill(canvas, 0, height-5, width*(hero.hp/100), 5, makecol(255*(1 - (hero.hp/100)),255*(hero.hp/100),0));

		var mv = 20;
		
		mv = width - 20;
		
		for(var i = 0; i< hero.grenades; i++){
			circlefill(canvas, mv, height - 20, 5, makecol(0,255,0));
			mv -= 20;
		}
		
	}else if(!won && !lost){
		
		if(playPlay || playEditor){
			play_sample(menuSound);
		}
		
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		
		var x = sgn(width/2+100-mouse_x), x1 = sgn(width/2-100 - mouse_x);
		
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, x*10000, ((height/2 -50 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 -50 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2-50, width/2-100, height/2+10, x1*10000, ((height/2+10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 - 50- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2+100, height/2-50, width/2+100, height/2+10, x*10000, ((height/2+10 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 - 50- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygonfill(canvas, 4, [width/2-100, height/2+10, width/2+100, height/2+10, x*10000, ((height/2 +10 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		polygon(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, x*10000, ((height/2 -50 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 -50 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2-50, width/2-100, height/2+10, x1*10000, ((height/2+10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y, x1*10000, ((height/2 - 50- mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2+100, height/2-50, width/2+100, height/2+10, x*10000, ((height/2+10 - mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y, x*10000, ((height/2 - 50- mouse_y)*(x*10000-mouse_x))/(width/2+100-mouse_x) + mouse_y ], makecol(0,0,0));
		polygon(canvas, 4, [width/2-100, height/2+10, width/2+100, height/2+10, x*10000, ((height/2 +10 - mouse_y)*(x*10000-mouse_x))/(width/2-100+200-mouse_x) + mouse_y, x1*10000, ((height/2 +10 - mouse_y)*(x1*10000-mouse_x))/(width/2-100-mouse_x) + mouse_y ], makecol(0,0,0));
		
		if(mouse_x >= width/2-100 && mouse_x <= width/2+100 && mouse_y >= height/2-50 && mouse_y <= height/2+10){
			if(!isPlaySelected){
				playPlay = true;
				isPlaySelected = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, width/2+100, height/2+10, width/2-100, height/2+10], makecol(255,255,255));
			textout_centre(canvas,font1,"JOIN",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
			if(mouse_b){
				//load_elements();
				//inGame = !inGame;
				//play_sample(backgroundSound,1.0,1.0,true);
				peerID = prompt("Please enter your oponent peer ID", "");
			}
		}else{
			if(isPlaySelected){
				isPlaySelected = false;
				playPlay = true;
			}else{
				playPlay = false;
			}
			polygonfill(canvas, 4, [width/2-100, height/2-50, width/2+100, height/2-50, width/2+100, height/2+10, width/2-100, height/2+10], makecol(0,0,0));
			textout_centre(canvas,font1,"JOIN",SCREEN_W/2,SCREEN_H/2-10,30,makecol(255,255,255));
		}
		
	}else if(won){
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"CONGRATULATIONS!",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
		textout_centre(canvas,font1,"you've won the game.",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
	}else if(lost){
		rectfill(canvas, 0, 0, width, 40, makecol(0,0,0));
		rectfill(canvas, 0, height-40, width, 40, makecol(0,0,0));
		textout_centre(canvas,font1,"GAME OVER!",SCREEN_W/2,SCREEN_H/2-10,30,makecol(0,0,0));
		textout_centre(canvas,font1,"press SPACE to play again",SCREEN_W/2,SCREEN_H/2+25,30,makecol(0,0,0));
	}
}